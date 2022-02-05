import { InteractionHandler } from '@roleypoly/api/src/routes/interactions/helpers';
import { rolePickerCommon } from '@roleypoly/api/src/routes/interactions/role-picker-common';
import { Context } from '@roleypoly/api/src/utils/context';
import {
  InteractionRequest,
  InteractionResponse,
  TransactionType,
} from '@roleypoly/types';

export const removeRole: InteractionHandler = async (
  interaction: InteractionRequest,
  context: Context
): Promise<InteractionResponse> => {
  return rolePickerCommon(interaction, context, TransactionType.Remove);
};

removeRole.ephemeral = true;
removeRole.deferred = true;
