import { DotOverlay } from 'roleypoly/src/design-system/atoms/dot-overlay';
import { Hero } from 'roleypoly/src/design-system/atoms/hero';
import { AppShell } from 'roleypoly/src/design-system/organisms/app-shell';
import * as React from 'react';
import { ErrorMessage, getMessageFromCode } from './errorStrings';
import { ErrorBanner } from 'roleypoly/src/design-system/organisms/error-banner';
import { RoleypolyUser } from '@roleypoly/rpc/shared';

export type ErrorProps = {
    code: string | number;
    messageOverride?: ErrorMessage;
    user?: RoleypolyUser.AsObject | null;
};

export const Error = (props: ErrorProps) => {
    const messageFromCode = getMessageFromCode(props.code);

    return (
        <AppShell user={props.user || null}>
            <DotOverlay />
            <Hero topSpacing={100} bottomSpacing={25}>
                <ErrorBanner message={messageFromCode} />
            </Hero>
        </AppShell>
    );
};
