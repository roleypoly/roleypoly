export const getQuery = (request: Request): { [x: string]: string } => {
  const output: { [x: string]: string } = {};

  for (let [key, value] of new URL(request.url).searchParams.entries()) {
    output[key] = value;
  }

  return output;
};

export const formData = (obj: Record<string, any>): string => {
  return Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');
};
