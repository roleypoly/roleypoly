import { decodeTime, ulidFactory } from 'ulid-workers';

const ulid = ulidFactory();

export const getID = () => ulid();
export const dateFromID = (id: string) => decodeTime(id);
