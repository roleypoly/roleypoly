import { onSmallScreen } from 'atoms/breakpoints';
import { Button } from 'atoms/button';
import * as React from 'react';
import { MdRestore } from 'react-icons/md';
import styled from 'styled-components';

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

const Right = styled.div`
    flex: 1;
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
