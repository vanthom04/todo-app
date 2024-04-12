import TodoInput from './components/TodoInput'
import TodoItem from './components/TodoItem'
import './App.css'

function App() {
  return (
    <div className="wrapper">
      <header className="header">
        <h1>My Todo</h1>
        <TodoInput />
      </header>
      <main className="main">
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
      </main>
    </div>
  )
}

export default App
