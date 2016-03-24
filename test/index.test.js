const test = require('tape');
const omitPrivateKeys = require('../');

test('omitPrivateKeys must be defined', t => {
  t.equal(typeof omitPrivateKeys, 'function', 'should be a function');
  t.end();
});

test('should clean keys preceeded with `_`', t => {
  const obj = {
    _foo: 'foo',
    _bar: 'bar',
    a: 2,
    b: 'b',
    c: true
  };
  const actual = omitPrivateKeys(obj);
  const expected = {
    a: 2,
    b: 'b',
    c: true
  };

  t.deepEqual(
    actual, expected,
    'should return a object without keys preceeded by `_`'
  );
  t.end();
});

test('should not clean keys containing `_` other positions than start', t => {
  // Disable eslint rule for this test only.
  /* eslint camelcase:[0] */
  const obj = {
    f_o_o: 3,
    a_: 2,
    _bar: 'bar'
  };
  const actual = omitPrivateKeys(obj);
  const expected = {
    f_o_o: 3,
    a_: 2
  };

  t.deepEqual(
    actual, expected,
    'should return a object with keys containing `_`'
  );
  t.end();
});
