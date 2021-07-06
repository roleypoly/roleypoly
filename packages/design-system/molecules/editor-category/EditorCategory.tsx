import { TextInput } from '@roleypoly/design-system/atoms/text-input';
import { Text } from '@roleypoly/design-system/atoms/typography';
import { Category as CategoryT, Role as RoleT } from '@roleypoly/types';
import * as React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { Head, HeadTitle } from './EditorCategory.styled';

export type CategoryProps = {
  title: string;
  roles: RoleT[];
  category: CategoryT;
  selectedRoles: string[];
  onChange: (updatedCategory: CategoryT) => void;
  type: 'single' | 'multi';
};

const Category = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Container = styled.div`
  overflow: hidden;
  padding: 5px;
`;

export const EditorCategory = (props: CategoryProps) => {
  const updateValue = <T extends keyof CategoryT>(key: T, value: CategoryT[T]) => {
    props.onChange({ ...props.category, [key]: value });
  };

  return (
    <>
      <Head>
        <HeadTitle>
          <div>
            <Text>Category Name</Text>
          </div>
          <TextInput
            value={props.category.name}
            onChange={(event) => updateValue('name', event.target.value)}
          />
        </HeadTitle>
      </Head>
      <Category></Category>
      <ReactTooltip id={props.category.id} />
    </>
  );
};
