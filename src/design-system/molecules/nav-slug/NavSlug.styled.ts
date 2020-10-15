import styled from 'styled-components';
import * as _ from 'styled-components'; // eslint-disable-line no-duplicate-imports

export const SlugContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 5px;
`;

export const SlugName = styled.div`
    padding: 0 10px;
    position: relative;
    top: -1px;
    white-space: nowrap;
    text-overflow: ellipsis;
`;
