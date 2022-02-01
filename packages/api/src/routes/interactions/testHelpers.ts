import { handleInteraction } from '@roleypoly/api/src/routes/interactions/interactions';
import { Context } from '@roleypoly/api/src/utils/context';
import { AuthType } from '@roleypoly/api/src/utils/discord';
import { getID } from '@roleypoly/api/src/utils/id';
import {
  InteractionCallbackData,
  InteractionCallbackType,
  InteractionData,
  InteractionFlags,
  InteractionRequest,
  InteractionResponse,
  InteractionType,
} from '@roleypoly/types';
import nacl from 'tweetnacl';

const { publicKey, secretKey } = nacl.sign.keyPair();
const hexPublicKey = Buffer.from(publicKey).toString('hex');

export const getSignatureHeaders = (
  context: Context,
  interaction: InteractionRequest
): {
  'x-signature-ed25519': string;
  'x-signature-timestamp': string;
} => {
  const timestamp = Date.now().toString();
  const body = JSON.stringify(interaction);
  const signature = nacl.sign.detached(Buffer.from(timestamp + body), secretKey);

  return {
    'x-signature-ed25519': Buffer.from(signature).toString('hex'),
    'x-signature-timestamp': timestamp,
  };
};

export const makeInteractionsRequest = async (
  context: Context,
  interactionData: Partial<InteractionData>,
  forceInvalid?: boolean,
  topLevelMixin?: Partial<InteractionRequest>
): Promise<Response> => {
  context.config.publicKey = hexPublicKey;

  const interaction: InteractionRequest = {
    data: {
      id: getID(),
      name: 'hello-world',
      ...interactionData,
    } as InteractionData,
    id: '123',
    type: InteractionType.APPLICATION_COMMAND,
    application_id: context.config.botClientID,
    token: getID(),
    version: 1,
    user: {
      id: '123',
      username: 'test-user',
      discriminator: '1234',
      bot: false,
      avatar: '',
    },
    member: {
      nick: 'test-user-nick',
      roles: [],
    },
    ...topLevelMixin,
  };

  const request = new Request('http://localhost:3000/interactions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...getSignatureHeaders(context, {
        ...interaction,
        ...(forceInvalid ? { id: 'invalid-id' } : {}),
      }),
    },
    body: JSON.stringify(interaction),
  });

  return handleInteraction(request, context);
};

export const extractInteractionResponse = async (
  response: Response
): Promise<InteractionResponse> => {
  const body = await response.json();
  return body as InteractionResponse;
};

export const isDeferred = (response: InteractionResponse): boolean => {
  return response.type === InteractionCallbackType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE;
};

export const isEphemeral = (response: InteractionResponse): boolean => {
  return (
    (response.data?.flags || 0 & InteractionFlags.EPHEMERAL) ===
    InteractionFlags.EPHEMERAL
  );
};

export const interactionData = (
  response: InteractionResponse
): Omit<InteractionCallbackData, 'flags'> | undefined => {
  const { data } = response;
  if (!data) return undefined;

  delete data.flags;
  return response.data;
};

export const mockUpdateCall = (
  expect: any,
  data: Omit<InteractionCallbackData, 'flags'>
) => {
  return [
    expect.any(String),
    '',
    AuthType.None,
    {
      body: JSON.stringify({
        type: InteractionCallbackType.DEFERRED_UPDATE_MESSAGE,
        data: {
          flags: InteractionFlags.EPHEMERAL,
          ...data,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
    },
  ];
};
