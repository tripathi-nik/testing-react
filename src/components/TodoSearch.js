import React from 'react'

const TodoSearch = ({ onSearch }) => {
  const onChange = (event) => {
    onSearch(event);
  };

  return (
    <div className="mb-3">
      <input type="text" name="search" className="form-control" placeholder="Search..." onChange={onChange} />
    </div>
  );
}

export default TodoSearch;
