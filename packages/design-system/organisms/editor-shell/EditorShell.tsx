import { LinedSpace, Space } from '@roleypoly/design-system/atoms/space';
import { EditableServerMessage } from '@roleypoly/design-system/molecules/editable-server-message';
import { ServerMasthead } from '@roleypoly/design-system/molecules/server-masthead';
import { ServerUtilities } from '@roleypoly/design-system/molecules/server-utilities/ServerUtilities';
import { SecondaryEditing } from '@roleypoly/design-system/organisms/masthead';
import { Container } from '@roleypoly/design-system/organisms/role-picker/RolePicker.styled';
import { ServerCategoryEditor } from '@roleypoly/design-system/organisms/server-category-editor';
import {
  Category,
  GuildData,
  PresentableGuild,
  WebhookValidationStatus,
} from '@roleypoly/types';
import deepEqual from 'deep-equal';
import React from 'react';

export type EditorShellProps = {
  guild: PresentableGuild;
  onGuildChange?: (guild: PresentableGuild) => void;
  onCategoryChange?: (category: Category) => void;
  onMessageChange?: (message: PresentableGuild['data']['message']) => void;
  errors: {
    webhookValidation: WebhookValidationStatus;
  };
};

export const EditorShell = (props: EditorShellProps) => {
  const [guild, setGuild] = React.useState<PresentableGuild>(props.guild);
  const [errors, setErrors] = React.useState<EditorShellProps['errors']>(props.errors);

  React.useEffect(() => {
    setGuild(props.guild);
  }, [props.guild]);

  React.useEffect(() => {
    setErrors(props.errors);
  }, [props.errors]);

  const reset = () => {
    setGuild(props.guild);
    setErrors({ webhookValidation: WebhookValidationStatus.Ok });
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

  const updateGuildData = (data: PresentableGuild['data']) => {
    setGuild((currentGuild) => {
      return { ...currentGuild, data };
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
        <ServerMasthead guild={props.guild.guild} editable={false} />
        <Space />
        <EditableServerMessage
          onChange={onMessageChange}
          value={guild.data.message}
          guild={guild.guild}
        />
        <Space />
        <ServerCategoryEditor guild={guild} onChange={replaceCategories} />
        <LinedSpace />
        <ServerUtilities
          guildData={guild.data}
          onChange={updateGuildData}
          validationStatus={validateWebhook(
            guild.data.auditLogWebhook,
            errors.webhookValidation
          )}
        />
      </Container>
    </>
  );
};

const validateWebhook = (
  webhook: GuildData['auditLogWebhook'],
  validationStatus: WebhookValidationStatus
) => {
  if (!webhook) {
    return WebhookValidationStatus.NoneSet;
  }

  try {
    const url = new URL(webhook);

    if (
      url.hostname !== 'discord.com' ||
      url.protocol !== 'https:' ||
      url.pathname.startsWith('api/webhooks/')
    ) {
      return WebhookValidationStatus.NotDiscordURL;
    }
  } catch (e) {
    return WebhookValidationStatus.Ok;
  }

  if (
    validationStatus !== WebhookValidationStatus.Ok &&
    validationStatus !== WebhookValidationStatus.NoneSet
  ) {
    return validationStatus;
  }

  return WebhookValidationStatus.Ok;
};
