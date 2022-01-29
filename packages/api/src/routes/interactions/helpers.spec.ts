import { InteractionRequest, InteractionType } from '@roleypoly/types';
import nacl from 'tweetnacl';
import { configContext } from '../../utils/testHelpers';
import { verifyRequest } from './helpers';

describe('verifyRequest', () => {
  it('validates a successful Discord interactions request', () => {
    const [config, context] = configContext();

    const timestamp = String(Date.now());
    const body: InteractionRequest = {
      id: '123',
      type: InteractionType.APPLICATION_COMMAND,
      application_id: '123',
      token: '123',
      version: 1,
    };

    const { publicKey, secretKey } = nacl.sign.keyPair();
    const signature = nacl.sign.detached(
      Buffer.from(timestamp + JSON.stringify(body)),
      secretKey
    );
    config.publicKey = Buffer.from(publicKey).toString('hex');

    const request = new Request('http://local.test', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'x-signature-timestamp': timestamp,
        'x-signature-ed25519': Buffer.from(signature).toString('hex'),
      },
    });

    expect(verifyRequest(context.config, request, body)).toBe(true);
  });

  it('fails to validate a headerless Discord interactions request', () => {
    const [config, context] = configContext();

    const body: InteractionRequest = {
      id: '123',
      type: InteractionType.APPLICATION_COMMAND,
      application_id: '123',
      token: '123',
      version: 1,
    };

    const { publicKey, secretKey } = nacl.sign.keyPair();
    config.publicKey = Buffer.from(publicKey).toString('hex');

    const request = new Request('http://local.test', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {},
    });

    expect(verifyRequest(context.config, request, body)).toBe(false);
  });

  it('fails to validate a bad signature from Discord', () => {
    const [config, context] = configContext();

    const timestamp = String(Date.now());
    const body: InteractionRequest = {
      id: '123',
      type: InteractionType.APPLICATION_COMMAND,
      application_id: '123',
      token: '123',
      version: 1,
    };

    const { publicKey } = nacl.sign.keyPair();
    const { secretKey: otherKey } = nacl.sign.keyPair();
    const signature = nacl.sign.detached(
      Buffer.from(timestamp + JSON.stringify(body)),
      otherKey
    );
    config.publicKey = Buffer.from(publicKey).toString('hex');

    const request = new Request('http://local.test', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'x-signature-timestamp': timestamp,
        'x-signature-ed25519': Buffer.from(signature).toString('hex'),
      },
    });

    expect(verifyRequest(context.config, request, body)).toBe(false);
  });

  it('fails to validate when signature differs from data', () => {
    const [config, context] = configContext();

    const timestamp = String(Date.now());
    const body: InteractionRequest = {
      id: '123',
      type: InteractionType.APPLICATION_COMMAND,
      application_id: '123',
      token: '123',
      version: 1,
    };

    const { publicKey, secretKey } = nacl.sign.keyPair();
    const signature = nacl.sign.detached(
      Buffer.from(timestamp + JSON.stringify({ ...body, id: '456' })),
      secretKey
    );
    config.publicKey = Buffer.from(publicKey).toString('hex');

    const request = new Request('http://local.test', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'x-signature-timestamp': timestamp,
        'x-signature-ed25519': Buffer.from(signature).toString('hex'),
      },
    });

    expect(verifyRequest(context.config, request, body)).toBe(false);
  });
});
