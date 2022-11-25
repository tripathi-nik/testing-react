import React from 'react'

import { getAllTodos } from '../api/todos'
import TodoItem from './TodoItem'

const TodoList = ({ dispatch, todos, query }) => {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(false)

  React.useEffect(async () => {
    try {
      setLoading(true)
      const { data } = await getAllTodos()
      dispatch({
        type: 'SET_TODOS',
        payload: data
      })
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    setError(false)
  }, [todos])

  if (loading) {
    return (
      <div className="d-flex justify-content-center" data-testid="todo-loading">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center text-danger">
        {error}
      </div>
    )
  }

  return (
    <div className="my-3 p-3 bg-body rounded shadow-sm" data-testid="todo-list">
      {
        todos
          .filter(({ title }) => title.toLowerCase().includes(query.toLowerCase()))
          .map((todo) => {
            return (
              <TodoItem
                dispatch={dispatch}
                key={todo.id}
                todo={todo}
              />
            )
          })
      }
    </div>
  );
}

export default TodoList;
