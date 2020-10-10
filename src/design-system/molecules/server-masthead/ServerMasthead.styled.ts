import styled from 'styled-components';
import { palette } from 'atoms/colors';
import { transitions } from 'atoms/timings';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Name = styled.div`
    margin: 0 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: flex-start;
`;

export const Icon = styled.div`
    flex-shrink: 0;
`;

export const Editable = styled.div`
    color: ${palette.taupe500};
    display: flex;
    align-items: center;
    user-select: none;
    transition: color ${transitions.actionable}s ease-in-out;
    cursor: pointer;
    &:hover {
        color: ${palette.taupe600};
    }
`;
