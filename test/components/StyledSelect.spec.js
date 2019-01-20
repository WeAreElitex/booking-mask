import React from 'react';
import theme from 'modules/theme';
import StyledSelect from 'components/StyledSelect';

describe('StyledSelect', () => {
  const wrapper = shallow(<StyledSelect theme={theme} />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
