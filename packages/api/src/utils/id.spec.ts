import { dateFromID, getID } from './id';

it('returns an id', () => {
  expect(getID()).toBeTruthy();

  console.error(getID());
});

it('outputs a valid millisecond decoded from id', () => {
  expect(dateFromID(getID())).toBeCloseTo(Date.now(), Date.now().toString.length - 4);
});
