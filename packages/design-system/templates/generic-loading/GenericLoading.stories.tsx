import { GenericLoadingTemplate } from './GenericLoading';
export default {
  title: 'Templates/Generic Loading',
  component: GenericLoadingTemplate,
};

export const genericLoading = (args) => <GenericLoadingTemplate {...args} />;
