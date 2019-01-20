import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { utils } from 'styled-minimal';
import NumericInput from 'react-numeric-input';
import StyledDropdownToggle from 'components/StyledDropdownToggle';
import OptionContainer from 'components/OptionContainer';
import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';

const { spacer } = utils;

const OptionHeader = styled.h3`
  padding-right: ${spacer(2)};
  min-width: 100px;
  display: flex;
  flex-flow: column;
  div {
    font-size: 1.2rem;
    opacity: 0.8;
    margin: 0;
  }
`;

export default class PassangersSelector extends React.PureComponent {
  static propTypes = {
    adultsCount: PropTypes.number,
    adultsDescription: PropTypes.string,
    adultsLabel: PropTypes.string,
    adultsMinLimit: PropTypes.number,
    childrenCount: PropTypes.number,
    childrenDescription: PropTypes.string,
    childrenLabel: PropTypes.string,
    dropdownIsOpen: PropTypes.bool,
    infantsCount: PropTypes.number,
    infantsDescription: PropTypes.string,
    infantsLabel: PropTypes.string,
    maxOfTheKind: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    toggleDropdown: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
    totalLabel: PropTypes.string,
  };

  static defaultProps = {
    dropdownIsOpen: true,
    adultsCount: 1,
    adultsMinLimit: 1,
    childrenCount: 0,
    infantsCount: 0,
    maxOfTheKind: 20,
    adultsLabel: 'Adults',
    childrenLabel: 'Children',
    infantsLabel: 'Infants',
    totalLabel: 'Passangers',
    childrenDescription: '2-11 years',
    infantsDescription: '0-1 years',
    adultsDescription: '12+ years',
  };

  supportedNames = ['adults', 'children', 'infants'];

  /**
   * Return object with current coun values from props
   * @return {Object}
   * @memberof PassangersSelector
   */
  getCurrentCountObject() {
    const { props } = this;
    return this.supportedNames.reduce(
      (acc, name) => Object.assign(acc, { [name]: props[`${name}Count`] }),
      {},
    );
  }

  /**
   * Count change handler function for a specified name.
   * @param {String} name
   * @param {String} newCount
   * @return {Object}
   * @memberof PassangersSelector
   */
  handleCountChange = (name, newCount) =>
    Object.assign({}, this.getCurrentCountObject(), { [name]: newCount });

  /**
   * Handler specificator function. Return count change handler function
   * for a specified name.
   * @param {String} name
   * @return {Function}
   * @memberof PassangersSelector
   */
  getCountHandler = name => newCount => {
    const { onChange } = this.props;

    onChange(this.handleCountChange(name, newCount));
  };

  /**
   * Return object for option construction based on props
   * @param {String} name
   * @param {React.Props} props
   * @return {Object}
   * @memberof PassangersSelector
   */
  getOption = (name, props) => {
    return {
      value: name,
      label: props[`${name}Label`],
      description: props[`${name}Description`],
      count: props[`${name}Count`],
      min: props[`${name}MinLimit`] || 0,
      max: props.maxOfTheKind,
    };
  };

  /**
   * Get menu option
   * @param {React.Props} props
   * @returns {Object}
   * @memberof PassangersSelector
   */
  getOptions = props => {
    return this.supportedNames.map(name => this.getOption(name, props));
  };

  /**
   * Input displayed value handler. Returned value became a new input value
   * @param {String} val
   * @param {String} name
   * @return {Number}
   * @memberof PassangersSelector
   */
  parseInput = (val, name) => {
    const { props } = this;
    const { maxOfTheKind } = this.props;
    const regexp = /^[0-9]{1,}$/;
    // disallowing to manualy input values more than maxOfTheKind
    return Math.min(maxOfTheKind, regexp.test(val) ? parseInt(val, 10) : props[`${name}Count`]);
  };

  /**
   * Handler specificator function. Return value parse function for a specified name.
   * @param {String} name
   * @return {Function}
   * @memberof PassangersSelector
   */
  getParseInput = name => val => {
    return this.parseInput(val, name);
  };

  /**
   * Menu items builder function
   * @param {React.Props} props
   * @return {React.ReactNode}
   * @memberof PassangersSelector
   */
  getMenuItems = props => {
    const options = this.getOptions(props);
    return options.map(option => (
      <DropdownItem key={option.value} disabled>
        <OptionContainer>
          <OptionHeader>
            <span>{option.label}</span>
            <div>{option.description}</div>
          </OptionHeader>
          <NumericInput
            onChange={this.getCountHandler(option.value)}
            parse={this.getParseInput(option.value)}
            mobile
            value={option.count || 0}
            min={option.min}
            max={option.max}
          />
        </OptionContainer>
      </DropdownItem>
    ));
  };

  render() {
    const { totalLabel, total, dropdownIsOpen, toggleDropdown } = this.props;
    const menuItems = this.getMenuItems(this.props);

    return (
      <Dropdown isOpen={dropdownIsOpen} toggle={toggleDropdown} size="lg">
        <StyledDropdownToggle color="light" caret>
          <div>{`${totalLabel} ${total}`}</div>
        </StyledDropdownToggle>
        <DropdownMenu>
          {menuItems}
          <DropdownItem divider />
          <DropdownItem style={{ height: '40px', textAlign: 'center', fontSize: '1.4rem' }}>
            Close
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
