import { LinedSpace, Space } from '@roleypoly/design-system/atoms/space';
import { EditableServerMessage } from '@roleypoly/design-system/molecules/editable-server-message';
import { EditorInviteLink } from '@roleypoly/design-system/molecules/editor-invite-link';
import { ServerMasthead } from '@roleypoly/design-system/molecules/server-masthead';
import { ServerUtilities } from '@roleypoly/design-system/molecules/server-utilities/ServerUtilities';
import { SecondaryEditing } from '@roleypoly/design-system/organisms/masthead';
import { Container } from '@roleypoly/design-system/organisms/role-picker/RolePicker.styled';
import { ServerCategoryEditor } from '@roleypoly/design-system/organisms/server-category-editor';
import { Category, PresentableGuild } from '@roleypoly/types';
import deepEqual from 'deep-equal';
import React from 'react';

export type EditorShellProps = {
  guild: PresentableGuild;
  onGuildChange?: (guild: PresentableGuild) => void;
  onCategoryChange?: (category: Category) => void;
  onMessageChange?: (message: PresentableGuild['data']['message']) => void;
};

export const EditorShell = (props: EditorShellProps) => {
  const [guild, setGuild] = React.useState<PresentableGuild>(props.guild);

  React.useEffect(() => {
    setGuild(props.guild);
  }, [props.guild]);

  const reset = () => {
    setGuild(props.guild);
  };

  const replaceCategories = (categories: Category[]) => {
    setGuild((currentGuild) => {
      return { ...currentGuild, data: { ...currentGuild.data, categories } };
    });
  };

  const onMessageChange = (message: PresentableGuild['data']['message']) => {
    setGuild((currentGuild) => {
      return { ...currentGuild, data: { ...guild.data, message } };
    });
  };

  const doSubmit = () => {
    props.onGuildChange?.(guild);
  };

  const hasChanges = React.useMemo(
    () => !deepEqual(guild.data, props.guild.data),
    [guild.data, props.guild.data]
  );

  return (
    <>
      <SecondaryEditing
        showReset={hasChanges}
        guild={props.guild.guild}
        onReset={reset}
        onSubmit={doSubmit}
      />
      <Container style={{ marginTop: 95 }}>
        <Space />
        <ServerMasthead guild={props.guild.guild} editable={false} />
        <Space />
        <EditorInviteLink guild={props.guild.guild} />
        <Space />
        <EditableServerMessage
          onChange={onMessageChange}
          value={guild.data.message}
          guild={guild.guild}
        />
        <Space />
        <ServerCategoryEditor guild={guild} onChange={replaceCategories} />
        <LinedSpace />
        <ServerUtilities guildData={guild.data} />
      </Container>
    </>
  );
};
