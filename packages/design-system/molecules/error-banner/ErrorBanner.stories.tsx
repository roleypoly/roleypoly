import * as React from 'react';
import { ErrorBanner } from './ErrorBanner';

export default {
  title: 'Molecules/Error Banner',
  argTypes: {
    english: { control: 'text' },
    japanese: { control: 'text' },
    friendlyCode: { control: 'text' },
  },
  args: {
    english: 'Oh no! I lost it!',
    japanese: 'ちょっとにんげんだよ',
    friendlyCode: '404',
  },
};

export const ErrorBanner_ = ({ english, japanese, friendlyCode }) => (
  <ErrorBanner
    message={{
      english,
      japanese,
      friendlyCode,
    }}
  />
);
