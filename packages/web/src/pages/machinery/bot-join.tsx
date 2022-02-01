import { GenericLoadingTemplate } from '@roleypoly/design-system/templates/generic-loading';
import * as React from 'react';
import { useApiContext } from '../../contexts/api/ApiContext';

const BotJoin = (props: { serverID: string; path: string }) => {
  const { apiUrl } = useApiContext();
  let params = '';
  if (props.serverID) {
    params = `?guild=${props.serverID}`;
  }

  React.useEffect(() => {
    window.location.href = `${apiUrl}/auth/bot${params}`;
  }, [apiUrl, params]);

  return <GenericLoadingTemplate />;
};

export default BotJoin;
