import { useEffect } from 'react';

export const globalOnKeyUp = (
    key: string[],
    action: () => any,
    isActive: boolean = true
) => {
    useEffect(() => {
        const onKeyUp = (event: KeyboardEvent) => {
            if (isActive && key.includes(event.key)) {
                action();
            }
        };

        document.body.addEventListener('keyup', onKeyUp);

        return () => document.body.removeEventListener('keyup', onKeyUp);
    }, [key, action, isActive]);
};
