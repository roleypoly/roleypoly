import * as React from 'react';
import { DotOverlay } from 'roleypoly/design-system/atoms/dot-overlay';
import { Hero } from 'roleypoly/design-system/atoms/hero';
import {
    ErrorBanner,
    ErrorMessage,
} from 'roleypoly/design-system/molecules/error-banner';
import { AppShell } from 'roleypoly/design-system/organisms/app-shell';
import { RoleypolyUser } from 'roleypoly/common/types';
import { getMessageFromCode } from './errorStrings';

export type ErrorProps = {
    code: string | number;
    messageOverride?: ErrorMessage;
    user?: RoleypolyUser | null;
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
