import * as React from 'react';
import styled from 'styled-components';
import { palette } from 'roleypoly/src/design-system/atoms/colors';

const StyledTextInput = styled.input`
    appearance: none;
    border: 1px solid ${palette.taupe200};
    border-radius: 3px;
    line-height: 163%;
    padding: 12px 16px;
    font-size: 1.2rem;
    background-color: ${palette.taupe300};
    color: ${palette.grey600};
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    max-width: 97vw;

    :focus {
        outline: none;
        border-color: ${palette.grey100};
        box-shadow: 1px 0 3px rgba(0, 0, 0, 0.25);
    }

    [disabled],
    :disabled {
        cursor: not-allowed;
        color: rgba(255, 255, 255, 0.75);
        font-style: italic;
    }

    :hover:not([disabled]) {
        border-color: ${palette.grey100};
    }

    ::placeholder {
        color: ${palette.taupe500};
    }
`;

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    _override?: React.Component;
};

export const TextInput = (props: TextInputProps) => {
    const { ...rest } = props;
    return <StyledTextInput {...rest} />;
};

const StyledTextInputWithIcon = styled(StyledTextInput)`
    padding-left: 36px;
`;

const IconContainer = styled.div`
    position: absolute;
    left: 12px;
    top: 0;
    bottom: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const IconInputContainer = styled.div`
    position: relative;
    width: 100%;
`;

type TextInputWithIconProps = TextInputProps & {
    icon: React.ReactNode;
};

export const TextInputWithIcon = (props: TextInputWithIconProps) => {
    const { icon, ...rest } = props;
    return (
        <IconInputContainer>
            <IconContainer>{icon}</IconContainer>
            <StyledTextInputWithIcon {...rest}></StyledTextInputWithIcon>
        </IconInputContainer>
    );
};
