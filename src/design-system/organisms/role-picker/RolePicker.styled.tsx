import styled from 'styled-components';
import { palette } from 'atoms/colors';

export const Container = styled.div``;

export const Box = styled.div`
    background-color: ${palette.taupe300};
    padding: 5px;
    margin: 5px 0;
`;

export const MessageBox = styled(Box)`
    padding: 10px;
`;

export const CategoryContainer = styled(Box)``;

export const InfoBox = styled(MessageBox)`
    display: flex;
    align-items: center;
`;

export const InfoIcon = styled.div`
    flex-shrink: 0;
    font-size: 1.75em;
    margin-right: 10px;
    display: flex;
    align-items: center;
    color: ${palette.taupe500};
`;

export const Buttons = styled.div`
    display: flex;
`;
