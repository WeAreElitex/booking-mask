import React from 'react';
import styled from 'styled-components';
import { Container, utils } from 'styled-minimal';
import PropTypes from 'prop-types';

const { spacer } = utils;

const getStyled = ({ sizes }) =>
  styled(Container)`
    height: ${sizes.controlHeight}px;
    display: flex;
    padding: ${spacer(1)};
    align-content: center;
    align-items: center;
    border-bottom: 1px solid #999;
    pointer-events: auto !important;
    input {
      height: ${sizes.controlHeight - 20}px;
      font-size: 1.2rem !important;
      width: 80px;
      &:focus {
        outline: none;
      }
    }
  `;

const OptionContainer = ({ theme, ...props }) => {
  const StyledOptCont = getStyled(theme);

  return <StyledOptCont {...props} />;
};

OptionContainer.propTypes = {
  theme: PropTypes.object,
};

export default React.memo(OptionContainer);
