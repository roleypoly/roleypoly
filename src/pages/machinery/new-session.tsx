import { NextPageContext } from 'next';
import nookies from 'nookies';
import * as React from 'react';
import { Hero } from 'roleypoly/design-system/atoms/hero';
import { AccentTitle } from 'roleypoly/design-system/atoms/typography';
import { AppShell } from 'roleypoly/design-system/organisms/app-shell';

type Props = {
    sessionID: string;
};

const NewSession = (props: Props) => {
    const { sessionID } = props;
    React.useEffect(() => {
        sessionStorage.setItem('session_key', sessionID);

        location.href = '/';
    }, [sessionID]);

    return (
        <AppShell>
            <Hero>
                <AccentTitle>Logging you in...</AccentTitle>
            </Hero>
        </AppShell>
    );
};

export const getServerSideProps = (context: NextPageContext): { props: Props } => {
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

    return { props: { sessionID } };
};

export default NewSession;
