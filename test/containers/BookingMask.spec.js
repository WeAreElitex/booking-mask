import React from 'react';
import { STATUS } from 'constants/index';
import { BookingMask } from 'containers/BookingMask';

jest.mock('uuid/v4', () => () => 'ABCDE');

const mockDispatch = jest.fn();
const props = {
  dispatch: mockDispatch,
  booking: {
    flightDates: {},
    passengers: {},
  },
  passengers: {
    total: 1,
    adults: 1,
    children: 0,
    infants: 0,
  },
  flightDates: {
    departure: null,
    return: null,
  },
  theme: {
    palette: {},
    sizes: {},
  },
  airportsList: {
    data: [],
  },
};

function setup(ownProps = props) {
  return shallow(<BookingMask {...ownProps} />, { attachTo: document.getElementById('react') });
}

describe('BookingMask', () => {
  const wrapper = setup();

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a FlightDirection', () => {
    expect(wrapper.find('WithTheme(FlightDirection)')).toExist();
  });

  it('should render a FlightDates', () => {
    expect(wrapper.find('WithTheme(FlightDates)')).toExist();
  });

  it('should render a PassengersSelector', () => {
    expect(wrapper.find('PassengersSelector')).toExist();
  });

  it('should have dispatched an action on mount', () => {
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {},
      type: 'AIRPORTS_LIST_GET',
    });
  });

  it('should dispatch an alert', () => {
    wrapper.setProps({
      booking: {
        passengers: {},
        flightDates: {},
      },
      airportsList: {
        data: {},
        status: STATUS.ERROR,
        message: 'Nothing found',
      },
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SHOW_ALERT',
      payload: {
        id: 'ABCDE',
        icon: undefined,
        message: 'Nothing found',
        position: 'bottom-right',
        variant: 'danger',
        timeout: 0,
      },
    });
  });

  it('should dispatch an action when onSubmit method is called', () => {
    const instance = wrapper.instance();
    instance.onSubmit({ stopPropagation: () => {} });

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {},
      type: 'BOOKING_SUBMIT',
    });
  });

  it('should dispatch an action when dismissInvalid method is called', () => {
    const instance = wrapper.instance();
    instance.dismissInvalid();

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {},
      type: 'BOOKING_UNSET_INVALID',
    });
  });

  it('should dispatch an action when handleDirectionToggle method is called', () => {
    const instance = wrapper.instance();
    instance.handleDirectionToggle();

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {},
      type: 'TOGGLE_ROUND_TRIP',
    });
  });
  it('should dispatch an action when togglePassengersDropdown method is called', () => {
    const instance = wrapper.instance();
    instance.togglePassengersDropdown();

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {},
      type: 'BOOKING_TOGGLE_PASSENGERS_DROPDOWN',
    });
  });
  it('should dispatch an action when handleChangeFrom method is called', () => {
    const instance = wrapper.instance();
    instance.handleChangeFrom({ code: 'FOO' });

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: { code: 'FOO' },
      type: 'BOOKING_CHANGE_FROM',
    });
  });
  it('should dispatch an action when handleChangeTo method is called', () => {
    const instance = wrapper.instance();
    instance.handleChangeTo({ code: 'FOO' });

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: { code: 'FOO' },
      type: 'BOOKING_CHANGE_TO',
    });
  });
  it('should dispatch an action when handleDatesChange method is called', () => {
    const instance = wrapper.instance();
    instance.handleDatesChange({ departure: '11-11-11', return: '22-22-22' });

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: { departure: '11-11-11', return: '22-22-22' },
      type: 'BOOKING_CHANGE_FLIGHT_DATES',
    });
  });
  it('should dispatch an action when handlePassengersChange method is called', () => {
    const instance = wrapper.instance();
    instance.handlePassengersChange({ adults: 1, childs: 1, infants: 1 });

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: { data: { adults: 1, childs: 1, infants: 1 } },
      type: 'BOOKING_CHANGE_PASSENGERS_NUMBER',
    });
  });
});
