import { Button } from '@roleypoly/design-system/atoms/button';
import { PreauthGreeting } from '@roleypoly/design-system/molecules/preauth-greeting';
import * as React from 'react';
import { FaDiscord } from 'react-icons/fa';
import styled from 'styled-components';
import { GuildSlug } from '../../../../src/common/types';

export type PreauthProps = {
    guildSlug?: GuildSlug;
    onSendSecretCode: (code: string) => void;
    botName?: string;
    discordOAuthLink?: string;
};

const Centered = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 90vw;
    margin: 0 auto;
`;

const WidthContainer = styled.div`
    width: 20em;
    max-width: 90vw;
`;

export const Preauth = (props: PreauthProps) => {
    return (
        <Centered>
            {props.guildSlug && <PreauthGreeting guildSlug={props.guildSlug} />}
            <WidthContainer>
                <a href={props.discordOAuthLink || '#'}>
                    <Button
                        color="discord"
                        icon={
                            <div style={{ position: 'relative', top: 3 }}>
                                <FaDiscord />
                            </div>
                        }
                    >
                        Sign in with Discord
                    </Button>
                </a>
            </WidthContainer>
        </Centered>
    );
};
