import * as React from 'react';
import {
    PopoverBase,
    DefocusHandler,
    PopoverHead,
    PopoverHeadCloser,
    PopoverContent,
} from './Popover.styled';
import { globalOnKeyUp } from 'roleypoly/src/design-system/atoms/key-events';
import { IoMdClose } from 'react-icons/io';

type PopoverProps = {
    children: () => React.ReactNode;
    position: 'top left' | 'top right' | 'bottom left' | 'bottom right';
    active: boolean;
    canDefocus?: boolean;
    onExit?: (type: 'escape' | 'defocus' | 'explicit') => void;
    headContent: React.ReactNode;
};

export const Popover = (props: PopoverProps) => {
    globalOnKeyUp(['Escape'], () => props.onExit?.('escape'), props.active);
    return (
        <>
            <PopoverBase active={props.active}>
                <PopoverHead>
                    <PopoverHeadCloser onClick={() => props.onExit?.('explicit')}>
                        <IoMdClose />
                    </PopoverHeadCloser>
                    <div>{props.headContent}</div>
                </PopoverHead>
                <PopoverContent>{props.children()}</PopoverContent>
            </PopoverBase>
            {props.canDefocus && (
                <DefocusHandler
                    active={props.active}
                    onClick={() => props.onExit?.('defocus')}
                />
            )}
        </>
    );
};
