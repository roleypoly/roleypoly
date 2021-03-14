export const initialsFromName = (name: string) =>
  !!name
    ? name
        .split(' ')
        .slice(0, 2)
        .map((x) => x[0])
        .join('')
        .toUpperCase()
    : '';

export const avatarHash = (
  id: string,
  hash: string,
  bucket: 'icons' | 'avatars' = 'icons',
  size: number = 256
) => `https://cdn.discordapp.com/${bucket}/${id}/${hash}.webp?size=${size}`;
