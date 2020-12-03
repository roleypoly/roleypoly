import * as React from 'react';
import { HelpPageTemplate } from './HelpPage';
import { WhyNoRoles } from '../../organisms/help-why-no-roles';

export default {
    title: 'Templates/Help Page',
};

export const Base = () => (
    <HelpPageTemplate user={null}>
        <h1>What is the world but vibrations?</h1>
        <p>Vibrations that synchronize and tie it together, running free forever.</p>
    </HelpPageTemplate>
);

export const WhyNoRoles_ = () => (
    <HelpPageTemplate>
        <WhyNoRoles></WhyNoRoles>
    </HelpPageTemplate>
);
