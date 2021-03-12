jest.unmock('./ServerMasthead');

import { shallow } from 'enzyme';
import * as React from 'react';
import { mastheadSlugs } from '../../fixtures/storyData';
import { ServerMasthead } from './ServerMasthead';
import { Editable } from './ServerMasthead.styled';

it('shows Edit Server when editable is true', () => {
    const view = shallow(<ServerMasthead editable={true} guild={mastheadSlugs[0]} />);

    expect(view.find(Editable).length).not.toBe(0);
});

it('hides Edit Server when editable is true', () => {
    const view = shallow(<ServerMasthead editable={false} guild={mastheadSlugs[0]} />);

    expect(view.find(Editable).length).toBe(0);
});
