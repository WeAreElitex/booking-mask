import React from 'react';
import PropTypes from 'prop-types';
import FloatingLabel from '@material/react-floating-label';
import '@material/react-floating-label/dist/floating-label.css';
import styled from 'styled-components';

const StyledFloatingLabel = styled(FloatingLabel)`
  color: #999;
  padding-left: 1.4rem;
  z-index: 1;
  overflow: visible !important;
  bottom: ${props => props.theme.sizes.controlHeight / 2 - 10}px !important;
  font-size: ${props => props.theme.sizes.inputFontSize} !important;
`;

export default class FloatLabel extends React.Component {
  constructor(props) {
    super(props);
    // createRef was introduce in React v16.3
    // https://reactjs.org/docs/refs-and-the-dom.html#creating-refs
    this.floatingLabelElement = React.createRef();
  }

  static propTypes = {
    clickHandler: PropTypes.func,
    isOpen: PropTypes.bool,
    label: PropTypes.string.isRequired,
  };

  render() {
    const { label, isOpen, clickHandler } = this.props;
    return (
      <StyledFloatingLabel
        onClick={e => (clickHandler ? clickHandler(e) : true)}
        ref={this.floatingLabelElement}
        float={isOpen}
      >
        {label}
      </StyledFloatingLabel>
    );
  }
}
