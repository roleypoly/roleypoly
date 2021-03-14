jest
  .unmock('@roleypoly/design-system/atoms/role')
  .unmock('@roleypoly/design-system/atoms/button')
  .unmock('@roleypoly/design-system/molecules/picker-category')
  .unmock('@roleypoly/design-system/organisms/role-picker');

import { Role } from '@roleypoly/design-system/atoms/role';
import { PickerCategory } from '@roleypoly/design-system/molecules/picker-category';
import { ResetSubmit } from '@roleypoly/design-system/molecules/reset-submit';
import { shallow } from 'enzyme';
import * as React from 'react';
import {
  guildData,
  mastheadSlugs,
  member,
  mockCategorySingle,
  roleCategory,
  roleCategory2,
} from '../../fixtures/storyData';
import { RolePicker, RolePickerProps } from './RolePicker';

it('unselects the rest of a category in single mode', () => {
  const props: RolePickerProps = {
    guildData: { ...guildData, categories: [mockCategorySingle] },
    member: { ...member, roles: [] },
    roles: [...roleCategory, ...roleCategory2],
    guild: mastheadSlugs[0],
    onSubmit: jest.fn(),
    editable: false,
  };

  const view = shallow(<RolePicker {...props} />);

  const roles = view.find(PickerCategory).dive().find(Role);

  roles.first().props().onClick?.(true);

  view.find(ResetSubmit).props().onSubmit();
  expect(props.onSubmit).toBeCalledWith([mockCategorySingle.roles[0]]);

  roles.at(1).props().onClick?.(true);

  view.find(ResetSubmit).props().onSubmit();
  expect(props.onSubmit).toBeCalledWith([mockCategorySingle.roles[1]]);
});
