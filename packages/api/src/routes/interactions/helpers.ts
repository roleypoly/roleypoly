import { Config } from '@roleypoly/api/src/utils/config';
import { InteractionRequest } from '@roleypoly/types';
import nacl from 'tweetnacl';

export const verifyRequest = (
  config: Config,
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
      Buffer.from(config.publicKey, 'hex')
    )
  ) {
    return false;
  }

  return true;
};
