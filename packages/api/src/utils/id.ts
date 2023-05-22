import { decodeTime, ulid } from 'ulid-workers';

export const getID = () => ulid();
export const dateFromID = (id: string) => decodeTime(id);
