import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Error } from './Errors';
import { errorMessages } from './errorStrings';

const messages = storiesOf('Templates/Errors', module);

for (let message in errorMessages) {
    messages.add(`${message}`, () => <Error code={message} />);
}
