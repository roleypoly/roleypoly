import * as React from 'react';
import { templateStories } from 'templates/templates.story';
import { Error } from './Errors';
import { errorMessages } from './errorStrings';

const messages = templateStories('Errors/Messages', module);

for (let message in errorMessages) {
    messages.add(`${message}`, () => <Error code={message} />);
}
