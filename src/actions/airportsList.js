// @flow
/**
 * @module Actions/airportsList
 * @desc airportsList Actions
 */
import { createActions } from 'redux-actions';

import { ActionTypes } from 'constants/index';

export const { airportsListGet } = createActions({
  [ActionTypes.AIRPORTS_LIST_GET]: () => ({}),
});
