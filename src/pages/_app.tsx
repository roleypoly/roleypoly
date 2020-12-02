import { AppProps } from 'next/app';
import * as React from 'react';
import { InjectTypekitFont } from 'roleypoly/design-system/atoms/fonts';

const App = (props: AppProps) => (
    <>
        <InjectTypekitFont />
        <props.Component {...props.pageProps} />
    </>
);
export default App;
