import NextApp, { AppContext, AppProps } from 'next/app';
import * as React from 'react';
import { InjectTypekitFont } from 'roleypoly/design-system/atoms/fonts';
import nookies from 'nookies';
import { AuthProvider } from 'roleypoly/providers/auth/AuthContext';

type Props = AppProps & {
    sessionKey: string | null;
};

const App = (props: Props) => (
    <>
        <InjectTypekitFont />
        <AuthProvider sessionKey={props.sessionKey}>
            <props.Component {...props.pageProps} />
        </AuthProvider>
    </>
);
export default App;

export const getInitialProps = async (context: AppContext) => {
    let sessionKey: string | null = null;

    if (context.ctx.req) {
        const key = nookies.get(context.ctx)['rp_session_key'];
        if (key) {
            sessionKey = key;
        }
    } else {
        sessionKey = sessionStorage.getItem('session_key');
    }

    const pageProps = await NextApp.getInitialProps(context);

    return { ...pageProps, sessionKey };
};
