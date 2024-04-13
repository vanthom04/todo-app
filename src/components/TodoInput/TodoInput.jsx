import { useState } from 'react'
import toast from 'react-hot-toast'
import { supabase } from '~/config/supabase'
import './TodoInput.css'


function InputTodo() {
  const [task, setTask] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!task) {
      toast.error('Please ! enter task for you')
    }

    const { error } = await supabase.from('my_todo').insert({ task:task })
    if (error) {
      toast.error('Insert task failure')
    } else {
      toast.success('Insert task successfully')
    }
  }

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input
        type="text"
        name={task}
        onChange={ (e) => setTask(e.target.value)}
        placeholder="Enter todo..."
        autoComplete="off"
        spellCheck="false"
      />
      <button onClick={handleSubmit}>
        ADD
      </button>
    </form>
  )
}

export default InputTodo
