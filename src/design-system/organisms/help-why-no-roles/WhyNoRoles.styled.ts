import styled, { css } from 'styled-components';
import { palette, numberToChroma } from 'roleypoly/design-system/atoms/colors';
import { Role } from 'roleypoly/common/types';

export const DiscordBase = styled.div`
    background-color: ${palette.discord100};
    border: solid 1px rgba(0, 0, 0, 0.15);
    border-radius: 3px;
    padding: 10px;
    user-select: none;
    width: 250px;
`;

const hover = (roleColor: string) => css`
    color: #efefef;
    background-color: ${roleColor};
    cursor: pointer;
`;

export const DiscordRole = styled.div<{
    discordRole: Role;
    isRoleypoly: boolean;
}>`
    padding: 6px 10px;
    color: ${(props) => numberToChroma(props.discordRole.color).css()};
    border-radius: 3px;

    :hover {
        ${(props) => hover(numberToChroma(props.discordRole.color).alpha(0.5).css())}
    }

    ${(props) =>
        props.isRoleypoly &&
        hover(numberToChroma(props.discordRole.color).alpha(0.5).css())}
`;
