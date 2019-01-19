import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { DropdownToggle } from 'reactstrap';

const getButton = ({ sizes, palette }) =>
  styled(DropdownToggle)`
    height: ${sizes.controlHeight}px;
    border-radius: 0 !important;
    min-width: ${sizes.inputMinWidth + 100}px;
    display: flex;
    flex-grow: 1;
    background-color: white !important;
    border-color: ${palette.borderColor};
    border-radius: 0 !important;
    width: 100%;
    display: table-cell;
    &:after {
      position: absolute;
      right: 10px;
      top: ${sizes.controlHeight / 2}px;
    }
    div {
      display: flex;
      font-size: 1.5rem;
      color: ${palette.textDefaultColor};
    }
  `;

const StyledDropdownToggle = ({ theme, ...props }) => {
  const StyledDropToggle = getButton(theme);

  return <StyledDropToggle {...props} />;
};

StyledDropdownToggle.propTypes = {
  theme: PropTypes.object,
};

export default React.memo(StyledDropdownToggle);
