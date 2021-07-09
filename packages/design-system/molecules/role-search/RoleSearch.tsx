import { Role } from '@roleypoly/design-system/atoms/role';
import { Space } from '@roleypoly/design-system/atoms/space';
import { TextInputWithIcon } from '@roleypoly/design-system/atoms/text-input';
import { Link } from '@roleypoly/design-system/atoms/typography';
import { Role as RoleType } from '@roleypoly/types';
import Fuse from 'fuse.js';
import * as React from 'react';
import { GoSearch } from 'react-icons/go';
import styled from 'styled-components';

type Props = {
  roles: RoleType[];
  placeholder?: string;
  onSelect: (role: RoleType) => void;
  onSearchUpdate: (newTerm: string) => void;
  searchTerm: string;
};

export const RoleSearch = (props: Props) => {
  const fuse = new Fuse(props.roles, { includeScore: true, keys: ['name'] });
  const results =
    props.searchTerm !== ''
      ? fuse.search(props.searchTerm)
      : props.roles.map((role) => ({
          item: role,
        }));

  const handleClick = (role: RoleType) => () => {
    props.onSelect(role);
  };

  return (
    <div>
      <TextInputWithIcon
        icon={<GoSearch />}
        placeholder={props.placeholder || 'Search for a role...'}
        value={props.searchTerm}
        onChange={(x) => props.onSearchUpdate(x.target.value)}
      />
      <Space />
      {props.roles.length > 0 ? (
        results.length > 0 ? (
          results.map((resultRole, idx) => (
            <RoleInliner key={idx}>
              <Role
                selected={false}
                role={resultRole.item}
                onClick={handleClick(resultRole.item)}
                key={`${idx}role`}
              />
            </RoleInliner>
          ))
        ) : (
          <i>
            No roles could be found. Try a different search term.
            <br />
          </i>
        )
      ) : (
        <i>
          Roleypoly can't see any more roles.
          <br />
          <Link href="/help/why-no-roles">Learn why</Link>
        </i>
      )}
    </div>
  );
};

const RoleInliner = styled.div`
  display: flex;
  margin: 5px 0;
`;
