import { AppShell } from '@roleypoly/design-system/organisms/app-shell';
import { Landing } from '@roleypoly/design-system/organisms/landing';
import * as React from 'react';

export const LandingTemplate = (props: any) => (
  <AppShell showFooter {...props}>
    <Landing />
  </AppShell>
);
