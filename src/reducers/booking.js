import { handleActions } from 'redux-actions';
import immutable from 'immutability-helper';
import { ActionTypes } from 'constants/index';

export const bookingState = {
  passangers: {
    total: 1,
    adults: 1,
    children: 0,
    infants: 0,
  },
  flightDates: {
    departure: null,
    return: null,
  },
  passangersDropdownIsOpen: false,
  isRoundTrip: false,
  from: null,
  to: null,
  invalid: null,
  url: null,
};

export default {
  booking: handleActions(
    {
      [ActionTypes.BOOKING_CHANGE_FROM]: (state, { payload }) => {
        return immutable(state, {
          from: { $set: payload.code || null },
          url: { $set: null },
        });
      },
      [ActionTypes.BOOKING_CHANGE_TO]: (state, { payload }) => {
        return immutable(state, {
          to: { $set: payload.code || null },
          url: { $set: null },
        });
      },
      [ActionTypes.TOGGLE_ROUND_TRIP]: state => {
        const isRoundTrip = !state.isRoundTrip;
        return immutable(state, {
          isRoundTrip: { $set: isRoundTrip },
          flightDates: {
            return: { $set: isRoundTrip ? state.flightDates.return : null },
          },
          url: { $set: null },
        });
      },
      [ActionTypes.BOOKING_TOGGLE_PASSANGERS_DROPDOWN]: state => {
        const passangersDropdownIsOpen = !state.passangersDropdownIsOpen;
        return immutable(state, {
          passangersDropdownIsOpen: { $set: passangersDropdownIsOpen },
        });
      },
      [ActionTypes.BOOKING_CHANGE_PASSANGERS_NUMBER]: (state, { payload }) => {
        const total = Object.keys(payload.data).reduce((acc, key) => acc + payload.data[key], 0);
        return immutable(state, {
          passangers: { $set: Object.assign({}, state.passangers, payload.data, { total }) },
          url: { $set: null },
        });
      },
      [ActionTypes.BOOKING_URL_READY]: (state, { payload }) => {
        return immutable(state, {
          url: { $set: payload.url },
        });
      },
      [ActionTypes.BOOKING_SET_INVALID]: (state, { payload }) => {
        const invalidValues = ['from', 'to', 'departure'];
        return immutable(state, {
          invalid: { $set: invalidValues[payload.data] },
        });
      },
      [ActionTypes.BOOKING_UNSET_INVALID]: state => {
        return immutable(state, {
          invalid: { $set: null },
        });
      },
      [ActionTypes.BOOKING_CHANGE_FLIGHT_DATES]: (state, { payload }) => {
        return immutable(state, {
          flightDates: {
            departure: { $set: payload.departure },
            return: { $set: payload.return },
          },
          url: { $set: null },
        });
      },
    },
    bookingState,
  ),
};
