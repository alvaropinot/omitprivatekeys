const test = require('tape');
const omitPrivateKeys = require('../');

test('omitPrivateKeys must be defined', t => {
  t.equal(typeof omitPrivateKeys, 'function', 'should be a function');
  t.end();
});

test('if convention is defined and is not an instance of RegExp', t => {
  const obj = { a : 1, _b : 2 };
  var wrongConventions = ['', 1, false, null, {}];

  wrongConventions.forEach(function (elm) {
    t.throws(() => omitPrivateKeys(obj, elm), undefined, 'Should throw an error if convention is ' + typeof elm);
  })
  t.end();
});

test('if convention is an instance of RegExp', t => {
    const obj = { a : 1, _b : 2 };
    // ok
    t.doesNotThrow(() => omitPrivateKeys(obj, new RegExp('^\$\$')));
    t.end();
});

test('if no convention passed should clean keys preceeded with `_`', t => {
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

test('if no convention passed should not clean keys containing `_` other positions than start', t => {
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

test('if convention is passed should clean keys that match the RegExp', t => {
  const obj = {
    _foo: 'foo',
    $$bar: 'bar',
    bar$$ : 'isFine',
    a: 2,
    b: 'b',
    c: true,
    $$cuba : 1
  };
  const actual = omitPrivateKeys(obj, /^\$\$/);

  const expected = {
    _foo: 'foo',
    bar$$ : 'isFine',
    a: 2,
    b: 'b',
    c: true
  };

  t.deepEqual(
    actual, expected,
    'should return a object without keys matched by `/^\\$\\$/`'
  );
  t.end();
});
