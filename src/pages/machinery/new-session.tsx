import { NextPageContext } from 'next';
import * as React from 'react';

type Props = {
    sessionID: string;
};

const NewSession = (props: Props) => {
    const { sessionID } = props;
    React.useEffect(() => {
        sessionStorage.setItem('session_key', sessionID);
        location.href = '/';
    }, [sessionID]);

    return <div>Logging you in...</div>;
};

NewSession.getInitialProps = (context: NextPageContext): Props => {
    const sessionID = context.query.session_id;
    if (!sessionID) {
        throw new Error("I shouldn't be here today.");
    }

    return { sessionID: sessionID as string };
};

export default NewSession;
