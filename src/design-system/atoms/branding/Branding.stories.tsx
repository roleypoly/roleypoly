import * as React from 'react';
import { Logomark as BrandingLogomark, Logotype as BrandingLogotype } from './Branding';
import styled from 'styled-components';

export default {
    title: 'Atoms/Branding',
};

const Wrapper = styled.div`
    background-color: black;
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
