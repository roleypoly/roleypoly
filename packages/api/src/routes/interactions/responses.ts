import { InteractionHandler } from '@roleypoly/api/src/routes/interactions/helpers';
import {
  InteractionCallbackType,
  InteractionFlags,
  InteractionResponse,
} from '@roleypoly/types';

export const mustBeInGuild: InteractionHandler = (): InteractionResponse => ({
  type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE,
  data: {
    content: ':x: This command has to be used in a server.',
    flags: InteractionFlags.EPHEMERAL,
  },
});

export const invalid: InteractionHandler = (): InteractionResponse => ({
  type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE,
  data: {
    content: ':x: You filled that command out wrong...',
    flags: InteractionFlags.EPHEMERAL,
  },
});

export const somethingWentWrong: InteractionHandler = (): InteractionResponse => ({
  type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE,
  data: {
    content: '<a:promareFlame:624850108667789333> Something went terribly wrong.',
    flags: InteractionFlags.EPHEMERAL,
  },
});

export const notImplemented: InteractionHandler = (): InteractionResponse => ({
  type: InteractionCallbackType.CHANNEL_MESSAGE_WITH_SOURCE,
  data: {
    content: ':x: This command is not implemented yet.',
    flags: InteractionFlags.EPHEMERAL,
  },
});
