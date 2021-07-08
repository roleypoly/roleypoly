import { BreakpointsProvider } from '@roleypoly/design-system/atoms/breakpoints';
import { guildEnum } from '@roleypoly/design-system/fixtures/storyData';
import * as React from 'react';
import ReactTooltip from 'react-tooltip';
import { EditorShell } from './EditorShell';

export default {
  title: 'Organisms/Editor',
  component: EditorShell,
  decorators: [
    (story) => (
      <BreakpointsProvider>
        {story()}
        <ReactTooltip />
      </BreakpointsProvider>
    ),
  ],
};

export const Shell = () => <EditorShell guild={guildEnum.guilds[0]} />;
