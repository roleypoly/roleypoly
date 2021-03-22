import { Error } from '@roleypoly/design-system/templates/errors';
import { useAppShellProps } from '../contexts/app-shell/AppShellContext';

const ErrorPage = (props: { identity: string }) => {
  const appShellProps = useAppShellProps();

  return <Error code={props.identity} {...appShellProps} />;
};

export default ErrorPage;
