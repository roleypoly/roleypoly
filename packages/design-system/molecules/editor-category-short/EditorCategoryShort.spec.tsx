import { mockCategory } from '@roleypoly/design-system/fixtures/storyData';
import { render } from '@testing-library/react';
import { EditorCategoryShort } from './EditorCategoryShort';

it('triggers onOpen when clicked', async () => {
  const onOpen = jest.fn();
  const view = render(<EditorCategoryShort category={mockCategory} onOpen={onOpen} />);

  view.getByRole('menuitem')?.click();

  expect(onOpen).toHaveBeenCalled();
});
