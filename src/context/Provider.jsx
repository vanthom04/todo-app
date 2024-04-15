import PropTypes from 'prop-types'
import { useReducer } from 'react'
import Context from './Context'
import reducer, { initState } from './reducer'

function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.node.isRequired
}

export default Provider
