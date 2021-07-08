import { Popover } from '@roleypoly/design-system/atoms/popover';
import { Role } from '@roleypoly/design-system/atoms/role';
import { TextInput } from '@roleypoly/design-system/atoms/text-input';
import { Toggle } from '@roleypoly/design-system/atoms/toggle';
import { Text } from '@roleypoly/design-system/atoms/typography';
import { RoleSearch } from '@roleypoly/design-system/molecules/role-search';
import { Category as CategoryT, CategoryType, Role as RoleT } from '@roleypoly/types';
import { sortBy, uniq } from 'lodash';
import * as React from 'react';
import { GoPlus } from 'react-icons/go';
import ReactTooltip from 'react-tooltip';
import { AddRoleButton, Box, RoleContainer, Section } from './EditorCategory.styled';

export type CategoryProps = {
  title: string;
  roles: RoleT[];
  category: CategoryT;
  unselectedRoles: RoleT[];
  onChange: (updatedCategory: CategoryT) => void;
};

export const EditorCategory = (props: CategoryProps) => {
  const [searchOpen, setSearchOpen] = React.useState(false);

  const updateValue = <T extends keyof CategoryT>(key: T, value: CategoryT[T]) => {
    props.onChange({ ...props.category, [key]: value });
  };

  const handleRoleDelete = (role: RoleT) => () => {
    const updatedRoles = props.category.roles.filter((r) => r !== role.id);
    updateValue('roles', updatedRoles);
  };

  const handleRoleAdd = (role: RoleT) => {
    const updatedRoles = uniq([...props.category.roles, role.id]);
    updateValue('roles', updatedRoles);
    setSearchOpen(false);
  };

  const handleSearchOpen = () => {
    setSearchOpen(true);
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
          {props.roles.length > 0 ? (
            <>
              {sortBy(props.roles, 'position').map((role) => (
                <Role
                  key={role.id}
                  role={role}
                  selected={false}
                  type="delete"
                  onClick={handleRoleDelete(role)}
                />
              ))}
              <RoleAddButton onClick={handleSearchOpen} tooltipId={props.category.id} />
            </>
          ) : (
            <RoleAddButton
              long
              onClick={handleSearchOpen}
              tooltipId={props.category.id}
            />
          )}
          <RoleSearchPopover
            isOpen={searchOpen}
            onExit={() => setSearchOpen(false)}
            unselectedRoles={props.unselectedRoles}
            onSelect={handleRoleAdd}
          />
        </RoleContainer>
      </Section>

      <ReactTooltip id={props.category.id} />
    </Box>
  );
};

const RoleAddButton = (props: {
  onClick: () => void;
  tooltipId: string;
  long?: boolean;
}) => (
  <AddRoleButton
    data-tip="Add a role to the category"
    data-for={props.tooltipId}
    onClick={props.onClick}
    long={props.long}
  >
    {props.long && <>Add a role&nbsp;&nbsp;</>}
    <GoPlus />
  </AddRoleButton>
);

const RoleSearchPopover = (props: {
  onSelect: (role: RoleT) => void;
  onExit: (type: string) => void;
  isOpen: boolean;
  unselectedRoles: RoleT[];
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <Popover
      position="top left"
      active={props.isOpen}
      canDefocus
      onExit={props.onExit}
      headContent={null}
    >
      {() => (
        <RoleSearch
          onSelect={props.onSelect}
          roles={props.unselectedRoles}
          searchTerm={searchTerm}
          onSearchUpdate={setSearchTerm}
        />
      )}
    </Popover>
  );
};
