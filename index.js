/**
 * Picks objects keys by applying a predicate function.
 * @param  {Function} predicate The function applied for each key.
 * @return {Object} Returns the objects key.
 */
function pickKeysBy (originalObject, predicate) {
  return Object.keys(originalObject)
    .reduce((finalObject, key) => {
      predicate(key) && (finalObject[key] = originalObject[key]);
      return finalObject;
    },
  {});
}

const omitPrivateKeys = function (originalObject, convention) {
  var newObj;
  if (convention === undefined) {
    newObj = pickKeysBy(originalObject, (key) => key[0] !== '_');// Check if a given key starts with `_`.
  }
  else if (convention instanceof RegExp) {
    newObj = pickKeysBy(originalObject, (key) => !convention.test(key));//Check if key match with convention
  }
  else {
    throw new Error('convention argument must be an instace of RegExp if defined');
  }
  return newObj;
};

module.exports = omitPrivateKeys;
