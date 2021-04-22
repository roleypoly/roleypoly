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
    {props.children}:<div>{props.state ? 'on' : 'off'}!</div>
  </div>
);
