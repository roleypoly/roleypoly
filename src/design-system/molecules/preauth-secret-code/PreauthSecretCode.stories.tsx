import * as React from 'react';
import { PreauthSecretCode } from './PreauthSecretCode';

export default {
    title: 'Molecules/Preauth/Secret Code',
    component: PreauthSecretCode,
};

export const SecretCode = (args) => <PreauthSecretCode {...args} />;
