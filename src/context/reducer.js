import { ADD_TODO, EDIT_TODO, GET_TODO_LIST, REMOVE_TODO } from './constants'

export const initState = {
  todoList: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case GET_TODO_LIST:
      return {
        todoList: [...action.payload]
      }
    case ADD_TODO:
      return {
        todoList: [...state.todoList, action.payload]
      }
    case EDIT_TODO:
      return {
        todoList: [...state.todoList.filter((todo) => todo.id !== action.payload.id), {
          ...state.todoList.filter((todo) => todo.id === action.payload.id)[0],
          task: action.payload.task
        }]
      }
    case REMOVE_TODO:
      return {
        todoList: state.todoList.filter((todo) => todo.id !== action.payload)
      }
    default:
      throw new Error(`Invalid action ${action.type}`)
  }
}

export default reducer
