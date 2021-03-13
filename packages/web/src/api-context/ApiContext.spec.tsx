import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { ApiContextProvider, useApiContext } from './ApiContext';

const fetchMock = (global.fetch = jest
    .fn()
    .mockImplementation(() => ({ json: async () => ({}) })));

const TestComponent = () => {
    const context = useApiContext();

    React.useEffect(() => {
        void context.fetch('/not-a-route');
    });

    return <>{context.apiUrl}</>;
};

const WrappedTestComponent = () => (
    <ApiContextProvider>
        <TestComponent />
    </ApiContextProvider>
);

it('correctly does fetch url requests', () => {
    render(<WrappedTestComponent />);

    expect(fetchMock).toBeCalledWith('http://localhost:6609/not-a-route');
});

it('sets up api context when localStorage is set', () => {
    localStorage.setItem('api_url', 'https://abcde.roleypoly.test');
    render(<WrappedTestComponent />);

    expect(fetchMock).toBeCalledWith('https://abcde.roleypoly.test/not-a-route');
    expect(screen.getByText('https://abcde.roleypoly.test').innerHTML).toStrictEqual(
        'https://abcde.roleypoly.test'
    );
});

it.each([
    ['https://next.roleypoly.com/servers', 'https://api-prod.roleypoly.com'],
    ['https://roleypoly.com/servers', 'https://api-prod.roleypoly.com'],
    ['https://notroleypolybutclose.com/servers', 'https://api-prod.roleypoly.com'],
    ['https://myhash.roleypoly.pages.dev/servers', 'https://api-stage.roleypoly.com'],
    ['http://localhost:6601/servers', 'http://localhost:6609'],
    ['http://127.0.0.1:6601/servers', 'http://localhost:6609'],
])('sets up api context based on window.location.href = %s', (inputUrl, outputUrl) => {
    // @ts-ignore
    delete window.location;
    window.location = new URL(inputUrl) as any;

    render(<WrappedTestComponent />);

    expect(fetchMock).toBeCalledWith(`${outputUrl}/not-a-route`);
    expect(screen.getByText(outputUrl).innerHTML).toStrictEqual(outputUrl);
});

const originalWindowLocation = window.location;

afterEach(() => {
    localStorage.clear();
    fetchMock.mockClear();
    window.location = originalWindowLocation;
});
