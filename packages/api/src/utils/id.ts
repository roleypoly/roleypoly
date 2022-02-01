import { decodeTime, monotonicFactory } from 'ulid-workers';

const ulid = monotonicFactory();

export const getID = () => ulid();
export const dateFromID = (id: string) => decodeTime(id);
