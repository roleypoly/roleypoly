import { GetServerSidePropsContext } from 'next';
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

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { publicRuntimeConfig } = getConfig();

    return {
        props: {
            apiURI: publicRuntimeConfig.apiPublicURI,
        },
    };
};
