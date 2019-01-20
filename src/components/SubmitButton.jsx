import styled from 'styled-components';
import { Button, utils } from 'styled-minimal';

const { spacer } = utils;

const SubmitButton = styled(Button)`
  font-size: 1.6rem;
  padding: ${spacer(2)};
  border-radius: 0;
  display: table-cell;
  min-height: ${props => props.theme.sizes.controlHeight}px;
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

export default SubmitButton;
