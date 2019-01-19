import reducer from 'reducers/booking';
import { ActionTypes } from 'constants/index';

describe('Booking', () => {
  it('should return the initial state', () => {
    expect(reducer.booking(undefined, {})).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.BOOKING_GET_REPOS}`, () => {
    expect(
      reducer.booking(undefined, {
        type: ActionTypes.BOOKING_GET_REPOS,
        payload: { q: 'react' },
      }),
    ).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.BOOKING_GET_REPOS_SUCCESS}`, () => {
    expect(
      reducer.booking(undefined, {
        type: ActionTypes.BOOKING_GET_REPOS_SUCCESS,
        payload: {},
      }),
    ).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.BOOKING_GET_REPOS_FAILURE}`, () => {
    expect(
      reducer.booking(undefined, {
        type: ActionTypes.BOOKING_GET_REPOS_FAILURE,
        payload: {},
      }),
    ).toMatchSnapshot();
  });
});
