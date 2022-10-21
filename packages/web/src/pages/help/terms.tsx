import { HelpPageTemplate } from '@roleypoly/design-system/templates/help-page';
import { useAppShellProps } from '../../contexts/app-shell/AppShellContext';
import { Title } from '../../utils/metaTitle';

const TermsPage = () => {
  const appShellProps = useAppShellProps();

  return (
    <>
      <Title title="Terms of Use - Roleypoly Help" />
      <HelpPageTemplate {...appShellProps}>
        <h1>Terms of Use</h1>
        <p>By using Roleypoly, you agree to the following terms of use.</p>
        <p>
          "The Service" refers to
          <ul>
            <li>
              Roleypoly.com, including its subdomains and any other website through which
              the Owner makes its Service available;
            </li>
            <li>the Application Programming Interface (API);</li>
            <li>the Roleypoly Discord Bot;</li>
            <li>the Roleypoly Discord Community;</li>
          </ul>
        </p>
        <p>
          "The Owner" refers to the person or entity that owns the Service. You may
          contact the owner via email:{' '}
          <a href="mailto:hello@roleypoly.com">hello@roleypoly.com</a>
        </p>
        <h2>User Content Guidelines</h2>
        <p>
          All user-generated content on the Service (which directly includes category
          names and server messages, and any linked content within them) must follow
          applicable laws of the United States of America. Content found in violation will
          result in permanent exclusion from the platform.
        </p>
        <h3>Content Restrictions</h3>
        <ul>
          <li>
            disseminating or publishing content that is unlawful, obscene, illegitimate,
            libelous or inappropriate;
          </li>
          <li>
            publishing any content that promotes, either directly or indirectly, hate,
            racism, discrimination, pornography, violence;
          </li>
          <li>
            disseminating or publishing any content that is false or may create
            unjustified alarm;
          </li>
          <li>
            using this Service to publish, disseminate or otherwise provide content
            protected by intellectual property laws, including but not limited to patent,
            trademark or copyright law, unlawfully and without the legitimate
            right-holder's consent;
          </li>
          <li>
            using this Service to publish, disseminate or otherwise make available any
            other content which infringes on any third-party rights, including but not
            limited to state, military, trade or professional secrets and personal data;
          </li>
          <li>
            publishing any content or carrying out any activity that disrupts, interrupts,
            harms, or otherwise violates the integrity of this Website or another User's
            experience or devices. Such activities include: spamming, distributing
            unauthorized advertisements, phishing, defrauding others, spreading malware or
            viruses etc.;
          </li>
        </ul>
      </HelpPageTemplate>
    </>
  );
};

export default TermsPage;
