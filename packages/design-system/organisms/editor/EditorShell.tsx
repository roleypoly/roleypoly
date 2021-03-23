import { Tab, TabView } from '@roleypoly/design-system/atoms/tab-view';
import { EditorCategory } from '@roleypoly/design-system/molecules/editor-category';
import { PresentableGuild } from '@roleypoly/types';
import { CategoryContainer } from './EditorShell.styled';

type Props = {
  guild: PresentableGuild;
};

export const EditorShell = (props: Props) => (
  <TabView initialTab={0}>
    <Tab title="Roles">{() => <RolesTab {...props} />}</Tab>
    <Tab title="Server Details">{() => <div>hi2!</div>}</Tab>
  </TabView>
);

const RolesTab = (props: Props) => (
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
