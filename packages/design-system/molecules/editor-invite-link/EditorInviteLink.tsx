import { palette } from '@roleypoly/design-system/atoms/colors';
import { CopyArea } from '@roleypoly/design-system/atoms/copy-area';
import { AmbientLarge } from '@roleypoly/design-system/atoms/typography';
import { MessageBox } from '@roleypoly/design-system/organisms/role-picker/RolePicker.styled';
import { Guild } from '@roleypoly/types';
import { GoInfo } from 'react-icons/go';

export const EditorInviteLink = (props: { guild: Guild }) => {
  const currentURL = new URL(location.href);
  currentURL.pathname = `/s/${props.guild.id}`;
  currentURL.search = '';

  const inviteLink = currentURL.toString();

  return (
    <MessageBox>
      Share this link with your server members, or ping{' '}
      <span style={{ color: palette.taupe500 }}>@roleypoly</span> in your server.
      <CopyArea value={inviteLink} />
      <AmbientLarge style={{ display: 'flex', color: palette.taupe600 }}>
        <GoInfo style={{ position: 'relative', top: 4 }} />
        &nbsp;This link will never change. Share it with anyone!
      </AmbientLarge>
    </MessageBox>
  );
};
