import * as React from 'react';
import { EditorCategory } from './EditorCategory';
import {
    mockCategory,
    roleCategory2,
    roleCategory,
    guildRoles,
} from 'roleypoly/src/design-system/shared-types/storyData';

export default {
    title: 'Molecules/Editor/Category',
};

export const CategoryEditor = () => {
    const [categoryData, setCategoryData] = React.useState(mockCategory);
    return (
        <EditorCategory
            category={categoryData}
            onChange={(category) => setCategoryData(category)}
            uncategorizedRoles={roleCategory}
            guildRoles={[...roleCategory, ...roleCategory2]}
        />
    );
};
