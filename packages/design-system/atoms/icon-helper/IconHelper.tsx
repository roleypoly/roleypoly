import React from 'react';
import { IconHelperLevel, IconHelperStyled } from './IconHelper.styled';

export const IconHelper = (props: {
  children: React.ReactNode;
  level?: IconHelperLevel;
}) => <IconHelperStyled level={props.level || 'none'}>{props.children}</IconHelperStyled>;
