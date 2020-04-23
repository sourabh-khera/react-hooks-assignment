import React, { useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModel from '../UI/ErrorModal';
import Search from './Search';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const setFilteredIngredients = useCallback((filteredIngredients) => {
    setUserIngredients(filteredIngredients); 
  }, [])

  const addIngredientHandler = (ingredient) => {
    setIsLoading(true);
    fetch('https://react-hooks-11ecf.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        setIsLoading(false);
        return response.json()
      })
      .then(responseData => {
        setUserIngredients(prevState => [...userIngredients, { id: responseData.name, ...ingredient }]);
      })
      .catch(error => {
        setError('Something went wrong!');
        setIsLoading(false);
      })
  }
  const onRemoveItem = (ingredientId) => {
    setIsLoading(true);
    fetch(`https://react-hooks-11ecf.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE',
    })
      .then(response => {
        setIsLoading(false);
        return response.json()
      })
      .then(responseData => {
        const tempUserIngredients = [...userIngredients];
        const ingredient = tempUserIngredients.findIndex(ingredient => ingredient.id === ingredientId);
        tempUserIngredients.splice(ingredient, 1);
        setUserIngredients(tempUserIngredients);
      })
      .catch(error => {
        setError('Something went wrong!');
        setIsLoading(false);
      })
  }
  const handleFilterError = useCallback(() => {
    setError('Something went wrong!');
  }, []);

  const clearError = () => {
    setError(null);
  }
  return (
    <div className="App">
      {error && <ErrorModel onClose={clearError}>{error}</ErrorModel>}
      <IngredientForm addIngredientHandler={addIngredientHandler} loading={isLoading}/>

      <section>
        <Search onLoadedIngredients={setFilteredIngredients} setFilterError={handleFilterError}/>
        <IngredientList ingredients={userIngredients} onRemoveItem={onRemoveItem} />
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
