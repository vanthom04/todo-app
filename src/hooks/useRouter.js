import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

const useRouter = () => {
  const navigate = useNavigate()

  const router = useMemo(
    () => ({
      back: () => navigate(-1),
      forward: () => navigate(+1),
      reload: () => window.location.reload(),
      push: (href) => navigate(href)
    }),
    [navigate]
  )

  return router
}

export default useRouter
