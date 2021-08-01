import { publicKey } from '@roleypoly/interactions/utils/config';
import nacl from 'tweetnacl';

export const verifyRequest = async (request: Request): Promise<boolean> => {
  const timestamp = request.headers.get('x-signature-timestamp');
  const signature = request.headers.get('x-signature-ed25519');

  if (!timestamp || !signature) {
    return false;
  }

  const body = await request.json();

  if (
    !nacl.sign.detached.verify(
      Buffer.from(timestamp + JSON.stringify(body)),
      Buffer.from(signature, 'hex'),
      Buffer.from(publicKey, 'hex')
    )
  ) {
    return false;
  }

  return true;
};
