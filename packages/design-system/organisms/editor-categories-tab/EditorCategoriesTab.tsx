import { TabDepth } from '@roleypoly/design-system/atoms/tab-view/TabView.styled';
import { EditorCategory } from '@roleypoly/design-system/molecules/editor-category';
import { EditorCategoryShort } from '@roleypoly/design-system/molecules/editor-category-short/EditorCategoryShort';
import { EditorShellProps } from '@roleypoly/design-system/organisms/editor-shell';
import { Category } from '@roleypoly/types';
import { sortBy } from 'lodash';
import * as React from 'react';
import { CategoryContainer } from './EditorCategoriesTab.styled';

export const EditorCategoriesTab = (props: EditorShellProps) => {
  const [openStates, setOpenStates] = React.useState<Category['id'][]>([]);

  const onCategoryOpen = (id: Category['id']) => () => {
    setOpenStates([...new Set(openStates).add(id)]);
  };

  return (
    <TabDepth>
      {sortBy(props.guild.data.categories, ['position', 'id']).map((category, idx) =>
        openStates.includes(category.id) ? (
          <CategoryContainer key={idx}>
            <EditorCategory
              category={category}
              uncategorizedRoles={[]}
              guildRoles={props.guild.roles}
              onChange={(category) => props.onCategoryChange?.(category)}
            />
          </CategoryContainer>
        ) : (
          <EditorCategoryShort
            key={idx}
            category={category}
            onOpen={onCategoryOpen(category.id)}
          />
        )
      )}
    </TabDepth>
  );
};
