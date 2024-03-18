import { Navigate } from "react-router-dom"
import useUserActions from "../hooks/user.actions"

function ProtectedRoute({ children }) {
  const userActions = useUserActions()
  const user = userActions.getUser()
  return user ? <>{children}</> : <Navigate to="/login/" />
}

export default ProtectedRoute

