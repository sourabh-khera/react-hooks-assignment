import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const inputRef = useRef();
  const { onLoadedIngredients, setFilterError } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredTitle === inputRef.current.value) {
        const query = enteredTitle ? `?orderBy="title"&equalTo="${enteredTitle}"` : '';
        fetch('https://react-hooks-11ecf.firebaseio.com/ingredients.json' + query, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
          .then(response => {
            return response.json()
          })
          .then(responseData => {
            const loadedIngredients = [];
            for (let key in responseData) {
              loadedIngredients.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount
              });
            }
            onLoadedIngredients(loadedIngredients);
          })
          .catch(error => {
            setFilterError();
          })
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    }
  }, [enteredTitle, onLoadedIngredients, setFilterError])

  const handleFilterInput = (event) => {
    setEnteredTitle(event.target.value);
  }

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" ref={inputRef} value={enteredTitle} onChange={handleFilterInput} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
