import React from 'react';
import theme from 'modules/theme';

import OptionContainer from 'components/OptionContainer';

describe('OptionContainer', () => {
  const wrapper = mount(<OptionContainer theme={theme} />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
