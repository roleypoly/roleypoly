import * as React from 'react';

const NewSession = () => {
    React.useEffect(() => {
        const url = new URL(window.location.href);
        const id = url.searchParams.get('session_id');
        if (id) {
            localStorage.setItem('rp_session_key', id);

            const redirectUrl = localStorage.getItem('rp_postauth_redirect');
            window.location.href = redirectUrl || '/';
        }
    });

    return <div>Redirecting you...</div>;
};

export default NewSession;
