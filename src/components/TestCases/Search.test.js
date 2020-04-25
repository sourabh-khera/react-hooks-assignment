import React from 'react';
import { shallow } from 'enzyme';
import Card from '../UI/Card';
import { Search } from '../Ingredients/Search';


describe('<Search />', () => {
  let wrapper = shallow(<Search />);
  it('Should render without error', () => {
    expect(wrapper.find('.search')).toHaveLength(1);
  });

  it('Should have child hoc Card', () => {
    expect(wrapper.find(Card)).toHaveLength(1);
  });

  it('should have proper props for search ingredient field', () => {
    expect(wrapper.find('#search').props()).toEqual({
      onChange: expect.any(Function),
      type: 'text',
      id: 'search',
      value: '',
    })
  });

  it('Should set the search field on change event', () => {
    wrapper.find('#search').simulate('change', {target: {value: 'Apples'}});
    expect(wrapper.find('#search').prop('value')).toEqual('Apples');
  });
  
});