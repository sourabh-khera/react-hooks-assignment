import React from 'react';
import { shallow } from 'enzyme';

import Card from '../UI/Card';

describe('<Card />', () => {
  const wrapper = shallow(<Card  />);
 
  it('Card component rendered without error', ()=>{
    expect(wrapper.find('.card')).toHaveLength(1);
  });

});