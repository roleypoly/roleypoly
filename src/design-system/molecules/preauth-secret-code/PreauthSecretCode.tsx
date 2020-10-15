import * as React from 'react';
import { TextInputWithIcon } from 'roleypoly/src/design-system/atoms/text-input';
import { FiKey } from 'react-icons/fi';
import { FaderOpacity } from 'roleypoly/src/design-system/atoms/fader';
import { Button } from 'roleypoly/src/design-system/atoms/button';
import { Space } from 'roleypoly/src/design-system/atoms/space';

type PreauthProps = {
    onSubmit: (code: string) => void;
};

export const PreauthSecretCode = (props: PreauthProps) => {
    const [secretCode, setSecretCode] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSecretCode(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.onSubmit(secretCode);
        }
    };

    const handleSubmit = () => {
        props.onSubmit(secretCode);
    };

    return (
        <div>
            <TextInputWithIcon
                icon={<FiKey />}
                value={secretCode}
                placeholder="Super secret code..."
                onChange={handleChange}
                onKeyDown={handleKeyPress}
            />
            <Space />
            <FaderOpacity isVisible={secretCode.length > 0}>
                <Button color="muted" onClick={handleSubmit}>
                    Submit Code →
                </Button>
            </FaderOpacity>
        </div>
    );
};
