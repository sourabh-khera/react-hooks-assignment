import React from 'react';
import { shallow } from 'enzyme';

import IngredientList from '../Ingredients/IngredientList';

describe('<IngredientList />', () => {
  const handleRemove = jest.fn();
  let wrapper = shallow(<IngredientList ingredients={[]} onRemoveItem={handleRemove}/>);

  it('Should render without error', () => {
    expect(wrapper.find('.ingredient-list')).toHaveLength(1);
  });

  it('Should render ul with 2 li element', () => {
    wrapper.setProps({ ingredients: [{ id: 1, title: 'Apples' }]});
    expect(wrapper.find('li')).toHaveLength(1);
  });

  it('Should remove specific item on clicking li', ()=>{
     wrapper.find('li').simulate('click');
     expect(handleRemove).toHaveBeenCalled();
  });

});