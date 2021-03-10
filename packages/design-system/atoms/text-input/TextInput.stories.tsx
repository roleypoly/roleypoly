import { SmallTitle } from '@roleypoly/design-system/atoms/typography';
import * as React from 'react';
import { FiKey } from 'react-icons/fi';
import { TextInput, TextInputWithIcon } from './TextInput';

export default {
    title: 'Atoms/Text Input',
    argTypes: {
        placeholder: { control: 'text' },
    },
    args: {
        placeholder: 'Fill me in!',
    },
};

export const Common = (args) => (
    <div>
        <SmallTitle>TextInput</SmallTitle>
        <div>
            <TextInput {...args} />
        </div>
        <div>
            <TextInput {...args} disabled />
        </div>
        <SmallTitle>TextInputWithIcon</SmallTitle>
        <div>
            <TextInputWithIcon icon={<FiKey />} {...args} />
        </div>
        <div>
            <TextInputWithIcon icon={<FiKey />} {...args} disabled />
        </div>
        <div>
            <TextInputWithIcon icon={<FiKey />} {...args} type="password" />
        </div>
    </div>
);
