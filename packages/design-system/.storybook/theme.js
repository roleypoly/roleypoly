import { create } from '@storybook/theming';
import { palette } from '../atoms/colors';

export const roleypolyTheme = create({
  base: 'dark',

  colorPrimary: palette.green400,
  colorSecondary: palette.taupe200,

  // UI
  appBg: palette.taupe300,
  appContentBg: palette.taupe200,
  appBorderColor: palette.taupe100,
  appBorderRadius: 0,

  // Typography
  fontBase: 'system-ui, sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: palette.grey600,
  textInverseColor: palette.grey100,

  // Toolbar default and active colors
  barTextColor: palette.taupe500,
  barSelectedColor: palette.taupe600,
  barBg: palette.taupe100,

  // Form colors
  inputBg: 'rgba(0,0,0,0.24)',
  inputBorder: palette.taupe100,
  inputTextColor: palette.grey600,
  inputBorderRadius: 0,
});
