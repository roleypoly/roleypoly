import * as React from 'react';
import { Button } from 'roleypoly/design-system/atoms/button';
import { Popover as PopoverComponent } from './Popover';

export default {
    title: 'Atoms/Popover',
    argTypes: {
        canDefocus: { control: 'boolean' },
    },
    args: {
        canDefocus: true,
    },
};

export const Popover = ({ canDefocus }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div style={{ padding: 50 }}>
            <Button size="small" onClick={() => setIsOpen(!isOpen)}>
                {!isOpen ? 'Open' : 'Close'} me!
            </Button>
            <PopoverComponent
                position="top right"
                active={isOpen}
                onExit={() => setIsOpen(false)}
                canDefocus={canDefocus}
                headContent={<>Hello c:</>}
            >
                stuff
            </PopoverComponent>
        </div>
    );
};
