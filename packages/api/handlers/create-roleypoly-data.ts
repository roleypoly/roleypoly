import { CategoryType, Features, GuildData as GuildDataT } from '@roleypoly/types';
import KSUID from 'ksuid';
import { onlyRootUsers, respond } from '../utils/api-tools';
import { GuildData } from '../utils/kv';

// Temporary use.
export const CreateRoleypolyData = onlyRootUsers(
  async (request: Request): Promise<Response> => {
    const data: GuildDataT = {
      id: '386659935687147521',
      message:
        'Hey, this is kind of a demo setup so features/use cases can be shown off.\n\nThanks for using Roleypoly <3',
      features: Features.Preview,
      auditLogWebhook: null,
      categories: [
        {
          id: KSUID.randomSync().string,
          name: 'Demo Roles',
          type: CategoryType.Multi,
          hidden: false,
          position: 0,
          roles: [
            '557825026406088717',
            '557824994269200384',
            '557824893241131029',
            '557812915386843170',
            '557812901717737472',
            '557812805546541066',
          ],
        },
        {
          id: KSUID.randomSync().string,
          name: 'Colors',
          type: CategoryType.Single,
          hidden: false,
          position: 1,
          roles: ['394060232893923349', '394060145799331851', '394060192846839809'],
        },
        {
          id: KSUID.randomSync().string,
          name: 'Test Roles',
          type: CategoryType.Multi,
          hidden: false,
          position: 5,
          roles: ['558104828216213505', '558103534453653514', '558297233582194728'],
        },
        {
          id: KSUID.randomSync().string,
          name: 'Region',
          type: CategoryType.Multi,
          hidden: false,
          position: 3,
          roles: [
            '397296181803483136',
            '397296137066774529',
            '397296218809827329',
            '397296267283267605',
          ],
        },
        {
          id: KSUID.randomSync().string,
          name: 'Opt-in Channels',
          type: CategoryType.Multi,
          hidden: false,
          position: 4,
          roles: ['414514823959674890', '764230661904007219'],
        },
        {
          id: KSUID.randomSync().string,
          name: 'Pronouns',
          type: CategoryType.Multi,
          hidden: false,
          position: 2,
          roles: ['485916566790340608', '485916566941335583', '485916566311927808'],
        },
      ],
    };

    await GuildData.put(data.id, data);

    return respond({ ok: true });
  }
);
