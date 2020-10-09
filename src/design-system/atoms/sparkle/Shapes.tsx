import { CSSProperties } from 'styled-components';
import * as React from 'react';

type SparkleProps = {
    height: string;
    strokeColor: string;
    repeatCount?: number;
    style?: CSSProperties;
    delay?: number;
};

const Animation = (props: SparkleProps) => (
    <>
        <animateTransform
            fill="freeze"
            attributeName="transform"
            type="scale"
            begin={`${props.delay || 0}s`}
            additive="sum"
            dur="1s"
            repeatCount={props.repeatCount || 'indefinite'}
            from="-1 -1"
            to="1 1"
        />
        <animateTransform
            fill="freeze"
            attributeName="transform"
            type="translate"
            begin={`${props.delay || 0}s`}
            additive="sum"
            dur="1s"
            repeatCount={props.repeatCount || 'indefinite'}
            from="-1 -1"
            to="1 1"
        />

        <animateTransform
            // additive="sum"
            fill="freeze"
            attributeName="transform"
            type="scale"
            to="0 0"
            dur="0.3s"
            begin={props.repeatCount || 10}
        />
    </>
);

const SparkleCircle = (props: SparkleProps) => (
    <svg height={props.height} style={props.style} viewBox="-16 -16 16 16" fill="none">
        <g transform="translate(-8 -8)">
            <circle cx="0" cy="0" r="6.5" stroke={props.strokeColor} stroke-width="2">
                <Animation {...props} />
            </circle>
        </g>
    </svg>
);

const SparkleStar = (props: SparkleProps) => (
    <svg height={props.height} style={props.style} viewBox="-30 -30 30 30" fill="none">
        <g transform="translate(0 0)">
            <path
                d="M15.5 3.23607L18.0289 11.0193L18.2534 11.7102H18.98H27.1637L20.5429 16.5205L19.9551 16.9476L20.1796 17.6385L22.7086 25.4217L16.0878 20.6115L15.5 20.1844L14.9122 20.6115L8.29144 25.4217L10.8204 17.6385L11.0449 16.9476L10.4571 16.5205L3.83631 11.7102H12.02H12.7466L12.9711 11.0193L15.5 3.23607Z"
                stroke={props.strokeColor}
                stroke-width="2"
            >
                <Animation {...props} />
                <animateTransform
                    fill="freeze"
                    attributeName="transform"
                    type="translate"
                    begin={`${props.delay || 0}s`}
                    additive="sum"
                    dur="0.5s"
                    repeatCount={props.repeatCount || 'indefinite'}
                    from="30 30"
                    to="0 0"
                />
            </path>
        </g>
    </svg>
);

const SparkleCross = (props: SparkleProps) => (
    <svg height={props.height} style={props.style} viewBox="-15 -15 15 15" fill="none">
        <g transform="translate(-15 -15)">
            <path
                d="M-3.27836e-07 7.5L5 7.5M7.5 4.99999L7.5 2.53319e-06M9.99999 7.49999L15 7.49999M7.5 15L7.5 10"
                stroke={props.strokeColor}
                stroke-width="2"
            >
                <Animation {...props} />
            </path>
        </g>
    </svg>
);

const patternBase: CSSProperties = {
    position: 'relative',
};

const shapeMixin: CSSProperties = {
    position: 'absolute',
};

export const SparklePatternAlpha = ({ style, ...props }: SparkleProps) => (
    <div style={patternBase}>
        <SparkleCircle
            {...props}
            height="20%"
            style={{
                ...shapeMixin,
                top: 0,
                left: 0,
            }}
            delay={0.24}
        />
        <SparkleCross
            {...props}
            height="20%"
            style={{
                ...shapeMixin,
                top: '45%',
                left: '15%',
            }}
            delay={0.55}
        />
        <SparkleCross
            {...props}
            height="10%"
            style={{
                ...shapeMixin,
                top: '30%',
                left: '-15%',
                transform: 'rotate(30deg)',
            }}
            delay={0.33}
        />
        <SparkleStar
            {...props}
            height="30%"
            style={{
                ...shapeMixin,
                bottom: '0%',
                right: '10%',
            }}
            delay={0.75}
        />
    </div>
);

export const SparklePatternBeta = ({ style, ...props }: SparkleProps) => (
    <div style={patternBase}>
        <SparkleCircle
            {...props}
            height="15%"
            style={{
                ...shapeMixin,
                top: '60%',
                left: '20%',
            }}
            delay={0.9}
        />
        <SparkleCross
            {...props}
            height="20%"
            style={{
                ...shapeMixin,
                top: 0,
                right: 0,
            }}
            delay={0.11}
        />
        <SparkleCross
            {...props}
            height="15%"
            style={{
                ...shapeMixin,
                top: '80%',
                right: 0,
            }}
            delay={0.15}
        />
        <SparkleStar
            {...props}
            height="30%"
            style={{
                ...shapeMixin,
                top: '20%',
                left: '30%',
                transform: 'rotate(30deg)',
            }}
            delay={0.6}
        />
    </div>
);
