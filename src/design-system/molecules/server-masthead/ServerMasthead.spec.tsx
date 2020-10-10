jest.unmock('./ServerMasthead');

import * as React from 'react';
import { shallow } from 'enzyme';
import { ServerMasthead } from './ServerMasthead';
import { guild } from 'hack/fixtures/storyData';
import { Editable } from './ServerMasthead.styled';

it('shows Edit Server when editable is true', () => {
    const view = shallow(<ServerMasthead editable={true} guild={guild} />);

    expect(view.find(Editable).length).not.toBe(0);
});

it('hides Edit Server when editable is true', () => {
    const view = shallow(<ServerMasthead editable={false} guild={guild} />);

    expect(view.find(Editable).length).toBe(0);
});
