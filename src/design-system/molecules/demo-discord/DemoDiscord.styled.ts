import styled, { keyframes } from 'styled-components';
import { palette } from 'atoms/colors';

export const Base = styled.div`
    background-color: ${palette.discord100};
    border: solid 1px rgba(0, 0, 0, 0.15);
    border-radius: 3px;
    padding: 10px;
    user-select: none;
`;

export const Timestamp = styled.span`
    padding: 0 5px;
    font-size: 0.7em;
    opacity: 0.3;
`;

export const TextParts = styled.span`
    padding: 0 5px;
`;

export const Username = styled(TextParts)`
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

export const InputBox = styled.div`
    margin-top: 10px;
    background-color: ${palette.discord200};
    padding: 7px 10px;
    border-radius: 3px;
`;

const lineBlink = keyframes`
    0% {
        opacity: 1;
    }

    40% {
        opacity: 1;
    }

    60% {
        opacity: 0;
    }

    100% {
        opacity: 0;
    }
`;

export const Line = styled.div`
    background-color: ${palette.grey600};
    width: 1px;
    height: 1.5em;
    display: inline-block;
    position: absolute;
    right: -5px;
    animation: ${lineBlink} 0.5s ease-in-out infinite alternate-reverse;
`;

export const InputTextAlignment = styled.div`
    position: relative;
    display: inline-block;
`;
