import { verifyRequest } from '@roleypoly/api/src/routes/interactions/helpers';
import { Context, RoleypolyHandler } from '@roleypoly/api/src/utils/context';
import { invalid, json } from '@roleypoly/api/src/utils/response';
import { InteractionRequest, InteractionType } from '@roleypoly/types';

export const handleInteraction: RoleypolyHandler = async (
  request: Request,
  context: Context
) => {
  const interaction: InteractionRequest = await request.json();
  if (!interaction) {
    return invalid();
  }

  if (!(await verifyRequest(context.config, request, interaction))) {
    return new Response('invalid request signature', { status: 401 });
  }

  if (interaction.type !== InteractionType.APPLICATION_COMMAND) {
    return json({ err: 'not implemented' }, { status: 400 });
  }

  if (!interaction.data) {
    return json({ err: 'data missing' }, { status: 400 });
  }

  return json({});
};
