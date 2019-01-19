import { expectSaga } from 'redux-saga-test-plan';
import airportsList, { getAiroportsList } from 'sagas/airportsList';
import { mimicRequest } from 'modules/client';

describe('airportsList', () => {
  it('should have the expected watchers', done =>
    expectSaga(airportsList)
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

  it('get airoports list saga should put AIRPORTS_LIST_GET_SUCCESS', () => {
    jest.mock('modules/client', () => ({
      mimicRequest: () => ['foo', 'bar', 'baz'],
    }));

    expectSaga(getAiroportsList, { payload: {} })
      .put({
        type: 'AIRPORTS_LIST_GET_SUCCESS',
        payload: { data: ['foo', 'bar', 'baz'] },
      })
      .run();
  });

  it('get airoports list saga should put AIRPORTS_LIST_GET_FAILURE on error', () => {
    jest.mock('modules/client', () => ({
      mimicRequest: () => {
        throw new Error('ups...');
      },
    }));

    expectSaga(getAiroportsList, { payload: {} })
      .put({
        type: 'AIRPORTS_LIST_GET_FAILURE',
        payload: {},
      })
      .run();
  });
});
