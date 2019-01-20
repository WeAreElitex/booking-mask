import React from 'react';
import theme from 'modules/theme';

import FlightDatesWrapper from 'components/FlightDatesWrapper';

describe('FlightDatesWrapper', () => {
  const wrapper = shallow(<FlightDatesWrapper theme={theme} />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
