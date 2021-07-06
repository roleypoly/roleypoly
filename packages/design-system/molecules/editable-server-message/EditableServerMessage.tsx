import { palette } from '@roleypoly/design-system/atoms/colors';
import { FaderOpacity } from '@roleypoly/design-system/atoms/fader';
import { MultilineTextInput } from '@roleypoly/design-system/atoms/text-input';
import {
  AmbientLarge,
  Text as TextTypo,
} from '@roleypoly/design-system/atoms/typography';
import { MessageBox } from '@roleypoly/design-system/organisms/role-picker/RolePicker.styled';
import { GuildSlug } from '@roleypoly/types';
import { GoEyeClosed } from 'react-icons/go';

type Props = {
  guild: GuildSlug;
  onChange: (newMessage: string) => void;
  value: string;
};

export const EditableServerMessage = (props: Props) => (
  <MessageBox>
    <TextTypo>Server Message</TextTypo>
    <MultilineTextInput
      rows={2}
      value={props.value}
      onChange={(event) => props.onChange(event.target.value)}
      placeholder={`Hey friend from ${props.guild.name}! Pick your roles!`}
    >
      {props.value}
    </MultilineTextInput>
    <AmbientLarge style={{ display: 'flex', color: palette.taupe600 }}>
      Shows a message to your server members.
      <FaderOpacity isVisible={props.value.trim().length === 0}>
        &nbsp;Since the message is empty, this won't show up.&nbsp;&nbsp;&nbsp;
        <GoEyeClosed style={{ position: 'relative', top: 2 }} />
      </FaderOpacity>
    </AmbientLarge>
  </MessageBox>
);
