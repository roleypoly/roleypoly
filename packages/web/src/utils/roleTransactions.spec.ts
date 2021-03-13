import { RoleTransaction, TransactionType } from '@roleypoly/types';
import { makeRoleTransactions } from './roleTransactions';

it('creates a transactional diff of two sets of roles', () => {
    const currentRoles = ['aaa', 'bbb', 'ccc', 'ddd'];
    const nextRoles = ['bbb', 'ccc', 'ddd', 'eee', 'fff']; // removes aaa, adds eee + fff

    const transactions = makeRoleTransactions(currentRoles, nextRoles);
    expect(transactions).toEqual(
        expect.arrayContaining<RoleTransaction>([
            {
                id: 'aaa',
                action: TransactionType.Remove,
            },
            {
                id: 'fff',
                action: TransactionType.Add,
            },
            {
                id: 'eee',
                action: TransactionType.Add,
            },
        ])
    );
});
