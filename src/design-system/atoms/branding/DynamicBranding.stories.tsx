import * as React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { AllVariants, DynamicLogomark, DynamicLogotype } from './DynamicBranding';

export default {
    title: 'Atoms/Branding/Dynamic',
    component: DynamicLogotype,
};

const WrapperDiv = styled.div`
    background-color: black;
    padding: 2em;
`;

const Wrapper = (props: { children: React.ReactNode }) => (
    <>
        <WrapperDiv>{props.children}</WrapperDiv>
        <ReactTooltip />
    </>
);

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
                <div key={idx}>
                    <variant.Logotype height={50} />
                </div>
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
