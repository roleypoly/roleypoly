import * as React from 'react';
import { atomStories } from 'atoms/atoms.story';
import { Button } from 'atoms/button';
import { Popover } from './Popover';
import { boolean } from '@storybook/addon-knobs';

const story = atomStories('Popover', module);

story.add('Popover', () => {
    const canDefocus = boolean('Can Defocus?', true);
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div style={{ padding: 50 }}>
            <Button size="small" onClick={() => setIsOpen(!isOpen)}>
                {!isOpen ? 'Open' : 'Close'} me!
            </Button>
            <Popover
                position="top right"
                active={isOpen}
                onExit={() => setIsOpen(false)}
                canDefocus={canDefocus}
                headContent={<>Hello c:</>}
            >
                stuff
            </Popover>
        </div>
    );
});
