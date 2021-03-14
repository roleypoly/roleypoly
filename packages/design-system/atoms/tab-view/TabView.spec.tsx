import { shallow } from 'enzyme';
import * as React from 'react';
import { Tab, TabView, TabViewProps } from './TabView';
import { TabContent, TabTitle } from './TabView.styled';

const makeView = (props: Partial<TabViewProps> = {}) =>
  shallow(
    <TabView {...props}>
      <Tab title="Tab 1">{() => <div>tab 1</div>}</Tab>
      <Tab title="Tab 2">{() => <div>tab 2</div>}</Tab>,
    </TabView>
  );

it('renders tab content correctly', () => {
  const view = makeView();

  expect(view.find(Tab).renderProp('children')().text()).toBe('tab 1');
});

it('automatically picks preselected tab content', () => {
  const view = makeView({ initialTab: 1 });

  expect(view.find(Tab).renderProp('children')().text()).toBe('tab 2');
});

it('automatically uses the first tab when preselected tab is not present', () => {
  const view = makeView({ initialTab: -1 });

  view.find(TabContent).find('i').simulate('load');
  expect(view.find(Tab).renderProp('children')().text()).toBe('tab 1');
});

it('changes between tabs when tab is clicked', () => {
  const view = makeView();

  view.find(TabTitle).at(1).simulate('click');

  expect(view.find(Tab).renderProp('children')().text()).toBe('tab 2');
});
