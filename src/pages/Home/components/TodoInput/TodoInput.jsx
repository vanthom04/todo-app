import { useState, useRef } from 'react'
import toast from 'react-hot-toast'
import { v4 as uuidV4 } from 'uuid'

import { useTodo, actions } from '~/context'
import { supabase, TABLE_NAME } from '~/config/supabase'
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

    try {
      const { error } = await supabase.from(TABLE_NAME).insert({
        task: task.trim(),
        user_id: state?.user?.sub
      })
      if (error) throw error

      toast.success('Add task successfully!')
      dispatch(actions.addTodo({
        id: uuidV4(),
        task,
        created_at: Date.now()
      }))
      setTask('')
      inputRef.current?.focus()
    } catch (error) {
      toast.error(error.message)
      throw new Error(error)
    }
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
