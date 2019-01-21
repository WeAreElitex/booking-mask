// @flow
/**
 * @module Actions/Booking
 * @desc Booking Actions
 */
import { createActions } from 'redux-actions';

import { ActionTypes } from 'constants/index';

export const {
  bookingChangePassengersNumber: changePassengersNumber,
  bookingChangeFrom: changeFrom,
  bookingChangeTo: changeTo,
  bookingChangeFlightDates: changeFlightDates,
  bookingSubmit: submit,
  bookingUnsetInvalid: unsetInvalid,
  bookingTogglePassengersDropdown: togglePassengersDropdown,
} = createActions({
  [ActionTypes.BOOKING_GET_REPOS]: (query: string) => ({ query }),
  [ActionTypes.BOOKING_CHANGE_PASSENGERS_NUMBER]: (data: {
    adults: number,
    children: number,
    infants: number,
  }) => ({ data }),
  [ActionTypes.BOOKING_CHANGE_FROM]: data => ({ code: data }),
  [ActionTypes.BOOKING_CHANGE_TO]: data => ({ code: data }),
  [ActionTypes.BOOKING_CHANGE_FLIGHT_DATES]: (data: { startDate: string, endDate: string }) => data,
  [ActionTypes.BOOKING_SUBMIT]: () => ({}),
  [ActionTypes.BOOKING_UNSET_INVALID]: () => ({}),
  [ActionTypes.BOOKING_TOGGLE_PASSENGERS_DROPDOWN]: () => ({}),
});
