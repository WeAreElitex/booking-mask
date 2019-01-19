import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Container, utils } from 'styled-minimal';

const { spacer } = utils;

const getContainer = theme =>
  styled(Container)`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
    position: relative;
    padding-bottom: ${spacer(4)};
    padding-top: ${spacer(2)};
    &:before {
      background-color: ${theme.palette.appColor};
      bottom: 0;
      content: '';
      height: 0.2rem;
      left: 0;
      position: absolute;
      right: 0;
    }
    &:after {
      background-color: ${theme.palette.appColor};
      top: 0;
      content: '';
      height: 0.2rem;
      left: 0;
      position: absolute;
      right: 0;
    }
  `;

const StyledContainer = ({ theme, ...props }) => {
  const StyledCont = getContainer(theme);

  return <StyledCont {...props} />;
};

StyledContainer.propTypes = {
  theme: PropTypes.object,
};

export default React.memo(StyledContainer);
