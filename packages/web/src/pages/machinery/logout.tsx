import React from 'react';

const Logout = () => {
  React.useEffect(() => {
    localStorage.removeItem('rp_session_key');
    sessionStorage.clear();
    window.location.href = '/';
  }, []);

  return <div>Logging you out...</div>;
};

export default Logout;
