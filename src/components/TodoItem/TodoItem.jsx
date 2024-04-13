import PropTypes from 'prop-types'
import { MdOutlineEdit } from 'react-icons/md'
import { FaInfoCircle } from 'react-icons/fa'
import { FaTrashAlt } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { supabase } from '~/config/supabase'
import './TodoItem.css'

function TodoItem({ todo }) {
  const handleDeleteTodo = async (id) => {
    const { error } = await supabase.from('my_todo').delete().eq('id', id)
    if (error) {
      toast.error('Delete task failed!')
    }
    toast.success('Delete task successfully!')
  }

  return (
    <div className="todo-item">
      <div className="view">
        <span>{todo.task}</span>
        <input
          className="edit"
          type="text"
        />
      </div>
      <div className="more">
        <div className="edit">
          <button style={{ marginRight: 12 }}>
            <MdOutlineEdit size={18} color="#38c0ed" />
          </button>
          <button
            onClick={() => handleDeleteTodo(todo.id)}
          >
            <FaTrashAlt size={16} color="#f93154" />
          </button>
        </div>
        <div className="created-at">
          <span>
            <FaInfoCircle size={16} color="757575" />
          </span>
          <p>28th Jun 2020</p>
        </div>
      </div>
    </div>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
}

export default TodoItem
