import reducer from 'reducers/airportsList';
import { ActionTypes } from 'constants/index';

describe('Booking', () => {
  it('should return the initial state', () => {
    expect(reducer.airportsList(undefined, {})).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.AIRPORTS_LIST_GET}`, () => {
    expect(
      reducer.airportsList(undefined, {
        type: ActionTypes.AIRPORTS_LIST_GET,
        payload: {},
      }),
    ).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.AIRPORTS_LIST_GET_SUCCESS}`, () => {
    expect(
      reducer.airportsList(undefined, {
        type: ActionTypes.AIRPORTS_LIST_GET_SUCCESS,
        payload: { data: ['FOO', 'BAR', 'BAZ'] },
      }),
    ).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.AIRPORTS_LIST_GET_FAILURE}`, () => {
    expect(
      reducer.airportsList(undefined, {
        type: ActionTypes.AIRPORTS_LIST_GET_FAILURE,
        payload: {},
      }),
    ).toMatchSnapshot();
  });
});
