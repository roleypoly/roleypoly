import * as React from 'react';
import { TabView, Tab } from 'roleypoly/design-system/atoms/tab-view';
import { PresentableGuild } from 'roleypoly/common/types';
import { EditorCategory } from '../../molecules/editor-category';
import { CategoryContainer } from './EditorShell.styled';

type Props = {
    guild: PresentableGuild;
};

export const EditorShell = (props: Props) => (
    <TabView selected={0}>
        <Tab title="Roles">{() => <RolesTab {...props} />}</Tab>
        <Tab title="Server Details">{() => <div>hi2!</div>}</Tab>
    </TabView>
);

const RolesTab = (props: Props) => (
    <div>
        {props.guild.data.categoriesList.map((category, idx) => (
            <CategoryContainer key={idx}>
                <EditorCategory
                    category={category}
                    uncategorizedRoles={[]}
                    guildRoles={props.guild.roles.rolesList}
                    onChange={(x) => console.log(x)}
                />
            </CategoryContainer>
        ))}
    </div>
);
