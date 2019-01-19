import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { START_DATE } from 'react-dates/constants';
import FlightDatesWrapper from 'components/FlightDatesWrapper';
import InvalidStateTooltip from 'components/InvalidStateTooltip';
import DateRangePickerWrapper from 'components/DateRangePickerWrapper';
import memoize from 'lodash/memoize';
import rgba from 'polished/lib/color/rgba';

const getStyles = memoize(theme => {
  const selectedStyles = {
    background: theme.palette.primary,
    border: `1px solid ${theme.palette.primary}`,
    color: '#fff',

    hover: {
      background: rgba(theme.palette.primary, 0.8),
      border: `1px solid ${rgba(theme.palette.primary, 0.8)}`,
      color: '#fff',
    },
  };

  const hoveredStyles = {
    background: rgba(theme.palette.primary, 0.45),
    border: `1px solid ${rgba(theme.palette.primary, 0.45)}`,
    color: '#fff',
  };

  return {
    selectedStartStyles: selectedStyles,
    selectedEndStyles: selectedStyles,
    hoveredSpanStyles: hoveredStyles,
    afterHoveredStartStyles: hoveredStyles,

    selectedSpanStyles: {
      background: rgba(theme.palette.primary, 0.45),
      border: `1px solid ${rgba(theme.palette.primary, 0.45)}`,
      color: '#fff',

      hover: {
        background: rgba(theme.palette.secondary, 0.8),
        border: `1px solid ${rgba(theme.palette.secondary, 0.8)}`,
        color: '#fff',
      },
    },
  };
});

class FlightDates extends React.PureComponent {
  static defaultProps = {
    flightDates: {
      departure: null,
      return: null,
    },
  };

  static propTypes = {
    onDatesChange: PropTypes.func.isRequired,
    isRoundTrip: PropTypes.bool.isRequired,
    isInvalid: PropTypes.bool.isRequired,
    flightDates: PropTypes.object,
    customArrowIcon: PropTypes.node,
    theme: PropTypes.object,
  };

  /**
   * Dates change handler
   * @param {Object} newDates
   * @memberof FlightDates
   */
  onDatesChange = newDates => {
    const { onDatesChange } = this.props;
    onDatesChange({
      departure: this.processDate(newDates.startDate),
      return: this.processDate(newDates.endDate),
    });
  };

  /**
   * Convert Moment date to string
   * @param {moment.Moment} date
   * @returns {String}
   * @memberof FlightDates
   */
  processDate(date) {
    return date ? date.format('YYYY-MM-DD') : null;
  }

  /**
   * Parse string / Date object to Moment date
   * @param {String | Date} date
   * @returns {moment.Moment | null}
   * @memberof FlightDates
   */
  parseDate(date) {
    return date ? moment(date) : null;
  }

  render() {
    const { isRoundTrip, isInvalid, flightDates, customArrowIcon, theme } = this.props;
    const startDate = this.parseDate(flightDates.departure);
    const endDate = this.parseDate(flightDates.return);
    return (
      <FlightDatesWrapper theme={theme}>
        <InvalidStateTooltip isOpen={isInvalid} target="departure" />
        <DateRangePickerWrapper
          disabled={isRoundTrip ? false : 'endDate'}
          startDateId="departure"
          endDateId="return"
          startDate={startDate}
          customDayStyles={getStyles(theme)}
          customArrowIcon={customArrowIcon}
          focusedInput={isInvalid ? START_DATE : undefined}
          endDate={endDate}
          startDatePlaceholderText={isRoundTrip ? 'Outbound flight' : 'One way'}
          endDatePlaceholderText="Return flight"
          onDatesChange={this.onDatesChange}
        />
      </FlightDatesWrapper>
    );
  }
}

export default FlightDates;
