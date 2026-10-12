const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function loadPage(savedDeadline) {
  let now = 10000000;
  let tick;
  let navigations = 0;
  const nodes = new Map();
  function node(selector) {
    if (!nodes.has(selector)) nodes.set(selector, {
      textContent: '', hidden: false, disabled: false, open: false, listeners: {},
      classList: { add() {} },
      addEventListener(name, fn) { this.listeners[name] = fn; },
      showModal() { this.open = true; }, close() { this.open = false; }
    });
    return nodes.get(selector);
  }
  let saved = savedDeadline ?? null;
  const listeners = {};
  const window = {
    localStorage: { getItem() { return saved; }, setItem(key, value) { saved = value; } },
    MISSAO_CONFIG: { checkoutUrl: 'https://example.com/checkout' },
    addEventListener(name, fn) { listeners[name] = fn; },
    dispatchEvent(event) { listeners[event.type]?.(event); },
    setInterval(fn) { tick = fn; return 1; }, clearInterval() {},
    location: { assign() { navigations++; } }
  };
  const document = {
    querySelector: node,
    querySelectorAll(selector) { return selector === '[data-buy]' ? [node('[data-buy]')] : []; },
    addEventListener() {}
  };
  class FakeDate extends Date { static now() { return now; } }
  const context = vm.createContext({ window, document, Date: FakeDate, URL, Event });
  for (const file of ['countdown.js', 'app.js']) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context);
  }
  return { node, window, advance(ms) { now += ms; }, tick() { tick?.(); }, navigations: () => navigations };
}

test('expiry updates the banner and disables the purchase button', () => {
  const page = loadPage();
  assert.equal(page.node('#countdown-value').textContent, '01:20:00');
  page.advance(80 * 60000);
  page.tick();
  assert.equal(page.node('#countdown-value').textContent, '00:00:00');
  assert.equal(page.node('[data-buy]').disabled, true);
  assert.equal(page.node('[data-buy]').textContent, 'Oferta encerrada');
  assert.equal(page.node('#countdown-status').textContent, 'Oferta encerrada.');
});

test('an expired returning visitor cannot purchase even when initial expiry event precedes app load', () => {
  const page = loadPage('1');
  assert.equal(page.node('[data-buy]').disabled, true);
  assert.equal(page.node('#countdown-value').textContent, '00:00:00');
});

test('the purchase handler checks real time even before the next timer tick', () => {
  const page = loadPage();
  page.advance(80 * 60000 + 1);
  page.node('[data-buy]').listeners.click();
  assert.equal(page.navigations(), 0);
  assert.equal(page.node('[data-buy]').disabled, true);
});
