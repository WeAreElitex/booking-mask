import { all, fork } from 'redux-saga/effects';

import booking from './booking';
import airportsList from './airportsList';

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(booking), fork(airportsList)]);
}
