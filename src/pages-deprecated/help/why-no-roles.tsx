import { WhyNoRoles } from '@roleypoly/design-system/organisms/help-why-no-roles';
import {
    HelpPageProps,
    HelpPageTemplate,
} from '@roleypoly/design-system/templates/help-page';

const WhyNoRolesPage = (props: HelpPageProps) => (
    <HelpPageTemplate {...props}>
        <WhyNoRoles></WhyNoRoles>
    </HelpPageTemplate>
);

export default WhyNoRolesPage;
