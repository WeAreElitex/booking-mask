import keyMirror from 'fbjs/lib/keyMirror';

/**
 * @namespace Constants
 * @desc App constants
 */

/**
 * @constant {Object} ActionTypes
 * @memberof Constants
 */
export const ActionTypes = keyMirror({
  EXCEPTION: undefined,
  TOGGLE_ROUND_TRIP: undefined,
  BOOKING_TOGGLE_PASSANGERS_DROPDOWN: undefined,
  BOOKING_CHANGE_PASSANGERS_NUMBER: undefined,
  BOOKING_CHANGE_FROM: undefined,
  BOOKING_CHANGE_TO: undefined,
  BOOKING_CHANGE_FLIGHT_DATES: undefined,
  BOOKING_SUBMIT: undefined,
  BOOKING_SUBMIT_SUCCESS: undefined,
  BOOKING_SET_INVALID: undefined,
  BOOKING_UNSET_INVALID: undefined,
  BOOKING_URL_READY: undefined,
  AIROPORTS_LIST_GET: undefined,
  AIROPORTS_LIST_GET_SUCCESS: undefined,
  AIROPORTS_LIST_GET_FAILURE: undefined,
  SHOW_ALERT: undefined,
  HIDE_ALERT: undefined,
});

/**
 * @constant {Object} STATUS
 * @memberof Constants
 */
export const STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
  READY: 'ready',
  SUCCESS: 'success',
  ERROR: 'error',
};
