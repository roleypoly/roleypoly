import { Text } from '@roleypoly/design-system/atoms/typography';
import * as React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { palette } from '../colors';
import { Logomark, Logotype } from './Branding';
import { AllVariants, DynamicLogomark, DynamicLogotype } from './DynamicBranding';

export default {
    title: 'Atoms/Branding/Dynamic',
    component: DynamicLogotype,
};

const WrapperDiv = styled.div`
    background-color: ${palette.taupe100};
    padding: 2em;
`;

const Wrapper = (props: { children: React.ReactNode }) => (
    <>
        <WrapperDiv>{props.children}</WrapperDiv>
        <ReactTooltip />
    </>
);

export const dynamicLogotype = (args) => {
    return (
        <Wrapper>
            <DynamicLogotype {...args} />
        </Wrapper>
    );
};

export const dynamicLogomark = (args) => {
    return (
        <Wrapper>
            <DynamicLogomark {...args} />
        </Wrapper>
    );
};

export const AllCustomizedLogotypes = () => {
    return (
        <Wrapper>
            <div>
                <Text>Base Logo</Text>
                <br />
                <Logotype height={50} />
            </div>
            {AllVariants.map((variant, idx) => (
                <div key={idx} style={{ marginTop: 5 }}>
                    <Text>{variant.name}</Text>
                    <br />
                    <variant.Logotype height={50} />
                </div>
            ))}
        </Wrapper>
    );
};

export const AllCustomizedLogomarks = () => {
    return (
        <Wrapper>
            <div>
                <Text>Base Logo</Text>
                <br />
                <Logomark height={50} />
            </div>
            {AllVariants.map((variant, idx) => (
                <div key={idx}>
                    <Text>{variant.name}</Text>
                    <br />
                    <variant.Logomark height={50} />
                </div>
            ))}
        </Wrapper>
    );
};
