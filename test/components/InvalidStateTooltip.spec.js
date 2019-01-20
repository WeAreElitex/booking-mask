import React from 'react';

import InvalidStateTooltip from 'components/InvalidStateTooltip';

describe('InvalidStateTooltip', () => {
  const wrapper = mount(<InvalidStateTooltip isOpen={true} target="foobar" />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
