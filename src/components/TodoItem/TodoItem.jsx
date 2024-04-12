import { MdOutlineEdit } from 'react-icons/md'
import { FaInfoCircle } from 'react-icons/fa'
import { FaTrashAlt } from 'react-icons/fa'
import './TodoItem.css'

function TodoItem() {
  return (
    <div className="todo-item">
      <div className="view">
        <span>Buy groceries for next week</span>
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
          <button>
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

export default TodoItem
