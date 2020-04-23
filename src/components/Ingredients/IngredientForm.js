import React, { useState } from 'react';

import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  // const [inputState, setInputState] = useState({title: '', amount: ''});
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    props.addIngredientHandler({title, amount});
    // ...
  };
  const handleTitleInputChange = event => {
    setTitle(event.target.value);
  }
  const handleAmountInputChange = event => {
    setAmount(event.target.value);
  }
  // const handleAmountInputChange = event => {
      // event.persist() to access synthetic event in async way  
  //   const newAmount = event.target.value;
  //   setInputState(prevState => {
  //     return {...prevState, amount: newAmount }
  //   });
  // }

  console.log('rendering ingredient form');
  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={title} onChange={handleTitleInputChange}/>
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={amount} onChange={handleAmountInputChange}/>
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
