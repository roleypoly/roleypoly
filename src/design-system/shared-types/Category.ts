export enum CategoryType {
    SINGLE = 0,
    MULTI,
}

export type Category = {
    id: string;
    name: string;
    rolesList: string[];
    hidden: boolean;
    type: CategoryType;
    position: number;
};
