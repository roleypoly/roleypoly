export type DiscordUser = {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  bot: boolean;
};

export type Member = {
  guildid?: string;
  roles: string[];
  nick?: string;
  user?: DiscordUser;
};

export type RoleypolyUser = {
  discorduser: DiscordUser;
};
