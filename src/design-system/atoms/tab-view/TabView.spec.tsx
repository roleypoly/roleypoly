import * as React from 'react';
import { shallow } from 'enzyme';
import { TabView, Tab, TabViewProps } from './TabView';
import { TabTitle, TabContent } from './TabView.styled';

const makeView = (props: Partial<TabViewProps> = {}) =>
    shallow(
        <TabView {...props}>
            {{
                'Tab 1': <Tab>{() => <div>tab 1</div>}</Tab>,
                'Tab 2': <Tab>{() => <div>tab 2</div>}</Tab>,
            }}
        </TabView>
    );

it('renders tab content correctly', () => {
    const view = makeView();

    expect(view.find(Tab).renderProp('children')().text()).toBe('tab 1');
});

it('automatically picks preselected tab content', () => {
    const view = makeView({ initialTab: 'Tab 2' });

    expect(view.find(Tab).renderProp('children')().text()).toBe('tab 2');
});

it('automatically uses the first tab when preselected tab is not present', () => {
    const view = makeView({ initialTab: 'Not a Tab' });

    view.find(TabContent).find('i').simulate('load');
    expect(view.find(Tab).renderProp('children')().text()).toBe('tab 1');
});

it('changes between tabs when tab is clicked', () => {
    const view = makeView();

    view.find(TabTitle).at(1).simulate('click');

    expect(view.find(Tab).renderProp('children')().text()).toBe('tab 2');
});
