import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import treeChanges from 'tree-changes';
import {
  showAlert,
  toggleRoundTrip,
  changePassengersNumber,
  changeFlightDates,
  unsetInvalid,
  changeFrom,
  changeTo,
  airportsListGet,
  togglePassengersDropdown,
  submit,
} from 'actions/index';
import { STATUS } from 'constants/index';
import theme from 'modules/theme';
import { Box } from 'styled-minimal';

// project components
import FlightDates from 'components/FlightDates';
import PassengersSelector from 'components/PassengersSelector';
import DirectionsToggle from 'components/DirectionsToggle';
import FlightDirection from '../components/FlightDirection';
import StyledContainer from '../components/StyledContainer';
import SubmitButton from '../components/SubmitButton';
import BookingMaskGrid from '../components/BookingMaskGrid';
import Spacer from '../components/Spacer';

const GridItem = styled(Box)`
  display: table;
  text-align: center;
  width: 100%;
`;

const Url = styled.h3`
  padding: 2rem;
  text-align: center;
  width: 100%;
`;

export class BookingMask extends React.PureComponent {
  static propTypes = {
    airportsList: PropTypes.object.isRequired,
    booking: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    isRoundTrip: PropTypes.bool.isRequired,
    theme: PropTypes.object,
  };

  static defaultProps = {
    theme: {},
  };

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    const { changedTo } = treeChanges(this.props, nextProps);

    if (changedTo('airportsList.status', STATUS.ERROR)) {
      dispatch(showAlert(nextProps.airportsList.message, { variant: 'danger' }));
    }
    // that allows to dismiss open date / route selectors on click
    if (
      changedTo('booking.invalid', 'from') ||
      changedTo('booking.invalid', 'to') ||
      changedTo('booking.invalid', 'departure')
    ) {
      setTimeout(() => window.addEventListener('click', this.dismissInvalid));
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    // preloding airoports list
    dispatch(airportsListGet());
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.dismissInvalid);
  }

  /**
   * Extending project level theme with one passed with a props
   * @memberof BookingMask
   */
  getTheme = () => {
    const { theme: propsTheme } = this.props;

    return Object.assign({}, theme, propsTheme);
  };

  /**
   * Flight departure airport change event handler
   * @memberof BookingMask
   */
  handleDirectionToggle = () => {
    const { dispatch } = this.props;

    dispatch(toggleRoundTrip());
  };

  /**
   * Flight departure airport change event handler
   * @memberof BookingMask
   */
  togglePassengersDropdown = () => {
    const { dispatch } = this.props;

    dispatch(togglePassengersDropdown());
  };

  /**
   * Flight departure airport change event handler
   * @param {Object} data
   * @memberof BookingMask
   */
  handleChangeFrom = data => {
    const { dispatch } = this.props;

    dispatch(changeFrom(data.code));
    this.dismissInvalid();
  };

  /**
   * Flight arrival airport change event handler
   * @param {Object} data
   * @memberof BookingMask
   */
  handleChangeTo = data => {
    const { dispatch } = this.props;

    dispatch(changeTo(data.code));
    this.dismissInvalid();
  };

  /**
   * Flight dates change event handler
   * @param {Object} data
   * @memberof BookingMask
   */
  handleDatesChange = data => {
    const { dispatch } = this.props;

    dispatch(changeFlightDates(data));
    this.dismissInvalid();
  };

  /**
   * Passengers number change event handler
   * @param {Object} passengersCountObject
   * @memberof BookingMask
   */
  handlePassengersChange = passengersCountObject => {
    const { dispatch } = this.props;

    dispatch(changePassengersNumber(passengersCountObject));
  };

  /**
   * Reset component's invalid state
   * @memberof BookingMask
   */
  dismissInvalid = () => {
    const { dispatch } = this.props;

    dispatch(unsetInvalid());
    window.removeEventListener('click', this.dismissInvalid);
  };

  /**
   * Submit button click handler
   * @memberof BookingMask
   */
  onSubmit = () => {
    const { dispatch } = this.props;

    dispatch(submit());
  };

  render() {
    const { booking, airportsList } = this.props;
    const url = booking.url ? <Url data-testid="BookingMaskUrl">{booking.url}</Url> : '';
    const resultTheme = this.getTheme();

    return (
      <ThemeProvider theme={resultTheme}>
        <div key="BookingMask" data-testid="BookingMaskWrapper">
          <StyledContainer>
            <BookingMaskGrid data-testid="BookingMaskGrid">
              <GridItem data-testid="BookingMaskGridItem1">
                <FlightDirection
                  from={booking.from}
                  to={booking.to}
                  airportsList={airportsList}
                  fromInvalid={booking.invalid === 'from'}
                  toInvalid={booking.invalid === 'to'}
                  onChangeFrom={this.handleChangeFrom}
                  onChangeTo={this.handleChangeTo}
                  dismissInvalid={this.dismissInvalid}
                  data-testid="BookingMaskFlightDirection"
                />
              </GridItem>
              <GridItem data-testid="BookingMaskGridItem2">
                <FlightDates
                  flightDates={booking.flightDates}
                  isRoundTrip={booking.isRoundTrip}
                  onDatesChange={this.handleDatesChange}
                  isInvalid={booking.invalid === 'departure'}
                  customArrowIcon={
                    <DirectionsToggle
                      oneWay={booking.isRoundTrip}
                      onToggle={this.handleDirectionToggle}
                      animate={airportsList.status === 'running'}
                      data-testid="BookingMaskDirectionsToggle"
                    />
                  }
                />
              </GridItem>
              <GridItem data-testid="BookingMaskGridItem3">
                <PassengersSelector
                  onChange={this.handlePassengersChange}
                  total={booking.passengers.total}
                  adultsCount={booking.passengers.adults}
                  childrenCount={booking.passengers.children}
                  infantsCount={booking.passengers.infants}
                  toggleDropdown={this.togglePassengersDropdown}
                  dropdownIsOpen={booking.passengersDropdownIsOpen}
                />
              </GridItem>
              <Spacer />
              <Spacer />
              <GridItem data-testid="BookingMaskGridItem4">
                <SubmitButton
                  size="lg"
                  type="submit"
                  data-testid="BookingMaskSubmitButton"
                  onClick={this.onSubmit}
                >
                  Submit
                </SubmitButton>
              </GridItem>
            </BookingMaskGrid>
          </StyledContainer>
          {url}
        </div>
      </ThemeProvider>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    booking: state.booking,
    airportsList: state.airportsList,
    isRoundTrip: state.booking.isRoundTrip,
  };
}

export default connect(mapStateToProps)(BookingMask);
