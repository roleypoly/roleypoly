import { Category } from './Category';
import { Role } from './Role';
import { Member } from './User';

export type Guild = {
    id: string;
    name: string;
    icon: string;
    roles: Role[];
};

export type GuildRoles = {
    id: string;
    rolesList: Role[];
};

export type GuildData = {
    id: string;
    message: string;
    categoriesList: Category[];
    entitlementsList: string[];
};

export type PresentableGuild = {
    id: string;
    guild: Guild;
    member: Member;
    data: GuildData;
    roles: GuildRoles;
};

export type GuildEnumeration = {
    guildsList: PresentableGuild[];
};

export enum UserGuildPermissions {
    User,
    Manager,
    Admin,
}

export type GuildSlug = {
    id: string;
    name: string;
    icon: string;
    permissionLevel: UserGuildPermissions;
};
