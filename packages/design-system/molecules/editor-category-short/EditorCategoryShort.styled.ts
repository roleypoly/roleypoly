import { transitions } from '@roleypoly/design-system/atoms/timings';
import styled from 'styled-components';

export const GrabberBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1em;
  flex: 0;
  cursor: grab;
  position: relative;

  ::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -8px;
    width: 32px;
    height: 32px;
    background-color: rgba(0, 0, 0, 0.25);
    opacity: 0;
    border-radius: 50%;
    transition: opacity ${transitions.actionable}s ease-in-out;
  }

  &:hover {
    ::before {
      opacity: 1;
    }
  }
`;

export const Opener = styled.div`
  opacity: 0;
  transition: opacity ${transitions.actionable}s ease-in-out;
`;

export const Container = styled.div`
  display: flex;
  padding: 1em;
  cursor: pointer;

  &:hover {
    ${Opener} {
      opacity: 1;
    }
  }
`;

export const Name = styled.div`
  position: relative;
  top: -2px;
  margin-right: 1em;
`;

export const Flags = styled.div``;

export const Void = styled.div`
  flex: 1;
`;
