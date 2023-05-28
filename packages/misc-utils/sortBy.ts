export const sortBy = <T, Key extends keyof T>(
  array: T[],
  key: Key,
  predicate?: (a: T[typeof key], b: T[typeof key]) => number,
  reverse?: boolean
) => {
  let postmultiplier = reverse ? -1 : 1;

  return array.sort((a, b) => {
    if (predicate) {
      return predicate(a[key], b[key]);
    }

    if (a[key] === b[key]) {
      return 0;
    }

    if (a[key] > b[key]) {
      return 1 * postmultiplier;
    }

    return -1 * postmultiplier;
  });
};
