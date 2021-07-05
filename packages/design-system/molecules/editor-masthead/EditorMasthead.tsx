import { Avatar, utils as avatarUtils } from '@roleypoly/design-system/atoms/avatar';
import { Text } from '@roleypoly/design-system/atoms/typography';
import { PresentableGuild } from '@roleypoly/types';
import styled, { css } from 'styled-components';
import { onSmallScreen } from '../../atoms/breakpoints';

type EditorMastheadProps = {
  guild: PresentableGuild;
  onSubmit: () => void;
  onReset: () => void;
  showSaveReset: boolean;
};

const MastheadContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: start;
  padding-bottom: 0.5em;
  ${Text} {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-left: 0.5em;
  }

  ${onSmallScreen(css`
    display: none;
  `)}
`;

export const EditorMasthead = (props: EditorMastheadProps) => (
  <MastheadContainer>
    <Avatar
      size={34}
      hash={props.guild.guild.icon}
      src={avatarUtils.avatarHash(props.guild.id, props.guild.guild.icon, 'icons')}
    >
      {avatarUtils.initialsFromName(props.guild.guild.name)}
    </Avatar>
    <Text>Server Editor</Text>
  </MastheadContainer>
);
