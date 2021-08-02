import { DiscordUser, Member } from '@roleypoly/types/User';

export enum InteractionType {
  PING = 1,
  APPLICATION_COMMAND = 2,
  MESSAGE_COMPONENT = 3,
}

export type InteractionRequest = {
  id: string;
  application_id: string;
  token: string;
  version: 1;
  type: InteractionType;
  data?: InteractionData;
  guild_id?: string;
  channel_id?: string;
  member?: Member;
  user?: DiscordUser;
  message?: {};
};

export type InteractionRequestCommand = InteractionRequest & {
  data: InteractionData;
};

export type InteractionData = {
  id: string;
  name: string;
  resolved?: {};
  options?: {
    name: string;
    type: number;
    value?: string;
  }[];
  custom_id: string;
  component_type: string;
};

export enum InteractionCallbackType {
  PONG = 1,
  CHANNEL_MESSAGE_WITH_SOURCE = 4,
  DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE = 5,
  DEFERRED_UPDATE_MESSAGE = 6,
  UPDATE_MESSAGE = 7,
}

export enum InteractionFlags {
  EPHEMERAL = 1 << 6,
}

export type InteractionCallbackData = {
  tts?: boolean;
  content?: string;
  embeds?: {};
  allowed_mentions?: {};
  flags?: InteractionFlags;
  components?: {}[];
};

export type InteractionResponse = {
  type: InteractionCallbackType;
  data?: InteractionCallbackData;
};

export type Embed = {
  fields: {
    name: string;
    value: string;
    inline?: boolean;
  }[];
  timestamp?: string;
  title: string;
  color: number;
  author?: {
    name: string;
    icon_url: string;
  };
};
