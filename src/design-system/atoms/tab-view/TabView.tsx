import * as React from 'react';
import { TabTitleRow, TabContent, TabViewStyled, TabTitle } from './TabView.styled';

export type TabViewProps = {
    children: { [title: string]: React.ReactNode };
    initialTab?: string;
};

type TabProps = {
    children: () => React.ReactNode;
};

export const TabView = (props: TabViewProps) => {
    const tabNames = Object.keys(props.children);

    if (tabNames.length === 0) {
        return null;
    }

    const [currentTab, setCurrentTab] = React.useState<keyof TabViewProps['children']>(
        props.initialTab ?? tabNames[0]
    );

    return (
        <TabViewStyled>
            <TabTitleRow>
                {tabNames.map((tabName, idx) => (
                    <TabTitle
                        selected={currentTab === tabName}
                        onClick={() => setCurrentTab(tabName)}
                        key={`tab${tabName}${idx}`}
                    >
                        {tabName}
                    </TabTitle>
                ))}
            </TabTitleRow>
            <TabContent>
                {props.children[currentTab] || (
                    <i onLoad={() => setCurrentTab(tabNames[0])}>
                        Tabs were misconfigured, resetting to zero.
                    </i>
                )}
            </TabContent>
        </TabViewStyled>
    );
};

export const Tab = (props: TabProps) => <div>{props.children()}</div>;
