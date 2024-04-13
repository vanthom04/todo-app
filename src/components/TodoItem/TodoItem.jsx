import PropTypes from 'prop-types'
import toast from 'react-hot-toast'
import { useState, useRef } from 'react'
import { MdOutlineEdit } from 'react-icons/md'
import { FaInfoCircle } from 'react-icons/fa'
import { FaTrashAlt } from 'react-icons/fa'
import { supabase } from '~/config/supabase'
import './TodoItem.css'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function TodoItem({ todo, onFetchData }) {
  const [value, setValue] = useState('')
  const [isEdit, setIdEdit] = useState(false)

  const editRef = useRef(null)
  const timeoutRef = useRef(null)

  const handleEditTodo = () => {
    setIdEdit(!isEdit)

    if (!isEdit) {
      setValue(todo.task)

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        editRef.current?.focus()
      }, 0)
    }
  }

  const handleBlur = () => {
    setIdEdit(false)
  }

  const handleKeyUp = async (e) => {
    if (e.keyCode === 13) {
      const { error } = await supabase
        .from('my_todo')
        .update({ task: value.trim() })
        .eq('id', todo.id)

      if (error) {
        return toast.error('Updated task failed!')
      }

      toast.success('Updated task successfully!')
      setIdEdit(false)
      onFetchData()
    }
  }

  const handleDeleteTodo = async () => {
    const { error } = await supabase.from('my_todo').delete().eq('id', todo.id)
    if (error) {
      toast.error('Delete task failed!')
    }
    toast.success('Delete task successfully!')
    onFetchData()
  }

  return (
    <div className="todo-item">
      <div className="view">
        <span
          style={{ display: isEdit ? 'none' : 'block' }}
        >
          {todo.task}
        </span>
        <input
          ref={editRef}
          className="edit"
          style={{ display: isEdit ? 'block' : 'none' }}
          type="text"
          value={value}
          spellCheck="false"
          autoComplete="off"
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          onKeyUp={handleKeyUp}
        />
      </div>
      <div className="more">
        <div className="edit">
          <button
            style={{ marginRight: 12 }}
            onClick={handleEditTodo}
          >
            <MdOutlineEdit size={18} color="#38c0ed" />
          </button>
          <button
            onClick={handleDeleteTodo}
          >
            <FaTrashAlt size={16} color="#f93154" />
          </button>
        </div>
        <div className="created-at">
          <span>
            <FaInfoCircle size={16} color="757575" />
          </span>
          <p>
            {`${new Date(todo.created_at).getDate()} 
            ${months[new Date(todo.created_at).getMonth()]} 
            ${new Date(todo.created_at).getFullYear()}`}
          </p>
        </div>
      </div>
    </div>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onFetchData: PropTypes.func
}

export default TodoItem
