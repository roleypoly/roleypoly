import { Role } from '@roleypoly/design-system/atoms/role';
import { AmbientLarge, LargeText } from '@roleypoly/design-system/atoms/typography';
import { sortBy } from '@roleypoly/misc-utils/sortBy';
import { Category as RPCCategory, Role as RPCRole, RoleSafety } from '@roleypoly/types';
import * as React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { Head, HeadSub, HeadTitle } from './PickerCategory.styled';

export type CategoryProps = {
    title: string;
    roles: RPCRole[];
    category: RPCCategory;
    selectedRoles: string[];
    onChange: (role: RPCRole) => (newState: boolean) => void;
    type: 'single' | 'multi';
} & (
    | {
          wikiMode: true;
          roleWikiData: { [roleId: string]: string };
      }
    | {
          wikiMode: false;
      }
);

const Category = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Container = styled.div`
    overflow: hidden;
    padding: 5px;
`;

export const PickerCategory = (props: CategoryProps) => (
    <div>
        <Head>
            <HeadTitle>
                <LargeText>{props.title}</LargeText>
            </HeadTitle>
            {props.type === 'single' && (
                <HeadSub>
                    <AmbientLarge>Pick one</AmbientLarge>
                </HeadSub>
            )}
        </Head>
        <Category>
            {sortBy(props.roles, 'position').map((role, idx) => (
                <Container key={idx}>
                    <Role
                        role={role}
                        selected={props.selectedRoles.includes(role.id)}
                        onClick={props.onChange(role)}
                        disabled={role.safety !== RoleSafety.Safe}
                        tooltipId={props.category.id}
                    />
                </Container>
            ))}
        </Category>
        <ReactTooltip id={props.category.id} />
    </div>
);
