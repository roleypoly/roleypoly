import Link from 'next/link';
import * as React from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { DynamicLogotype } from 'roleypoly/design-system/atoms/branding';
import { Button } from 'roleypoly/design-system/atoms/button';
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
                <Link href="/" passHref>
                    <MastheadA>
                        <DynamicLogotype height={30} />
                    </MastheadA>
                </Link>
            </MastheadLeft>
            <MastheadRight>
                <Link href="/auth/login" passHref>
                    <MastheadA>
                        <Button size="small">
                            Login{' '}
                            <FaSignInAlt
                                size="1em"
                                style={{ transform: 'translateY(1px)' }}
                            />
                        </Button>
                    </MastheadA>
                </Link>
            </MastheadRight>
        </MastheadAlignment>
    </MastheadBase>
);
