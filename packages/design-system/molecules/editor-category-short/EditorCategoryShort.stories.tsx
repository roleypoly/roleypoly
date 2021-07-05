import { mockCategory } from '@roleypoly/design-system/fixtures/storyData';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { EditorCategoryShort } from './EditorCategoryShort';

const decorator = (story) => (
  <Wrapper>
    {story()}
    <ReactTooltip />
  </Wrapper>
);

export default {
  title: 'Molecules/Short Category',
  component: EditorCategoryShort,
  args: {
    category: mockCategory,
  },
  decorators: [decorator],
};

const Wrapper = styled.div`
  box-shadow: 0 0 10px #000;
`;

export const shortEditor = (args) => <EditorCategoryShort {...args} />;
export const shortEditorHidden = (args) => <EditorCategoryShort {...args} />;
shortEditorHidden.args = {
  category: { ...mockCategory, hidden: true },
};
