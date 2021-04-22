import styled from 'styled-components';

export const RoleContainer = styled.div`
  display: flex;
  margin: 10px;
  flex-wrap: wrap;

  & > div {
    /* This should be a Role element */
    border: 1px solid rgba(0, 0, 0, 0.15);
    margin: 1px;
  }
`;
