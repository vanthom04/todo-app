import { useContext } from 'react'
import Context from './Context'

export const useTodo = () => {
  const [state, dispatch] = useContext(Context)
  return [state, dispatch]
}
