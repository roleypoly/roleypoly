import * as React from 'react';
import { BreakpointsProvider } from './BreakpointProvider';
import { BreakpointDebugTool } from './DebugTool';

export default {
    title: 'Atoms/Breakpoints',
    decorators: [(story) => <BreakpointsProvider>{story()}</BreakpointsProvider>],
    component: BreakpointDebugTool,
};

export const DebugTool = () => <BreakpointDebugTool />;
