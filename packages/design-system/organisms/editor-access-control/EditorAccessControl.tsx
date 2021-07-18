import { IconHelper } from '@roleypoly/design-system/atoms/icon-helper';
import { Space } from '@roleypoly/design-system/atoms/space';
import { Toggle } from '@roleypoly/design-system/atoms/toggle';
import {
  AmbientLarge,
  LargeText,
  Link,
  Text,
} from '@roleypoly/design-system/atoms/typography';
import { EditableRoleList } from '@roleypoly/design-system/molecules/editable-role-list';
import {
  EditorUtilityProps,
  EditorUtilityShell,
} from '@roleypoly/design-system/molecules/editor-utility-shell';
import { GuildAccessControl, PresentableGuild } from '@roleypoly/types';
import deepEqual from 'deep-equal';
import * as React from 'react';
import { GoAlert, GoInfo, GoShield, GoThumbsdown, GoThumbsup } from 'react-icons/go';
import { RoleContainer } from './EditorAccessControl.styled';

export type EditorAccessControlProps = {
  guild: PresentableGuild;
} & EditorUtilityProps;

export const EditorAccessControl = (props: EditorAccessControlProps) => {
  const [accessControl, setAccessControl] = React.useState(
    props.guild.data.accessControl
  );

  React.useEffect(() => {
    setAccessControl(props.guild.data.accessControl);
  }, [props.guild.data.accessControl]);

  const onSubmit = () => {
    props.onSubmit(accessControl);
  };

  const handleChange =
    (key: keyof GuildAccessControl) =>
    (value: GuildAccessControl[keyof GuildAccessControl]) => {
      setAccessControl((prev) => ({ ...prev, [key]: value }));
    };

  const hasChanges = React.useMemo(() => {
    return !deepEqual(accessControl, props.guild.data.accessControl);
  }, [accessControl, props.guild.data.accessControl]);

  const rolesNotInBlocked = React.useMemo(() => {
    return props.guild.roles.filter(
      (role) => role.id !== props.guild.id && !accessControl.blockList.includes(role.id)
    );
  }, [accessControl, props.guild.roles]);

  const rolesNotInAllowed = React.useMemo(() => {
    return props.guild.roles.filter(
      (role) => role.id !== props.guild.id && !accessControl.allowList.includes(role.id)
    );
  }, [accessControl, props.guild.roles]);

  return (
    <EditorUtilityShell
      guildSlug={props.guild.guild}
      title="Access Control"
      icon={<GoShield />}
      hasChanges={hasChanges}
      onSubmit={onSubmit}
      onExit={props.onExit}
    >
      <p>
        <IconHelper level="chrome">
          <GoInfo />
        </IconHelper>
        &nbsp;Admins and Role Managers are exempt from all of these limits. Please note,
        this settings page is in order of precedence.
      </p>
      <Space />
      <div>
        <LargeText>
          Block pending members from using Roleypoly&nbsp;&nbsp;
          <IconHelper level="error">
            <GoThumbsdown />
          </IconHelper>
        </LargeText>
        <br />
        <br />
        {/* <RoleContainer> */}
        <Toggle
          state={accessControl.blockPending}
          onChange={handleChange('blockPending')}
        >
          If a user is behind Discord's{' '}
          <Link href="https://support.discord.com/hc/en-us/articles/1500000466882-Rules-Screening-FAQ">
            Membership Screening
          </Link>{' '}
          feature, they can <b>not</b> use Roleypoly.
        </Toggle>
        {/* </RoleContainer> */}
        <p>
          <AmbientLarge>
            <IconHelper level="chrome">
              <GoInfo />
            </IconHelper>
            &nbsp; This only applies to Discord servers with Community features enabled.
          </AmbientLarge>
        </p>
      </div>
      <Space />
      <div>
        <p>
          <LargeText>
            Block roles from using Roleypoly&nbsp;&nbsp;
            <IconHelper level="error">
              <GoThumbsdown />
            </IconHelper>
          </LargeText>
          <br />
          <Text>
            If there are roles in this list, any server member <b>with</b> a role in the
            list can <b>not</b> use Roleypoly.
            <br />
            <IconHelper level="info">
              <GoInfo />
            </IconHelper>
            &nbsp;Blocked roles take precedence over the allowed roles.
          </Text>
        </p>
        <RoleContainer>
          <EditableRoleList
            roles={props.guild.roles}
            unselectedRoles={rolesNotInBlocked}
            selectedRoles={accessControl.blockList}
            onChange={handleChange('blockList')}
          />
        </RoleContainer>
        <p>
          <AmbientLarge>
            <IconHelper level="chrome">
              <GoInfo />
            </IconHelper>
            &nbsp; If your Discord server has a "muted" or "visitor" role, this setting is
            meant to complement it.
          </AmbientLarge>
        </p>
      </div>
      <Space />
      <div>
        <p>
          <LargeText>
            Allow these roles to use Roleypoly&nbsp;&nbsp;
            <IconHelper level="success">
              <GoThumbsup />
            </IconHelper>
          </LargeText>
          <br />
          <Text>
            If there are roles in this list, any server member <b>without</b> a role in
            the list can <b>not</b> use Roleypoly.
            <br />
            <IconHelper level="warn">
              <GoAlert />
            </IconHelper>
            &nbsp;This can disrupt use of the bot, so be careful!
          </Text>
        </p>
        <RoleContainer>
          <EditableRoleList
            roles={props.guild.roles}
            unselectedRoles={rolesNotInAllowed}
            selectedRoles={accessControl.allowList}
            onChange={handleChange('allowList')}
          />
        </RoleContainer>
        <p>
          <AmbientLarge>
            <IconHelper level="chrome">
              <GoInfo />
            </IconHelper>
            &nbsp;If your Discord server uses a "role gating" system, this setting is
            meant to complement it.
          </AmbientLarge>
        </p>
      </div>
    </EditorUtilityShell>
  );
};
