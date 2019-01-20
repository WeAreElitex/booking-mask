import React from 'react';
import styled from 'styled-components';

const FlightDirectionWrapper = styled.div`
  height: ${props => props.theme.sizes.controlHeight}px;
  min-width: ${props => props.theme.sizes.inputMinWidth * 2 + 140}px;
  display: flex;
  align-items: center;
  & > div {
    display: flex;
    padding: 0;
    margin: 0;
  }
`;

export default React.memo(FlightDirectionWrapper);
