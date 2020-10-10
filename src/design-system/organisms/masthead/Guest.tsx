import { Logotype } from 'atoms/branding';
import { Button } from 'atoms/button';
import Link from 'next/link';
import * as React from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import {
    MastheadBase,
    MastheadLeft,
    MastheadRight,
    MastheadAlignment,
    MastheadA,
} from './Masthead.styled';

export const Guest = () => (
    <MastheadBase>
        <MastheadAlignment>
            <MastheadLeft>
                <Link href="/" passHref>
                    <MastheadA>
                        <Logotype height={30} />
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
