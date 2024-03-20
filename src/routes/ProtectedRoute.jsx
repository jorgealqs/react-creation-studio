import { Navigate } from "react-router-dom"
import useUserActions from "../hooks/user.actions"
import PropTypes from 'prop-types' // Importa PropTypes

function ProtectedRoute(props) {
  const { children } = props
  const userActions = useUserActions()
  const user = userActions.getUser()
  return user ? <>{children}</> : <Navigate to="/login/" />
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ProtectedRoute

