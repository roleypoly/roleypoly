import * as React from 'react';
import { roleCategory } from 'roleypoly/common/types/storyData';
import { RoleSearch } from './RoleSearch';

export default {
    title: 'Molecules/Role Search',
    component: RoleSearch,
    args: {
        roles: roleCategory,
        searchTerm: '',
    },
};

export const Search = (args) => <RoleSearch {...args} />;
