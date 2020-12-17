import fetch from 'isomorphic-unfetch';
import { GetServerSideProps } from 'next';
import getConfig from 'next/config';
import nookies from 'nookies';
import * as React from 'react';
import { Hero } from 'roleypoly/design-system/atoms/hero';
import { AccentTitle } from 'roleypoly/design-system/atoms/typography';
import { AppShell } from 'roleypoly/design-system/organisms/app-shell';

type Props = {
    sessionID: string;
};

const Logout = (props: Props) => {
    React.useEffect(() => {
        sessionStorage.removeItem('session_key');
        location.href = '/';
    }, []);

    return (
        <AppShell>
            <Hero>
                <AccentTitle>Logging you out...</AccentTitle>
            </Hero>
        </AppShell>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { publicRuntimeConfig } = getConfig();

    const sessionKey = nookies.get(context)['rp_session_key'];
    if (!sessionKey) {
        return { props: {} };
    }
    try {
        await fetch(`${publicRuntimeConfig.apiPublicURI}/revoke-session`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${sessionKey}`,
            },
        });
    } catch (e) {}

    nookies.set(context, 'rp_session_key', '', {
        httpOnly: true,
        maxAge: 0,
        path: '/',
        sameSite: 'strict',
    });

    return { props: {} };
};

export default Logout;
