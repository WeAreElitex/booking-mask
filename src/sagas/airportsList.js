/**
 * @module Sagas/airportsList
 * @desc airportsList
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { mimicRequest } from 'modules/client';
import { ActionTypes } from 'constants/index';

/**
 * Get Repos
 */
export function* getAiroportsList() {
  try {
    const response = yield call(mimicRequest, 'https//sample-url');
    yield put({
      type: ActionTypes.AIRPORTS_LIST_GET_SUCCESS,
      payload: { data: response },
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.AIRPORTS_LIST_GET_FAILURE,
      payload: err,
    });
  }
}

/**
 * airportsList Sagas
 */
export default function* root() {
  yield all([takeLatest(ActionTypes.AIRPORTS_LIST_GET, getAiroportsList)]);
}
