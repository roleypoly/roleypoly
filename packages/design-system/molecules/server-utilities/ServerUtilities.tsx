import {
  ClickaleBlock,
  Description,
  MainSide,
  Title,
} from '@roleypoly/design-system/molecules/server-utilities/ServerUtilities.styled';
import { GuildData } from '@roleypoly/types';
import { GoChevronRight } from 'react-icons/go';

type Props = {
  guildData: GuildData;
};

const Utility = (props: {
  link: string;
  title: React.ReactNode;
  description: string;
}) => (
  <ClickaleBlock href={props.link}>
    <MainSide>
      <Title>{props.title}</Title>
      <Description>{props.description}</Description>
    </MainSide>
    <div>
      <GoChevronRight />
    </div>
  </ClickaleBlock>
);

export const ServerUtilities = (props: Props) => (
  <div>
    {/* {hasFeature(props.guildData.features, Features.AccessControl) && (
      <Utility
        title={
          <>
            <GoShield />
            &nbsp;&nbsp;Access Control
          </>
        }
        description="Set up who can use Roleypoly in your server"
        link={`/s/${props.guildData.id}/edit/access-control`}
      />
    )}
    {hasFeature(props.guildData.features, Features.AuditLogging) && (
      <Utility
        title={
          <>
            <GoReport />
            &nbsp;&nbsp;Audit Logging
          </>
        }
        description="Setup audit logging via a Discord webhook"
        link={`/s/${props.guildData.id}/edit/audit-logging`}
      />
    )}
    {hasFeature(props.guildData.features, Features.Preview) && (
      <Utility
        title={
          <>
            <GoArchive />
            &nbsp;&nbsp;Manage your Data
          </>
        }
        description="Export or delete all of your Roleypoly data."
        link={`/s/${props.guildData.id}/edit/data`}
      />
    )} */}
  </div>
);
