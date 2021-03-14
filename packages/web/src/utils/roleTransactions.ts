import { Role, RoleTransaction, TransactionType } from '@roleypoly/types';

export const makeRoleTransactions = (
  oldRoles: Role['id'][],
  newRoles: Role['id'][]
): RoleTransaction[] => {
  const transactions: RoleTransaction[] = [];

  // Removes: old roles not in new roles
  for (let oldID of oldRoles) {
    if (!newRoles.includes(oldID)) {
      transactions.push({
        id: oldID,
        action: TransactionType.Remove,
      });
    }
  }

  // Adds: new roles not in old roles
  for (let newID of newRoles) {
    if (!oldRoles.includes(newID)) {
      transactions.push({
        id: newID,
        action: TransactionType.Add,
      });
    }
  }

  return transactions;
};
