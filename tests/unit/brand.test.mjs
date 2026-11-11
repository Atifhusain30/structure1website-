import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadTs } from '../helpers/load-ts.mjs';

const { company } = await loadTs('src/content/company.ts');

test('the public business name is Structure1 Builds', () => {
  assert.equal(company.name, 'Structure1 Builds');
});

test('the authorized inbox is the configured company email', () => {
  assert.equal(company.email, 'samuel.c.w.allison@gmail.com');
});
