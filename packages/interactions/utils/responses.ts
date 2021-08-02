import {
  InteractionCallbackType,
  InteractionFlags,
  InteractionResponse,
} from '@roleypoly/types';

export const mustBeInGuild = (): InteractionResponse => ({
  type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE,
  data: {
    content: ':x: This command has to be used in a server.',
    flags: InteractionFlags.EPHEMERAL,
  },
});

export const invalid = (): InteractionResponse => ({
  type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE,
  data: {
    content: ':x: You filled that command out wrong...',
    flags: InteractionFlags.EPHEMERAL,
  },
});

export const somethingWentWrong = (): InteractionResponse => ({
  type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE,
  data: {
    content: '<a:promareFlame:624850108667789333> Something went terribly wrong.',
    flags: InteractionFlags.EPHEMERAL,
  },
});
