jest.unmock('atoms/text-input');
jest.unmock('./PreauthSecretCode');

import { Button } from 'atoms/button';
import { TextInputWithIcon } from 'atoms/text-input';
import { shallow } from 'enzyme';
import * as React from 'react';
import { PreauthSecretCode } from './PreauthSecretCode';
import { FaderOpacity } from 'atoms/fader';

const value = 'unfathomable fishy sticks';
const onSubmit = jest.fn();

it('sends the secret code when submitted', () => {
    const view = shallow(<PreauthSecretCode onSubmit={onSubmit} />);

    view.find(TextInputWithIcon).simulate('change', { target: { value } });

    view.find(Button).simulate('click');
    expect(onSubmit).toBeCalledWith(value);
});

it('shows the submit button when secret code is not empty', () => {
    const view = shallow(<PreauthSecretCode onSubmit={onSubmit} />);

    view.find(TextInputWithIcon).simulate('change', { target: { value } });

    expect(view.find(FaderOpacity).props().isVisible).toBe(true);
});

it('hides the submit button when secret code is empty', () => {
    const view = shallow(<PreauthSecretCode onSubmit={onSubmit} />);

    view.find(TextInputWithIcon).simulate('change', { target: { value: '' } });

    expect(view.find(FaderOpacity).props().isVisible).toBe(false);
});
