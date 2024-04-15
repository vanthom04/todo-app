import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { TodoProvider } from '~/context'
import App from '~/App.jsx'
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TodoProvider>
      <App />
      <Toaster position="top-center" />
    </TodoProvider>
  </React.StrictMode>
)
