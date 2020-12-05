import * as React from 'react';
import { guild } from 'roleypoly/common/types/storyData';
import styled from 'styled-components';
import { Preauth } from './Preauth';

export default {
    title: 'Organisms/Preauth',
    component: Preauth,
};

const Center = styled.div`
    margin: 0 auto;
`;

export const NoSlug = ({ onSendSecretCode }) => {
    return (
        <Center>
            <Preauth botName="roleypoly#3266" onSendSecretCode={onSendSecretCode} />
        </Center>
    );
};

export const WithSlug = ({ onSendSecretCode }) => {
    return (
        <Center>
            <Preauth
                botName="roleypoly#3266"
                guildSlug={guild}
                onSendSecretCode={onSendSecretCode}
            />
        </Center>
    );
};
