import { Error } from '@roleypoly/design-system/templates/errors';
import { NextPageContext } from 'next';
import * as React from 'react';

type Props = {
    errorCode: string | number | any;
};

const ErrorPage = (props: Props) => <Error code={props.errorCode} />;

ErrorPage.getInitialProps = (context: NextPageContext): Props => {
    return {
        errorCode: context.err || context.query.error_code,
    };
};

export default ErrorPage;
