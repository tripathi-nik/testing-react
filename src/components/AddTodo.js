import React, { useState, useRef } from 'react'

import { addTodo } from '../api/todos'

const AddTodo = ({ dispatch }) => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [description, setDescription] = useState('');
  const titleInput = useRef();

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  }

  const handleSubmit = async (event) => {
    const form = event.target

    if (!form.checkValidity()) {
      form.classList.add('was-validated')
    }
    event.preventDefault()

    if (title.trim() !== '' && description.trim() !== '') {
      try {
        setError(false)
        setLoading(true)
        const payload = {
          title: title,
          description: description,
          completed: false,
        }
        const { data } = await addTodo(payload)
        setTitle('');
        setDescription('');
        dispatch({
          type: 'ADD_TODO',
          payload: data
        })
      } catch (error) {
        setError(error.message)
      } finally {
        form.classList.remove('was-validated')
        setLoading(false)
      }
    }

    titleInput.current.focus();
  }

  let button = <button type="submit" className="btn btn-primary">Submit</button>

  if (loading) {
    button = <button className="btn btn-primary" type="button" disabled>
      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      <span className="visually-hidden">Loading...</span>
    </button>
  }

  return (
    <form data-testid="todo-add-form" className="needs-validation" onSubmit={handleSubmit} noValidate>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input id="title" className="form-control" type="text" ref={titleInput} placeholder="Title" name="title" value={title} onChange={onTitleChange} required />
        <div data-testid="invalid-title" className="invalid-feedback">
          This field is required
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea id="description" value={description} onChange={onDescriptionChange} className="form-control" rows="3" required></textarea>
        <div data-testid="invalid-description" className="invalid-feedback">
          This field is required
        </div>
      </div>
      <div className="d-flex">
        {button}
        {error && <label className="ms-3 align-self-center text-danger">{error}</label>}
      </div>
    </form>
  );
}

export default AddTodo;