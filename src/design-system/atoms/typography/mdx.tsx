import styled from 'styled-components';
import * as _ from 'styled-components'; // tslint:disable-line:no-duplicate-imports
import {
    AccentTitle,
    LargeTitle,
    Link,
    MediumTitle,
    SmallTitle,
    Text,
    text600,
    text700,
    text800,
    text900,
} from './typography';

export const mdxComponents = {
    h1: styled.h1`
        ${text900}
    `,
    h2: styled.h2`
        ${text800}
    `,
    h3: styled.h3`
        ${text700}
    `,
    h4: styled.h4`
        ${text600}
    `,
    p: styled.p`
        ${Text}
    `,
    a: Link,
};
