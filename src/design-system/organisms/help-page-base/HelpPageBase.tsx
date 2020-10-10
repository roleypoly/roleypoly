import * as React from 'react';
import styled from 'styled-components';
import { palette } from 'atoms/colors';

export type HelpPageProps = {
    children: React.ReactNode;
};

const Container = styled.div`
    background: ${palette.taupe300};
    padding: 2em 3em;
    width: 1024px;
    max-width: 98vw;
    margin: 0 auto;
    margin-top: 75px;
    box-sizing: border-box;
`;

export const HelpPageBase = (props: HelpPageProps) => (
    <Container>{props.children}</Container>
);
