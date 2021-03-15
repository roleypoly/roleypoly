import { DotOverlay } from '@roleypoly/design-system/atoms/dot-overlay';
import { Hero } from '@roleypoly/design-system/atoms/hero';
import { LoadingFill } from '@roleypoly/design-system/atoms/loading-text';
import { Space } from '@roleypoly/design-system/atoms/space';
import { Spinner } from '@roleypoly/design-system/atoms/spinner';
import { AppShell } from '@roleypoly/design-system/organisms/app-shell';
import styled from 'styled-components';
import { TextStyle } from './GenericLoading.styled';

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const GenericLoadingTemplate = (props: { children?: React.ReactNode }) => (
  <AppShell skeleton>
    <DotOverlay skeleton />
    <Hero topSpacing={0} bottomSpacing={50}>
      <Center>
        <Spinner />
        <Space />
        <TextStyle>{props.children ? props.children : <LoadingFill />}</TextStyle>
      </Center>
    </Hero>
  </AppShell>
);
