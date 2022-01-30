import { render } from '@testing-library/react';
import * as React from 'react';
import { ReactifyNewlines } from './ReactifyNewlines';

it('renders a correct number of divs per newlines', async () => {
  const view = render(<ReactifyNewlines>{`test\ntest\ntest`}</ReactifyNewlines>);

  const elements = await view.findAllByText('test');
  expect(elements.length).toBe(3);
});
