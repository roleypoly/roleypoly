import { Space } from '@roleypoly/design-system/atoms/space';
import { PickerCategory } from '@roleypoly/design-system/molecules/picker-category';
import { ServerMasthead } from '@roleypoly/design-system/molecules/server-masthead';
import { SecondaryEditing } from '@roleypoly/design-system/organisms/masthead';
import {
  CategoryContainer,
  Container,
  MessageBox,
} from '@roleypoly/design-system/organisms/role-picker/RolePicker.styled';
import { ReactifyNewlines } from '@roleypoly/misc-utils/ReactifyNewlines';
import { Category, CategoryType, PresentableGuild, Role } from '@roleypoly/types';
import deepEqual from 'deep-equal';
import { sortBy } from 'lodash';
import React from 'react';

export type EditorShellProps = {
  guild: PresentableGuild;
  onGuildChange?: (guild: PresentableGuild) => void;
  onCategoryChange?: (category: Category) => void;
  onMessageChange?: (message: PresentableGuild['data']['message']) => void;
};

export const EditorShell = (props: EditorShellProps) => {
  const [guild, setGuild] = React.useState<PresentableGuild>(props.guild);

  const reset = () => {
    setGuild(props.guild);
  };

  const onCategoryChange = (category: Category) => {
    setGuild((currentGuild) => {
      const categories = [
        ...currentGuild.data.categories.filter((x) => x.id !== category.id),
        category,
      ];
      return { ...currentGuild, data: { ...currentGuild.data, categories } };
    });
  };

  const onMessageChange = (message: PresentableGuild['data']['message']) => {
    setGuild((currentGuild) => {
      return { ...currentGuild, data: { ...guild.data, message } };
    });
  };

  const hasChanges = React.useMemo(
    () => !deepEqual(guild.data, props.guild.data),
    [guild.data, props.guild.data]
  );

  return (
    <>
      <SecondaryEditing showReset={hasChanges} guild={props.guild.guild} />
      <Container style={{ marginTop: 90 }}>
        <Space />
        <ServerMasthead guild={props.guild.guild} editable={false} />
        <Space />

        <MessageBox>
          <ReactifyNewlines>{props.guild.data.message}</ReactifyNewlines>
        </MessageBox>
        <Space />

        <div>
          {sortBy(props.guild.data.categories, 'position').map((category, idx) => (
            <CategoryContainer key={idx}>
              <PickerCategory
                key={idx}
                category={category}
                title={category.name}
                selectedRoles={[]}
                roles={
                  category.roles
                    .map((role) => props.guild.roles.find((r) => r.id === role))
                    .filter((r) => r !== undefined) as Role[]
                }
                onChange={() => () => {}}
                wikiMode={false}
                type={category.type === CategoryType.Single ? 'single' : 'multi'}
              />
            </CategoryContainer>
          ))}
        </div>
      </Container>
    </>
  );
};
