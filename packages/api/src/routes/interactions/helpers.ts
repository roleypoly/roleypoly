import { Config } from '@roleypoly/api/src/utils/config';
import { Context } from '@roleypoly/api/src/utils/context';
import { AuthType, discordFetch } from '@roleypoly/api/src/utils/discord';
import { Embed, InteractionRequest, InteractionResponse } from '@roleypoly/types';

export const verifyRequest = async (
  config: Config,
  request: Request,
  interaction: InteractionRequest
): Promise<boolean> => {
  try {
    const timestamp = request.headers.get('x-signature-timestamp');
    const signature = request.headers.get('x-signature-ed25519');

    if (!timestamp || !signature) {
      console.error("interactions: missing signature headers", { timestamp, signature });
      return false;
    }

    const key = await crypto.subtle.importKey(
      'raw',
      bufferizeHex(config.publicKey),
      { name: 'NODE-ED25519', namedCurve: 'NODE-ED25519', public: true } as any,
      false,
      ['verify']
    );

    const verified = await crypto.subtle.verify(
      'NODE-ED25519',
      key,
      bufferizeHex(signature),
      bufferizeString(timestamp + JSON.stringify(interaction))
    );

    if (!verified) {
      console.error("interactions: signature verification failed", { timestamp, signature });
    }

    return verified;
  } catch (e) {
    console.error("interactions: signature verification failed", e);
    return false;
  }
};

// Cloudflare Workers + SubtleCrypto has no idea what a Buffer.from() is.
// What the fuck?
const bufferizeHex = (input: string) => {
  const buffer = new Uint8Array(input.length / 2);

  for (let i = 0; i < input.length; i += 2) {
    buffer[i / 2] = parseInt(input.substring(i, i + 2), 16);
  }

  return buffer;
};

const bufferizeString = (input: string) => {
  const encoder = new TextEncoder();
  return encoder.encode(input);
};

export type InteractionHandler = ((
  interaction: InteractionRequest,
  context: Context
) => Promise<InteractionResponse> | InteractionResponse) & {
  ephemeral?: boolean;
  deferred?: boolean;
};

export const runAsync = async (
  handler: InteractionHandler,
  interaction: InteractionRequest,
  context: Context
): Promise<void> => {
  const url = `/webhooks/${interaction.application_id}/${interaction.token}/messages/@original`;

  try {
    const response = await handler(interaction, context);
    if (!response) {
      throw new Error('Interaction handler returned no response');
    }

    console.log({ response });

    await discordFetch(url, '', AuthType.None, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...response.data,
      }),
    });
  } catch (e) {
    console.error('/interations runAsync failed', {
      e,
      interaction: {
        data: interaction.data,
        user: interaction.user,
        guild: interaction.guild_id,
      },
    });
    try {
      await discordFetch(url, '', AuthType.None, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: "I'm sorry, I'm having trouble processing this request.",
        } as InteractionResponse['data']),
      });
    } catch (e) {}
  }
};

export const getName = (interaction: InteractionRequest): string => {
  return (
    interaction.member?.nick ||
    interaction.member?.user?.username ||
    interaction.user?.username ||
    'friend'
  );
};

/**
 * Take a single big embed and fit it into Discord limits
 * per embed, 25 fields, and 1024 characters per field.
 * so we'll make new embeds/fields as the content gets too long.
 */
export const embedBuilder = (embed: Embed): Embed[] => {
  const embeds: Embed[] = [];

  const titleCorrection = (title: string, withContinued?: boolean) => {
    const suffix = withContinued ? '... (continued)' : '...';
    const offsetTitle = title.length + suffix.length;
    return title.length > 256 - offsetTitle
      ? title.slice(0, 256 - offsetTitle) + suffix
      : withContinued
      ? `${title} (continued)`
      : title;
  };

  let currentEmbed: Embed = {
    color: embed.color,
    title: embed.title,
    fields: [],
  };

  let knownFieldTitles: string[] = [];

  const commitField = (field: Embed['fields'][0]) => {
    if (currentEmbed.fields.length === 25) {
      embeds.push(currentEmbed);
      currentEmbed = {
        color: embed.color,
        title: `${embed.title} (continued)`,
        fields: [],
      };
    }

    console.warn({ field });
    const addContinued = knownFieldTitles.includes(field.name);

    if (!addContinued) {
      knownFieldTitles.push(field.name);
    }

    field.name = titleCorrection(`${field.name}`, addContinued);
    console.warn({ field, knownFieldTitles });

    currentEmbed.fields.push(field);
  };

  for (let field of embed.fields) {
    if (field.value.length <= 1024) {
      commitField(field);
      continue;
    }

    const split = field.value.split(', '); // we know we'll be using , as a delimiter
    let fieldValue: Embed['fields'][0]['value'] = '';
    for (let part of split) {
      if (fieldValue.length + part.length > 1024) {
        commitField({
          name: field.name,
          value: fieldValue.replace(/, $/, ''),
        });
        fieldValue = '';
      } else {
        fieldValue += part + ', ';
      }
    }

    if (fieldValue.length > 0) {
      commitField({
        name: field.name,
        value: fieldValue.replace(/, $/, ''),
      });
    }
  }

  if (currentEmbed.fields.length > 0) {
    embeds.push(currentEmbed);
  }

  return embeds;
};
