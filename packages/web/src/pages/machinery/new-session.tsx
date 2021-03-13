import * as React from 'react';

const NewSession = () => {
    React.useEffect(() => {
        const url = new URL(window.location.href);
        const id = url.searchParams.get('session_id');
        if (id) {
            window.location.href = '/';
            localStorage.setItem('rp_session_key', id);
        }
    });

    return <div>Redirecting you...</div>;
};

export default NewSession;
