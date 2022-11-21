import React, { useEffect, useState, useReducer, useRef } from 'react'

import { todoReducer, initialState } from './reducers/todoReducer'
import TodoSearch from './TodoSearch'
import TodoList from './TodoList'
import AddTodo from './AddTodo'
import Header from './Header'

const TodoApp = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [search, setSearch] = useState('');

  const onSearch = (event) => {
    setSearch(event.target.value);
  }

  return (
    <>
      <Header />
      <main className="container">
        <TodoSearch onSearch={onSearch} />
        <TodoList
          dispatch={dispatch}
          todos={state.todos}
          query={search}
        />
        <AddTodo dispatch={dispatch} />
      </main>
    </>
  );
}

export default TodoApp;