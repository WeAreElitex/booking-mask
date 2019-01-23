/* eslint-disable */
// this is mostly librarry example used for compartibility sake
// so leaving it as is. In real project it will require rework but for
// test task that would be a huge overhead
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import omit from 'lodash/omit';
import { DateRangePicker } from 'react-dates';
import CustomizableCalendarDay from 'react-dates/lib/components/CustomizableCalendarDay';
import DateRangePickerShape from 'react-dates/src/shapes/DateRangePickerShape';
import {
  START_DATE,
  END_DATE,
  HORIZONTAL_ORIENTATION,
  ANCHOR_LEFT,
} from 'react-dates/src/constants';
import isInclusivelyAfterDay from 'react-dates/src/utils/isInclusivelyAfterDay';
import FloatLabel from 'components/FloatLabel';

const propTypes = {
  // example props for the demo
  autoFocus: PropTypes.bool,
  autoFocusEndDate: PropTypes.bool,
  stateDateWrapper: PropTypes.func,
  initialStartDate: momentPropTypes.momentObj,
  initialEndDate: momentPropTypes.momentObj,
  customDayStyles: PropTypes.object,

  ...omit(DateRangePickerShape, ['startDate', 'endDate', 'onDatesChange', 'onFocusChange']),
};

const defaultProps = {
  // example props for the demo
  autoFocus: false,
  autoFocusEndDate: false,
  initialStartDate: null,
  initialEndDate: null,

  // input related props
  disabled: false,
  required: false,
  screenReaderInputMessage: '',
  showClearDates: false,
  showDefaultInputIcon: false,
  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,
  block: false,
  small: false,
  regular: false,

  // calendar presentation and interaction related props
  renderMonthText: null,
  orientation: HORIZONTAL_ORIENTATION,
  anchorDirection: ANCHOR_LEFT,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
  isRTL: false,

  // day presentation and interaction related props
  renderCalendarDay: day => (day.day ? <span>{moment(day.day).format('DD')}</span> : null),
  renderDayContents: null,
  minimumNights: 0,
  enableOutsideDays: false,
  customDayStyles: {},
  isDayBlocked: () => false,
  isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
  isDayHighlighted: () => false,

  // internationalization
  displayFormat: () => moment.localeData().longDateFormat('L'),
  monthFormat: 'MMM YYYY',
  stateDateWrapper: date => date,
};

const endDateWrapperStyle = {
  marginLeft: 'calc(50% + 25px)',
  display: 'relative',
  position: 'absolute',
  top: 0,
  bottom: 0,
};

class DateRangePickerWrapper extends React.Component {
  constructor(props) {
    super(props);

    let focusedInput = null;
    if (props.autoFocus) {
      focusedInput = START_DATE;
    } else if (props.autoFocusEndDate) {
      focusedInput = END_DATE;
    }

    this.state = {
      focusedInput,
      startDate: props.initialStartDate,
      endDate: props.initialEndDate,
    };
  }

  onDatesChange = ({ startDate, endDate }) => {
    const { stateDateWrapper } = this.props;
    this.props.onDatesChange({ startDate, endDate });
    this.setState({
      startDate: startDate && stateDateWrapper(startDate),
      endDate: endDate && stateDateWrapper(endDate),
    });
  };

  onFocusChange = focusedInput => {
    this.setState({ focusedInput });
  };

  render() {
    const { focusedInput } = this.state;
    const {
      startDate,
      endDate,
      customDayStyles,
      startDatePlaceholderText,
      endDatePlaceholderText,
      disabled,
    } = this.props;

    // autoFocus, autoFocusEndDate, initialStartDate and initialEndDate are helper props for the
    // example wrapper but are not props on the SingleDatePicker itself and
    // thus, have to be omitted.
    const props = omit(this.props, [
      'autoFocus',
      'autoFocusEndDate',
      'stateDateWrapper',
      'initialStartDate',
      'initialEndDate',
      'customDayStyles',
    ]);

    return (
      <Fragment>
        <FloatLabel
          isOpen={focusedInput === START_DATE || !!startDate}
          label={startDatePlaceholderText}
          clickHandler={() => this.onFocusChange(START_DATE)}
        />
        <div style={endDateWrapperStyle}>
          <FloatLabel
            isOpen={focusedInput === END_DATE || !!endDate}
            label={endDatePlaceholderText}
            clickHandler={() => disabled !== END_DATE && this.onFocusChange(END_DATE)}
          />
        </div>

        <DateRangePicker
          {...props}
          required={true}
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          startDatePlaceholderText=""
          endDatePlaceholderText=""
          focusedInput={this.props.focusedInput || focusedInput}
          renderCalendarDay={prp => (
            <CustomizableCalendarDay
              {...prp}
              {...customDayStyles}
              modifiers={prp.modifiers || new Set()}
            />
          )}
          startDate={startDate}
          endDate={endDate}
        />
      </Fragment>
    );
  }
}

DateRangePickerWrapper.propTypes = propTypes;
DateRangePickerWrapper.defaultProps = defaultProps;

export default DateRangePickerWrapper;
