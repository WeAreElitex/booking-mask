import React from 'react';
import theme from 'modules/theme';

import BookingMaskGrid from 'components/BookingMaskGrid';

describe('BookingMaskGrid', () => {
  const wrapper = mount(<BookingMaskGrid theme={theme} />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
