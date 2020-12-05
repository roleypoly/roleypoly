import * as React from 'react';
import styled from 'styled-components';

export type FaderProps = {
    isVisible: boolean;
    children: React.ReactNode;
};

const FaderOpacityStyled = styled.div<Pick<FaderProps, 'isVisible'>>`
    opacity: ${(props) => (props.isVisible ? 1 : 0)};
    pointer-events: ${(props) => (props.isVisible ? 'unset' : 'none')};
    transition: opacity 0.35s ease-in-out;
`;

export const FaderOpacity = (props: FaderProps) => {
    return (
        <FaderOpacityStyled isVisible={props.isVisible}>
            {props.children}
        </FaderOpacityStyled>
    );
};

const FaderSlideStyled = styled.div<Pick<FaderProps, 'isVisible'>>`
    max-height: ${(props) => (props.isVisible ? '4em' : '0')};
    pointer-events: ${(props) => (props.isVisible ? 'unset' : 'none')};
    transition: max-height 0.35s ease-in-out;
    overflow: hidden;
    transform: translateZ(0);
`;

export const FaderSlide = (props: FaderProps) => {
    return (
        <FaderSlideStyled isVisible={props.isVisible}>{props.children}</FaderSlideStyled>
    );
};
