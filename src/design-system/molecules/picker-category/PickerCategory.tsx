import * as React from 'react';
import { Role as RPCRole } from '@roleypoly/rpc/shared';
import { Category as RPCCategory } from '@roleypoly/rpc/platform';
import { LargeText, AmbientLarge } from 'atoms/typography';
import { Role } from 'atoms/role';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { Head, HeadTitle, HeadSub } from './PickerCategory.styled';

export type CategoryProps = {
    title: string;
    roles: RPCRole.AsObject[];
    category: RPCCategory.AsObject;
    selectedRoles: string[];
    onChange: (role: RPCRole.AsObject) => (newState: boolean) => void;
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
            {props.roles.map((role, idx) => (
                <Container key={idx}>
                    <Role
                        role={role}
                        selected={props.selectedRoles.includes(role.id)}
                        onClick={props.onChange(role)}
                        disabled={role.safety !== RPCRole.RoleSafety.SAFE}
                        tooltipId={props.category.id}
                    />
                </Container>
            ))}
        </Category>
        <ReactTooltip id={props.category.id} />
    </div>
);
