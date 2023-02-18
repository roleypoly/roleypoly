import { Popover } from '@roleypoly/design-system/atoms/popover';
import { Role } from '@roleypoly/design-system/atoms/role';
import { RoleSearch } from '@roleypoly/design-system/molecules/role-search';
import { Role as RoleT } from '@roleypoly/types';
import React from 'react';
import { GoPlus } from 'react-icons/go';
import { AddRoleButton, EditableRoleListStyled } from './EditableRoleList.styled';
import { sortByReverse } from '@roleypoly/misc-utils/sortBy';

type Props = {
  roles: RoleT[];
  selectedRoles: RoleT['id'][];
  unselectedRoles: RoleT[];
  onChange: (roles: RoleT['id'][]) => void;
};

export const EditableRoleList = (props: Props) => {
  const [searchOpen, setSearchOpen] = React.useState(false);

  const handleRoleDelete = (role: RoleT) => () => {
    const updatedRoles = props.selectedRoles.filter((r) => r !== role.id);
    props.onChange(updatedRoles);
  };

  const handleRoleAdd = (role: RoleT) => {
    const updatedRoles = uniq([...props.selectedRoles, role.id]);
    props.onChange(updatedRoles);
    setSearchOpen(false);
  };

  const handleSearchOpen = () => {
    setSearchOpen(true);
  };

  return (
    <EditableRoleListStyled>
      {props.selectedRoles.length !== 0 ? (
        <>
          {sortByReverse(
            props.roles.filter((r) => props.selectedRoles.includes(r.id)),
            'position'
          ).map((role) => (
            <Role
              key={role.id}
              role={role}
              selected={false}
              type="delete"
              onClick={handleRoleDelete(role)}
            />
          ))}
          <RoleAddButton onClick={handleSearchOpen} />
        </>
      ) : (
        <RoleAddButton long onClick={handleSearchOpen} />
      )}
      <RoleSearchPopover
        isOpen={searchOpen}
        onExit={() => setSearchOpen(false)}
        unselectedRoles={props.unselectedRoles}
        onSelect={handleRoleAdd}
      />
    </EditableRoleListStyled>
  );
};

const RoleAddButton = (props: { onClick: () => void; long?: boolean }) => (
  <AddRoleButton
    data-tip="Add a role to the category"
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
