import { userAgent } from './api';

export const discordAPIBase = 'https://discordapp.com/api/v9';

export enum AuthType {
  Bearer = 'Bearer',
  Bot = 'Bot',
}

export const discordFetch = async <T>(
  url: string,
  auth: string,
  authType: AuthType = AuthType.Bearer,
  init?: RequestInit
): Promise<T | null> => {
  const response = await fetch(discordAPIBase + url, {
    ...(init || {}),
    headers: {
      ...(init?.headers || {}),
      authorization: `${AuthType[authType]} ${auth}`,
      'user-agent': userAgent,
    },
  });

  if (response.status >= 400) {
    console.error('discordFetch failed', {
      url,
      authType,
      payload: await response.text(),
    });
  }

  if (response.ok) {
    return (await response.json()) as T;
  } else {
    return null;
  }
};
