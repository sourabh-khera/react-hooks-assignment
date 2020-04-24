import React from 'react';
import { shallow, mount } from 'enzyme';
import  { IngredientForm } from '../Ingredients/IngredientForm';
import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator';

describe('<IngredientForm />', () => {
  let wrapper;
  const mockFunction = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<IngredientForm addIngredientHandler={mockFunction} />)
    console.log(wrapper.debug())
  })

  it('Component rendered without errors', ()=>{
    expect(wrapper.find('.ingredient-form')).toHaveLength(1);   
  });

  it('Should contain one child component', ()=>{
    expect(wrapper.find(Card)).toHaveLength(1);
  });
  
  it('Should have proper props for title field', () => {
    expect(wrapper.find('#title').props()).toEqual({
      onChange: expect.any(Function),
      type: 'text',
      value: '',
      id: 'title',
    });
  });
  
  it('Should set the title on change event', ()=>{
    wrapper.find('#title').simulate('change', {target: { value: 'Apples' }});
    expect(wrapper.find('#title').prop('value')).toEqual('Apples');
  }) 

  it('Should have proper props for amount field', () => {
    expect(wrapper.find('#amount').props()).toEqual({
      onChange: expect.any(Function),
      type: 'number',
      value: '',
      id: 'amount',
    });
  });

  it('Should set the amount on change event', ()=>{
    wrapper.find('#amount').simulate('change', {target: { value: 5 }});
    expect(wrapper.find('#amount').prop('value')).toEqual(5);
  }) 

  it('Should show a loading indicator when loading is true', () => {
    wrapper.setProps({loading: true});
    expect(wrapper.find(LoadingIndicator)).toHaveLength(1);
  })

  it('should submit form when clicked', () => {
     wrapper.find('form').simulate('submit', { preventDefault: () => {} });
     expect(mockFunction).toHaveBeenCalledTimes(1);
  })
});