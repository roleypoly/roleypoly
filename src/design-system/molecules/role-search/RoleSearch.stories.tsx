import * as React from 'react';
import { RoleSearch } from './RoleSearch';
import { roleCategory } from 'roleypoly/src/design-system/shared-types/storyData';

export default {
    title: 'Molecules/Role Search',
    component: RoleSearch,
    args: {
        roles: roleCategory,
        searchTerm: '',
    },
};

export const Search = (args) => <RoleSearch {...args} />;
