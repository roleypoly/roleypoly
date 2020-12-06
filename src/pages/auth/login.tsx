import { NextPageContext } from 'next';
import getConfig from 'next/config';
import * as React from 'react';
import { AuthLogin } from 'roleypoly/design-system/templates/auth-login';

const loginPage = (props: { apiRoot: string }) => {
    const onSendSecretCode = (code: string) => {
        console.log(code);
    };
    return (
        <AuthLogin
            onSendSecretCode={onSendSecretCode}
            discordOAuthLink={`${props.apiRoot}/login-bounce`}
        />
    );
};

export default loginPage;

loginPage.getInitialProps = (context: NextPageContext) => {
    const { publicRuntimeConfig } = getConfig();

    return { apiRoot: publicRuntimeConfig.apiPublicURI };
};
