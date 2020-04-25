import React from 'react';
import { shallow } from 'enzyme';

import Ingredients from '../Ingredients/Ingredients';
import IngredientForm from '../Ingredients/IngredientForm';
import IngredientList from '../Ingredients/IngredientList';
import ErrorModel from '../UI/ErrorModal';
import Search from '../Ingredients/Search';
import ErrorModal from '../UI/ErrorModal';

describe('<Ingredients />', () => {
  let wrapper = shallow(<Ingredients />);
  console.log(wrapper.debug());
  it('Should render without error', () => {
    expect(wrapper.find('.App')).toHaveLength(1);
  });

  it('Should have Search component of length 1', () => {
    expect(wrapper.find(Search)).toHaveLength(1);
  });

  it('Should have IngredientForm component of length 1', () => {
    expect(wrapper.find(IngredientForm)).toHaveLength(1);
  });

  it('Should have IngredientList component of length 1', () => {
    expect(wrapper.find(IngredientList)).toHaveLength(1);
  });
  
  const ingredientsReducer = (currentIngredients, action) => {
    switch (action.type) {
      case 'SET':
        return action.ingredients;
      default:
        return currentIngredients;
    }
  };
  
  it('Should set the new currentIngredients on calling SET action', () => {
    expect(ingredientsReducer([], {
      type: 'SET',
      ingredients: [{ id: 1, title: 'Oranges', amount: 5 }]
    })).toEqual([{ id: 1, title: 'Oranges', amount: 5 }]);
  });
  
  it('Should return the initial state', () => {
    expect(ingredientsReducer([], {})).toEqual([]);
  });

});