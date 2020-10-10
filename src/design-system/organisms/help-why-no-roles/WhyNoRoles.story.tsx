import { WhyNoRoles } from './WhyNoRoles';
import * as React from 'react';
import { organismStories } from 'organisms/organisms.story';
import { HelpStoryWrapper } from 'organisms/help-page-base/HelpPageBase.story';

organismStories('Help Pages/Pages', module).add('Why No Roles', () => (
    <HelpStoryWrapper>
        <WhyNoRoles />
    </HelpStoryWrapper>
));
