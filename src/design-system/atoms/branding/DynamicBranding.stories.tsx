import * as React from 'react';
import styled from 'styled-components';
import { AllVariants, DynamicLogomark, DynamicLogotype } from './DynamicBranding';

export default {
    title: 'Atoms/Branding/Dynamic',
    component: DynamicLogotype,
};

const Wrapper = styled.div`
    background-color: black;
    padding: 2em;
`;

export const DynamicLogotype_ = (args) => {
    return (
        <Wrapper>
            <DynamicLogotype {...args} />
        </Wrapper>
    );
};

export const DynamicLogomark_ = (args) => {
    return (
        <Wrapper>
            <DynamicLogomark {...args} />
        </Wrapper>
    );
};

export const AllCustomizedLogotypes = () => {
    return (
        <Wrapper>
            {AllVariants.map((variant, idx) => (
                <variant.Logotype key={idx} height={50} />
            ))}
        </Wrapper>
    );
};

export const AllCustomizedLogomarks = () => {
    return (
        <Wrapper>
            {AllVariants.map((variant, idx) => (
                <variant.Logomark key={idx} height={50} />
            ))}
        </Wrapper>
    );
};
