const self = global as any as Record<string, string>;

const env = (key: string) => self[key] ?? '';

const safeURI = (x: string) => x.replace(/\/$/, '');
const list = (x: string) => x.split(',');

export const uiPublicURI = safeURI(env('UI_PUBLIC_URI'));
export const apiPublicURI = safeURI(env('API_PUBLIC_URI'));
export const publicKey = safeURI(env('DISCORD_PUBLIC_KEY'));
export const interactionsSharedKey = env('INTERACTIONS_SHARED_KEY');
