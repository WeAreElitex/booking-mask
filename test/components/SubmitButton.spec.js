import React from 'react';
import theme from 'modules/theme';

import SubmitButton from 'components/SubmitButton';

describe('SubmitButton', () => {
  const wrapper = mount(<SubmitButton theme={theme} />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
