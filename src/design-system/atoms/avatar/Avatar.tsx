import React from 'react';
import { Container, Image } from './Avatar.styled';

export type AvatarProps = {
    src?: string;
    children?: string | React.ReactNode;
    size?: number;
    deliberatelyEmpty?: boolean;
};

/** Chuldren is recommended to not be larger than 2 uppercase letters. */
export const Avatar = (props: AvatarProps) => (
    <Container size={props.size} deliberatelyEmpty={props.deliberatelyEmpty}>
        {props.src && (
            <Image
                style={{
                    backgroundImage: `url(${props.src})`,
                }}
            />
        )}
        <div>
            {props.children || (
                /* needs specifically &nbsp; to prevent layout issues. */
                <>&nbsp;</>
            )}
        </div>
    </Container>
);
