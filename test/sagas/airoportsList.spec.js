import { expectSaga } from 'redux-saga-test-plan';
import airoportsList, { getAiroportsList } from 'sagas/airoportsList';
import { mimicRequest } from 'modules/client';

describe('airoportsList', () => {
  it('should have the expected watchers', done =>
    expectSaga(airoportsList)
      .run({ silenceTimeout: true })
      .then(saga => {
        expect(saga).toMatchSnapshot();
        done();
      }));

  it('get airoports list saga should call mimicRequest with right params', () =>
    expectSaga(getAiroportsList, { payload: {} })
      .provide({
        call(effect, next) {
          // Check for the API call to return fake value
          if (effect.fn === mimicRequest) {
            expect(effect.args[0]).toBe('https//sample-url');
          }

          // Allow Redux Saga to handle other `call` effects
          return next();
        },
      })

      .run());

  it('get airoports list saga should put AIROPORTS_LIST_GET_SUCCESS', () => {
    jest.mock('modules/client', () => ({
      mimicRequest: () => ['foo', 'bar', 'baz'],
    }));

    expectSaga(getAiroportsList, { payload: {} })
      .put({
        type: 'AIROPORTS_LIST_GET_SUCCESS',
        payload: { data: ['foo', 'bar', 'baz'] },
      })
      .run();
  });

  it('get airoports list saga should put AIROPORTS_LIST_GET_FAILURE on error', () => {
    jest.mock('modules/client', () => ({
      mimicRequest: () => {
        throw new Error('ups...');
      },
    }));

    expectSaga(getAiroportsList, { payload: {} })
      .put({
        type: 'AIROPORTS_LIST_GET_FAILURE',
        payload: {},
      })
      .run();
  });
});
