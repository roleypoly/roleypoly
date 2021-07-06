import { Role } from '@roleypoly/design-system/atoms/role';
import { TextInput } from '@roleypoly/design-system/atoms/text-input';
import { Toggle } from '@roleypoly/design-system/atoms/toggle';
import { Text } from '@roleypoly/design-system/atoms/typography';
import { Category as CategoryT, CategoryType, Role as RoleT } from '@roleypoly/types';
import { sortBy } from 'lodash';
import * as React from 'react';
import { GoPlus } from 'react-icons/go';
import ReactTooltip from 'react-tooltip';
import { AddRoleButton, Box, RoleContainer, Section } from './EditorCategory.styled';

export type CategoryProps = {
  title: string;
  roles: RoleT[];
  category: CategoryT;
  onChange: (updatedCategory: CategoryT) => void;
};

export const EditorCategory = (props: CategoryProps) => {
  const updateValue = <T extends keyof CategoryT>(key: T, value: CategoryT[T]) => {
    props.onChange({ ...props.category, [key]: value });
  };

  const handleRoleDelete = (role: RoleT) => () => {
    const updatedRoles = props.category.roles.filter((r) => r !== role.id);
    updateValue('roles', updatedRoles);
  };

  return (
    <Box>
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
            state={props.category.hidden}
            onChange={(value) => updateValue('hidden', value)}
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
        <RoleContainer>
          {sortBy(props.roles, 'position').map((role) => (
            <Role
              key={role.id}
              role={role}
              selected={false}
              type="delete"
              onClick={handleRoleDelete(role)}
            />
          ))}
          <AddRoleButton
            data-tip="Add a role to the category"
            data-for={props.category.id}
          >
            <GoPlus />
          </AddRoleButton>
        </RoleContainer>
      </Section>

      <ReactTooltip id={props.category.id} />
    </Box>
  );
};
