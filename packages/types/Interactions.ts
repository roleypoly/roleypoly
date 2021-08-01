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
  options?: {}[];
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

export type InteractionCallbackData = {
  tts?: boolean;
  content?: string;
  embeds?: {};
  allowed_mentions?: {};
  flags?: number;
  components?: {}[];
};

export type InteractionResponse = {
  type: InteractionCallbackType;
  data?: InteractionCallbackData;
};
