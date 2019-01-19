import styled from 'styled-components';
import { utils } from 'styled-minimal';

const { responsive } = utils;

const Spacer = styled.li`
  visibility: visible;
  /* stylelint-disable */
  ${/* istanbul ignore next */ () =>
    responsive({
      ix: `
        display: none !important;
      `,
      md: `
        display: none !important;
      `,
      lg: `
        display: flex !important;
      `,
      xl: `
        display: none !important;
      `,
    })};
  /* stylelint-enable */
`;

export default Spacer;
