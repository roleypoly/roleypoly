import React from 'react';
import ReactTooltip from 'react-tooltip';
import { CopyAreaStyled, CopyAreaTextInput } from './CopyArea.styled';

type CopyAreaProps = {
  value: string;
};

enum CopyState {
  NotCopied = 0,
  Copied = 1,
}

export const CopyArea = (props: CopyAreaProps) => {
  const [copied, setCopied] = React.useState<CopyState>(CopyState.NotCopied);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.setSelectionRange(0, 99999);

    if (navigator.clipboard) {
      navigator.clipboard.writeText(props.value);
      setCopied(CopyState.Copied);
    }
  };

  const strings = {
    [CopyState.NotCopied]: `Press ⌘/Ctrl+C to copy`,
    [CopyState.Copied]: 'Copied to clipboard!',
  };

  return (
    <CopyAreaStyled>
      <CopyAreaTextInput
        ref={inputRef}
        value={props.value}
        onClick={handleClick}
        onBlur={() => setCopied(CopyState.NotCopied)}
        copied={copied === CopyState.Copied}
        data-tip={strings[copied]}
        data-for={'copy-area'}
      />
      <ReactTooltip id="copy-area" />
    </CopyAreaStyled>
  );
};
