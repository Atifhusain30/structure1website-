import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadTs } from '../helpers/load-ts.mjs';

const { createLeadSubmitter } = await loadTs('src/lib/lead-submit.ts');

function harness(responses) {
  const calls = { posts: 0, leads: 0, release: [] };
  const submit = createLeadSubmitter({
    post: () => {
      calls.posts++;
      const r = responses.shift();
      if (r === 'hang') return new Promise((resolve) => calls.release.push(() => resolve({ ok: true })));
      if (r instanceof Error) return Promise.reject(r);
      return Promise.resolve({ ok: r });
    },
    onSent: () => calls.leads++,
  });
  return { submit, calls };
}

test('a successful response records exactly one Lead', async () => {
  const { submit, calls } = harness([true]);
  assert.equal(await submit('body'), 'sent');
  assert.equal(calls.leads, 1);
});

test('an HTTP error response records no Lead and reports failure', async () => {
  const { submit, calls } = harness([false]);
  assert.equal(await submit('body'), 'failed');
  assert.equal(calls.leads, 0);
});

test('a network failure records no Lead and reports failure instead of throwing', async () => {
  const { submit, calls } = harness([new TypeError('Failed to fetch')]);
  assert.equal(await submit('body'), 'failed');
  assert.equal(calls.leads, 0);
});

test('a retry after a failure can still succeed', async () => {
  const { submit, calls } = harness([false, true]);
  assert.equal(await submit('body'), 'failed');
  assert.equal(await submit('body'), 'sent');
  assert.deepEqual([calls.posts, calls.leads], [2, 1]);
});

test('a second submit while the first is in flight is ignored (no double POST)', async () => {
  const { submit, calls } = harness(['hang', true]);
  const first = submit('body');
  assert.equal(await submit('body'), 'ignored');
  calls.release[0]();
  assert.equal(await first, 'sent');
  assert.deepEqual([calls.posts, calls.leads], [1, 1]);
});

test('submits after a success are ignored, so Lead never fires twice', async () => {
  const { submit, calls } = harness([true, true]);
  await submit('body');
  assert.equal(await submit('body'), 'ignored');
  assert.deepEqual([calls.posts, calls.leads], [1, 1]);
});

/** Manual timers: nothing fires until the test calls `fire()`, so no real waiting. */
function fakeTimers() {
  const t = { pending: new Map(), next: 1, cleared: 0 };
  t.set = (fn, ms) => {
    const id = t.next++;
    t.pending.set(id, { fn, ms });
    return id;
  };
  t.clear = (id) => {
    if (t.pending.delete(id)) t.cleared++;
  };
  t.fire = () => {
    const all = [...t.pending.values()];
    t.pending.clear();
    all.forEach((p) => p.fn());
  };
  return t;
}

test('a request that never answers times out, aborts the fetch, records no Lead and can be retried', async () => {
  const timers = fakeTimers();
  const signals = [];
  let leads = 0;
  let attempt = 0;
  const submit = createLeadSubmitter({
    post: (_body, signal) => {
      signals.push(signal);
      // First attempt hangs forever and ignores the abort; the retry answers OK.
      return ++attempt === 1 ? new Promise(() => {}) : Promise.resolve({ ok: true });
    },
    onSent: () => leads++,
    timeoutMs: 30000,
    timers,
  });
  const first = submit('body');
  assert.equal([...timers.pending.values()][0].ms, 30000, 'bounded by the configured timeout');
  timers.fire();
  assert.equal(await first, 'failed');
  assert.equal(signals[0].aborted, true, 'the stalled fetch is aborted');
  assert.equal(leads, 0);
  assert.equal(await submit('body'), 'sent', 'back in a retryable state');
  assert.equal(leads, 1);
  assert.equal(timers.pending.size, 0, 'the retry cleared its timer on success');
});

test('the timeout timer is cleared when the request settles, so it cannot fire later', async () => {
  for (const outcome of [{ ok: true }, { ok: false }, new TypeError('Failed to fetch')]) {
    const timers = fakeTimers();
    const submit = createLeadSubmitter({
      post: () => (outcome instanceof Error ? Promise.reject(outcome) : Promise.resolve(outcome)),
      onSent: () => {},
      timers,
    });
    await submit('body');
    assert.equal(timers.pending.size, 0, `timer left running after ${outcome instanceof Error ? 'network error' : `ok=${outcome.ok}`}`);
    assert.equal(timers.cleared, 1);
  }
});

test('a late answer after a timeout does not record a Lead or block the retry', async () => {
  const timers = fakeTimers();
  let leads = 0;
  let release;
  let attempt = 0;
  const submit = createLeadSubmitter({
    post: () => (++attempt === 1 ? new Promise((r) => (release = r)) : new Promise(() => {})),
    onSent: () => leads++,
    timers,
  });
  const first = submit('body');
  timers.fire();
  assert.equal(await first, 'failed');
  const retry = submit('body');
  release({ ok: true });
  await new Promise((r) => setImmediate(r));
  assert.equal(leads, 0, 'the stale response is ignored');
  timers.fire();
  assert.equal(await retry, 'failed');
});

test('the failure message does not claim the request was not sent, and keeps the phone fallback', async () => {
  const { failureMessage } = await loadTs('src/lib/lead-submit.ts');
  const msg = failureMessage('(580) 665-2758');
  assert.match(msg, /could not confirm/i);
  assert.doesNotMatch(msg, /was not sent|wasn't sent|not received/i);
  assert.match(msg, /still in the form/i);
  assert.match(msg, /\(580\) 665-2758/);
});

test('a broken tracker does not turn a delivered lead into an error', async () => {
  const submit = createLeadSubmitter({ post: async () => ({ ok: true }), onSent: () => { throw new Error('fbq blew up'); } });
  assert.equal(await submit('body'), 'sent');
});
