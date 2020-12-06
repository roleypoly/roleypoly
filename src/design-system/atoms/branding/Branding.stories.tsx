import * as React from 'react';
import styled from 'styled-components';
import { palette } from '../colors';
import { Logomark as BrandingLogomark, Logotype as BrandingLogotype } from './Branding';

export default {
    title: 'Atoms/Branding',
};

const Wrapper = styled.div`
    background-color: ${palette.taupe100};
    padding: 2em;
`;

export const Logomark = () => (
    <Wrapper>
        <BrandingLogomark />
    </Wrapper>
);

export const Logotype = () => (
    <Wrapper>
        <BrandingLogotype />
    </Wrapper>
);
