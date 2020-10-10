import * as React from 'react';
import { TabView, Tab } from './TabView';

export default {
    title: 'Atoms/Tab View',
    argTypes: {
        tabCount: { control: 'range', min: 1, max: 100 },
    },
    args: {
        tabCount: 10,
    },
};

export const ManyTabs = ({ tabCount }) => {
    const tabs = [...'0'.repeat(tabCount)].reduce(
        (acc, _, idx) => ({
            ...acc,
            [`Tab ${idx + 1}`]: <Tab>{() => <div>tab {idx + 1}</div>}</Tab>,
        }),
        {}
    );

    return <TabView>{tabs}</TabView>;
};
