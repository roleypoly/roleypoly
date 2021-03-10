import * as React from 'react';

type TypistProps = {
    resetTimeout: number;
    charTimeout: number;
    lines: string[];
};

export const Typist = (props: TypistProps) => {
    const [outputText, setOutputText] = React.useState('');
    const [currentLine, setCurrentLine] = React.useState(0);

    React.useEffect(() => {
        const fullLine = props.lines[currentLine];

        if (outputText === fullLine) {
            const timeout = setTimeout(() => {
                setOutputText('');
                setCurrentLine((currentLine + 1) % props.lines.length);
            }, props.resetTimeout);

            return () => {
                clearTimeout(timeout);
            };
        }

        const timeout = setTimeout(() => {
            setOutputText(fullLine.slice(0, outputText.length + 1));
        }, props.charTimeout);

        return () => {
            clearTimeout(timeout);
        };
    }, [currentLine, outputText]);

    return <>{outputText}</>;
};
