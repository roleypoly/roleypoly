import { InteractionRequest, InteractionType } from '@roleypoly/types';
import nacl from 'tweetnacl';
import { configContext } from '../../utils/testHelpers';
import { embedBuilder, verifyRequest } from './helpers';

//
// Q: Why tweetnacl when WebCrypto is available?
// A: Discord uses tweetnacl on their end, thus is also
//   used in far more examples of Discord Interactions than WebCrypto.
//   We don't actually use it in Workers, as SubtleCrypto using NODE-ED25519
//    is better in every way, and still gives us the same effect.
//

describe('verifyRequest', () => {
  it('validates a successful Discord interactions request', async () => {
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

    expect(await verifyRequest(context.config, request, body)).toBe(true);
  });

  it('fails to validate a headerless Discord interactions request', async () => {
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

    expect(await verifyRequest(context.config, request, body)).toBe(false);
  });

  it('fails to validate a bad signature from Discord', async () => {
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

    expect(await verifyRequest(context.config, request, body)).toBe(false);
  });

  it('fails to validate when signature differs from data', async () => {
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

    expect(await verifyRequest(context.config, request, body)).toBe(false);
  });
});

describe('embedBuilder', () => {
  it('builds embeds that discord approves of', () => {
    const embeds = embedBuilder({
      title: 'Test',
      fields: [
        {
          name: 'Field 1',
          value: 'role-1, role-2, role-3, role-4, role-5, '
            .repeat(1024 / 30 - 15)
            .replace(/, $/, ''),
        },
        {
          name: 'Field 2',
          value: 'role-1, role-2, role-3, role-4, role-5, '
            .repeat(1024 / 30 + 4)
            .replace(/, $/, ''),
        },
      ],
      color: 0xff0000,
    });

    expect(embeds).toMatchInlineSnapshot(`
      Array [
        Object {
          "color": 16711680,
          "fields": Array [
            Object {
              "name": "Field 1",
              "value": "role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5",
            },
            Object {
              "name": "Field 2",
              "value": "role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3",
            },
            Object {
              "name": "Field 2 (continued)",
              "value": "role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5, role-1, role-2, role-3, role-4, role-5",
            },
          ],
          "title": "Test",
        },
      ]
    `);
    expect(embeds.length).toBe(1);
    expect(embeds[0].fields.length).toBe(3);
  });
});
