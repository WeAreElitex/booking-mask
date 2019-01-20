import { airportsListGet } from 'actions/airportsList';

describe('App', () => {
  it('airportsListGet should return an action', () => {
    expect(airportsListGet()).toMatchSnapshot();
  });
});
