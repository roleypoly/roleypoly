import * as React from 'react';
import { atomStories } from 'atoms/atoms.story';
import { TabView, Tab } from './TabView';
import { number } from '@storybook/addon-knobs';

const story = atomStories('Tab View', module);

story.add('Multiple Tabs', () => (
    <TabView>
        {{
            'Tab 1': <Tab>{() => <div>tab 1</div>}</Tab>,
            'Tab 2': <Tab>{() => <div>tab 2</div>}</Tab>,
        }}
    </TabView>
));

story.add('Single Tab', () => (
    <TabView>
        {{
            'Tab 1': <Tab>{() => <div>tab 1</div>}</Tab>,
        }}
    </TabView>
));

story.add('Many Tabs', () => {
    const amount = number('Tab Count', 10);

    const tabs = [...'0'.repeat(amount)].reduce(
        (acc, _, idx) => ({
            ...acc,
            [`Tab ${idx + 1}`]: <Tab>{() => <div>tab {idx + 1}</div>}</Tab>,
        }),
        {}
    );

    return <TabView>{tabs}</TabView>;
});
