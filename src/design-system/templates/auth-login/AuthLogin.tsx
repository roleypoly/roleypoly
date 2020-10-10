import { Hero } from 'atoms/hero';
import { AppShell } from 'organisms/app-shell';
import { Preauth, PreauthProps } from 'organisms/preauth/Preauth';
import * as React from 'react';

export type AuthLoginProps = PreauthProps;

export const AuthLogin = (props: AuthLoginProps) => (
    <AppShell showFooter user={null}>
        <Hero topSpacing={100} bottomSpacing={175}>
            <Preauth {...props} />
        </Hero>
    </AppShell>
);
