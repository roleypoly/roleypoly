import { AvatarProps } from "./Avatar";
import styled, { css } from "styled-components";
import * as _ from "styled-components"; // tslint:disable-line:no-duplicate-imports
import { palette } from "roleypoly/src/design-system/atoms/colors";

type ContainerProps = Pick<AvatarProps, "size"> &
  Pick<AvatarProps, "deliberatelyEmpty">;
export const Container = styled.div<ContainerProps>`
  border-radius: 100%;
  box-sizing: border-box;
  width: ${(props: ContainerProps) => props.size || 48}px;
  height: ${(props: ContainerProps) => props.size || 48}px;
  min-width: ${(props: ContainerProps) => props.size || 48}px;
  min-height: ${(props: ContainerProps) => props.size || 48}px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${palette.grey100};
  position: relative;
  background-color: ${palette.grey500};
  font-weight: bold;
  text-align: center;
  line-height: 1;
  overflow: hidden;
  font-size: ${(props: ContainerProps) => props.size};
  ${(props) =>
    props.deliberatelyEmpty &&
    css`
      border: 4px solid rgba(0, 0, 0, 0.25);
      background-color: ${palette.taupe400};
      color: ${palette.taupe600};
    `}
`;

type ImageProps = Pick<AvatarProps, "src">;
export const Image = styled.div<ImageProps>`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 100%;
`;
