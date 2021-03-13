import * as React from 'react';
import { getDefaultApiUrl } from './getDefaultApiUrl';

type ApiContextData = {
    apiUrl: string;
    setApiUrl: (url: string) => void;
    fetch: (path: string, ...rest: any) => Promise<Response>;
};

export const ApiContext = React.createContext<ApiContextData>({
    apiUrl: getDefaultApiUrl(window.location.hostname),
    setApiUrl: () => {},
    fetch: async () => {
        return new Response();
    },
});

export const useApiContext = () => React.useContext(ApiContext);

export const ApiContextProvider = (props: { children: React.ReactNode }) => {
    const [apiUrl, setApiUrl] = React.useState(
        getDefaultApiUrl(window.location.hostname)
    );

    const apiContextData: ApiContextData = {
        apiUrl,
        setApiUrl,
        fetch: async (path: string, ...rest: any): Promise<Response> => {
            return fetch(`${apiUrl}${path}`, ...rest);
        },
    };

    React.useEffect(() => {
        const storedApiUrl = localStorage.getItem('api_url');
        if (storedApiUrl) {
            setApiUrl(storedApiUrl);
        }
    }, []);

    React.useEffect(() => {
        localStorage.setItem('api_url', apiUrl);
    }, [apiUrl]);

    return (
        <ApiContext.Provider value={apiContextData}>{props.children}</ApiContext.Provider>
    );
};
