import { Config } from '@roleypoly/api/src/utils/config';
import { getID } from '@roleypoly/api/src/utils/id';

export const setupStateSession = async <T>(config: Config, data: T): Promise<string> => {
  const stateID = getID();

  await config.kv.sessions.put(`state_${stateID}`, { data }, config.retention.session);

  return stateID;
};

export const getStateSession = async <T>(
  config: Config,
  stateID: string
): Promise<T | undefined> => {
  const stateSession = await config.kv.sessions.get<{ data: T }>(`state_${stateID}`);

  return stateSession?.data;
};
