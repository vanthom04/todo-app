import { useEffect, useState } from 'react'
import config from '~/config'
import { useRouter } from '~/hooks'
import { useTodo, actions } from '~/context'
import { supabase, TABLE_NAME } from '~/config/supabase'
import TodoInput from './components/TodoInput'
import TodoItem from './components/TodoItem'
import './Home.css'

function Home() {
  const [state, dispatch] = useTodo()
  const [user, setUser] = useState(null)

  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) {
        throw new Error(error)
      }

      if (session) {
        setUser(session.user.user_metadata)
        dispatch(actions.getUser(session.user.user_metadata))
      } else {
        router.replace(config.routes.signIn)
      }
    }

    fetchUser()
  }, [router, dispatch])

  useEffect(() => {
    const fetchTodoList = async () => {
      if (!user) return
      try {
        const { data, error } = await supabase
          .from(TABLE_NAME)
          .select('*')
          .eq('user_id', user?.sub)
          .order('created_at')

        if (error) throw error

        dispatch(actions.getTodoList(data))
      } catch (error) {
        throw new Error(error)
      }
    }

    fetchTodoList()
  }, [dispatch, user])

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw new Error(error)
    }
    router.replace(config.routes.signIn)
  }

  return (
    <>
      <div className="user">
        <h3>Hello, {user?.full_name ?? user?.email}</h3>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      <div className="wrapper">
        <header>
          <h1>My Todo</h1>
          <TodoInput />
        </header>
        <main>
          {state.todoList.length > 0 ? (
            <>
              {state.todoList.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                />
              ))}
            </>
          ) : (
            <div className="no-task">
              <h3>No task!</h3>
            </div>
          )}
        </main>
      </div>
    </>
  )
}

export default Home
