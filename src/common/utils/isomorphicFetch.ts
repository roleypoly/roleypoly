import { NextPageContext } from 'next';
import getConfig from 'next/config';
import nookies from 'nookies';
import useSWR from 'swr';

export const getPublicURI = (context?: NextPageContext) => {
    if (context?.req) {
        const { publicRuntimeConfig } = getConfig();
        return publicRuntimeConfig.apiPublicURI;
    } else {
        return typeof localStorage !== 'undefined' && localStorage.getItem('api_uri');
    }
};

export const getSessionKey = (context?: NextPageContext) => {
    if (context?.req) {
        return nookies.get(context)['rp_session_key'];
    } else {
        return (
            typeof sessionStorage !== 'undefined' && sessionStorage.getItem('session_key')
        );
    }
};

export const apiFetch = async <T>(
    path: string,
    init?: RequestInit,
    context?: NextPageContext
): Promise<T | null> => {
    const sessionKey = getSessionKey(context);

    const authorizedInit: RequestInit = {
        ...(init || {}),
        headers: {
            ...(init?.headers || {}),
            authorization: sessionKey ? `Bearer ${sessionKey}` : '',
        },
    };

    const response = await fetch(`${getPublicURI(context)}${path}`, authorizedInit);

    if (response.status >= 400) {
        const reason = (await response.json())['error'];
        throw new Error(`Fetch failed: ${reason}`);
    }

    return response.json() as Promise<T>;
};

export const swrFetch = <T>(path: string, context?: NextPageContext) =>
    useSWR<T>(path, (url: string): Promise<any> => apiFetch<T>(url, undefined, context), {
        revalidateOnFocus: false,
    });
