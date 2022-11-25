import React, { useState } from "react";

import * as Api from "../../api/todos";

const TodoItem = ({ dispatch, todo }) => {
  const [loading, setLoading] = useState(false);
  const onChange = async () => {
    try {
      setLoading(true);
      await Api.toggleTodo(todo);
      dispatch({
        type: "COMPLETE_TODO",
        payload: todo,
      });
    } catch (error) {
      dispatch({
        type: "COMPLETE_TODO_ERROR",
        payload: todo,
      });
    } finally {
      setLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      const { id } = todo;
      await Api.deleteTodo(id);
      dispatch({
        type: "DELETE_TODO",
        payload: id,
      });
    } catch (error) {
      setLoading(false);
    }
  };

  let classes = "form-check-label text-break";

  if (todo.completed) {
    classes = "form-check-label text-break text-decoration-line-through";
  }

  let deleteIcon = (
    <svg
      data-testid={`todo-delete-${todo.id}`}
      onClick={onDelete}
      style={{ height: "2rem" }}
      className="btn text-danger ms-auto flex-shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );

  if (loading) {
    deleteIcon = (
      <div
        className="d-flex justify-content-center pt-2 me-3 ms-auto flex-shrink-0"
        data-testid={`todo-loading-${todo.id}`}
      >
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex pt-3" data-testid="todo-item">
      <input
        disabled={loading}
        type="checkbox"
        onChange={onChange}
        id={`todo-${todo.id}`}
        checked={todo.completed}
        className="form-check-input flex-shrink-0 me-2"
      />
      <label htmlFor={`todo-${todo.id}`} className={classes}>
        {todo.title}
      </label>
      {deleteIcon}
    </div>
  );
};

export default TodoItem;