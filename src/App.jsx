import { useState, useEffect } from 'react'
import { supabase } from './config/supabase'
import TodoInput from './components/TodoInput'
import TodoItem from './components/TodoItem'
import './App.css'

function App() {
  const [todoList, setTodoList] = useState([])

  const fetchTodoList = async () => {
    const { data, error } = await supabase.from('my_todo').select('*')
    if (error) {
      console.log('Error fetching todo list', error.message)
    } else {
      setTodoList(data)
    }
  }

  useEffect(() => {
    fetchTodoList()
  }, [])

  return (
    <div className="wrapper">
      <header className="header">
        <h1>My Todo</h1>
        <TodoInput />
      </header>
      <main className="main">
        {todoList.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </main>
    </div>
  )
}

export default App
