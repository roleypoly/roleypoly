import * as React from 'react';
import { Tab, TabView } from './TabView';

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
    const tabs = [...'0'.repeat(tabCount)].map((_, i) => (
        <Tab title={`tab ${i}`}>
            {() => (
                <>
                    <h1>tab {i}</h1>
                    <p>hello!!!!!</p>
                </>
            )}
        </Tab>
    ));

    return <TabView>{tabs}</TabView>;
};
