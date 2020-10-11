import { shallow } from 'enzyme';
import * as React from 'react';
import { ReactifyNewlines } from './ReactifyNewlines';

it('renders a correct number of divs per newlines', () => {
    const view = shallow(<ReactifyNewlines>{`1\n2\n3`}</ReactifyNewlines>);

    expect(view.find('div').length).toBe(3);
});
