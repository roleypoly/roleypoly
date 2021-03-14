import * as React from 'react';
import { guild } from '../../fixtures/storyData';
import { NavSlug } from './NavSlug';

export default {
  title: 'Molecules/Server Slug',
  component: NavSlug,
};

export const Empty = () => <NavSlug guild={null} />;
export const Example = () => <NavSlug guild={guild} />;
