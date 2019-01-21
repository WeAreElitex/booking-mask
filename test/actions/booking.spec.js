import {
  changePassengersNumber,
  changeFrom,
  changeTo,
  changeFlightDates,
  submit,
  unsetInvalid,
  togglePassengersDropdown,
} from 'actions/booking';

describe('App', () => {
  it('changePassengersNumber should return an action', () => {
    expect(changePassengersNumber()).toMatchSnapshot();
  });

  it('changeFrom should return an action', () => {
    expect(changeFrom()).toMatchSnapshot();
  });

  it('changeTo should return an action', () => {
    expect(changeTo()).toMatchSnapshot();
  });

  it('changeFlightDates should return an action', () => {
    expect(changeFlightDates()).toMatchSnapshot();
  });

  it('submit should return an action', () => {
    expect(submit()).toMatchSnapshot();
  });

  it('unsetInvalid should return an action', () => {
    expect(unsetInvalid()).toMatchSnapshot();
  });

  it('togglePassengersDropdown should return an action', () => {
    expect(togglePassengersDropdown()).toMatchSnapshot();
  });
});
