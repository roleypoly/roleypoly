export const initialsFromName = (name: string) =>
    name
        .split(' ')
        .slice(0, 2)
        .map((x) => x[0])
        .join('')
        .toUpperCase();
