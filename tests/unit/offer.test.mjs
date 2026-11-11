import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadTs } from '../helpers/load-ts.mjs';

const { offerNotice, serviceForOffer } = await loadTs('src/lib/offer.ts');
const { buildLeadEntries } = await loadTs('src/lib/lead-payload.ts');
const SERVICES = ['Patio Covers', 'Outdoor Living', 'Concrete', 'Other'];

test('the offer notice shows while the project type is unset or matches the offer', () => {
  assert.equal(offerNotice('patio-kitchen', ''), 'Patio cover + outdoor kitchen');
  assert.equal(offerNotice('patio-kitchen', 'Outdoor Living'), 'Patio cover + outdoor kitchen');
  assert.equal(offerNotice('patio-cover', 'Patio Covers'), 'Patio cover');
});

test('the offer notice disappears once the visitor picks a different project type', () => {
  assert.equal(offerNotice('patio-kitchen', 'Concrete'), null);
  assert.equal(offerNotice('patio-kitchen', 'Patio Covers'), null);
  assert.equal(offerNotice('patio-cover', 'Other'), null);
});

test('no notice without a known offer', () => {
  assert.equal(offerNotice(undefined, ''), null);
  assert.equal(offerNotice('free-kitchen', ''), null);
});

test('on first load an offer fills an empty project type but never overwrites one already chosen', () => {
  assert.equal(serviceForOffer({ previous: undefined, next: 'patio-kitchen', current: '', initial: true, available: SERVICES }), 'Outdoor Living');
  assert.equal(serviceForOffer({ previous: undefined, next: 'patio-kitchen', current: 'Concrete', initial: true, available: SERVICES }), 'Concrete');
});

test('following a link to a different offer switches the project type to match it', () => {
  assert.equal(serviceForOffer({ previous: 'patio-cover', next: 'patio-kitchen', current: 'Patio Covers', initial: false, available: SERVICES }), 'Outdoor Living');
  assert.equal(serviceForOffer({ previous: undefined, next: 'patio-cover', current: '', initial: false, available: SERVICES }), 'Patio Covers');
});

test('navigation that keeps the same offer (or drops it) leaves a manual choice alone', () => {
  assert.equal(serviceForOffer({ previous: 'patio-kitchen', next: 'patio-kitchen', current: 'Concrete', initial: false, available: SERVICES }), 'Concrete');
  assert.equal(serviceForOffer({ previous: 'patio-kitchen', next: undefined, current: 'Concrete', initial: false, available: SERVICES }), 'Concrete');
});

test('an offer whose service is not in the list does not change the selection', () => {
  assert.equal(serviceForOffer({ previous: undefined, next: 'patio-kitchen', current: '', initial: true, available: ['Concrete'] }), '');
});

const values = { name: 'Pat Homeowner', phone: '(214) 555-0123', email: 'pat@example.com', city: 'Plano', service: 'Concrete', timeline: '', message: '' };

test('the selected service is authoritative: a conflicting ad offer is not named in the subject', () => {
  const m = new Map(buildLeadEntries({ values, photos: [], botField: '', attribution: { offer: 'patio-kitchen', utm_source: 'facebook' }, formPage: '/estimate' }));
  assert.equal(m.get('subject'), 'New Estimate Lead: Pat Homeowner — Concrete');
  assert.equal(m.get('service'), 'Concrete');
  assert.equal(m.get('offer'), 'patio-kitchen', 'the originating offer is still kept for sales attribution');
  assert.equal(m.get('utm_source'), 'facebook');
});

test('a matching offer is still named in the subject', () => {
  const m = new Map(buildLeadEntries({ values: { ...values, service: 'Outdoor Living' }, photos: [], botField: '', attribution: { offer: 'patio-kitchen' }, formPage: '/estimate' }));
  assert.equal(m.get('subject'), 'New Estimate Lead: Pat Homeowner — Outdoor Living (Patio cover + outdoor kitchen)');
});
