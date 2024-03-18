import axios from "axios"
import { useNavigate } from "react-router-dom"

function useUserActions() {

  const navigate = useNavigate()
  const baseURL = "http://localhost:8000/api/v1"

  // Set the access, token and user property
  function setUserData(data) {
    localStorage.setItem(
        "auth",
        JSON.stringify({
          access: data.access,
          refresh: data.refresh,
          user: data.user,
        })
    )
  }

  // Login the user
  async function login(data) {
    try {
      const res = await axios.post(`${baseURL}/login/`, data)
      // Registering the account and tokens in the
      // store
      setUserData(res.data)
      navigate("/")
    } catch (error) {
      console.error("Error during login:", error)
      throw error  // Propagate the error to the caller
    }
  }

  // Register new users
  async function register(data) {
    try {
      const res = await axios.post(`${baseURL}/user/create/`, data)
      // Registering the account and tokens in the
      // store
      setUserData(res.data)
      navigate("/login")
    } catch (error) {
      console.error("Error during registration:", error)
      throw error  // Propagate the error to the caller
    }
  }

  // Logout the user
  function logout() {
    localStorage.removeItem("auth")
    navigate("/login")
  }

  // Get the user
  function getUser() {
    const auth = JSON.parse(localStorage.getItem("auth"))
    return auth && auth.user ? auth.user : null;
  }


  // Get the access token
  function getAccessToken() {
    const auth = JSON.parse(localStorage.getItem("auth"))
    return auth.access
  }

  // Get the refresh token
  function getRefreshToken() {
    const auth = JSON.parse(localStorage.getItem("auth"))
    return auth.refresh
  }

  return {
      login,
      register,
      logout,
      getUser,
      getAccessToken,
      getRefreshToken,
  }

}

export default useUserActions
