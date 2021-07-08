import { BreakpointText } from '@roleypoly/design-system/atoms/breakpoints';
import { Button } from '@roleypoly/design-system/atoms/button';
import { FaderOpacity } from '@roleypoly/design-system/atoms/fader';
import { GuildSlug } from '@roleypoly/types';
import { GoCheck, GoPencil } from 'react-icons/go';
import {
  IconHolder,
  MastheadAlignment,
  MastheadLeft,
  MastheadRight,
  SecondaryBase,
  TextHolder,
} from './Masthead.styled';

type SecondaryEditingProps = {
  guild: GuildSlug;
  showReset: boolean;
  onReset?: () => void;
  onSubmit?: () => void;
};

export const SecondaryEditing = (props: SecondaryEditingProps) => (
  <SecondaryBase>
    <MastheadAlignment>
      <MastheadLeft>
        <TextHolder>
          <IconHolder>
            <GoPencil />
          </IconHolder>
          <BreakpointText small="Editing..." large={`Editing ${props.guild.name}...`} />
        </TextHolder>
      </MastheadLeft>
      <MastheadRight>
        <FaderOpacity isVisible={props.showReset}>
          <Button size="small" color="silent" onClick={props.onReset}>
            Reset
          </Button>
        </FaderOpacity>
        &nbsp;&nbsp;
        <Button size="small" onClick={props.onSubmit}>
          Done <GoCheck />
        </Button>
      </MastheadRight>
    </MastheadAlignment>
  </SecondaryBase>
);
