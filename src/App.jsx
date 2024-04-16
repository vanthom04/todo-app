import { Toaster } from 'react-hot-toast'
import Router from '~/routes/Router'
import { TodoProvider } from '~/context'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

function App() {
  return (
    <TodoProvider>
      <Router />
      <Toaster position="top-center" />
    </TodoProvider>
  )
}

export default App
