import React, { useState, useReducer} from 'react';

import Auth from '../auth/auth.js';

import styles from './todo.module.scss';

const initialState = {
  item: '',
  toDoItems: [],
};

function reducer(state, action) {
  switch(action.type){
    case 'toggle':
      return {toDoItems: action.data};
    case 'form':
      return {...state, toDoItems: [...state.toDoItems, action.data]};
    default:
      throw new Error();
  }
}

export default function Todo(props) {
  const [item, setItem] = useState(initialState.item);
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleForm(e){
    e.preventDefault();
    e.target.reset();
    let itemObj = { title: item, status: false };
    dispatch({type: 'form', data: itemObj});
  }

  function handleChange(e){
    setItem(e.target.value);
  }

  function toggle(e, id){
    e.preventDefault();
    let toDoItems = state.toDoItems.map( (item, idx) =>
      idx === id ? {title: item.title, status: !item.status} : item
    );
    dispatch({type: 'toggle', data: toDoItems})
  }

  return (
    <section className={styles.todo}>

      <Auth capability="read">
        {state.toDoItems.map((item, idx) =>
          <div key={idx} onClick={(e) => toggle(e, idx)}>
            <span className={styles[`complete-${item.status}`]}> {item.title} </span>
          </div>
        )}
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
