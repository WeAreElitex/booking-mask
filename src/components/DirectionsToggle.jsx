import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';

import { ButtonGroup, Button } from 'styled-minimal';

export const StyledButtonGroup = styled(ButtonGroup)`
  button {
    padding: 5px;
    z-index: 1;
    border-radius: 15px;
    &:focus {
      outline: none;
    }
  }
`;

const DirectionsToggle = ({ oneWay, onToggle, animate, theme }) => (
  <StyledButtonGroup
    role="group"
    aria-label="BookingMask Selector"
    data-testid="BookingMaskSelector"
    onClick={onToggle}
  >
    <Button
      animate={animate}
      outline={oneWay}
      size="xs"
      style={{ backgroundColor: !oneWay ? theme.palette.primary : undefined }}
    >
      <Icon
        color={!oneWay ? '#fff' : theme.palette.defaulIconColor}
        name="right-arrow"
        width={12}
      />
    </Button>
    <Button
      animate={animate}
      outline={!oneWay}
      size="xs"
      style={{ backgroundColor: oneWay ? theme.palette.primary : undefined }}
    >
      <Icon
        color={oneWay ? '#fff' : theme.palette.defaulIconColor}
        name="two-way-arrows"
        width={12}
      />
    </Button>
  </StyledButtonGroup>
);

DirectionsToggle.propTypes = {
  animate: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  oneWay: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default DirectionsToggle;
