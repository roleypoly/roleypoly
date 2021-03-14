import { render } from '@testing-library/react';
import Logout from './logout';

it('removes session state from storage', () => {
  localStorage.setItem('rp_session_key', 'sessionKey');
  sessionStorage.setItem(
    'rp_session_data',
    JSON.stringify({ user: { name: 'okano', discriminator: '0001' }, guilds: [] })
  );

  render(<Logout />);

  expect(localStorage.getItem('rp_session_key')).toBeNull();
  expect(sessionStorage.getItem('rp_session_data')).toBeNull();
});
