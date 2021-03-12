import { shallow } from 'enzyme';
import * as React from 'react';
import { roleCategory } from '../../fixtures/storyData';
import { Role } from './Role';

it('fires an OnClick handler when clicked', () => {
    const onClickMock = jest.fn();
    const view = shallow(
        <Role role={roleCategory[0]} selected={true} onClick={onClickMock} />
    );
    view.simulate('click');
    expect(onClickMock).toBeCalledWith(false);
});
