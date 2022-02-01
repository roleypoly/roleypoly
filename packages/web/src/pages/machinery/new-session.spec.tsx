import { createHistory, createMemorySource, LocationProvider } from '@reach/router';
import { render, screen } from '@testing-library/react';
import { useSessionContext } from '../../contexts/session/SessionContext';
import NewSession from './new-session';

// for some types of tests you want a memory source
const testSessionID = 'sessionid1234';
let source = createMemorySource(`/machinery/new-session#/${testSessionID}`);
let history = createHistory(source);

beforeEach(() => {
  history.location.hash = `#/${testSessionID}`;
});

const setupSessionMock = jest.fn();
(useSessionContext as jest.Mock) = jest.fn(() => ({
  setupSession: setupSessionMock,
  isAuthenticated: true,
}));

it('sets up the session', () => {
  render(
    <LocationProvider history={history}>
      <NewSession />
    </LocationProvider>
  );

  expect(useSessionContext).toBeCalled();
  expect(setupSessionMock).toBeCalledWith('sessionid1234');
});

it('redirects to the correct location when rp_postauth_redirect is set', async () => {
  localStorage.setItem('rp_postauth_redirect', '/hello_world');
  render(
    <LocationProvider history={history}>
      <NewSession />
    </LocationProvider>
  );

  const bounceLink = screen.getByText("If you aren't redirected soon, click here.");
  expect(bounceLink.getAttribute('href')).toBe('/hello_world');
});

it('redirects to the correct location by default', async () => {
  localStorage.setItem('rp_postauth_redirect', '/servers');
  render(
    <LocationProvider history={history}>
      <NewSession />
    </LocationProvider>
  );

  const bounceLink = screen.getByText("If you aren't redirected soon, click here.");
  expect(bounceLink.getAttribute('href')).toBe('/servers');
});
