import React from 'react';
import { shallow } from 'enzyme';

import { ErrorModal } from '../UI/ErrorModal';

describe('<ErrorModal />', ()=>{
  const handleClose = jest.fn();
  let wrapper = shallow(<ErrorModal 
    children='Something went wrong!'
    onClose={handleClose}
  />);
  
  it('Should render without error', ()=>{
    expect(wrapper.find('div')).toHaveLength(3);
  });

  it('Should render children', ()=>{
     expect(wrapper.find('p').text()).toEqual('Something went wrong!');
  });

  it('Should call onClose function on button click', ()=>{
    wrapper.find('button').simulate('click');
    expect(handleClose).toHaveBeenCalled();
  });
  
  it('Should call onClose function on backdrop click', ()=>{
    wrapper.find('.backdrop').simulate('click');
    expect(handleClose).toHaveBeenCalled();
  });

})