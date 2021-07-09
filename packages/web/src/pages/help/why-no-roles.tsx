import { WhyNoRoles } from '@roleypoly/design-system/organisms/help-why-no-roles';
import { HelpPageTemplate } from '@roleypoly/design-system/templates/help-page';
import { useAppShellProps } from '../../contexts/app-shell/AppShellContext';
import { Title } from '../../utils/metaTitle';

const WhyNoRolesPage = () => {
  const appShellProps = useAppShellProps();

  return (
    <>
      <Title title="Why can't I see my roles? - Roleypoly Help" />
      <HelpPageTemplate {...appShellProps}>
        <WhyNoRoles />
      </HelpPageTemplate>
    </>
  );
};

export default WhyNoRolesPage;
