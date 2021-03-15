import { GenericLoadingTemplate } from '@roleypoly/design-system/templates/generic-loading';
import React from 'react';

const Logout = () => {
  React.useEffect(() => {
    localStorage.removeItem('rp_session_key');
    sessionStorage.clear();
    window.location.href = '/';
  }, []);

  return <GenericLoadingTemplate>Logging you out...</GenericLoadingTemplate>;
};

export default Logout;
