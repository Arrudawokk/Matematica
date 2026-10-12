const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createOfferClock, formatRemaining, STORAGE_KEY, DURATION } = require('../countdown.js');

function memoryStorage() {
  const data = new Map();
  return { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: key => data.delete(key) };
}

test('starts at 80 minutes and preserves the deadline after reload and a closed tab', () => {
  let now = 10000000;
  const storage = memoryStorage();
  const first = createOfferClock(storage, () => now);
  assert.equal(formatRemaining(first.remaining()), '01:20:00');
  now += 125000;
  assert.equal(formatRemaining(first.remaining()), '01:17:55');
  const reloaded = createOfferClock(storage, () => now);
  assert.equal(reloaded.remaining(), DURATION - 125000);
  now += 3600000;
  assert.equal(formatRemaining(createOfferClock(storage, () => now).remaining()), '00:17:55');
});

test('absolute time catches up after a suspended tab and never goes below zero or restarts', () => {
  let now = 10000000;
  const storage = memoryStorage();
  const clock = createOfferClock(storage, () => now);
  now += DURATION + 90000;
  assert.equal(clock.remaining(), 0);
  assert.equal(formatRemaining(clock.remaining()), '00:00:00');
  assert.equal(createOfferClock(storage, () => now).remaining(), 0);
});

test('tabs share the earliest deadline, including a simultaneous initialization', () => {
  let now = 10000000;
  const storage = memoryStorage();
  const first = createOfferClock(storage, () => now);
  now += 1000;
  const second = createOfferClock(storage, () => now);
  assert.equal(first.remaining(), second.remaining());
  storage.setItem(STORAGE_KEY, String(now + 1000));
  assert.equal(first.remaining(), 1000);
  assert.equal(second.remaining(), 1000);
  storage.setItem(STORAGE_KEY, String(now + DURATION));
  assert.equal(first.remaining(), 1000);
  assert.equal(second.remaining(), 1000);
});

test('a running tab retains its deadline if stored data is removed', () => {
  let now = 10000000;
  const storage = memoryStorage();
  const clock = createOfferClock(storage, () => now);
  now += 5000;
  storage.removeItem(STORAGE_KEY);
  assert.equal(clock.remaining(), DURATION - 5000);
  assert.equal(createOfferClock(storage, () => now).remaining(), DURATION - 5000);
});

test('unavailable storage does not create a countdown that would reset on reload', () => {
  const denied = { getItem() { throw new Error('blocked'); } };
  assert.equal(createOfferClock(denied).available, false);
  assert.equal(createOfferClock(null).remaining(), null);
});

test('invalid saved data is treated as expired instead of granting a new deadline', () => {
  const storage = memoryStorage();
  storage.setItem(STORAGE_KEY, 'invalid');
  assert.equal(createOfferClock(storage).remaining(), 0);
});

test('format handles second and minute boundaries without showing zero early', () => {
  assert.equal(formatRemaining(500), '00:00:01');
  assert.equal(formatRemaining(60000), '00:01:00');
  assert.equal(formatRemaining(3600000), '01:00:00');
});
