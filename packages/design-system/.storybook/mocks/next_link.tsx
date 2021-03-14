import * as React from 'react';

type Props = {
  children: React.ReactNode;
};
const Link = (props: Props) => <>{props.children}</>;

export default Link;
