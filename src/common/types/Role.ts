export enum RoleSafety {
    SAFE = 0,
    HIGHERTHANBOT,
    DANGEROUSPERMISSIONS,
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
