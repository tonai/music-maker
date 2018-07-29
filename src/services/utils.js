export function createIncrementArray(length) {
  return Array.apply(null, new Array(length)).map((value, index) => index);
}
