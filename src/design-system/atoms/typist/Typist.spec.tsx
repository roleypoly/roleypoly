import { mount } from 'enzyme';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { Typist } from './Typist';

jest.useFakeTimers();

it('correctly cycles through provided lines', () => {
    const lines = ['abcdef', 'ghijkl'];
    act(() => {
        let view = mount(<Typist charTimeout={100} resetTimeout={10000} lines={lines} />);

        jest.advanceTimersByTime(100 * lines[0].length);
        view = view.update();
        expect(view.text()).toBe(lines[0]);
    });
});

it('correctly cycles through provided characters in a line', () => {
    const lines = ['abcdef'];

    act(() => {
        let view = mount(<Typist charTimeout={1} resetTimeout={100} lines={lines} />);

        Array(...lines[0]).forEach((_, idx) => {
            view = view.update();
            expect(view.text()).toBe(lines[0].slice(0, idx));
            jest.advanceTimersByTime(1);
        });
    });
});
