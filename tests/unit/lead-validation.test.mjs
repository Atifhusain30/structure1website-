import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadTs } from '../helpers/load-ts.mjs';

const { validateLead } = await loadTs('src/lib/lead-validation.ts');

const good = { name: '  Pat  Homeowner ', phone: '214-555-0123', email: ' pat@example.com ', city: ' Plano ', service: 'Patio Covers', timeline: '', message: '  hi  ' };

test('a complete, normal submission has no errors and is trimmed', () => {
  const { values, errors } = validateLead(good);
  assert.deepEqual(errors, {});
  assert.equal(values.name, 'Pat Homeowner');
  assert.equal(values.email, 'pat@example.com');
  assert.equal(values.city, 'Plano');
  assert.equal(values.message, 'hi');
});

test('common US phone formats are accepted and normalized', () => {
  for (const phone of ['2145550123', '(214) 555-0123', '214.555.0123', '214 555 0123', '+1 214 555 0123', '1-214-555-0123', '+1 (214) 555-0123']) {
    const { values, errors } = validateLead({ ...good, phone });
    assert.equal(errors.phone, undefined, `rejected ${phone}`);
    assert.equal(values.phone, '(214) 555-0123', `normalized ${phone}`);
  }
});

test('a phone extension is kept, not rejected', () => {
  const { values, errors } = validateLead({ ...good, phone: '214-555-0123 ext. 45' });
  assert.equal(errors.phone, undefined);
  assert.equal(values.phone, '(214) 555-0123 ext. 45');
});

test('phone numbers that cannot be a US number are rejected', () => {
  for (const phone of ['555-0123', '214-555-01234', '+44 20 7946 0958', 'call me', '123-456-7890', '214-055-0123', '2']) {
    assert.ok(validateLead({ ...good, phone }).errors.phone, `accepted ${phone}`);
  }
});

test('malformed emails are rejected; ordinary ones accepted', () => {
  for (const email of ['pat', 'pat@', 'pat@example', '@example.com', 'pat @example.com', 'pat@@example.com', 'pat@example.c']) {
    assert.ok(validateLead({ ...good, email }).errors.email, `accepted ${email}`);
  }
  for (const email of ['pat.o+patio@mail.example.co', 'PAT@EXAMPLE.COM', 'p_o-x@sub.domain.org']) {
    assert.equal(validateLead({ ...good, email }).errors.email, undefined, `rejected ${email}`);
  }
});

test('whitespace-only required fields are reported per field', () => {
  const { errors } = validateLead({ name: '   ', phone: ' ', email: '', city: '\t', service: '' });
  assert.deepEqual(Object.keys(errors).sort(), ['city', 'email', 'name', 'phone', 'service']);
});

test('timeline and message stay optional', () => {
  const { errors } = validateLead({ ...good, timeline: undefined, message: undefined });
  assert.deepEqual(errors, {});
});
