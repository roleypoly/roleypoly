import { Category } from './Category';
import { Role } from './Role';
import { Member } from './User';

export type Guild = {
  id: string;
  name: string;
  icon: string;
  roles: Role[];
};

export enum Features {
  None = 0,
  Preview = None,
  LegacyGuild = 1 << 1,
}

export type GuildData = {
  id: string;
  message: string;
  categories: Category[];
  features: Features;
};

export type GuildDataUpdate = Omit<Omit<GuildData, 'features'>, 'id'>;

export type PresentableGuild = {
  id: string;
  guild: GuildSlug;
  member: Member;
  data: GuildData;
  roles: Role[];
};

export type GuildEnumeration = {
  guilds: PresentableGuild[];
};

export enum UserGuildPermissions {
  User,
  Manager = 1 << 1,
  Admin = 1 << 2,
}

export type GuildSlug = {
  id: string;
  name: string;
  icon: string;
  permissionLevel: UserGuildPermissions;
};
