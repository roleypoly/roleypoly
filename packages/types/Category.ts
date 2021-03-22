export enum CategoryType {
  Multi = 0,
  Single = 1,
}

export type Category = {
  id: string;
  name: string;
  roles: string[];
  hidden: boolean;
  type: CategoryType;
  position: number;
};
