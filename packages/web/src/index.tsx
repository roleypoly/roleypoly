import React from 'react';
import ReactDOM from 'react-dom';
import { AppRouter } from './app-router/AppRouter';
import { ApiContextProvider } from './contexts/api/ApiContext';
import { SessionContextProvider } from './contexts/session/SessionContext';

ReactDOM.render(
    <React.StrictMode>
        <ApiContextProvider>
            <SessionContextProvider>
                <AppRouter />
            </SessionContextProvider>
        </ApiContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
