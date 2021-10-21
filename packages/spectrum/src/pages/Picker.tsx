import { RouteComponentProps, useParams } from '@reach/router';
import { Display1 } from 'baseui/typography';

type PickerProps = RouteComponentProps;

export const Picker = (props: PickerProps) => {
  const { serverID } = useParams();

  return <Display1>hello {serverID}</Display1>;
};
