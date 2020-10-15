import { DiscordUser } from 'roleypoly/src/rpc/shared';
import { user } from 'roleypoly/src/design-system/shared-types/storyData';
import { AsObjectToProto } from './protoReflection';

it('converts a RoleypolyUser.AsObject back to protobuf', () => {
    const proto = AsObjectToProto(DiscordUser, user);

    expect(proto.toObject()).toMatchObject(user);
});
