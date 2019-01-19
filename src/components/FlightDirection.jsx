import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { utils } from 'styled-minimal';
import Icon from 'components/Icon';
import InvalidStateTooltip from 'components/InvalidStateTooltip';
import StyledSelect from 'components/StyledSelect';
import FlightDirectionWrapper from 'components/FlightDirectionWrapper';

const { spacer } = utils;

const IconContainer = styled.div`
  display: inline-block;
  z-index: 99;
  position: relative;
  width: 0;
  overflow: visible;
  height: 100%;
  display: flex;
  align-items: center;
  span {
    padding-bottom: ${spacer(1)};
    padding-top: ${spacer(1)};
    position: absolute;
    background-color: white;
    right: 7px;
    width: 24px !important;
    text-transform: uppercase;
    position: relative;
  }
`;

export default class FlightDirection extends React.PureComponent {
  static propTypes = {
    airportsList: PropTypes.object.isRequired,
    dismissInvalid: PropTypes.func.isRequired,
    from: PropTypes.string,
    fromInvalid: PropTypes.bool,
    onChangeFrom: PropTypes.func.isRequired,
    onChangeTo: PropTypes.func.isRequired,
    theme: PropTypes.object,
    to: PropTypes.string,
    toInvalid: PropTypes.bool,
  };

  /**
   * Get label from select's option object
   * @param {Object} option
   * @returns {String}
   * @memberof FlightDirection
   */
  getOptionValue = option => {
    return option.code;
  };

  /**
   * Get label from select's option object
   * @param {Object} option
   * @returns {String}
   * @memberof FlightDirection
   */
  getOptionLabel = option => {
    return option.name;
  };

  render() {
    const {
      airportsList,
      onChangeFrom,
      onChangeTo,
      theme,
      fromInvalid,
      toInvalid,
      from: propsFrom,
      to: propsTo,
    } = this.props;
    const from = airportsList.data.find(opt => opt.code === propsFrom);
    const to = airportsList.data.find(opt => opt.code === propsTo);

    return (
      <FlightDirectionWrapper theme={theme}>
        <InvalidStateTooltip
          isOpen={fromInvalid || toInvalid}
          target={fromInvalid ? 'fromInput' : 'toInput'}
        />
        <StyledSelect
          id="fromInput"
          value={from}
          options={airportsList.data}
          menuIsOpen={fromInvalid ? true : undefined}
          onChange={onChangeFrom}
          getOptionLabel={this.getOptionLabel}
          getOptionValue={this.getOptionValue}
          withGrayBox={true}
          placeholder="From"
          theme={theme}
        />
        <IconContainer>
          <Icon name="plane" color={theme.palette.defaultIconColor} width={16} />
        </IconContainer>
        <StyledSelect
          id="toInput"
          value={to}
          options={airportsList.data}
          menuIsOpen={toInvalid ? true : undefined}
          onChange={onChangeTo}
          getOptionLabel={this.getOptionLabel}
          getOptionValue={this.getOptionValue}
          withGrayBox={true}
          placeholder="To"
          theme={theme}
        />
      </FlightDirectionWrapper>
    );
  }
}
