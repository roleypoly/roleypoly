import { NextPageContext } from 'next';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import * as React from 'react';
import { Hero } from 'roleypoly/design-system/atoms/hero';
import { AccentTitle } from 'roleypoly/design-system/atoms/typography';
import { AppShell } from 'roleypoly/design-system/organisms/app-shell';

type Props = {
    sessionID: string;
    apiURI: string;
};

const NewSession = (props: Props) => {
    const { sessionID, apiURI } = props;
    const router = useRouter();

    React.useEffect(() => {
        sessionStorage.setItem('session_key', sessionID);
        localStorage.setItem('api_uri', apiURI);

        const nextURL = sessionStorage.getItem('redirectAfterNewSession') || '/servers';
        sessionStorage.removeItem('redirectAfterNewSession');
        void router.replace(nextURL);
    }, [sessionID, apiURI]);

    return (
        <AppShell>
            <Hero>
                <AccentTitle>Logging you in...</AccentTitle>
            </Hero>
        </AppShell>
    );
};

export const getServerSideProps = async (
    context: NextPageContext
): Promise<{ props: Props }> => {
    const { publicRuntimeConfig } = getConfig();
    const apiURI = publicRuntimeConfig.apiPublicURI;
    const sessionID = context.query.session_id as string;
    if (!sessionID) {
        throw new Error("I shouldn't be here today.");
    }

    nookies.set(context, 'rp_session_key', sessionID, {
        httpOnly: true,
        maxAge: 60 * 60 * 6,
        path: '/',
        sameSite: 'strict',
    });

    return { props: { sessionID, apiURI } };
};

export default NewSession;
