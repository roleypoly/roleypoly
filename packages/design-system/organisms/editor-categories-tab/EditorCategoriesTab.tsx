import { EditorCategory } from '@roleypoly/design-system/molecules/editor-category';
import { EditorShellProps } from '@roleypoly/design-system/organisms/editor-shell';
import { CategoryContainer } from './EditorCategoriesTab.styled';

export const EditorCategoriesTab = (props: EditorShellProps) => (
  <div>
    {props.guild.data.categories.map((category, idx) => (
      <CategoryContainer key={idx}>
        <EditorCategory
          category={category}
          uncategorizedRoles={[]}
          guildRoles={props.guild.roles}
          onChange={(x) => console.log(x)}
        />
      </CategoryContainer>
    ))}
  </div>
);
