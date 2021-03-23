import { render, screen } from '@testing-library/react';
import { Tab, TabView, TabViewProps } from './TabView';

const makeView = (props: Partial<TabViewProps> = {}) =>
  render(
    <TabView {...props}>
      <Tab title="Tab 1">{() => <div>tab 1</div>}</Tab>
      <Tab title="Tab 2">{() => <div>tab 2</div>}</Tab>,
    </TabView>
  );

it('renders tab content correctly', () => {
  makeView();

  expect(screen.getAllByText(/tab [1-2]/)).toHaveLength(2);
});
