import React from 'react';
import styled from 'styled-components';
import { Container, utils } from 'styled-minimal';

const { spacer } = utils;

const OptionContainer = styled(Container)`
  height: ${props => props.theme.sizes.controlHeight}px;
  display: flex;
  padding: ${spacer(1)};
  align-content: center;
  align-items: center;
  border-bottom: 1px solid #999;
  pointer-events: auto !important;
  input {
    height: ${props => props.theme.sizes.controlHeight - 20}px;
    font-size: 1.2rem !important;
    width: 80px;
    &:focus {
      outline: none;
    }
  }
`;

export default React.memo(OptionContainer);
