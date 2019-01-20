import React from 'react';
import styled from 'styled-components';
import { Container, utils } from 'styled-minimal';

const { spacer } = utils;

const StyledContainer = styled(Container)`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  position: relative;
  padding-bottom: ${spacer(4)};
  padding-top: ${spacer(2)};
  &:before {
    background-color: ${props => props.theme.palette.appColor};
    bottom: 0;
    content: '';
    height: 0.2rem;
    left: 0;
    position: absolute;
    right: 0;
  }
  &:after {
    background-color: ${props => props.theme.palette.appColor};
    top: 0;
    content: '';
    height: 0.2rem;
    left: 0;
    position: absolute;
    right: 0;
  }
`;

export default React.memo(StyledContainer);
