import * as React from 'react';
import {
  Button as StyledButton,
  ButtonComposerOptions,
  IconContainer,
} from './Button.styled';

export type ButtonProps = Partial<ButtonComposerOptions> & {
  children: React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
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
      disabled={props.disabled}
    >
      {props.icon && <IconContainer>{props.icon}</IconContainer>}
      <div>{props.children}</div>
    </StyledButton>
  );
};
