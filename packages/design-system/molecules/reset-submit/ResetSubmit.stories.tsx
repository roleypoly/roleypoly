import * as React from 'react';
import { InlineResetSubmit, ResetSubmit } from './ResetSubmit';

export default {
  title: 'Molecules/Reset and Submit',
  component: ResetSubmit,
};

export const normal = (args) => <ResetSubmit {...args} />;
export const inline = (args) => <InlineResetSubmit {...args} />;
