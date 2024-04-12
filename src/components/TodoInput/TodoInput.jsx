import './TodoInput.css'

function InputTodo() {
  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input
        type="text"
        name="todo"
        placeholder="Enter todo..."
      />
      <button type="submit">
        ADD
      </button>
    </form>
  )
}

export default InputTodo
