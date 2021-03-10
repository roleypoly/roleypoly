import { InjectTypekitFont } from '@roleypoly/design-system/atoms/fonts';
import { AppProps } from 'next/app';
import * as React from 'react';

type Props = AppProps & {
    sessionKey: string | null;
};

const App = (props: Props) => (
    <>
        <InjectTypekitFont />
        <props.Component {...props.pageProps} />
    </>
);
export default App;
