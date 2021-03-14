import * as React from 'react';

export type ContextShimProps<T> = {
  context: React.Context<T>;
  children: (data: T) => any;
};

export function ContextShim<T>(props: ContextShimProps<T>) {
  const context = React.useContext(props.context);
  return <>{props.children(context)}</>;
}
