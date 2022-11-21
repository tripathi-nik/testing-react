// export const initialState = {
//   todos: [{
//     "id": 1,
//     "title": "delectus aut autem",
//     "description": "delectus aut autem",
//     "completed": false
//   },
//   {
//     "id": 2,
//     "title": "quis ut nam facilis et officia qui",
//     "description": "quis ut nam facilis et officia qui",
//     "completed": false
//   },
//   {
//     "id": 3,
//     "title": "fugiat veniam minus",
//     "description": "fugiat veniam minus",
//     "completed": false
//   },
//   {
//     "id": 4,
//     "title": "et porro tempora",
//     "description": "et porro tempora",
//     "completed": true
//   },
//   {
//     "id": 5,
//     "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
//     "description": "laboriosam mollitia et enim quasi adipisci quia provident illum",
//     "completed": false
//   },
//   {
//     "id": 6,
//     "title": "qui ullam ratione quibusdam voluptatem quia omnis",
//     "description": "qui ullam ratione quibusdam voluptatem quia omnis",
//     "completed": false
//   },
//   {
//     "id": 7,
//     "title": "illo expedita consequatur quia in",
//     "description": "illo expedita consequatur quia in",
//     "completed": false
//   },
//   {
//     "id": 8,
//     "title": "quo adipisci enim quam ut ab",
//     "description": "quo adipisci enim quam ut ab",
//     "completed": true
//   },
//   {
//     "id": 9,
//     "title": "molestiae perspiciatis ipsa",
//     "description": "molestiae perspiciatis ipsa",
//     "completed": false
//   },
//   {
//     "id": 10,
//     "title": "illo est ratione doloremque quia maiores aut",
//     "description": "illo est ratione doloremque quia maiores aut",
//     "completed": true
//   }],
// };

export const initialState = {
    todos: [],
  }
  
  export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TODOS':
        return {
          ...state,
          todos: action.payload,
        }
      case 'ADD_TODO':
        return {
          ...state,
          todos: state.todos.concat([action.payload]),
        }
      case 'COMPLETE_TODO':
      case 'COMPLETE_TODO_ERROR':
        return {
          ...state,
          todos: state.todos.map(todo => {
            const id = action.payload.id;
  
            if (todo.id != id) {
              return todo;
            }
  
            return {
              ...todo,
              completed: !todo.completed
            }
          })
        }
      case 'DELETE_TODO':
        return {
          ...state,
          todos: state.todos.filter(todo => todo.id != action.payload),
        }
      default:
        return state;
    }
  }
  