import * as React from 'react';
import {
    ErrorWrapper,
    ErrorDivider,
    ErrorSideCode,
    ErrorText,
    ErrorTextLower,
} from './ErrorBanner.styled';
import { ErrorMessage } from 'templates/errors/errorStrings';

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
