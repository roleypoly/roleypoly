import { publicKey } from '@roleypoly/interactions/utils/config';
import {
  InteractionCallbackType,
  InteractionFlags,
  InteractionRequest,
  InteractionRequestCommand,
  InteractionResponse,
} from '@roleypoly/types';
import { AuthType, discordFetch, HandlerTools } from '@roleypoly/worker-utils';
import nacl from 'tweetnacl';

export const verifyRequest = (
  request: Request,
  interaction: InteractionRequest
): boolean => {
  const timestamp = request.headers.get('x-signature-timestamp');
  const signature = request.headers.get('x-signature-ed25519');

  if (!timestamp || !signature) {
    return false;
  }

  if (
    !nacl.sign.detached.verify(
      Buffer.from(timestamp + JSON.stringify(interaction)),
      Buffer.from(signature, 'hex'),
      Buffer.from(publicKey, 'hex')
    )
  ) {
    return false;
  }

  return true;
};

export type RequestInfo = HandlerTools & { request: Request };

export type CommandHandler = (
  request: InteractionRequestCommand,
  requestInfo: RequestInfo
) => Promise<InteractionResponse>;

export const asyncResponse =
  (handler: CommandHandler): CommandHandler =>
  async (
    command: InteractionRequestCommand,
    requestInfo: RequestInfo
  ): Promise<InteractionResponse> => {
    requestInfo.waitUntil(
      (async () => {
        const response = await handler(command, requestInfo);
        await updateOriginalMessage(command.application_id, command.token, response);
      })()
    );

    return {
      type: InteractionCallbackType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        flags: InteractionFlags.EPHEMERAL,
      },
    };
  };

const updateOriginalMessage = async (
  appID: string,
  token: string,
  response: InteractionResponse
) => {
  const url = `/webhooks/${appID}/${token}/messages/@original`;

  return await discordFetch(url, '', AuthType.None, {
    method: 'PATCH',
    body: JSON.stringify(response.data),
    headers: {
      'content-type': 'application/json',
    },
  });
};
