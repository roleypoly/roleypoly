import * as React from 'react';

type AuthContextType = {
    sessionKey: string | null;
    setSessionKey: (value: string | null) => void;
};

type Props = {
    sessionKey: string | null;
    children: React.ReactNode;
};

const AuthContext = React.createContext<AuthContextType>({
    sessionKey: null,
    setSessionKey: () => {},
});

export const AuthProvider = (props: Props) => {
    const [sessionKey, setSessionKey] = React.useState(props.sessionKey);

    return (
        <AuthContext.Provider value={{ sessionKey, setSessionKey }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authCtx = React.useContext(AuthContext);
    if (!authCtx) {
        throw new Error('useAuth used without AuthProvider');
    }

    return authCtx;
};

export const isAuthenticated = () => {
    const authCtx = useAuth();
    return authCtx.sessionKey !== null;
};

export const;
