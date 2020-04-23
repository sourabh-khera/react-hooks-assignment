import React, { useReducer, useCallback, useMemo  } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModel from '../UI/ErrorModal';
import Search from './Search';

const ingredientsReducer = (currentIngredients, action) => {
  switch(action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredients];
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default: 
      throw new Error('Should not get there!');   
  }
};

const httpReducer = (currentHttpState, action) => {
  switch(action.type){
    case 'SEND':
      return {loading: true, error: null}
    case 'RESPONSE':
      return {...currentHttpState, loading: false}
    case 'ERROR':
      return {loading: false, error: action.error}
    default:
      throw new Error('Should not get there!');      
  }
};

function Ingredients() {
  const [userIngredients, dispatch] = useReducer(ingredientsReducer, []);
  const [httpState, dispatchHttpAction] = useReducer(httpReducer, {loading: false, error: null});

  const setFilteredIngredients = useCallback((filteredIngredients) => {
    dispatch({type: 'SET', ingredients: filteredIngredients})
  }, [])

  const addIngredientHandler = useCallback((ingredient) => {
    dispatchHttpAction({type: 'SEND'});
    fetch('https://react-hooks-11ecf.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        dispatchHttpAction({type: 'RESPONSE'});
        return response.json()
      })
      .then(responseData => {
        dispatch({type: 'ADD', ingredients: { id: responseData.name, ...ingredient }});
      })
      .catch(error => {
        dispatchHttpAction({type: 'ERROR', error: 'Something went wrong!'})
      })
  }, []);

  const onRemoveItem = useCallback((ingredientId) => {
    dispatchHttpAction({type: 'SEND'});
    fetch(`https://react-hooks-11ecf.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE',
    })
      .then(response => {
        dispatchHttpAction({type: 'RESPONSE'});
        return response.json()
      })
      .then(responseData => {
        dispatch({type: 'DELETE', id: ingredientId})
      })
      .catch(error => {
        dispatchHttpAction({type: 'ERROR', error: 'Something went wrong!'})
      })
  }, []);

  const handleFilterError = useCallback(() => {
    dispatchHttpAction({type: 'ERROR', error: 'Something went wrong!'})
  }, []);

  const clearError = () => {
    dispatchHttpAction({type: 'ERROR', error: null})
  }

  const ingredientList = useMemo(()=>{
    return  <IngredientList ingredients={userIngredients} onRemoveItem={onRemoveItem} />
  }, [userIngredients, onRemoveItem]);
  
  return (
    <div className="App">
      {httpState.error && <ErrorModel onClose={clearError}>{httpState.error}</ErrorModel>}
      <IngredientForm addIngredientHandler={addIngredientHandler} loading={httpState.loading}/>

      <section>
        <Search onLoadedIngredients={setFilteredIngredients} setFilterError={handleFilterError}/>
        {ingredientList}
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
