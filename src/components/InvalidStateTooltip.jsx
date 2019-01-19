import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import Floater from 'react-floater';

export const TooltipContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;

  span {
    padding-right: 1rem;
  }
`;

const InvalidStateTooltip = ({ isOpen, target }) => (
  <Floater
    content={
      <TooltipContainer>
        <Icon name="exclamation-circle" width={16} />
        <div>Please fill out this field.</div>
      </TooltipContainer>
    }
    placement="top"
    open={isOpen}
    target={`#${target}`}
  />
);

InvalidStateTooltip.propTypes = {
  isOpen: PropTypes.bool,
  target: PropTypes.string.isRequired,
};

export default InvalidStateTooltip;
