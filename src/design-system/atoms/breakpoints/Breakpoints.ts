// import {} from 'styled-components';

export const breakpoints = {
    onTablet: 768,
    onDesktop: 1024,
};

export const mediaQueryDefs = {
    onSmallScreen: `@media screen and (max-width: ${breakpoints.onTablet - 1}px)`,
    onTablet: `@media screen and (min-width: ${breakpoints.onTablet}px)`,
    onDesktop: `@media screen and (min-width: ${breakpoints.onDesktop}px)`,
};

export const onTablet = (...expressions: any) => {
    return `
    ${mediaQueryDefs.onTablet} {
      ${expressions.join()}
    }
  `;
};

export const onDesktop = (...expressions: any) => {
    return `
    ${mediaQueryDefs.onDesktop} {
      ${expressions.join()}
    }
  `;
};

export const onSmallScreen = (...expressions: any) => {
    return `
    ${mediaQueryDefs.onSmallScreen} {
      ${expressions.join()}
    }
  `;
};
