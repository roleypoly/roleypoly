import * as React from 'react';
import { Role as RoleComponent } from './Role';
import { roleCategory } from 'roleypoly/hack/fixtures/storyData';
import { withColors } from 'roleypoly/src/design-system/atoms/colors/withColors';
import styled from 'styled-components';

export default {
    title: 'Atoms/Role',
    component: RoleComponent,
    decorators: [withColors],
};

const Demo = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const RoleWithState = (props: any) => {
    const [selected, updateSelected] = React.useState(false);
    return (
        <div style={{ padding: 5 }}>
            <RoleComponent
                {...props}
                selected={selected}
                onClick={(next) => updateSelected(next)}
            />
        </div>
    );
};

export const Role = () => (
    <Demo>
        {roleCategory.map((c, idx) => (
            <RoleWithState key={idx} role={c} />
        ))}
    </Demo>
);

export const Selected = () => (
    <Demo>
        {roleCategory.map((c, idx) => (
            <RoleComponent key={idx} role={c} selected={true} />
        ))}
    </Demo>
);

export const Unselected = () => (
    <Demo>
        {roleCategory.map((c, idx) => (
            <RoleComponent key={idx} role={c} selected={false} />
        ))}
    </Demo>
);

export const DisabledByPosition = () => (
    <Demo>
        {roleCategory.map((c, idx) => (
            <RoleComponent
                key={idx}
                role={{ ...c, safety: 1 }}
                selected={false}
                disabled
            />
        ))}
    </Demo>
);

export const DisabledByDanger = () => (
    <Demo>
        {roleCategory.map((c, idx) => (
            <RoleComponent
                key={idx}
                role={{ ...c, safety: 2 }}
                selected={false}
                disabled
            />
        ))}
    </Demo>
);
