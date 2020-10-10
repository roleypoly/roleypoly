import * as React from 'react';
import { templateStories } from 'templates/templates.story';
import { AuthLogin } from './AuthLogin';
import { action } from '@storybook/addon-actions';
import { guild } from 'hack/fixtures/storyData';

const story = templateStories('Login', module);

story.add('No Slug', () => (
    <AuthLogin botName="roleypoly#3266" onSendSecretCode={action('secret code!')} />
));
story.add('With Slug', () => (
    <AuthLogin
        botName="roleypoly#3266"
        guildSlug={guild}
        onSendSecretCode={action('secret code!')}
    />
));
