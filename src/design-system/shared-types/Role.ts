export enum RoleSafety {
    SAFE = 0,
    HIGHERTHANBOT,
    DANGEROUSPERMISSIONS,
}

export type Role = {
    id: string;
    name: string;
    color: number;
    permissions: number;
    managed: boolean;
    position: number;
    safety: RoleSafety;
};
