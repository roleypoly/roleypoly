import { userAgent } from '@roleypoly/api/utils/api-tools';
import { uiPublicURI } from '@roleypoly/api/utils/config';
import {
  Category,
  DiscordUser,
  GuildData,
  GuildDataUpdate,
  GuildSlug,
  WebhookValidationStatus,
} from '@roleypoly/types';
import deepEqual from 'deep-equal';
import { sortBy, uniq } from 'lodash';

type WebhookEmbed = {
  fields: {
    name: string;
    value: string;
    inline: boolean;
  }[];
  timestamp: string;
  title: string;
  color: number;
  author?: {
    name: string;
    icon_url: string;
  };
};

type WebhookPayload = {
  username: string;
  avatar_url: string;
  embeds: WebhookEmbed[];
  provider: {
    name: string;
    url: string;
  };
};

type ChangeHandler = (
  oldValue: GuildDataUpdate[keyof GuildDataUpdate],
  newValue: GuildData[keyof GuildDataUpdate]
) => WebhookEmbed[];

const changeHandlers: Record<keyof GuildDataUpdate, ChangeHandler> = {
  message: (oldValue, newValue) => [
    {
      timestamp: new Date().toISOString(),
      color: 0x453e3d,
      fields: [
        {
          name: 'Old Message',
          value: oldValue as string,
          inline: false,
        },
        {
          name: 'New Message',
          value: newValue as string,
          inline: false,
        },
      ],
      title: `Server message was updated...`,
    },
  ],
  auditLogWebhook: (oldValue, newValue) => [
    {
      timestamp: new Date().toISOString(),
      color: 0x5d5352,
      fields: [
        {
          name: 'Old Webhook ID',
          value: !oldValue ? '*unset*' : (oldValue as string).split('/')[5],
          inline: false,
        },
        {
          name: 'New Webhook ID',
          value: !newValue ? '*unset*' : (newValue as string).split('/')[5],
          inline: false,
        },
      ],
      title: `Audit Log webhook URL was changed...`,
    },
  ],
  categories: (oldValue, newValue) => [
    {
      timestamp: new Date().toISOString(),
      color: 0xab9b9a,
      fields: [
        {
          name: 'Changed Categories',
          value: getChangedCategories(
            oldValue as Category[],
            newValue as Category[]
          ).join('\n'),
          inline: false,
        },
      ],
      title: `Categories were changed...`,
    },
  ],
};

export const sendAuditLog = async (
  guild: GuildData,
  guildUpdate: GuildDataUpdate,
  user: DiscordUser
) => {
  const auditLogWebhooks = uniq([
    guild.auditLogWebhook || '',
    guildUpdate.auditLogWebhook || '',
  ]).filter((webhook) => webhook !== '');

  if (auditLogWebhooks.length === 0) {
    return;
  }

  const keys = Object.keys(guildUpdate) as (keyof GuildDataUpdate)[];
  const webhookPayload: WebhookPayload = {
    username: 'Roleypoly (Audit Log)',
    avatar_url: `https://next.roleypoly.com/logo192.png`, //TODO: change to roleypoly.com when swapped.
    embeds: [
      {
        fields: [],
        timestamp: new Date().toISOString(),
        title: `${user.username}#${user.discriminator} has edited Roleypoly settings`,
        color: 0x332d2d,
        author: {
          name: user.username,
          icon_url: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
        },
      },
    ],
    provider: {
      name: 'Roleypoly',
      url: uiPublicURI,
    },
  };

  for (let key of keys) {
    if (deepEqual(guildUpdate[key], guild[key])) {
      continue;
    }

    const handler = changeHandlers[key];
    if (!handler) {
      continue;
    }

    const changeFields = handler(guild[key], guildUpdate[key]);
    webhookPayload.embeds.push(...changeFields);
  }

  if (webhookPayload.embeds.length === 1) {
    // No changes, don't bother sending
    return;
  }

  // Colors are in order already, so use them to order the embeds.
  webhookPayload.embeds = sortBy(webhookPayload.embeds, 'color');

  const doWebhook = (webhook: string) =>
    fetch(webhook, {
      method: 'POST',
      body: JSON.stringify(webhookPayload),
      headers: {
        'content-type': 'application/json',
        'user-agent': userAgent,
      },
    });

  await Promise.all(auditLogWebhooks.map((webhook) => doWebhook(webhook)));
};

export const validateAuditLogWebhook = async (
  guild: GuildSlug,
  webhook: string | null
): Promise<WebhookValidationStatus> => {
  if (!webhook) {
    return WebhookValidationStatus.NoneSet;
  }

  const url = new URL(webhook);

  if (
    url.hostname !== 'discord.com' ||
    url.protocol !== 'https:' ||
    url.pathname.startsWith('api/webhooks/')
  ) {
    return WebhookValidationStatus.NotDiscordURL;
  }

  const response = await fetch(webhook, { method: 'GET' });
  if (response.status !== 200) {
    return WebhookValidationStatus.DoesNotExist;
  }

  const webhookData = await response.json();

  if (webhookData.guild_id !== guild.id) {
    return WebhookValidationStatus.NotSameGuild;
  }

  return WebhookValidationStatus.Ok;
};

const getChangedCategories = (oldCategories: Category[], newCategories: Category[]) => {
  const addedCategories = newCategories.filter(
    (c) => !oldCategories.find((o) => o.id === c.id)
  );
  const removedCategories = oldCategories.filter(
    (c) => !newCategories.find((o) => o.id === c.id)
  );
  const changedCategories = newCategories.filter(
    (c) =>
      oldCategories.find((o) => o.id === c.id) &&
      !deepEqual(
        oldCategories.find((o) => o.id === c.id),
        newCategories.find((o) => o.id === c.id)
      )
  );

  return [
    ...addedCategories.map((c) => `➕ **Added** ${c.name}`),
    ...removedCategories.map((c) => `➖ **Removed** ${c.name}`),
    ...changedCategories.map((c) => `🔧 **Changed** ${c.name}`),
  ];
};