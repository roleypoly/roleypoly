import { Link as RouterLink } from '@reach/router';
import { palette } from '@roleypoly/design-system/atoms/colors';
import { transitions } from '@roleypoly/design-system/atoms/timings';
import styled, { css } from 'styled-components';

const reset = css`
    margin: 0;
    line-height: 163%;
    padding: 0;
    font-weight: 400;
    text-decoration: none;
    font-size-adjust: 0.75;
`;

export const text900 = css`
    ${reset}

    font-size: 2.3rem;
`;

export const text800 = css`
    ${reset}

    font-size: 2rem;
`;

export const text700 = css`
    ${reset}

    font-size: 1.7rem;
`;

export const text600 = css`
    ${reset}

    font-size: 1.4rem;
`;

export const text500 = css`
    ${reset}

    font-size: 1.2rem;
`;

export const text400 = css`
    ${reset}

    font-size: 1rem;
`;

export const text300 = css`
    ${reset}

    font-size: 0.9rem;
`;

export const text200 = css`
    ${reset}

    font-size: 0.7rem;
`;

export const text100 = css`
    ${reset}

    font-size: 0.5rem;
`;

export const LargeTitle = styled.span`
    ${text900}
`;

export const MediumTitle = styled.span`
    ${text800}
`;

export const SmallTitle = styled.span`
    ${text700}
`;

export const AccentTitle = styled.span`
    ${text600}
`;

export const LargeText = styled.span`
    ${text500}
`;

export const Text = styled.span`
    ${text400}
`;

export const AmbientLarge = styled.span`
    ${text200}
`;

export const AmbientSmall = styled.span`
    ${text100}
`;

export const Link = styled.a`
    color: ${palette.taupe500};
    text-decoration: none;
    transition: color ${transitions.actionable}s ease-in-out;
    &:hover {
        color: ${palette.taupe600};
    }
`;

export const CompletelyStylelessLink = styled(RouterLink)`
    color: inherit;
    text-decoration: none;
    :visited,
    :active,
    :hover {
        color: inherit;
    }
`;
