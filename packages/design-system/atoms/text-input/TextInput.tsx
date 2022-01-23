import { palette } from '@roleypoly/design-system/atoms/colors';
import { fontCSS } from '@roleypoly/design-system/atoms/fonts';
import * as React from 'react';
import styled, { css } from 'styled-components';

const common = css`
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

export const StyledTextInput = styled.input`
  ${common};
`;

type TextInputProps<T extends HTMLInputElement | HTMLTextAreaElement> =
  React.InputHTMLAttributes<T>;

export const TextInput = (props: TextInputProps<HTMLInputElement>) => {
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

type TextInputWithIconProps = TextInputProps<HTMLInputElement> & {
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

const StyledTextarea = styled.textarea`
  ${common};
  ${fontCSS};

  margin: 0.5em 0;
`;

export const MultilineTextInput = (
  props: TextInputProps<HTMLTextAreaElement> & { rows?: number }
) => {
  const { children, ...rest } = props;
  const [value, setValue] = React.useState(String(props.value));
  const rows = React.useMemo(
    () => Math.min(10, Math.max(props.rows || 2, value.split(/\r?\n/).length)),
    [value]
  );

  React.useEffect(() => {
    setValue(String(props.value));
  }, [props.value]);

  return (
    <StyledTextarea
      {...rest}
      rows={rows}
      onChange={(eventData) => {
        setValue(eventData.target.value);
        props.onChange?.(eventData);
      }}
    >
      {value}
    </StyledTextarea>
  );
};
