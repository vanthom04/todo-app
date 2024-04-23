import { GET_USER, GET_TODO_LIST, ADD_TODO, EDIT_TODO, REMOVE_TODO } from './constants'

export const getUser = (payload) => ({
  type: GET_USER,
  payload
})

export const getTodoList = (payload) => ({
  type: GET_TODO_LIST,
  payload
})

export const addTodo = (payload) => ({
  type: ADD_TODO,
  payload
})

export const editTodo = (payload) => ({
  type: EDIT_TODO,
  payload
})

export const removeTodo = (payload) => ({
  type: REMOVE_TODO,
  payload
})
