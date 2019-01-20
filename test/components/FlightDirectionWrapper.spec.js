import React from 'react';
import theme from 'modules/theme';
import FlightDirectionWrapper from 'components/FlightDirectionWrapper';

describe('FlightDirectionWrapper', () => {
  const wrapper = shallow(<FlightDirectionWrapper theme={theme} />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
