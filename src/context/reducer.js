import { GET_USER, ADD_TODO, EDIT_TODO, GET_TODO_LIST, REMOVE_TODO } from './constants'

export const initState = {
  user: null,
  todoList: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: { ...action.payload }
      }
    case GET_TODO_LIST:
      return {
        ...state,
        todoList: [...action.payload]
      }
    case ADD_TODO:
      return {
        ...state,
        todoList: [...state.todoList, action.payload]
      }
    case EDIT_TODO:
      const index = state.todoList.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state.todoList[index].task = action.payload.task
      return state
    case REMOVE_TODO:
      return {
        ...state,
        todoList: state.todoList.filter((todo) => todo.id !== action.payload)
      }
    default:
      throw new Error(`Invalid action ${action.type}`)
  }
}

export default reducer
