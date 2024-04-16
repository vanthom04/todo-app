import { useState, useRef } from 'react'
import toast from 'react-hot-toast'

import { useTodo, actions } from '~/context'
import { supabase } from '~/config/supabase'
import './TodoInput.css'

function TodoInput() {
  const [task, setTask] = useState('')
  const [state, dispatch] = useTodo()

  const inputRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!task) {
      return toast.error('No task!')
    }

    const { error } = await supabase.from('my_todo').insert({ task })
    if (error) {
      return toast.error('Add task failed!')
    }

    toast.success('Add task successfully!')
    dispatch(actions.addTodo({
      id: state.todoList[state.todoList.length - 1].id + 1,
      task,
      created_at: Date.now()
    }))
    setTask('')
    inputRef.current?.focus()
  }

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={task}
        placeholder="Enter todo..."
        autoComplete="off"
        spellCheck="false"
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">
        ADD
      </button>
    </form>
  )
}

export default TodoInput
