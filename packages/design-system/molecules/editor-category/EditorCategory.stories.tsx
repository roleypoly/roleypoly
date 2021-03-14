import * as React from 'react';
import { mockCategory, roleCategory, roleCategory2 } from '../../fixtures/storyData';
import { EditorCategory } from './EditorCategory';

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
