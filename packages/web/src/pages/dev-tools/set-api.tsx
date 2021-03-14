import { navigate } from '@reach/router';
import * as React from 'react';
import { useApiContext } from '../../contexts/api/ApiContext';

const SetApi = () => {
  const apiContext = useApiContext();
  const [apiField, setApiField] = React.useState(apiContext.apiUrl);

  const setApi = () => {
    // Clear storage to get rid of old API data
    localStorage.clear();
    sessionStorage.clear();

    apiContext.setApiUrl(apiField);

    navigate('/');
  };

  const quickSettingClick = (url: string) => () => {
    setApiField(url);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={apiField}
          onChange={(ev) => {
            setApiField(ev.target.value);
          }}
        />
        <button onClick={setApi}>Set &amp; Go</button>
      </div>
      <div>
        Quick Settings:
        <button onClick={quickSettingClick('https://api-prod.roleypoly.com')}>
          Production (api-prod)
        </button>
        <button onClick={quickSettingClick('https://api-stage.roleypoly.com')}>
          Staging (api-stage)
        </button>
        <button onClick={quickSettingClick('http://localhost:6609')}>
          Local (:6609)
        </button>
      </div>
    </div>
  );
};

export default SetApi;
