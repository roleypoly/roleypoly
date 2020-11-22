import * as React from 'react';
import styled from 'styled-components';

type HeroContainerProps = {
    topSpacing: number;
    bottomSpacing: number;
};

type HeroProps = Partial<HeroContainerProps> & {
    children: React.ReactNode;
};

const HeroContainer = styled.div<HeroContainerProps>`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-x: hidden;
    min-height: calc(100vh - ${(props) => props.topSpacing + props.bottomSpacing}px);
    margin-top: ${(props) => props.topSpacing}px;
`;

export const Hero = (props: HeroProps) => (
    <HeroContainer
        topSpacing={props.topSpacing || 0}
        bottomSpacing={props.bottomSpacing || 0}
    >
        {props.children}
    </HeroContainer>
);
