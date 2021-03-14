import { Content } from '@roleypoly/design-system/organisms/app-shell/AppShell.styled';
import * as React from 'react';
import { HelpPageBase } from './HelpPageBase';

export const HelpStoryWrapper = (storyFn: any): React.ReactNode => (
  <Content>
    <HelpPageBase>{storyFn()}</HelpPageBase>
  </Content>
);
