import { css, createGlobalStyle } from 'styled-components';

import chroma from 'chroma-js';

export const palette = {
    taupe100: '#332D2D',
    taupe200: '#453E3D',
    taupe300: '#5D5352',
    taupe400: '#756867',
    taupe500: '#AB9B9A',
    taupe600: '#EBD6D4',

    discord100: '#23272A',
    discord200: '#2C2F33',
    discord400: '#7289DA',
    discord500: '#99AAB5',

    green400: '#46B646',
    green200: '#1D8227',

    red400: '#E95353',
    red200: '#F14343',

    gold400: '#EFCF24',

    grey100: '#1C1010',
    grey500: '#DBD9D9',
    grey600: '#F2EFEF',
};

const getPaletteCSS = () =>
    Object.entries(palette).reduce(
        (acc, [key, color]) => ({ ...acc, [`--${key}`]: color }),
        {}
    );

export const colorVars = css(getPaletteCSS());

export const GlobalStyleColors = createGlobalStyle`
    :root {
        ${colorVars}
    }
`;

export const numberToChroma = (colorInt: number) => {
    return chroma(colorInt);
};
