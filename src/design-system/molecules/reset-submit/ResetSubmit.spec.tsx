import { Button } from 'atoms/button';
import { shallow } from 'enzyme';
import * as React from 'react';
import { ResetSubmit } from './ResetSubmit';

const onReset = jest.fn();
const onSubmit = jest.fn();

it('calls onReset when reset is clicked', () => {
    const view = shallow(<ResetSubmit onSubmit={onSubmit} onReset={onReset} />);

    view.find(Button).at(0).simulate('click');

    expect(onReset).toBeCalled();
});

it('calls onSubmit when submit is clicked', () => {
    const view = shallow(<ResetSubmit onSubmit={onSubmit} onReset={onReset} />);

    view.find(Button).at(1).simulate('click');

    expect(onSubmit).toBeCalled();
});
