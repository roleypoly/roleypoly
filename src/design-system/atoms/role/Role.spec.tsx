import { shallow } from 'enzyme';
import { roleCategory } from 'hack/fixtures/storyData';
import * as React from 'react';
import { Role } from './Role';

it('fires an OnClick handler when clicked', () => {
    const onClickMock = jest.fn();
    const view = shallow(
        <Role role={roleCategory[0]} selected={true} onClick={onClickMock} />
    );
    view.simulate('click');
    expect(onClickMock).toBeCalledWith(false);
});
