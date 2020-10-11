import * as React from 'react';
import { TabTitleRow, TabContent, TabViewStyled, TabTitle } from './TabView.styled';

export type TabViewProps = {
    children: React.ReactNode[];
    initialTab?: number;
};

type TabProps = {
    title: string;
    children: () => React.ReactNode;
};

export const TabView = (props: TabViewProps) => {
    const tabNames = React.Children.map(props.children, (child) => {
        if (!React.isValidElement(child)) {
            return '(Oops)';
        }

        return child.props.title;
    }) as string[];

    if (tabNames.length === 0) {
        return null;
    }

    const [currentTab, setCurrentTab] = React.useState<number>(props.initialTab ?? 0);

    return (
        <TabViewStyled>
            <TabTitleRow>
                {tabNames.map((tabName, idx) => (
                    <TabTitle
                        selected={currentTab === idx}
                        onClick={() => setCurrentTab(idx)}
                        key={`tab${tabName}${idx}`}
                    >
                        {tabName}
                    </TabTitle>
                ))}
            </TabTitleRow>
            <TabContent>
                {props.children[currentTab] || (
                    <i onLoad={() => setCurrentTab(0)}>
                        Tabs were misconfigured, resetting to zero.
                    </i>
                )}
            </TabContent>
        </TabViewStyled>
    );
};

export const Tab = (props: TabProps) => <div>{props.children()}</div>;
