import * as React from 'react';
import { Role } from 'atoms/role';
import { Role as RPCRole } from '@roleypoly/rpc/shared';
import styled from 'styled-components';
import { demoData } from 'hack/fixtures/demoData';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    height: 95px;
`;

const RoleWrap = styled.div`
    padding: 2.5px;
    display: inline-block;
`;

export const DemoPicker = () => {
    const [selectedStates, setSelectedStates] = React.useState<
        {
            [key in RPCRole.AsObject['id']]: boolean;
        }
    >(demoData.reduce((acc, role) => ({ ...acc, [role.id]: false }), {}));

    return (
        <Container>
            {demoData.map((role) => (
                <RoleWrap key={`role${role.id}`}>
                    <Role
                        role={role}
                        selected={selectedStates[role.id]}
                        onClick={() => {
                            setSelectedStates({
                                ...selectedStates,
                                [role.id]: !selectedStates[role.id],
                            });
                        }}
                    />
                </RoleWrap>
            ))}
        </Container>
    );
};
