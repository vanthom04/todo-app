import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from '~/App.jsx'
import 'bootstrap/dist/css/bootstrap.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Suspense>
        <App />
        <Toaster position="top-center" />
      </Suspense>
    </BrowserRouter>
  </QueryClientProvider>
)
