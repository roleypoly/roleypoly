import * as React from "react";
import * as styled from "./Role.styled";
import { FaCheck, FaTimes } from "react-icons/fa";
import { numberToChroma } from "roleypoly/src/design-system/atoms/colors";
import chroma from "chroma-js";

type Props = {
  role: any; // TODO: rpc types
  selected: boolean;
  disabled?: boolean;
  onClick?: (newState: boolean) => void;
  tooltipId?: string;
};

export const Role = (props: Props) => {
  const colorVars = {
    "--role-color": "white",
    "--role-contrast": "hsl(0,0,0%)",
    "--role-accent": "hsl(0,0,70%)",
  };

  if (props.role.color !== 0) {
    const baseColor = numberToChroma(props.role.color);
    const contrastColorUp = baseColor.brighten(5);
    const contrastColorDown = baseColor.darken(5);
    const ratio = chroma.contrast(contrastColorDown, baseColor);
    const contrastColor = ratio > 2 ? contrastColorDown : contrastColorUp;
    const accentColor = ratio > 2 ? baseColor.darken(2) : baseColor.brighten(2);
    colorVars["--role-color"] = baseColor.css();
    colorVars["--role-accent"] = accentColor.css();
    colorVars["--role-contrast"] = contrastColor.css();
  }

  const styledProps: styled.StyledProps = {
    selected: props.selected,
    defaultColor: props.role.color === 0,
    disabled: !!props.disabled,
  };

  const extra = !props.disabled
    ? {}
    : {
        "data-tip": disabledReason(props.role),
        "data-for": props.tooltipId,
      };

  return (
    <styled.Outer
      {...styledProps}
      style={colorVars as any}
      onClick={() => !props.disabled && props.onClick?.(!props.selected)}
      {...extra}
    >
      <styled.Circle {...styledProps}>
        {!props.disabled ? <FaCheck /> : <FaTimes />}
      </styled.Circle>
      <styled.Text>{props.role.name}</styled.Text>
    </styled.Outer>
  );
};

const disabledReason = (role: any) => {
  switch (role.safety) {
    case 1:
      return `This role is above Roleypoly's own role.`;
    case 2:
      const { permissions } = role;
      let permissionHits: string[] = [];

      (permissions & 0x00000008) === 0x00000008 &&
        permissionHits.push("Administrator");
      (permissions & 0x10000000) === 0x10000000 &&
        permissionHits.push("Manage Roles");

      return `This role has unsafe permissions: ${permissionHits.join(", ")}`;
    default:
      return `This role is disabled.`;
  }
};
