import React from 'react';
import styled, { withTheme } from 'styled-components';
import { DropdownToggle } from 'reactstrap';

const StyledDropdownToggle = styled(DropdownToggle)`
  height: ${props => props.theme.sizes.controlHeight}px;
  border-radius: ${props => props.theme.input.borderRadius.default} !important;
  min-width: ${props => props.theme.sizes.inputMinWidth + 100}px;
  display: flex;
  flex-grow: 1;
  background-color: ${props => props.theme.palette.inputBackgroundColor} !important;
  border-color: ${props => props.theme.palette.borderColor};
  border-radius: ${props => props.theme.input.borderRadius.default} !important;
  width: 100%;
  display: table-cell;
  &:after {
    position: absolute;
    right: 10px;
    top: ${props => props.theme.sizes.controlHeight / 2}px;
  }
  div {
    display: flex;
    padding-top: 10px;
    font-size: ${props => props.theme.sizes.inputFontSize};
    color: ${props => props.theme.palette.textDefaultColor};
  }
`;

export default withTheme(React.memo(StyledDropdownToggle));
