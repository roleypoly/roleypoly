import { DynamicLogotype } from '@roleypoly/design-system/atoms/branding';
import { Button } from '@roleypoly/design-system/atoms/button';
import * as React from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import {
    MastheadA,
    MastheadAlignment,
    MastheadBase,
    MastheadLeft,
    MastheadRight,
} from './Masthead.styled';

export const Guest = () => (
    <MastheadBase>
        <MastheadAlignment>
            <MastheadLeft>
                <MastheadA href="/">
                    <DynamicLogotype height={30} />
                </MastheadA>
            </MastheadLeft>
            <MastheadRight>
                <MastheadA href="/auth/login">
                    <Button size="small">
                        Login{' '}
                        <FaSignInAlt
                            size="1em"
                            style={{ transform: 'translateY(1px)' }}
                        />
                    </Button>
                </MastheadA>
            </MastheadRight>
        </MastheadAlignment>
    </MastheadBase>
);
