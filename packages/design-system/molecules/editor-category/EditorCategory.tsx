import { Button } from '@roleypoly/design-system/atoms/button';
import { TextInput } from '@roleypoly/design-system/atoms/text-input';
import { Toggle } from '@roleypoly/design-system/atoms/toggle';
import { Text } from '@roleypoly/design-system/atoms/typography';
import { EditableRoleList } from '@roleypoly/design-system/molecules/editable-role-list';
import { Category as CategoryT, CategoryType, Role as RoleT } from '@roleypoly/types';
import * as React from 'react';
import { GoHistory, GoTrashcan } from 'react-icons/go';
import ReactTooltip from 'react-tooltip';
import { Box, Section } from './EditorCategory.styled';

export type CategoryProps = {
  title: string;
  roles: RoleT[];
  category: CategoryT;
  unselectedRoles: RoleT[];
  onChange: (updatedCategory: CategoryT) => void;
  onReset: () => void;
  onDelete: () => void;
};

export const EditorCategory = (props: CategoryProps) => {
  const updateValue = <T extends keyof CategoryT>(key: T, value: CategoryT[T]) => {
    console.log('update value', { key, value, category: props.category });
    props.onChange({ ...props.category, [key]: value });
  };

  const handleRoleListUpdate = (roles: RoleT['id'][]) => {
    updateValue('roles', roles);
  };

  return (
    <Box>
      <Section big actions>
        <Button size="small" color="muted" icon={<GoHistory />} onClick={props.onReset}>
          Reset to Default
        </Button>
        &nbsp;
        <Button size="small" color="muted" icon={<GoTrashcan />} onClick={props.onDelete}>
          Delete Category
        </Button>
      </Section>

      <Section>
        <div>
          <Text>Category Name</Text>
        </div>
        <TextInput
          value={props.category.name}
          onChange={(event) => updateValue('name', event.target.value)}
        />
      </Section>

      <Section>
        <div>
          <Text>Options</Text>
        </div>
        <div>
          <Toggle
            state={!props.category.hidden}
            onChange={(value) => updateValue('hidden', !value)}
          >
            Show this category to members
          </Toggle>
          <Toggle
            state={props.category.type === CategoryType.Multi}
            onChange={(value) =>
              updateValue('type', value ? CategoryType.Multi : CategoryType.Single)
            }
          >
            Let members pick more than one role
          </Toggle>
        </div>
      </Section>

      <Section big>
        <div>
          <Text>Roles</Text>
        </div>
        <EditableRoleList
          roles={props.roles}
          unselectedRoles={props.unselectedRoles}
          selectedRoles={props.category.roles}
          onChange={handleRoleListUpdate}
        />
      </Section>

      <ReactTooltip id={props.category.id} />
    </Box>
  );
};
