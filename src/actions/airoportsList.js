// @flow
/**
 * @module Actions/airoportsList
 * @desc airoportsList Actions
 */
import { createActions } from 'redux-actions';

import { ActionTypes } from 'constants/index';

export const { airoportsListGet } = createActions({
  [ActionTypes.AIROPORTS_LIST_GET]: () => ({}),
});
