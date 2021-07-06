import { palette } from '@roleypoly/design-system/atoms/colors';
import { FaderOpacity } from '@roleypoly/design-system/atoms/fader';
import { Space } from '@roleypoly/design-system/atoms/space';
import { MultilineTextInput } from '@roleypoly/design-system/atoms/text-input';
import { AmbientLarge, LargeText } from '@roleypoly/design-system/atoms/typography';
import { PickerCategory } from '@roleypoly/design-system/molecules/picker-category';
import { ServerMasthead } from '@roleypoly/design-system/molecules/server-masthead';
import { SecondaryEditing } from '@roleypoly/design-system/organisms/masthead';
import {
  CategoryContainer,
  Container,
  MessageBox,
} from '@roleypoly/design-system/organisms/role-picker/RolePicker.styled';
import { Category, CategoryType, PresentableGuild, Role } from '@roleypoly/types';
import deepEqual from 'deep-equal';
import { sortBy } from 'lodash';
import React from 'react';
import { GoEyeClosed } from 'react-icons/go';

export type EditorShellProps = {
  guild: PresentableGuild;
  onGuildChange?: (guild: PresentableGuild) => void;
  onCategoryChange?: (category: Category) => void;
  onMessageChange?: (message: PresentableGuild['data']['message']) => void;
};

export const EditorShell = (props: EditorShellProps) => {
  const [guild, setGuild] = React.useState<PresentableGuild>(props.guild);

  React.useEffect(() => {
    setGuild(props.guild);
  }, [props.guild]);

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
      <SecondaryEditing
        showReset={hasChanges}
        guild={props.guild.guild}
        onReset={reset}
        onSubmit={() => props.onGuildChange?.(guild)}
      />
      <Container style={{ marginTop: 95 }}>
        <ServerMasthead guild={props.guild.guild} editable={false} />
        <Space />

        <MessageBox>
          <LargeText>Server Message</LargeText>
          <MultilineTextInput
            rows={2}
            value={guild.data.message}
            onChange={(event) => onMessageChange(event.target.value)}
            placeholder={`Hey friend from ${guild.guild.name}! Pick your roles!`}
          >
            {guild.data.message}
          </MultilineTextInput>
          <AmbientLarge style={{ display: 'flex', color: palette.taupe600 }}>
            Shows a message to your server members.
            <FaderOpacity isVisible={guild.data.message.trim().length === 0}>
              &nbsp;Since the message is empty, this won't show up.&nbsp;&nbsp;&nbsp;
              <GoEyeClosed style={{ position: 'relative', top: 2 }} />
            </FaderOpacity>
          </AmbientLarge>
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
