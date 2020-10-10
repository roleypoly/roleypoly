jest.unmock('atoms/role')
    .unmock('atoms/button')
    .unmock('molecules/picker-category')
    .unmock('organisms/role-picker');

import { Role } from 'atoms/role';
import { shallow } from 'enzyme';
import {
    guild,
    guildData,
    guildRoles,
    member,
    mockCategorySingle,
} from 'hack/fixtures/storyData';
import { ResetSubmit } from 'molecules/reset-submit';
import { PickerCategory } from 'molecules/picker-category';
import * as React from 'react';
import { RolePicker, RolePickerProps } from './RolePicker';

it('unselects the rest of a category in single mode', () => {
    const props: RolePickerProps = {
        guildData: { ...guildData, categoriesList: [mockCategorySingle] },
        member: { ...member, rolesList: [] },
        roles: guildRoles,
        guild: guild,
        onSubmit: jest.fn(),
        editable: false,
    };

    const view = shallow(<RolePicker {...props} />);

    const roles = view.find(PickerCategory).dive().find(Role);

    roles.first().props().onClick?.(true);

    view.find(ResetSubmit).props().onSubmit();
    expect(props.onSubmit).toBeCalledWith([mockCategorySingle.rolesList[0]]);

    roles.last().props().onClick?.(true);

    view.find(ResetSubmit).props().onSubmit();
    expect(props.onSubmit).toBeCalledWith([mockCategorySingle.rolesList[1]]);
});
