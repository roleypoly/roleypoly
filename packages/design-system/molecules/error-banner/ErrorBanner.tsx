import * as React from 'react';
import {
  ErrorDivider,
  ErrorSideCode,
  ErrorText,
  ErrorTextLower,
  ErrorWrapper,
} from './ErrorBanner.styled';

export type ErrorMessage = {
  english: string;
  japanese?: string;
  friendlyCode?: string;
};

type ErrorBannerProps = {
  message: Required<ErrorMessage>;
};

export const ErrorBanner = (props: ErrorBannerProps) => (
  <ErrorWrapper>
    <ErrorSideCode>{props.message.friendlyCode}</ErrorSideCode>
    <ErrorDivider />
    <div>
      <ErrorText>{props.message.english}</ErrorText>
      <ErrorTextLower>{props.message.japanese}</ErrorTextLower>
    </div>
  </ErrorWrapper>
);
