export const initialsFromName = (name: string) =>
    name
        .split(' ')
        .slice(0, 2)
        .map((x) => x[0])
        .join('')
        .toUpperCase();

export const avatarHash = (id: string, hash: string) =>
    `https://cdn.discordapp.com/icons/${id}/${hash}.webp?size=256`;
