import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const getStyled = ({ sizes }) =>
  styled.div`
    height: ${sizes.controlHeight}px;
    min-width: ${sizes.inputMinWidth * 2 + 140}px;
    display: flex;
    align-items: center;
    & > div {
      display: flex;
      padding: 0;
      margin: 0;
    }
  `;

const FlightDirectionWrapper = ({ theme, ...props }) => {
  const StyledCont = getStyled(theme);

  return <StyledCont {...props} />;
};

FlightDirectionWrapper.propTypes = {
  theme: PropTypes.object,
};

export default React.memo(FlightDirectionWrapper);
