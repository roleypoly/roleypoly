import * as React from 'react';
import { BreakpointDebugTool } from './DebugTool';
import { BreakpointsProvider } from './BreakpointProvider';

export default {
    title: 'Atoms/Breakpoints',
    decorators: [(story) => <BreakpointsProvider>{story()}</BreakpointsProvider>],
    component: BreakpointDebugTool,
};

export const DebugTool = () => <BreakpointDebugTool />;
