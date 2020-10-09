import * as React from 'react';
import {
    Button as StyledButton,
    IconContainer,
    ButtonComposerOptions,
} from './Button.styled';

export type ButtonProps = Partial<ButtonComposerOptions> & {
    children: React.ReactNode;
    icon?: React.ReactNode;
    loading?: boolean;
    onClick?: () => void;
};

export const Button = (props: ButtonProps) => {
    const modifiers: ButtonProps['modifiers'] = [];
    if (props.loading) {
        modifiers.push('withLoading');
    }

    if (props.icon) {
        modifiers.push('withIcon');
    }

    return (
        <StyledButton
            size={props.size || 'large'}
            color={props.color || 'primary'}
            modifiers={modifiers}
            onClick={props.onClick}
        >
            {props.icon && <IconContainer>{props.icon}</IconContainer>}
            <div>{props.children}</div>
        </StyledButton>
    );
};
