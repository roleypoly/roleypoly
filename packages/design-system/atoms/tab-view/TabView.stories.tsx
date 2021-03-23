import * as React from 'react';
import { BreakpointsProvider } from '../breakpoints';
import { Tab, TabView } from './TabView';

export default {
  title: 'Atoms/Tab View',
  decorators: [(story) => <BreakpointsProvider>{story()}</BreakpointsProvider>],
  argTypes: {
    tabCount: { control: 'range', min: 1, max: 100 },
  },
  args: {
    tabCount: 10,
  },
};

export const ManyTabs = ({ tabCount }) => {
  const tabs = [...'0'.repeat(tabCount)].map((_, i) => (
    <Tab title={`tab ${i}`}>
      {() => (
        <>
          <p>tab {i}</p>
          <p>hello!!!!!</p>
        </>
      )}
    </Tab>
  ));

  return <TabView>{tabs}</TabView>;
};
