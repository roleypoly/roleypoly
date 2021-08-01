import { helloWorld } from '@roleypoly/interactions/handlers/interactions/hello-world';
import { pickableRoles } from '@roleypoly/interactions/handlers/interactions/pickable-roles';
import { roleypoly } from '@roleypoly/interactions/handlers/interactions/roleypoly';
import { verifyRequest } from '@roleypoly/interactions/utils/interactions';
import { somethingWentWrong } from '@roleypoly/interactions/utils/responses';
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
  roleypoly: roleypoly,
  'pickable-roles': pickableRoles,
};

export const interactionHandler = async (request: Request): Promise<Response> => {
  const interaction = (await request.json()) as InteractionRequest;

  if (!verifyRequest(request, interaction)) {
    return new Response('invalid request signature', { status: 401 });
  }

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
    console.error(e);
    return respond(somethingWentWrong());
  }
};
