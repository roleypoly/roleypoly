import getConfig from 'next/config';
import * as React from 'react';
import { AuthLogin } from 'roleypoly/design-system/templates/auth-login';

const { publicRuntimeConfig } = getConfig();

const loginPage = () => {
    const onSendSecretCode = (code: string) => {
        console.log(code);
    };
    return (
        <AuthLogin
            onSendSecretCode={onSendSecretCode}
            discordOAuthLink={`${publicRuntimeConfig.apiPublicURI}/login-bounce`}
        />
    );
};

export default loginPage;
