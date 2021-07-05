import { onSmallScreen } from '@roleypoly/design-system/atoms/breakpoints';
import { Button } from '@roleypoly/design-system/atoms/button';
import * as React from 'react';
import { MdRestore } from 'react-icons/md';
import styled, { css } from 'styled-components';

type Props = {
  onSubmit: () => void;
  onReset: () => void;
};

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Left = styled.div`
  flex: 0;
  ${onSmallScreen`
    flex: 1 1 100%; 
    order: 2;
  `}
`;

const Right = styled.div<{ inline?: boolean }>`
  flex: 1;

  ${(props) =>
    props.inline &&
    css`
      padding-left: 0.2em;
    `}
`;

export const ResetSubmit = (props: Props) => {
  return (
    <Buttons>
      <Left>
        <Button color="muted" icon={<MdRestore />} onClick={props.onReset}>
          Reset
        </Button>
      </Left>
      <Right>
        <Button onClick={props.onSubmit}>Submit</Button>
      </Right>
    </Buttons>
  );
};

export const InlineResetSubmit = (props: Props) => {
  return (
    <Buttons>
      <Left>
        <Button color="muted" size="small" icon={<MdRestore />} onClick={props.onReset}>
          Reset
        </Button>
      </Left>
      <Right inline>
        <Button onClick={props.onSubmit} size="small">
          Submit
        </Button>
      </Right>
    </Buttons>
  );
};
