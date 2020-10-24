import chroma from 'chroma-js';
import * as React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { palette } from 'roleypoly/src/design-system/atoms/colors';
import {
    HalfsiesContainer,
    HalfsiesItem,
} from 'roleypoly/src/design-system/atoms/halfsies';
import { SparkleOverlay } from 'roleypoly/src/design-system/atoms/sparkle';
import { Role } from 'roleypoly/src/design-system/shared-types';
import { demoData } from 'roleypoly/src/design-system/shared-types/demoData';
import { DiscordBase, DiscordRole } from './WhyNoRoles.styled';

const adminRoles: Role[] = [
    {
        id: 'roley2',
        name: 'Admin',
        permissions: 0,
        color: chroma('hotpink').num(),
        position: -1,
        managed: true,
        safety: 0,
    },
    {
        id: 'roley3',
        name: 'Moderator',
        permissions: 0,
        color: chroma('lime').num(),
        position: -1,
        managed: true,
        safety: 0,
    },
];

const roleypolyRole: Role = {
    id: 'roley',
    name: 'Roleypoly',
    permissions: 0,
    color: chroma(palette.taupe500).num(),
    position: -1,
    managed: true,
    safety: 0,
};

const goodRoles = [...adminRoles, roleypolyRole, ...demoData];

const badRoles = [...adminRoles, ...demoData, roleypolyRole];

const MaybeWithOverlay = (props: { children: React.ReactNode; withOverlay: boolean }) => {
    if (props.withOverlay) {
        return (
            <SparkleOverlay size={-5} repeatCount={10}>
                {props.children}
            </SparkleOverlay>
        );
    } else {
        return <>{props.children}</>;
    }
};

const Example = (props: { roles: Role[]; isGood: boolean }) => (
    <div>
        <DiscordBase>
            {props.roles.map((r) => (
                <MaybeWithOverlay withOverlay={props.isGood && r.name === 'Roleypoly'}>
                    <DiscordRole discordRole={r} isRoleypoly={r.name === 'Roleypoly'}>
                        {r.name}
                    </DiscordRole>
                </MaybeWithOverlay>
            ))}
        </DiscordBase>
    </div>
);

export const WhyNoRoles = () => (
    <HalfsiesContainer>
        <HalfsiesItem>
            <FaCheck /> Good
            <Example isGood roles={goodRoles} />
        </HalfsiesItem>
        <HalfsiesItem>
            <FaTimes /> Baddd
            <Example isGood={false} roles={badRoles} />
        </HalfsiesItem>
    </HalfsiesContainer>
);
