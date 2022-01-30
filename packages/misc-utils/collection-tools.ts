export const difference = <T>(...arrays: T[][]) => {
  return arrays.reduce((a, b) => a.filter((v) => !b.includes(v)));
};

export const groupBy = (arr: Record<string, any>[], key: string) => {
  return arr.reduce((r, a) => {
    r[a[key]] = [...r[a[key]], a];
    return r;
  }, {});
};

export const keyBy = (arr: Record<string, any>[], key: string) => {
  return arr.reduce((r, a) => {
    r[a[key]] = a;
    return r;
  }, {});
};

export const union = <T>(...arrays: T[][]) => {
  return arrays.reduce((a, b) => [...a, ...b]);
};

export const isIdenticalArray = <T>(a1: T[], a2: T[]) => {
  // DEIs: http://stackoverflow.com/a/40496893/308645
  return a1.length === a2.length && a1.reduce((a, b) => a && a2.includes(b), true);
};
