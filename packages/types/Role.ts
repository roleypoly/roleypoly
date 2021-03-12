export enum RoleSafety {
    Safe = 0,
    HigherThanBot = 1 << 1,
    DangerousPermissions = 1 << 2,
    ManagedRole = 1 << 3,
}

export type Role = {
    id: string;
    name: string;
    color: number;
    managed: boolean;
    position: number;
    safety: RoleSafety;
    /** Permissions is should be used as a BigInt, NOT a number. */
    permissions: string;
};

export type OwnRoleInfo = {
    highestRolePosition: number;
};

export enum TransactionType {
    None = 0,
    Remove = 1 << 1,
    Add = 1 << 2,
}

export type RoleTransaction = {
    id: string;
    action: TransactionType;
};

export type RoleUpdate = {
    knownState: Role['id'][];
    transactions: RoleTransaction[];
};
