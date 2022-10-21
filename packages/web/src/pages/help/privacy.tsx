import { HelpPageTemplate } from '@roleypoly/design-system/templates/help-page';
import { useAppShellProps } from '../../contexts/app-shell/AppShellContext';
import { Title } from '../../utils/metaTitle';

const PrivacyPage = () => {
  const appShellProps = useAppShellProps();

  return (
    <>
      <Title title="Privacy Policy - Roleypoly Help" />
      <HelpPageTemplate {...appShellProps}>
        <h1>Privacy Policy</h1>
        <p>
          This Privacy Policy describes how your personal information is collected, used,
          and shared when you visit. This document only applies to https://roleypoly.com
          and its subdomains. Roleypoly is open source, and could be run on other URLs by
          third parties. Roleypoly Owners do not represent, protect, or hold warranty to
          any third party installations of Roleypoly.
        </p>
        <h2>Our Promise</h2>
        <p>
          We will never sell or share your personal data with anyone for any reason. We
          hold privacy as a top priority, and will make all efforts to protect your
          information from authorized or unauthorized third-parties where possible. We
          truly understand the nature of some of the data we have access to, and could
          identify you as a protected class of person in unwanted ways. For this reason,
          we promise to protect your privacy and safety in accordance or better than
          applicable laws.
        </p>
        <p>
          Our databases and infrastructure are operated by Cloudflare. You can review
          Cloudflare's Privacy Policy at{' '}
          <a href="https://www.cloudflare.com/privacypolicy/">
            https://www.cloudflare.com/privacypolicy/
          </a>
        </p>
        <h2>Personal Information We Collect</h2>
        <ul>
          <li>
            <b>Information you provide.</b> This information is temporarily stored in our
            databases, and removed upon logging out and/or 6 hours, whichever is sooner.
            <ul>
              <li>
                Your Discord account username and ID, servers you're in, and roles you
                have within those servers;
              </li>
            </ul>
          </li>
          <li>
            <b>Information you or your administrator provides.</b> This information is
            stored securely in our database could include or insinuate demographics of
            users.
            <ul>
              <li>Category names and the role IDs contained within category data;</li>
              <li>Server messages provided to users;</li>
              <li>Other server-specific configurations;</li>
            </ul>
          </li>
          <li>
            <b>Information we collect automatically.</b> This information is stored within
            Cloudflare's network.
            <ul>
              <li>
                Your IP address, browser type, and operating system, and other similar
                information;
              </li>
              <li>
                The pages you visit on our Site and the time spent on those pages, and
                other similar information;
              </li>
              <li>
                Cloudflare abuse prevention techniques such as IP reputation, rate
                limiting, and bot detection, which could personally identify you to
                Cloudflare;
              </li>
            </ul>
          </li>
          <li>
            <b>Cookies</b> to keep you logged in to the dashboard.
          </li>
        </ul>
        <h2>Users under the age of 13</h2>
        <p>
          Roleypoly is not intended for use by children under the age of 13. If you are
          under the age of 13, do not use Roleypoly. If we learn that we have collected
          personal information from a child under the age of 13, we will delete that
          information as quickly as possible. If you believe that we might have any
          information from or about a child under the age of 13, please contact us at{' '}
          <a href="mailto:hello@roleypoly.com">hello@roleypoly.com</a>.
        </p>
        <p>
          This policy is in alignment with Discord's own Terms of Service and Privacy
          Policy.
        </p>
        <h2>"Do Not Track" requests</h2>
        <p>
          Our first-party systems do not oblige Do Not Track requests, and will operate in
          accordance with this Privacy Policy regardless.
        </p>
        <h2>Data retention and processing</h2>
        <p>
          We retain your personal data for at most 6 hours, and is removed upon logging
          out, whichever is sooner.
        </p>
        <p>
          Roleypoly is based in the United States, and data is collected and processed
          within or nearby to the country you reside in. We do not back up personally
          identifiable information.
        </p>
        <h2>Rights to your data</h2>
        <p>
          Individuals in California, the European Economic Area, Canada, Costa Rica, and
          other other jurisdictions have certain legal rights to obtain confirmation of
          whether we hold personal data about them, to access personal data we hold about
          them (including, in some cases, in portable form), and to obtain its correction,
          update, amendment or deletion in appropriate circumstances. They may also object
          to our uses or disclosures of personal data, to request a restriction on its
          processing, or withdraw any consent, though such actions typically will not have
          retroactive effect. They also will not affect our ability to continue processing
          data in lawful ways.
        </p>
        <p>
          In addition, Roleypoly will respect your right to control your data, regardless
          of your jurisdiction.
        </p>
        <ul>
          <li>
            <b>How can I access data you have about me?</b> Please send a request to our
            Discord server, and operators will share this data to you in Javascript Object
            Notation (JSON) format.
          </li>
          <li>
            <b>
              How do I correct, update, amend, or delete the personal data you have about
              me?
            </b>{' '}
            Upon logging out of the service, all personal data is deleted. We do not offer
            corrections or updates, you will be required to log out and back in with
            corrected information.
          </li>
          <li>
            <b>
              How do I object or restrict the manner in which Roleypoly processes my
              personal data?
            </b>{' '}
            Please raise any concerns over email via{' '}
            <a href="mailto:hello@roleypoly.com">hello@roleypoly.com</a>.
          </li>
        </ul>
      </HelpPageTemplate>
    </>
  );
};

export default PrivacyPage;
