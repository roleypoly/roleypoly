import * as React from 'react';
import {
    roleWikiData,
    roleCategory,
    mockCategory,
} from 'roleypoly/src/design-system/shared-types/storyData';
import { PickerCategory } from './PickerCategory';

export default {
    title: 'Molecules/Picker Category',
    component: PickerCategory,
    args: {
        title: 'Pronouns',
        roles: roleCategory,
        category: mockCategory,
        selectedRoles: [],
    },
};

export const Default = (args) => {
    return <PickerCategory {...args} />;
};
export const Single = (args) => {
    return <PickerCategory {...args} type="single" />;
};
Single.args = {
    type: 'single',
};
export const Multi = (args) => {
    return <PickerCategory {...args} type="single" />;
};
Multi.args = {
    type: 'multi',
};

export const Wiki = (args) => {
    return <PickerCategory {...args} wikiMode roleWikiData={roleWikiData} />;
};
