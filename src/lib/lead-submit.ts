export type SubmitResult = 'sent' | 'failed' | 'ignored';
type Timers = { set: (fn: () => void, ms: number) => unknown; clear: (id: unknown) => void };
type Deps<B> = {
  post: (body: B, signal: AbortSignal) => Promise<{ ok: boolean }>;
  onSent: (body: B) => void;
  /** How long to wait for an answer before giving up and letting the visitor retry. */
  timeoutMs?: number;
  /** Injectable for tests; defaults to the global timers. */
  timers?: Timers;
};

export const SUBMIT_TIMEOUT_MS = 30_000;
const realTimers: Timers = { set: (fn, ms) => setTimeout(fn, ms), clear: (id) => clearTimeout(id as ReturnType<typeof setTimeout>) };

/**
 * Shown on any failure. An error, a timeout or a dropped connection does not prove the lead never
 * arrived, so this says we could not confirm it rather than that it was not sent.
 */
export const failureMessage = (phone: string) =>
  `We could not confirm that your request went through. Your details are still in the form, so you can try again, or call ${phone} and we will help directly.`;

/**
 * One form's submit pipeline. The guard is a plain variable, not React state, so a second tap
 * landing before the "Sending…" re-render is still ignored. `onSent` (the Meta Lead event) runs
 * only after an OK response and at most once per form instance. A request that has not answered
 * within `timeoutMs` is aborted and reported as failed, so the form never stays on "Sending…".
 */
export function createLeadSubmitter<B>({ post, onSent, timeoutMs = SUBMIT_TIMEOUT_MS, timers = realTimers }: Deps<B>) {
  let state: 'idle' | 'sending' | 'sent' = 'idle';
  return async function submit(body: B): Promise<SubmitResult> {
    if (state !== 'idle') return 'ignored';
    state = 'sending';
    const controller = new AbortController();
    let timer: unknown;
    const timedOut = new Promise<never>((_, reject) => {
      timer = timers.set(() => {
        controller.abort();
        reject(new Error('timeout'));
      }, timeoutMs);
    });
    try {
      // Race as well as abort: a fetch that ignores the signal must not keep the form stuck.
      const res = await Promise.race([post(body, controller.signal), timedOut]);
      if (!res.ok) throw new Error('not ok');
    } catch {
      state = 'idle';
      return 'failed';
    } finally {
      timers.clear(timer);
    }
    // A response arriving after the timeout lost the race above, so it can never reach this line.
    state = 'sent';
    try {
      onSent(body);
    } catch {
      // Tracking must never turn a delivered lead into an error for the homeowner.
    }
    return 'sent';
  };
}
