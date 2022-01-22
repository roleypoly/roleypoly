const self = global as any as Record<string, string>;

const env = (key: string) => self[key] ?? '';

const safeURI = (x: string) => x.replace(/\/$/, '');
const list = (x: string) => x.split(',');

export const botClientID = env('BOT_CLIENT_ID');
export const botClientSecret = env('BOT_CLIENT_SECRET');
export const botToken = env('BOT_TOKEN');
export const uiPublicURI = safeURI(env('UI_PUBLIC_URI'));
export const apiPublicURI = safeURI(env('API_PUBLIC_URI'));
export const rootUsers = list(env('ROOT_USERS'));
export const allowedCallbackHosts = list(env('ALLOWED_CALLBACK_HOSTS'));
export const importSharedKey = env('BOT_IMPORT_TOKEN');
export const interactionsSharedKey = env('INTERACTIONS_SHARED_KEY');
export const roleypolyServerID = env('RP_SERVER_ID');
export const roleypolyHelperRoleIDs = list(env('RP_HELPER_ROLE_IDS'));
