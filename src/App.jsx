import { Toaster } from 'react-hot-toast'
import AppRoutes from '~/routes/AppRoutes'
import { TodoProvider } from '~/context'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

function App() {
  return (
    <TodoProvider>
      <AppRoutes />
      <Toaster position="top-center" />
    </TodoProvider>
  )
}

export default App
