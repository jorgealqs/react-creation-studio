import axios from "axios"
import { useNavigate } from "react-router-dom"
// import axiosService from "../helpers/axios"
import axiosServiceFormData from "../helpers/axiosmultipartformdata"

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
    return auth && auth.user ? auth.user : null
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


// Edit the user
async function edit(data, userId) {
  try {
    // Realizar la solicitud PATCH con FormData
    const res = await axiosServiceFormData.patch(`${baseURL}/user/${userId}/`, data)

    // Actualizar los datos de usuario en el almacenamiento local
    const authData = JSON.parse(localStorage.getItem("auth"))
    if (authData) {
      localStorage.setItem("auth", JSON.stringify({ ...authData, user: res.data }))
    }

    // Actualizar el estado de userData con los nuevos datos del usuario
    setUserData(res.data)
  } catch (error) {
    console.error('Error:', error)
    // Manejar el error
  }
}


  return {
      login,
      register,
      logout,
      getUser,
      getAccessToken,
      getRefreshToken,
      edit,
  }

}

export default useUserActions
