import * as React from 'react';
import { shallow } from 'enzyme';
import { Button } from './Button';

it('fires an onClick callback when clicked', () => {
    const mock = jest.fn();
    const view = shallow(<Button onClick={mock}>Button</Button>);

    view.simulate('click');
    expect(mock).toBeCalled();
});
