import styled from 'styled-components';
import Fuse from 'fuse.js';
import * as React from 'react';
import { GoSearch } from 'react-icons/go';
import { Role } from 'roleypoly/design-system/atoms/role';
import { Space } from 'roleypoly/design-system/atoms/space';
import { TextInputWithIcon } from 'roleypoly/design-system/atoms/text-input';
import { Role as RoleType } from 'roleypoly/common/types';

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
                placeholder={props.placeholder || 'Search or drag a role...'}
                value={props.searchTerm}
                onChange={(x) => props.onSearchUpdate(x.target.value)}
            />
            <Space />
            {results.map((resultRole, idx) => (
                <RoleInliner key={idx}>
                    <Role
                        selected={false}
                        role={resultRole.item}
                        onClick={handleClick(resultRole.item)}
                        key={`${idx}role`}
                    />
                </RoleInliner>
            ))}
        </div>
    );
};

const RoleInliner = styled.div`
    display: flex;
    margin: 5px 0;
`;
