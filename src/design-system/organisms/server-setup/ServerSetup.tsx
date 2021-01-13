import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { FaDiscord } from 'react-icons/fa';
import { GoArrowLeft } from 'react-icons/go';
import { GuildSlug, UserGuildPermissions } from 'roleypoly/common/types';
import { evaluatePermission } from 'roleypoly/common/utils/hasPermission';
import { Avatar, utils } from 'roleypoly/design-system/atoms/avatar';
import { Button } from 'roleypoly/design-system/atoms/button';
import { DotOverlay } from 'roleypoly/design-system/atoms/dot-overlay';
import { Hero } from 'roleypoly/design-system/atoms/hero';
import { AccentTitle, SmallTitle } from 'roleypoly/design-system/atoms/typography';
import { FlexLine, FlexWrap } from './ServerSetup.styled';

export type ServerSetupProps = {
    guildSlug: GuildSlug;
};

export const ServerSetup = (props: ServerSetupProps) => (
    <>
        <DotOverlay />
        <Hero>
            <FlexWrap>
                <FlexLine>
                    <div>
                        <Avatar
                            hash={props.guildSlug.icon}
                            src={utils.avatarHash(
                                props.guildSlug.id,
                                props.guildSlug.icon,
                                'icons'
                            )}
                        >
                            {utils.initialsFromName(props.guildSlug.name)}
                        </Avatar>
                    </div>
                    <div>
                        <SmallTitle>
                            &nbsp;&nbsp;Roleypoly isn't in {props.guildSlug.name}
                        </SmallTitle>
                    </div>
                </FlexLine>
                {renderMessage(props.guildSlug)}
            </FlexWrap>
        </Hero>
    </>
);

const renderMessage = ({ id, permissionLevel, name }: GuildSlug) => {
    if (evaluatePermission(permissionLevel, UserGuildPermissions.Admin)) {
        return adminMessage(id);
    } else if (evaluatePermission(permissionLevel, UserGuildPermissions.Manager)) {
        return managerMessage(id);
    } else {
        return userMessage(name);
    }
};

const adminMessage = (id: string) => (
    <>
        <FlexLine>
            <AccentTitle>
                You're an admin of this server, click the button to get started!
            </AccentTitle>
        </FlexLine>
        <FlexLine>
            <div>
                <Link href={`/machinery/bot-join?id=${id}`}>
                    <a>
                        <Button color="discord" icon={<FaDiscord />}>
                            Add Roleypoly
                        </Button>
                    </a>
                </Link>
            </div>
        </FlexLine>
    </>
);

const managerMessage = (id: string) => (
    <>
        <FlexLine>
            <AccentTitle>
                You might have the permissions to add it to the server.
            </AccentTitle>
        </FlexLine>
        <FlexLine>
            <div>
                <Link href={`/machinery/bot-join?id=${id}`}>
                    <a>
                        <Button color="discord" icon={<FaDiscord />}>
                            Add Roleypoly
                        </Button>
                    </a>
                </Link>
            </div>
        </FlexLine>
    </>
);

const userMessage = (name: string) => {
    const router = useRouter();
    return (
        <>
            <FlexLine>
                <AccentTitle>
                    If you think this is a mistake, please contact staff for {name}.
                </AccentTitle>
            </FlexLine>
            <FlexLine>
                <Button
                    onClick={() => {
                        void router.push('/');
                    }}
                    color="muted"
                    size="small"
                    icon={<GoArrowLeft />}
                >
                    Go back
                </Button>
            </FlexLine>
        </>
    );
};
