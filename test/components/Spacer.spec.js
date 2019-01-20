import React from 'react';
import theme from 'modules/theme';

import Spacer from 'components/Spacer';

describe('Spacer', () => {
  const wrapper = mount(<Spacer theme={theme} />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
