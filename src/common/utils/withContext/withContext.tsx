import * as React from 'react';

export const withContext = <T, K extends T>(
    Context: React.Context<T>,
    Component: React.ComponentType<K>
): React.FunctionComponent<K> => (props) => (
    <Context.Consumer>
        {(context) => <Component {...props} {...context} />}
    </Context.Consumer>
);
