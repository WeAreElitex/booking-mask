import { all, fork } from 'redux-saga/effects';

import booking from './booking';
import airoportsList from './airoportsList';

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(booking), fork(airoportsList)]);
}
