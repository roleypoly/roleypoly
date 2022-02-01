import { getHighestRole } from './discord';

describe('getHighestRole', () => {
  it('returns the highest role', () => {
    const roles = [
      {
        id: 'role-1',
        name: 'Role 1',
        color: 0,
        position: 17,
        permissions: '',
        managed: false,
      },
      {
        id: 'role-2',
        name: 'Role 2',
        color: 0,
        position: 2,
        permissions: '',
        managed: false,
      },
      {
        id: 'role-3',
        name: 'Role 3',
        color: 0,
        position: 19,
        permissions: '',
        managed: false,
      },
    ];

    expect(getHighestRole(roles)).toEqual(roles[2]);
  });
});
