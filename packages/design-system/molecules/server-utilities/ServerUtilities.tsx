import { palette } from '@roleypoly/design-system/atoms/colors';
import { FaderOpacity } from '@roleypoly/design-system/atoms/fader';
import { TextInput } from '@roleypoly/design-system/atoms/text-input';
import { AmbientLarge, Text } from '@roleypoly/design-system/atoms/typography';
import { MessageBox } from '@roleypoly/design-system/organisms/role-picker/RolePicker.styled';
import { GuildData, WebhookValidationStatus } from '@roleypoly/types';
import { GoAlert, GoInfo } from 'react-icons/go';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

type Props = {
  onChange: (guildData: GuildData) => void;
  guildData: GuildData;
  validationStatus: WebhookValidationStatus | null;
};

export const ServerUtilities = (props: Props) => {
  return (
    <MessageBox>
      <Text>
        (optional) Webhook URL for Audit Logging{' '}
        <GoInfo
          data-for="server-utilities"
          data-tip="Reports changes made in the editor to a Webhook integration within your Discord server."
        />
      </Text>
      <TextInput
        placeholder="https://discord.com/api/webhooks/000000000000000000/..."
        value={props.guildData.auditLogWebhook || ''}
        onChange={(event) =>
          props.onChange({ ...props.guildData, auditLogWebhook: event.target.value })
        }
      />
      <FaderOpacity isVisible={props.validationStatus !== WebhookValidationStatus.Ok}>
        <ValidationStatus validationStatus={props.validationStatus} />
      </FaderOpacity>
      <ReactTooltip id="server-utilities" />
    </MessageBox>
  );
};

const ValidationStatus = (props: Pick<Props, 'validationStatus'>) => {
  switch (props.validationStatus) {
    case WebhookValidationStatus.NotDiscordURL:
      return (
        <AmbientLarge>
          <Alert /> URL must be to a Discord webhook, starting with
          "https://discord.com/api/webhooks/".
        </AmbientLarge>
      );
    case WebhookValidationStatus.NotSameGuild:
      return (
        <AmbientLarge>
          <Alert /> Webhook must be in the same guild you are currently editing.
        </AmbientLarge>
      );
    case WebhookValidationStatus.DoesNotExist:
      return (
        <AmbientLarge>
          <Alert /> This webhook doesn't exist.
        </AmbientLarge>
      );
    default:
      return <AmbientLarge>&nbsp;</AmbientLarge>;
  }
};

const Alert = styled(GoAlert)`
  color: ${palette.red400};
  position: relative;
  top: 2px;
`;
