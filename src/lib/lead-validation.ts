// Client-side checks for the estimate form. These help homeowners fix typos before sending;
// they are not a security boundary. Netlify Forms (and any future backend) must still treat
// every submitted value as untrusted.

export type LeadField = 'name' | 'phone' | 'email' | 'city' | 'service' | 'photos';
export type FieldErrors = Partial<Record<LeadField, string>>;
export type LeadValues = { name: string; phone: string; email: string; city: string; service: string; timeline: string; message: string };

/** Order the fields appear on screen, so the first error found is the first one a visitor reaches. */
export const FIELD_ORDER: LeadField[] = ['name', 'phone', 'email', 'city', 'service', 'photos'];

const clean = (v: unknown) => (typeof v === 'string' ? v : '').replace(/\s+/g, ' ').trim();

/**
 * Accepts a 10-digit US/NANP number with optional +1/1 prefix and any common punctuation,
 * plus an optional extension ("ext 4", "x4", "#4"). Returns "(214) 555-0123[ ext. 4]" or null.
 */
export function normalizeUsPhone(input: string): string | null {
  const m = input.trim().match(/^(.*?)(?:\s*(?:ext\.?|extension|x|#)\s*(\d{1,6}))?$/i);
  const main = m?.[1] ?? '';
  if (/[^\d\s()+.\-]/.test(main)) return null;
  let digits = main.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) digits = digits.slice(1);
  else if (main.trim().startsWith('+')) return null; // a non-US country code
  // NANP: area code and exchange both start 2–9.
  if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(digits)) return null;
  const formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  return m?.[2] ? `${formatted} ext. ${m[2]}` : formatted;
}

export function isValidEmail(email: string): boolean {
  return email.length <= 254 && /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)*\.[A-Za-z]{2,}$/.test(email);
}

export const MAX_PHOTOS = 3;
export const MAX_PHOTO_BYTES = 7 * 1024 * 1024;
type PhotoLike = { name: string; size: number; type: string };

/** Returns the photos to send, or an error. Never drops a file silently. */
export function checkPhotos<T extends PhotoLike>(files: T[]): { photos: T[]; error?: string } {
  // A file input left blank still submits one empty, nameless entry.
  const photos = files.filter((f) => f && f.size > 0);
  if (photos.length > MAX_PHOTOS) return { photos: [], error: `Please choose up to ${MAX_PHOTOS} photos. You selected ${photos.length}.` };
  if (photos.some((f) => !isImage(f))) return { photos: [], error: `Only photo files can be attached (${PHOTO_TYPES}).` };
  if (photos.reduce((n, f) => n + f.size, 0) > MAX_PHOTO_BYTES) {
    return { photos: [], error: 'Photos add up to more than 7 MB. Please pick fewer or smaller photos, or send them after we reply.' };
  }
  return { photos };
}

/** Shown before choosing and in the rejection message, so the two never disagree. */
export const PHOTO_TYPES = 'JPG, PNG, HEIC, WebP, or AVIF';
const IMAGE_EXT = /\.(jpe?g|jfif|pjpeg|pjp|png|webp|gif|heic|heif|avif)$/i;
// Raster photo formats only: SVG is an image/* type that can carry script, so it is refused.
const IMAGE_TYPE = /^image\/(jpeg|pjpeg|png|webp|gif|heic|heif|heic-sequence|heif-sequence|avif)$/i;
// Browsers often leave HEIC types blank, so trust a photo extension when there is no type. With a
// photo type, the name may have a photo extension or none at all (some apps save "image"), but never
// another extension such as .html. Netlify still has to treat the upload as untrusted.
function isImage(f: PhotoLike) {
  if (!f.type) return IMAGE_EXT.test(f.name);
  return IMAGE_TYPE.test(f.type) && (IMAGE_EXT.test(f.name) || !/\.[^./\\]+$/.test(f.name));
}

export function validateLead(raw: Record<string, unknown>): { values: LeadValues; errors: FieldErrors } {
  const values: LeadValues = {
    name: clean(raw.name),
    phone: clean(raw.phone),
    email: clean(raw.email),
    city: clean(raw.city),
    service: clean(raw.service),
    timeline: clean(raw.timeline),
    message: typeof raw.message === 'string' ? raw.message.trim() : '',
  };
  const errors: FieldErrors = {};
  if (!values.name) errors.name = 'Please enter your name.';
  if (!values.phone) errors.phone = 'Please enter a phone number.';
  else {
    const phone = normalizeUsPhone(values.phone);
    if (phone) values.phone = phone;
    else errors.phone = 'Please enter a 10-digit US phone number, like (214) 555-0123.';
  }
  if (!values.email) errors.email = 'Please enter your email address.';
  else if (!isValidEmail(values.email)) errors.email = 'Please check the email address, like name@example.com.';
  if (!values.city) errors.city = 'Please enter the project city or address.';
  if (!values.service) errors.service = 'Please choose a project type.';
  return { values, errors };
}
