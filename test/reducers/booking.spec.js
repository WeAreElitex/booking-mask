import reducer from 'reducers/booking';
import { ActionTypes } from 'constants/index';

describe('Booking', () => {
  it('should return the initial state', () => {
    expect(reducer.booking(undefined, {})).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.BOOKING_CHANGE_FROM}`, () => {
    expect(
      reducer.booking(undefined, {
        type: ActionTypes.BOOKING_CHANGE_FROM,
        payload: { code: 'FOO' },
      }),
    ).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.BOOKING_CHANGE_TO}`, () => {
    expect(
      reducer.booking(undefined, {
        type: ActionTypes.BOOKING_CHANGE_TO,
        payload: { code: 'FOO' },
      }),
    ).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.TOGGLE_ROUND_TRIP}`, () => {
    expect(
      reducer.booking(undefined, {
        type: ActionTypes.TOGGLE_ROUND_TRIP,
        payload: {},
      }),
    ).toMatchSnapshot();
  });

  it(`should toggle isRoundTrip value on ${ActionTypes.TOGGLE_ROUND_TRIP}`, () => {
    const fakeState = {
      isRoundTrip: true,
      flightDates: {
        return: 'FOO',
      },
      url: 'BAR',
    };

    const newFakeState = reducer.booking(fakeState, {
      type: ActionTypes.TOGGLE_ROUND_TRIP,
      payload: {},
    });
    expect(newFakeState.isRoundTrip).toBe(false);
    const nextFakeState = reducer.booking(newFakeState, {
      type: ActionTypes.TOGGLE_ROUND_TRIP,
      payload: {},
    });
    expect(nextFakeState.isRoundTrip).toBe(true);
  });

  it(`should clear return date and url on ${ActionTypes.TOGGLE_ROUND_TRIP}`, () => {
    const fakeState = {
      isRoundTrip: true,
      flightDates: {
        return: 'FOO',
      },
      url: 'BAR',
    };

    const newFakeState = reducer.booking(fakeState, {
      type: ActionTypes.TOGGLE_ROUND_TRIP,
      payload: {},
    });

    expect(newFakeState.url).toBe(null);
    expect(newFakeState.flightDates.return).toBe(null);
  });

  it(`should handle ${ActionTypes.BOOKING_TOGGLE_PASSENGERS_DROPDOWN}`, () => {
    expect(
      reducer.booking(undefined, {
        type: ActionTypes.BOOKING_TOGGLE_PASSENGERS_DROPDOWN,
        payload: { q: 'react' },
      }),
    ).toMatchSnapshot();
  });

  it(`should toggle isRoundTrip value on ${ActionTypes.BOOKING_TOGGLE_PASSENGERS_DROPDOWN}`, () => {
    const fakeState = {
      passengersDropdownIsOpen: true,
    };
    const newFakeState = reducer.booking(fakeState, {
      type: ActionTypes.BOOKING_TOGGLE_PASSENGERS_DROPDOWN,
      payload: {},
    });
    expect(newFakeState.passengersDropdownIsOpen).toBe(false);
    const nextFakeState = reducer.booking(newFakeState, {
      type: ActionTypes.BOOKING_TOGGLE_PASSENGERS_DROPDOWN,
      payload: {},
    });
    expect(nextFakeState.passengersDropdownIsOpen).toBe(true);
  });

  it(`should handle ${ActionTypes.BOOKING_CHANGE_PASSENGERS_NUMBER}`, () => {
    expect(
      reducer.booking(undefined, {
        type: ActionTypes.BOOKING_CHANGE_PASSENGERS_NUMBER,
        payload: { data: {} },
      }),
    ).toMatchSnapshot();
  });

  it(`should merge payload data to passengers object ${
    ActionTypes.BOOKING_CHANGE_PASSENGERS_NUMBER
  }`, () => {
    expect(
      reducer.booking(undefined, {
        type: ActionTypes.BOOKING_CHANGE_PASSENGERS_NUMBER,
        payload: { data: { infants: 20 } },
      }),
    ).toMatchSnapshot();
  });

  it(`should clear url on ${ActionTypes.BOOKING_CHANGE_PASSENGERS_NUMBER}`, () => {
    const fakeState = {
      passengers: {},
      url: 'BAR',
    };
    const newFakeState = reducer.booking(fakeState, {
      type: ActionTypes.BOOKING_CHANGE_PASSENGERS_NUMBER,
      payload: { data: {} },
    });
    expect(newFakeState.url).toBe(null);
  });

  it(`should update total count on ${ActionTypes.BOOKING_CHANGE_PASSENGERS_NUMBER}`, () => {
    const fakeState = {
      passengers: {
        adults: 12,
        infants: 5,
        children: 13,
        total: 0,
      },
      url: 'FOO',
    };
    const newFakeState = reducer.booking(fakeState, {
      type: ActionTypes.BOOKING_CHANGE_PASSENGERS_NUMBER,
      payload: {
        data: {
          adults: 3,
          infants: 2,
          children: 1,
        },
      },
    });
    expect(newFakeState.passengers.total).toBe(6);
  });

  it(`should handle ${ActionTypes.BOOKING_URL_READY}`, () => {
    expect(
      reducer.booking(undefined, {
        type: ActionTypes.BOOKING_URL_READY,
        payload: { url: 'BAZ' },
      }),
    ).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.BOOKING_SET_INVALID}`, () => {
    expect(
      reducer.booking(undefined, {
        type: ActionTypes.BOOKING_SET_INVALID,
        payload: { data: {} },
      }),
    ).toMatchSnapshot();
  });

  it(`should correctly handle invalid enum indexes ${ActionTypes.BOOKING_SET_INVALID}`, () => {
    const fakeState = {
      invalid: null,
    };
    let newFakeState = reducer.booking(fakeState, {
      type: ActionTypes.BOOKING_SET_INVALID,
      payload: { data: 0 },
    });
    expect(newFakeState.invalid).toBe('from');
    newFakeState = reducer.booking(fakeState, {
      type: ActionTypes.BOOKING_SET_INVALID,
      payload: { data: 1 },
    });
    expect(newFakeState.invalid).toBe('to');
    newFakeState = reducer.booking(fakeState, {
      type: ActionTypes.BOOKING_SET_INVALID,
      payload: { data: 2 },
    });
    expect(newFakeState.invalid).toBe('departure');
  });

  it(`should handle ${ActionTypes.BOOKING_UNSET_INVALID}`, () => {
    expect(
      reducer.booking(undefined, {
        type: ActionTypes.BOOKING_UNSET_INVALID,
        payload: {},
      }),
    ).toMatchSnapshot();
  });

  it(`should clear invalid state on ${ActionTypes.BOOKING_UNSET_INVALID}`, () => {
    const fakeState = {
      invalid: 'FOO',
    };
    const newFakeState = reducer.booking(fakeState, {
      type: ActionTypes.BOOKING_UNSET_INVALID,
      payload: { data: {} },
    });
    expect(newFakeState.invalid).toBe(null);
  });

  it(`should handle ${ActionTypes.BOOKING_CHANGE_FLIGHT_DATES}`, () => {
    expect(
      reducer.booking(undefined, {
        type: ActionTypes.BOOKING_CHANGE_FLIGHT_DATES,
        payload: {},
      }),
    ).toMatchSnapshot();
  });

  it(`should correctly handle value indexes ${ActionTypes.BOOKING_CHANGE_FLIGHT_DATES}`, () => {
    const fakeState = {
      flightDates: {},
    };
    const newFakeState = reducer.booking(fakeState, {
      type: ActionTypes.BOOKING_CHANGE_FLIGHT_DATES,
      payload: { departure: 'FOO', return: 'BAR' },
    });
    expect(newFakeState.flightDates.departure).toBe('FOO');
    expect(newFakeState.flightDates.return).toBe('BAR');
  });

  it(`should clear url on ${ActionTypes.BOOKING_CHANGE_FLIGHT_DATES}`, () => {
    const fakeState = {
      flightDates: {},
      url: 'BAR',
    };
    const newFakeState = reducer.booking(fakeState, {
      type: ActionTypes.BOOKING_CHANGE_FLIGHT_DATES,
      payload: {},
    });
    expect(newFakeState.url).toBe(null);
  });
});
