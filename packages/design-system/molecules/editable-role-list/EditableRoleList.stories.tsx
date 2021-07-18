import { presentableGuild } from '../../fixtures/storyData';
import { EditableRoleList } from './EditableRoleList';

export default {
  title: 'Molecules/Editable Role List',
  component: EditableRoleList,
  args: {
    roles: presentableGuild.roles,
    selectedRoles: presentableGuild.data.categories[0].roles,
    unselectedRoles: presentableGuild.roles.filter(
      (r) => !presentableGuild.data.categories[0].roles.includes(r.id)
    ),
  },
};

export const editableRoleList = (args) => <EditableRoleList {...args} />;
