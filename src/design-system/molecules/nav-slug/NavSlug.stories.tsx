import * as React from 'react';
import { NavSlug } from './NavSlug';
import { guild } from 'roleypoly/src/design-system/shared-types/storyData';

export default {
    title: 'Molecules/Server Slug',
    component: NavSlug,
};

export const Empty = () => <NavSlug guild={null} />;
export const Example = () => <NavSlug guild={guild} />;
