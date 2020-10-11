export const sortBy = <T>(
    array: T[],
    key: keyof T,
    predicate?: (a: T[keyof T], b: T[keyof T]) => number
) => {
    return array.sort((a, b) => {
        if (predicate) {
            return predicate(a[key], b[key]);
        }

        if (a[key] === b[key]) {
            return 0;
        }

        if (a[key] > b[key]) {
            return 1;
        }

        return -1;
    });
};
