import { Logotype } from '@roleypoly/design-system/atoms/branding';
import { palette } from '@roleypoly/design-system/atoms/colors';
import { UserAvatarGroupSkeleton } from '@roleypoly/design-system/molecules/user-avatar-group';
import {
  MastheadAlignment,
  MastheadBase,
  MastheadLeft,
  MastheadRight,
} from './Masthead.styled';

export const Skeleton = () => (
  <MastheadBase>
    <MastheadAlignment>
      <MastheadLeft>
        <Logotype
          height={30}
          circleFill={palette.taupe300}
          circleOuterFill={palette.taupe200}
          typeFill={palette.taupe300}
        />
      </MastheadLeft>
      <MastheadRight>
        <UserAvatarGroupSkeleton />
      </MastheadRight>
    </MastheadAlignment>
  </MastheadBase>
);
