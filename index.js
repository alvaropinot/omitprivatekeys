/**
 * Picks objects keys by applying a predicate function.
 * @param  {Function} predicate The function applied for each key.
 * @return {Function} Returns the partially applied function.
 */
function pickKeysBy (predicate) {
  return function (originalObject) {
    return Object.keys(originalObject)
      .reduce((finalObject, key) => {
        predicate(key) && (finalObject[key] = originalObject[key]);
        return finalObject;
      },
    {});
  };
}

// Check if a given key starts with `_`.
const _isNotPrivate = key => key[0] !== '_';
const omitPrivateKeys = pickKeysBy(_isNotPrivate);

module.exports = omitPrivateKeys;
