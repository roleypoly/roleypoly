import { AppProps } from 'next/app';
import * as React from 'react';
import { InjectTypekitFont } from 'roleypoly/design-system/atoms/fonts';

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
