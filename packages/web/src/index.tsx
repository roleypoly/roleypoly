import React from 'react';
import ReactDOM from 'react-dom';
import { ApiContextProvider } from './api-context/ApiContext';
import { AppRouter } from './app-router/AppRouter';
import { SessionContextProvider } from './session-context/SessionContext';

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
