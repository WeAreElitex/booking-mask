import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, utils } from 'styled-minimal';

const { spacer } = utils;

const getButton = ({ sizes }) =>
  styled(Button)`
    font-size: 1.6rem;
    padding: ${spacer(2)};
    border-radius: 0;
    display: table-cell;
    min-height: ${sizes.controlHeight}px;
    width: 100%;

    &:hover {
      opacity: 0.9;
      width: inherit;
      transform: none;
    }

    &.active {
      color: #000;
    }

    span {
      display: inline-block;
      margin-right: 0.4rem;
      text-transform: uppercase;
      position: relative;
    }
  `;

const SubmitButton = ({ theme, ...props }) => {
  const StyledButton = getButton(theme);

  return <StyledButton {...props} />;
};

SubmitButton.propTypes = {
  theme: PropTypes.object,
};

export default React.memo(SubmitButton);
