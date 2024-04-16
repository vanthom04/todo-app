import PropTypes from 'prop-types'
import { useState, useRef, useEffect } from 'react'
import { MdOutlineEdit } from 'react-icons/md'
import { FaInfoCircle } from 'react-icons/fa'
import { FaTrashAlt } from 'react-icons/fa'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import toast from 'react-hot-toast'

import { useTodo, actions } from '~/context'
import { supabase } from '~/config/supabase'
import './TodoItem.css'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function TodoItem({ todo }) {
  const [value, setValue] = useState('')
  const [isEdit, setIdEdit] = useState(false)
  const [show, setShow] = useState(false)
  const [, dispatch] = useTodo()

  const editRef = useRef(null)
  const btnEditRef = useRef(null)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleBlur = () => setIdEdit(false)
  const handleEditTodo = () => setIdEdit(!isEdit)

  useEffect(() => {
    if (isEdit) {
      setValue(todo.task)
      editRef.current.focus()
    }
  }, [isEdit, todo.task])

  const handleKeyUp = async (e) => {
    if (e.keyCode === 13) {
      const { error } = await supabase
        .from('my_todo')
        .update({ task: value.trim() })
        .eq('id', todo.id)

      if (error) {
        return toast.error('Updated task failed!')
      }

      dispatch(actions.editTodo({ id: todo.id, task: value }))
      toast.success('Updated task successfully!')
      setIdEdit(false)
    }
  }

  const handleDeleteTodo = async () => {
    const { error } = await supabase
      .from('my_todo')
      .delete()
      .eq('id', todo.id)

    if (error) {
      toast.error('Delete task failed!')
    }

    dispatch(actions.removeTodo(todo.id))
    toast.success('Delete task successfully!')
  }

  return (
    <>
      <div className="todo-item">
        <div className="view">
          <span style={{ display: isEdit ? 'none' : 'block' }}>
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
              ref={btnEditRef}
              style={{ marginRight: 12 }}
              onClick={handleEditTodo}
            >
              <MdOutlineEdit size={18} color="#38c0ed" />
            </button>
            <button onClick={handleShow}>
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
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure confirm delete task todo?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleDeleteTodo}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
}

export default TodoItem
