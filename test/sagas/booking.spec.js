import { expectSaga } from 'redux-saga-test-plan';
import booking, { validateDepartureData, makeRedirect } from 'sagas/booking';
import { ActionTypes } from 'constants/index';

jest.mock('modules/client', () => ({
  request: () => ({ items: [] }),
}));

describe('booking', () => {
  it('should have the expected watchers', done =>
    expectSaga(booking)
      .run({ silenceTimeout: true })
      .then(saga => {
        expect(saga).toMatchSnapshot();
        done();
      }));

  it('validate departure saga should put BOOKING_SUBMIT_SUCCESS if state is valid', () =>
    expectSaga(validateDepartureData, { payload: {} })
      .provide({
        select() {
          const bookingValid = {
            from: 'FOO',
            to: 'BAR',
            flightDates: {
              departure: '11-11-2222',
            },
          };
          return bookingValid;
        },
      })
      .put({
        type: 'BOOKING_SUBMIT_SUCCESS',
        payload: {},
      })
      .run());

  it('validate departure saga should put BOOKING_SET_INVALID if `from` field has no value', () =>
    expectSaga(validateDepartureData, { payload: {} })
      .provide({
        select() {
          const bookingInalidFrom = {
            from: null,
            to: 'BAR',
            flightDates: {
              departure: '11-11-2222',
            },
          };
          return bookingInalidFrom;
        },
      })
      .put({
        type: 'BOOKING_SET_INVALID',
        payload: { data: 0 },
      })
      .run());

  it('validate departure saga should put BOOKING_SET_INVALID if `to` field has no value', () =>
    expectSaga(validateDepartureData, { payload: {} })
      .provide({
        select() {
          const bookingInalidTo = {
            from: 'FOO',
            to: null,
            flightDates: {
              departure: '11-11-2222',
            },
          };
          return bookingInalidTo;
        },
      })
      .put({
        type: 'BOOKING_SET_INVALID',
        payload: { data: 1 },
      })
      .run());

  it('validate departure saga should put BOOKING_SET_INVALID if `flightDates.departure` field has no value', () =>
    expectSaga(validateDepartureData, { payload: {} })
      .provide({
        select() {
          const bookingInalidDeparture = {
            from: 'FOO',
            to: 'BAR',
            flightDates: {
              departure: null,
            },
          };
          return bookingInalidDeparture;
        },
      })
      .put({
        type: 'BOOKING_SET_INVALID',
        payload: { data: 2 },
      })
      .run());

  it('should have the validate departure saga', () =>
    expectSaga(makeRedirect, { payload: { query: 'react' } })
      .provide({
        select() {
          const bookingValid = {
            from: 'FOO',
            to: 'BAR',
            flightDates: {
              departure: '11-11-2222',
            },
            passangers: {
              adults: 1,
              children: 0,
              infants: 0,
            },
          };
          return bookingValid;
        },
      })
      .put({
        type: ActionTypes.BOOKING_URL_READY,
        payload: {
          url:
            'https://www.swiss.com/us/en/Book/Outbound/FOO-BAR/from-11-11-2222/adults-1/children-0/infants-0/class-economy/al-LX/sidmbvl',
        },
      })
      .run());
});
