import * as React from 'react';
import { guildEnum } from 'roleypoly/common/types/storyData';
import { EditorShell } from './EditorShell';

export default {
    title: 'Organisms/Editor',
    component: EditorShell,
};

export const Shell = () => <EditorShell guild={guildEnum.guildsList[0]} />;
