import { sortBy } from './sortBy';

it('sorts an array of objects by its key', () => {
    const output = sortBy(
        [
            {
                name: 'bbb',
            },
            {
                name: 'aaa',
            },
            {
                name: 'ddd',
            },
            {
                name: 'ccc',
            },
        ],
        'name'
    );

    expect(output.map((v) => v.name)).toEqual(['aaa', 'bbb', 'ccc', 'ddd']);
});

it('sorts an array of objects by its key with a predicate', () => {
    const output = sortBy(
        [
            {
                name: 'cc',
            },
            {
                name: 'bbb',
            },
            {
                name: 'aaaa',
            },
            {
                name: 'd',
            },
        ],
        'name',
        (a, b) => {
            return a.length > b.length ? 1 : -1;
        }
    );

    expect(output.map((v) => v.name)).toEqual(['d', 'cc', 'bbb', 'aaaa']);
});
