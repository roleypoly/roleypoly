import { NextPageContext } from 'next';
import getConfig from 'next/config';
import * as React from 'react';
import { AuthLogin } from 'roleypoly/design-system/templates/auth-login';

const { publicRuntimeConfig } = getConfig();

const loginPage = (props: { apiRoot: string }) => {
    const onSendSecretCode = (code: string) => {
        console.log(code);
    };
    return (
        <AuthLogin
            onSendSecretCode={onSendSecretCode}
            discordOAuthLink={`${
                props.apiRoot || publicRuntimeConfig.apiPublicURI
            }/login-bounce`}
        />
    );
};

export default loginPage;

loginPage.getInitialProps = (context: NextPageContext) => {
    return { apiRoot: publicRuntimeConfig.apiPublicURI };
};
