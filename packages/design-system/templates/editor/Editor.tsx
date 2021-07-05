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
    ...appShellProps
  } = props;
  return (
    <AppShell {...appShellProps} activeGuildId={guild.id}>
      <EditorShell guild={guild} onGuildChange={onGuildChange} />
    </AppShell>
  );
};
