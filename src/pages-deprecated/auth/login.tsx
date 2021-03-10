import { AuthLogin } from '@roleypoly/design-system/templates/auth-login';
import { GetServerSideProps } from 'next';
import getConfig from 'next/config';
import Head from 'next/head';
import * as React from 'react';
import { GuildSlug } from 'roleypoly/common/types';
import { apiFetch } from 'roleypoly/common/utils/isomorphicFetch';

const loginPage = (props: { apiURI: string; guildSlug?: GuildSlug }) => {
    React.useEffect(() => {
        if (props.guildSlug) {
            sessionStorage.setItem('redirectAfterNewSession', `/s/${props.guildSlug.id}`);
        }
    }, [props.guildSlug]);

    return (
        <>
            <Head>
                <title>
                    {props.guildSlug
                        ? `Logging into ${props.guildSlug.name}... - Roleypoly`
                        : `Logging in... - Roleypoly`}
                </title>
            </Head>
            <AuthLogin
                onSendSecretCode={() => 0}
                discordOAuthLink={`${props.apiURI}/login-bounce`}
                guildSlug={props.guildSlug}
            />
        </>
    );
};

export default loginPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { publicRuntimeConfig } = getConfig();

    try {
        const guildID = context.query['r'];
        console.log({ guildID });
        if (guildID) {
            const guildSlug = await apiFetch<GuildSlug>(
                `/get-slug/${guildID}`,
                {},
                context as any
            );

            if (guildSlug) {
                return {
                    props: {
                        apiURI: publicRuntimeConfig.apiPublicURI,
                        guildSlug,
                    },
                };
            }
        }
    } catch (e) {
        // Do nothing.
    }

    return {
        props: {
            apiURI: publicRuntimeConfig.apiPublicURI,
        },
        redirect: {
            destination: `${publicRuntimeConfig.apiPublicURI}/login-bounce`,
        },
    };
};
