import { AppShell, AppShellProps } from '@roleypoly/design-system/organisms/app-shell';
import {
  EditorShell,
  EditorShellProps,
} from '@roleypoly/design-system/organisms/editor-shell';

export const EditorTemplate = (
  props: EditorShellProps & Omit<AppShellProps, 'children'>
) => {
  const {
    guild,
    onCategoryChange,
    onMessageChange,
    onGuildChange,
    onRefreshCache,
    ...appShellProps
  } = props;
  return (
    <AppShell {...appShellProps} activeGuildId={guild.id} small double>
      <EditorShell
        guild={guild}
        onGuildChange={onGuildChange}
        onRefreshCache={onRefreshCache}
      />
    </AppShell>
  );
};
