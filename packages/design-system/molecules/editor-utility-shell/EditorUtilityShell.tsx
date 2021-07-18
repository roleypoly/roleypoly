import { Avatar, utils as avatarUtils } from '@roleypoly/design-system/atoms/avatar';
import { BreakpointText } from '@roleypoly/design-system/atoms/breakpoints';
import { Button } from '@roleypoly/design-system/atoms/button';
import {
  Content,
  GoBack,
  HeadBox,
  Shell,
  Title,
} from '@roleypoly/design-system/molecules/editor-utility-shell/EditorUtilityShell.styled';
import { GuildSlug } from '@roleypoly/types';
import { GoCheck, GoReply } from 'react-icons/go';

export type EditorUtilityProps = {
  guildSlug: GuildSlug;
  onSubmit: <T>(output: T) => void;
  onExit: () => void;
};

export const EditorUtilityShell = (
  props: EditorUtilityProps & {
    children: React.ReactNode;
    icon: React.ReactNode;
    title: string;
    hasChanges: boolean;
  }
) => (
  <Shell>
    <HeadBox>
      <Title>
        {props.icon}
        {props.title}
      </Title>
      <GoBack>
        {props.hasChanges ? (
          <Button
            size="small"
            color="primary"
            icon={<GoCheck />}
            onClick={() => {
              props.onSubmit(undefined);
            }}
          >
            Save Changes & Exit
          </Button>
        ) : (
          <Button size="small" color="silent" icon={<GoReply />} onClick={props.onExit}>
            <BreakpointText
              large={`Go back to ${props.guildSlug.name}`}
              small="Go Back"
            />
          </Button>
        )}
        <Avatar
          hash={props.guildSlug.icon}
          src={avatarUtils.avatarHash(props.guildSlug.id, props.guildSlug.icon, 'icons')}
        >
          {avatarUtils.initialsFromName(props.guildSlug.name)}
        </Avatar>
      </GoBack>
    </HeadBox>
    <Content>{props.children}</Content>
  </Shell>
);
