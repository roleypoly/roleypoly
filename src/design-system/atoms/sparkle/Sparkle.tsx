import * as React from 'react';
import { palette } from 'roleypoly/design-system/atoms/colors';
import styled from 'styled-components';
import { SparklePatternAlpha, SparklePatternBeta } from './Shapes';

type Props = {
    children: React.ReactNode;
    size?: number;
    opacity?: number;
    repeatCount?: number;
    strokeColor?: string;
};

const SparkleContainer = styled.div`
    position: relative;
`;

type EffectProps = {
    effectSize: Props['size'];
    effectOpacity: Props['opacity'];
};

const SparkleEffect = styled.div<EffectProps>`
    position: absolute;
    top: ${(props) => props.effectSize}px;
    bottom: ${(props) => props.effectSize}px;
    left: ${(props) => props.effectSize}px;
    right: ${(props) => props.effectSize}px;
    display: flex;
    justify-content: space-between;
    z-index: 5;
    opacity: ${(props) => props.effectOpacity};
    pointer-events: none;
`;

export const SparkleOverlay = ({ strokeColor = palette.gold400, ...props }: Props) => (
    <SparkleContainer>
        <SparkleEffect effectSize={props.size || 0} effectOpacity={props.opacity || 1}>
            <SparklePatternAlpha
                repeatCount={props.repeatCount}
                height="100%"
                strokeColor={strokeColor}
            />
            <SparklePatternBeta
                repeatCount={props.repeatCount}
                height="100%"
                strokeColor={strokeColor}
            />
        </SparkleEffect>
        {props.children}
    </SparkleContainer>
);
