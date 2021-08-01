import { helloWorld } from '@roleypoly/interactions/handlers/interactions/hello-world';
import { verifyRequest } from '@roleypoly/interactions/utils/interactions';
import {
  InteractionData,
  InteractionRequest,
  InteractionRequestCommand,
  InteractionResponse,
  InteractionType,
} from '@roleypoly/types';
import { respond } from '@roleypoly/worker-utils';

const commands: Record<
  InteractionData['name'],
  (request: InteractionRequestCommand) => Promise<InteractionResponse>
> = {
  'hello-world': helloWorld,
};

export const interactionHandler = async (request: Request): Promise<Response> => {
  if (!(await verifyRequest(request))) {
    return new Response('invalid request signature', { status: 401 });
  }

  const interaction = (await request.json()) as InteractionRequest;

  if (interaction.type === InteractionType.PING) {
    return respond({ type: 1 });
  }

  if (interaction.type !== InteractionType.APPLICATION_COMMAND) {
    return respond({ err: 'not implemented' }, { status: 400 });
  }

  if (!interaction.data) {
    return respond({ err: 'data missing' }, { status: 400 });
  }

  const handler = commands[interaction.data.name];
  if (!handler) {
    return respond({ err: 'not implemented' }, { status: 400 });
  }

  try {
    const response = await handler(interaction as InteractionRequestCommand);
    return respond(response);
  } catch (e) {
    return respond({ err: 'command errored' }, { status: 500 });
  }
};
