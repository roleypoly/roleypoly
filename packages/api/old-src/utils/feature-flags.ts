import { hasFeature } from '@roleypoly/misc-utils/hasFeature';
import { Features, Guild, GuildData } from '@roleypoly/types';

const flagPercents: Record<Features, { percent: number; rotation: number }> = {
  [Features.AuditLogging]: { percent: 0, rotation: 0 },
  [Features.AccessControl]: { percent: 0, rotation: 33 },
};

const testingGroup: Guild['id'][] = [
  '386659935687147521', // Roleypoly
];

const ONE_HUNDRED = BigInt(100);

export const getFeatureFlags = (
  feature: Features,
  guildData: GuildData
): Record<Features, boolean> => {
  const flags = Object.entries(flagPercents).map(([flag, value]) => {
    const intFlag = Number(flag);
    const intGuildID = BigInt(guildData.id);
    const rotation = BigInt(value.rotation);
    const percent = BigInt(value.percent);

    if (testingGroup.includes(guildData.id)) {
      return [intFlag, true];
    }

    const percentValue = (intGuildID + rotation) % ONE_HUNDRED;
    if (percentValue >= percent) {
      return [intFlag, true];
    }

    return [intFlag, hasFeature(feature, intFlag)];
  });

  return Object.fromEntries(flags);
};
