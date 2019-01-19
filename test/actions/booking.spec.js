import {
  changePassangersNumber,
  changeFrom,
  changeTo,
  changeFlightDates,
  submit,
  unsetInvalid,
} from 'actions/booking';

describe('App', () => {
  it('changePassangersNumber should return an action', () => {
    expect(changePassangersNumber()).toMatchSnapshot();
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
});
