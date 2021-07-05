import { ToggleState, ToggleSwitch } from './Toggle.styled';

type ToggleProps = {
  onChange?: (newState: boolean) => void;
  children: React.ReactNode;
  state: boolean;
};

export const Toggle = (props: ToggleProps) => (
  <div
    onClick={() => {
      props.onChange?.(!props.state);
    }}
  >
    <ToggleSwitch state={props.state}>
      <ToggleState />
    </ToggleSwitch>
    {props.children}
  </div>
);
