export enum CategoryType {
  Single = 0,
  Multi,
}

export type Category = {
  id: string;
  name: string;
  roles: string[];
  hidden: boolean;
  type: CategoryType;
  position: number;
};
