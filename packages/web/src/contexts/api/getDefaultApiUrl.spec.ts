import { getDefaultApiUrl } from './getDefaultApiUrl';

it.each([
  ['https://next.roleypoly.com/servers', 'https://api-prod.roleypoly.com'],
  ['https://stage.roleypoly.com/servers', 'https://api-stage.roleypoly.com'],
  ['https://roleypoly.com/servers', 'https://api-prod.roleypoly.com'],
  ['https://notroleypolybutclose.com/servers', 'https://api-prod.roleypoly.com'],
  ['https://myhash.roleypoly.pages.dev/servers', 'https://api-stage.roleypoly.com'],
  ['http://localhost:6601/servers', 'http://localhost:6609'],
  ['http://127.0.0.1:6601/servers', 'http://localhost:6609'],
])('matches %s to %s', (inputUrl, outputUrl) => {
  const urlHostname = new URL(inputUrl).hostname;

  expect(getDefaultApiUrl(urlHostname)).toStrictEqual(outputUrl);
});
