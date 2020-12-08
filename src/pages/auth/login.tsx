import { GetServerSideProps } from 'next';
import getConfig from 'next/config';
import * as React from 'react';
import { AuthLogin } from 'roleypoly/design-system/templates/auth-login';

const loginPage = (props: { apiURI: string }) => {
    return (
        <AuthLogin
            onSendSecretCode={() => {}}
            discordOAuthLink={`${props.apiURI}/login-bounce`}
        />
    );
};

export default loginPage;

export const getServerSideProps: GetServerSideProps = async () => {
    const { publicRuntimeConfig } = getConfig();

    return {
        props: {
            apiURI: publicRuntimeConfig.apiPublicURI,
        },
        redirect: {
            destination: `${publicRuntimeConfig.apiPublicURI}/login-bounce`,
        },
    };
};
