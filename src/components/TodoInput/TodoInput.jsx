import PropTypes from 'prop-types'
import { useState, useRef } from 'react'
import toast from 'react-hot-toast'
import { supabase } from '~/config/supabase'
import './TodoInput.css'

function TodoInput({ onFetchData }) {
  const [task, setTask] = useState('')

  const inputRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!task) {
      return toast.error('Please! enter your tasks')
    }
    const { error } = await supabase.from('my_todo').insert({ task: task })
    if (error) {
      toast.error('Add task failure')
    } else {
      toast.success('Add task successfully')
      onFetchData()
      setTask('')
      inputRef.current.focus()
    }
  }

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter todo..."
        autoComplete="off"
        spellCheck="false"
      />
      <button type="submit">
        ADD
      </button>
    </form>
  )
}

TodoInput.propTypes = {
  onFetchData: PropTypes.func
}

export default TodoInput
