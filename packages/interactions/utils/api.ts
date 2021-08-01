import { Category, CategorySlug } from '@roleypoly/types';
import { apiPublicURI, interactionsSharedKey } from './config';

export const apiFetch = (url: string, init: RequestInit = {}) =>
  fetch(`${apiPublicURI}${url}`, {
    ...init,
    headers: {
      ...(init.headers || {}),
      authorization: `Shared ${interactionsSharedKey}`,
    },
  });

export const getPickableRoles = async (
  guildID: string
): Promise<Record<Category['name'], CategorySlug>> => {
  const response = await apiFetch(`/interactions-pickable-roles/${guildID}`);

  if (response.status !== 200) {
    throw new Error(
      `API request failed to /interactions-pickable-roles, got code: ${response.status}`
    );
  }

  return (await response.json()) as Record<Category['name'], CategorySlug>;
};
