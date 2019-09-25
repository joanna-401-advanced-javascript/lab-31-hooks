import React, { useState, useReducer } from 'react';

import Auth from '../auth/auth';
import styles from './todo.module.scss';

const initialState = {
  item: '',
  toDoItems: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'toggle':
      return { toDoItems: action.data };
    case 'form':
      return { ...state, toDoItems: [...state.toDoItems, action.data] };
    default:
      throw new Error();
  }
}

export default function Todo() {
  const [item, setItem] = useState(initialState.item);
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleForm(e) {
    e.preventDefault();
    e.target.reset();
    const itemObj = { title: item, status: false };
    dispatch({ type: 'form', data: itemObj });
  }

  function handleChange(e) {
    setItem(e.target.value);
  }

  function toggle(e, id) {
    e.preventDefault();
    const toDoItems = state.toDoItems.map((listItem, idx) => (
      idx === id ? { title: listItem.title, status: !listItem.status } : listItem));
    dispatch({ type: 'toggle', data: toDoItems });
  }

  return (
    <section className={styles.todo}>

      <Auth capability="read">
        {state.toDoItems.map((displayedItem, idx) => <div key={idx} onClick={(e) => toggle(e, idx)}>
            <span className={styles[`complete-${displayedItem.status}`]}> {displayedItem.title} </span>
          </div>)}
      </Auth>

      <Auth capability="create">
        <form onSubmit={handleForm}>
          <input
            onChange={handleChange}
            name="item"
            placeholder="Add To Do List Item Here"
          />
        </form>
      </Auth>

    </section>
  );
}
