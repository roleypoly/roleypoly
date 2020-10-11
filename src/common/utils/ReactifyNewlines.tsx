import * as React from 'react';

export const ReactifyNewlines = (props: { children: string }) => {
    const textArray = props.children.split('\n');
    return (
        <>
            {textArray.map((part, idx) => (
                <div key={`rifynl${idx}`}>{part || <>&nbsp;</>}</div>
            ))}
        </>
    );
};
