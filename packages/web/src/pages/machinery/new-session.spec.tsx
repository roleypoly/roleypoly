import { render, screen } from '@testing-library/react';
import { useSessionContext } from '../../contexts/session/SessionContext';
import NewSession from './new-session';

const setupSessionMock = jest.fn();
(useSessionContext as jest.Mock) = jest.fn(() => ({
  setupSession: setupSessionMock,
  isAuthenticated: true,
}));

const testSessionID = 'sessionid1234';

it('sets up the session', () => {
  render(<NewSession sessionID={testSessionID} />);

  expect(useSessionContext).toBeCalled();
  expect(setupSessionMock).toBeCalledWith('sessionid1234');
});

it('redirects to the correct location when rp_postauth_redirect is set', async () => {
  localStorage.setItem('rp_postauth_redirect', '/hello_world');
  render(<NewSession sessionID={testSessionID} />);

  const bounceLink = screen.getByText("If you aren't redirected soon, click here.");
  expect(bounceLink.getAttribute('href')).toBe('/hello_world');
});

it('redirects to the correct location by default', async () => {
  localStorage.setItem('rp_postauth_redirect', '/servers');
  render(<NewSession sessionID={testSessionID} />);

  const bounceLink = screen.getByText("If you aren't redirected soon, click here.");
  expect(bounceLink.getAttribute('href')).toBe('/servers');
});
