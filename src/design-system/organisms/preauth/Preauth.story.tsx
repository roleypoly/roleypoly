import * as React from 'react';
import { Preauth } from './Preauth';
import { organismStories } from 'organisms/organisms.story';
import { guild } from 'hack/fixtures/storyData';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

const story = organismStories('Preauth', module);

const Center = styled.div`
    margin: 0 auto;
`;

story.add('No Slug', () => {
    return (
        <Center>
            <Preauth botName="roleypoly#3266" onSendSecretCode={action('secret code!')} />
        </Center>
    );
});

story.add('With Slug', () => {
    return (
        <Center>
            <Preauth
                botName="roleypoly#3266"
                guildSlug={guild}
                onSendSecretCode={action('secret code!')}
            />
        </Center>
    );
});
