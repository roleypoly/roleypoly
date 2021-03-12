import { SmallTitle } from '@roleypoly/design-system/atoms/typography';
import { Collapse } from './Collapse';

export default {
    title: 'Atoms/Collapse',
    component: Collapse,
};

export const collapse = (args) => (
    <SmallTitle>
        Hello, <Collapse {...args}>small</Collapse> world!
    </SmallTitle>
);
