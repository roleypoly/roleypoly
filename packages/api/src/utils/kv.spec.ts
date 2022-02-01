import { configContext } from './testHelpers';

it('serializes data via get and put', async () => {
  const [config] = configContext();

  const data = {
    foo: 'bar',
    baz: 'qux',
  };

  await config.kv.guilds.put('test-guild-id', data, config.retention.guild);

  const result = await config.kv.guilds.get('test-guild-id');

  expect(result).toEqual(data);
});

describe('cacheThrough', () => {
  it('passes through for data on misses', async () => {
    const [config] = configContext();

    const data = {
      foo: 'bar',
      baz: 'qux',
    };
    const testFn = jest.fn();
    const result = await config.kv.guilds.cacheThrough(
      'test-guild-id',
      async () => {
        testFn();
        return data;
      },
      config.retention.guild
    );

    expect(testFn).toHaveBeenCalledTimes(1);
    expect(result).toEqual(data);
  });

  it('uses cache data on hits', async () => {
    const [config] = configContext();

    const data = {
      foo: 'bar',
      baz: 'qux',
    };
    const testFn = jest.fn();
    await config.kv.guilds.put('test-guild-id', data, config.retention.guild);

    const result = await config.kv.guilds.cacheThrough(
      'test-guild-id',
      async () => {
        testFn();
        return data;
      },
      config.retention.guild
    );

    expect(testFn).not.toHaveBeenCalled();
    expect(result).toEqual(data);
  });

  it('skips cache when instructed to miss', async () => {
    const [config] = configContext();

    const data = {
      foo: 'bar',
      baz: 'qux',
    };
    const testFn = jest.fn();
    await config.kv.guilds.put('test-guild-id', data, config.retention.guild);

    const run = (skip: boolean) => {
      return config.kv.guilds.cacheThrough(
        'test-guild-id',
        async () => {
          testFn();
          return data;
        },
        config.retention.guild,
        skip
      );
    };

    await run(true);
    await run(true);
    await run(false); // use cache this time

    expect(testFn).toHaveBeenCalledTimes(2);
  });
});
