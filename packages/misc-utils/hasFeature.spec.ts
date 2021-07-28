import { Features } from '@roleypoly/types';
import { hasFeature } from './hasFeature';

it('correctly matches against features', () => {
  const features = Features.LegacyGuild;
  expect(hasFeature(Features.LegacyGuild, features)).toBe(true);
  expect(hasFeature(Features.LegacyGuild, Features.None)).toBe(false);
});
