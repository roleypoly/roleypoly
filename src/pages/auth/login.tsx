import * as React from 'react';
import { AuthLogin } from 'roleypoly/design-system/templates/auth-login';

const loginPage = () => {
    const onSendSecretCode = (code: string) => {
        console.log(code);
    };
    return (
        <AuthLogin
            onSendSecretCode={onSendSecretCode}
            discordOAuthLink="http://localhost:6600/login-bounce"
        />
    );
};

export default loginPage;
