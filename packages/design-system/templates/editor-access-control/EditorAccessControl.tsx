import { AppShell, AppShellProps } from '@roleypoly/design-system/organisms/app-shell';
import {
  EditorAccessControl,
  EditorAccessControlProps,
} from '@roleypoly/design-system/organisms/editor-access-control';

export const EditorAccessControlTemplate = (
  props: EditorAccessControlProps & Omit<AppShellProps, 'children'>
) => {
  const { guildSlug, guild, onSubmit, onExit, ...appShellProps } = props;
  return (
    <AppShell {...appShellProps} activeGuildId={guild.id} small>
      <EditorAccessControl
        guildSlug={guildSlug}
        guild={guild}
        onSubmit={onSubmit}
        onExit={onExit}
      />
    </AppShell>
  );
};
