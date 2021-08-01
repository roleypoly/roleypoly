import {
  EditorUtilityProps,
  EditorUtilityShell,
} from '@roleypoly/design-system/molecules/editor-utility-shell';
import { PresentableGuild } from '@roleypoly/types';
import { GoShield } from 'react-icons/go';

export type EditorSyncFromLegacyProps = {
  guild: PresentableGuild;
} & EditorUtilityProps;

export const EditorAccessControl = (props: EditorSyncFromLegacyProps) => {
  return (
    <EditorUtilityShell
      guildSlug={props.guild.guild}
      title="Access Control"
      icon={<GoShield />}
      hasChanges={false}
      onSubmit={props.onSubmit}
      onExit={props.onExit}
    >
      <div>hi</div>
    </EditorUtilityShell>
  );
};
