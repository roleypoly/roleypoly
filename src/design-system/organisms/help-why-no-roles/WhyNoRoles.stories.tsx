import * as React from 'react';
import { HelpStoryWrapper } from '../../molecules/help-page-base/storyDecorator';
import { WhyNoRoles } from './WhyNoRoles';

export default {
    title: 'Organisms/Help Pages',
    decorators: [HelpStoryWrapper],
};

export const WhyNoRoles_ = () => <WhyNoRoles />;
