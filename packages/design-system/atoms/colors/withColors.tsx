import * as React from 'react';
import styled from 'styled-components';
import { colorVars } from './colors';

const ColorsContainer = styled.div`
    ${colorVars}
`;

export const withColors = (storyFn: () => React.ReactNode) => (
    <ColorsContainer>{storyFn()}</ColorsContainer>
);
