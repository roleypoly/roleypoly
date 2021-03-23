import { useState } from 'react';
import { BreakpointsProvider } from '../breakpoints/BreakpointProvider';
import { QuickNav, QuickNavCollapsed, QuickNavExpanded, QuickNavProps } from './QuickNav';

export default {
  title: 'Atoms/Quick Nav',
  component: QuickNav,
  decorators: [(story) => <BreakpointsProvider>{story()}</BreakpointsProvider>],
  args: {
    navItems: ['AAAA', 'BBBB', 'CCCC'],
    currentNavItem: 'AAAA',
  },
};

const stateWrapper = (args: QuickNavProps, Component: typeof QuickNav) => {
  const [currentNavItem, setCurrentNavItem] = useState(args.currentNavItem);
  return (
    <Component
      {...args}
      currentNavItem={currentNavItem}
      onNavChange={(newNavItem) => {
        setCurrentNavItem(newNavItem);
        args.onNavChange(newNavItem);
      }}
    ></Component>
  );
};

export const quickNav = (args) => stateWrapper(args, QuickNav);
export const expanded = (args) => stateWrapper(args, QuickNavExpanded);
export const collapsed = (args) => stateWrapper(args, QuickNavCollapsed);
