/**
 * @module Sagas/BookingMask
 * @desc BookingMask
 */

import { all, select, put, takeLatest } from 'redux-saga/effects';
import { ActionTypes } from 'constants/index';
import { constructUrlFromBooking } from 'modules/helpers';

/**
 * Get Repos
 */
export function* validateDepartureData() {
  try {
    const booking = yield select(state => state.booking);
    const valuesArray = [booking.from, booking.to, booking.flightDates.departure];
    const invalidIndex = valuesArray.findIndex(val => !val);

    if (invalidIndex > -1) {
      yield put({
        type: ActionTypes.BOOKING_SET_INVALID,
        payload: { data: invalidIndex },
      });
    } else {
      yield put({
        type: ActionTypes.BOOKING_SUBMIT_SUCCESS,
        payload: {},
      });
    }
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.EXCEPTION,
      payload: err,
    });
  }
}

/**
 * Get Repos
 */
export function* makeRedirect() {
  try {
    const booking = yield select(state => state.booking);
    const prefix = 'https://www.swiss.com/us/en/Book';
    const urlEnd = 'class-economy/al-LX/sidmbvl';
    const url = constructUrlFromBooking(booking, prefix, urlEnd);

    yield put({
      type: ActionTypes.BOOKING_URL_READY,
      payload: { url },
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.EXCEPTION,
      payload: err,
    });
  }
}

/**
 * BookingMask Sagas
 */
export default function* root() {
  yield all([
    takeLatest(ActionTypes.BOOKING_SUBMIT, validateDepartureData),
    takeLatest(ActionTypes.BOOKING_SUBMIT_SUCCESS, makeRedirect),
  ]);
}
