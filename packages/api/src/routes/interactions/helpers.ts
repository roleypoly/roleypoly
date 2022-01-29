import { Config } from '@roleypoly/api/src/utils/config';
import { InteractionRequest } from '@roleypoly/types';

export const verifyRequest = async (
  config: Config,
  request: Request,
  interaction: InteractionRequest
): Promise<boolean> => {
  const timestamp = request.headers.get('x-signature-timestamp');
  const signature = request.headers.get('x-signature-ed25519');

  if (!timestamp || !signature) {
    return false;
  }

  const key = await crypto.subtle.importKey(
    'raw',
    Buffer.from(config.publicKey, 'hex'),
    { name: 'NODE-ED25519', namedCurve: 'NODE-ED25519', public: true } as any,
    false,
    ['verify']
  );

  return crypto.subtle.verify(
    'NODE-ED25519',
    key,
    Buffer.from(signature, 'hex'),
    Buffer.from(timestamp + JSON.stringify(interaction))
  );
};
