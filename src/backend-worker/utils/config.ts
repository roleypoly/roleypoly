const self = (global as any) as Record<string, string>;

const safeURI = (x: string) => x.replace(/\/$/, '');
const list = (x: string) => x.split(',');

export const botClientID = self.BOT_CLIENT_ID;
export const botClientSecret = self.BOT_CLIENT_SECRET;
export const uiPublicURI = safeURI(self.UI_PUBLIC_URI);
export const apiPublicURI = safeURI(self.API_PUBLIC_URI);
export const rootUsers = list(self.ROOT_USERS);
export const kvPrefix = self.KV_PREFIX;
