import { formData, formDataRequest, getQuery } from './request';

describe('getQuery', () => {
  it('splits query string into object', () => {
    const query = getQuery(new Request('http://local.test/?a=1&b=2'));

    expect(query).toEqual({
      a: '1',
      b: '2',
    });
  });
});

describe('formData & formDataRequest', () => {
  it('formats object into form data', () => {
    const body = formData({
      a: 1,
      b: 2,
    });

    expect(body).toEqual('a=1&b=2');
  });

  it('formats object into form data with custom headers', () => {
    const body = formDataRequest(
      {
        a: 1,
        b: 2,
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      }
    );

    expect(body).toEqual({
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: 'a=1&b=2',
    });
  });
});
