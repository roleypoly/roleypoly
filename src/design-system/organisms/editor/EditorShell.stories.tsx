import * as React from 'react';
import { EditorShell } from './EditorShell';
import { guildEnum } from 'roleypoly/src/design-system/shared-types/storyData';

export default {
    title: 'Organisms/Editor',
    component: EditorShell,
};

export const Shell = () => <EditorShell guild={guildEnum.guildsList[0]} />;
