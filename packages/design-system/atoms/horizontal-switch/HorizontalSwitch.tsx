import * as React from 'react';
import { Item, Wrapper } from './HorizontalSwitch.styled';

export type SwitchProps = {
    items: string[];
    value: string;
    onChange: (value: string) => void;
};

export const HorizontalSwitch = (props: SwitchProps) => {
    const handleClick = (item: typeof props.value) => () => {
        props.onChange?.(item);
    };

    return (
        <Wrapper>
            {props.items.map((item, idx) => (
                <Item
                    key={idx}
                    selected={item === props.value}
                    onClick={handleClick(item)}
                >
                    {item}
                </Item>
            ))}
        </Wrapper>
    );
};
