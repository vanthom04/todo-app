import { useEffect } from 'react'
import { useTodo, actions } from '~/context'
import { supabase } from '~/config/supabase'
import TodoInput from '~/components/TodoInput'
import TodoItem from '~/components/TodoItem'
import './App.css'

function App() {
  const [state, dispatch] = useTodo()

  useEffect(() => {
    const fetchTodoList = async () => {
      const { data, error } = await supabase
        .from('my_todo')
        .select('*')
        .order('created_at')

      if (error) {
        console.error('Fetch todo list failed: ', error)
      } else {
        dispatch(actions.getTodoList(data))
      }
      console.log('re-render App.jsx')
    }

    fetchTodoList()
  }, [dispatch])

  return (
    <div className="wrapper">
      <header>
        <h1>My Todo</h1>
        <TodoInput />
      </header>
      <main>
        {state.todoList.map((todo) => (
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
