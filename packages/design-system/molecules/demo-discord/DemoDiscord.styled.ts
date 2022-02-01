import { palette } from '@roleypoly/design-system/atoms/colors';
import styled, { keyframes } from 'styled-components';

export const Base = styled.div`
  background-color: ${palette.discord100};
  border: solid 1px rgb(0 0 0 / 15%);
  border-radius: 3px;
  padding: 10px;
  user-select: none;
`;

export const Timestamp = styled.span`
  padding: 0 5px;
  font-size: 0.7em;
  opacity: 30%;
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
        opacity: 100%;
    }

    40% {
        opacity: 100%;
    }

    60% {
        opacity: 0%;
    }

    100% {
        opacity: 0%;
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
