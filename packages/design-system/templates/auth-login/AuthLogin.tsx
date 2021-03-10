import { Hero } from '@roleypoly/design-system/atoms/hero';
import { AppShell } from '@roleypoly/design-system/organisms/app-shell';
import { Preauth, PreauthProps } from '@roleypoly/design-system/organisms/preauth';
import * as React from 'react';

export type AuthLoginProps = PreauthProps;

export const AuthLogin = (props: AuthLoginProps) => (
    <AppShell showFooter user={undefined}>
        <Hero topSpacing={100} bottomSpacing={175}>
            <Preauth {...props} />
        </Hero>
    </AppShell>
);
