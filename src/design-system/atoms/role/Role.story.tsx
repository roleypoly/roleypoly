import * as React from 'react';
import { atomStories } from 'atoms/atoms.story';
import { Role } from './Role';
import { roleCategory } from 'hack/fixtures/storyData';
import { withColors } from 'atoms/colors/withColors';
import styled from 'styled-components';

const story = atomStories('Role', module);

story.addDecorator(withColors);

const Demo = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const RoleWithState = (props: any) => {
    const [selected, updateSelected] = React.useState(false);
    return (
        <div style={{ padding: 5 }}>
            <Role
                {...props}
                selected={selected}
                onClick={(next) => updateSelected(next)}
            />
        </div>
    );
};

story.add('Role', () => {
    return (
        <Demo>
            {roleCategory.map((c, idx) => (
                <RoleWithState key={idx} role={c} />
            ))}
        </Demo>
    );
});

story.add('Selected', () => (
    <Demo>
        {roleCategory.map((c, idx) => (
            <Role key={idx} role={c} selected={true} />
        ))}
    </Demo>
));

story.add('Unselected', () => (
    <Demo>
        {roleCategory.map((c, idx) => (
            <Role key={idx} role={c} selected={false} />
        ))}
    </Demo>
));

story.add('Disabled (Position)', () => (
    <Demo>
        {roleCategory.map((c, idx) => (
            <Role key={idx} role={{ ...c, safety: 1 }} selected={false} disabled />
        ))}
    </Demo>
));

story.add('Disabled (Dangerous)', () => (
    <Demo>
        {roleCategory.map((c, idx) => (
            <Role key={idx} role={{ ...c, safety: 2 }} selected={false} disabled />
        ))}
    </Demo>
));
