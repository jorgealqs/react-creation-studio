import axios from "axios"
import createAuthRefreshInterceptor from "axios-auth-refresh"
// import useUserActions from "../hooks/user.actions"

// Configuración de axiosService
const axiosService = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor para agregar el token de acceso a las solicitudes salientes
axiosService.interceptors.request.use(async (config) => {
  // Obtener el token de acceso del almacenamiento local
  const { access } = JSON.parse(localStorage.getItem("auth"))
  // Agregar el token de acceso a los headers de la solicitud
  config.headers.Authorization = `Bearer ${access}`
  return config
})

// Interceptor para manejar errores de respuestas
axiosService.interceptors.response.use(
  (res) => Promise.resolve(res),
  (err) => Promise.reject(err),
)

// Lógica para actualizar el token de autenticación
const refreshAuthLogic = async (failedRequest) => {
  // Obtener el token de actualización del almacenamiento local
  const { refresh } = JSON.parse(localStorage.getItem("auth"))
  // Realizar una solicitud para obtener un nuevo token de acceso usando el token de actualización
  return axios
    .post("api/v1/refresh/token/", null, {
      baseURL: "http://localhost:8000",
      headers: {
        Authorization: `Bearer ${refresh}`,
      },
    })
    .then((resp) => {
      // Actualizar el token de acceso en el almacenamiento local
      const { access, refresh, user } = resp.data
      failedRequest.response.config.headers["Authorization"] = "Bearer " + access
      localStorage.setItem("auth", JSON.stringify({ access, refresh, user }))
    })
    .catch(() => {
      // Manejar el caso en el que la solicitud de actualización del token falla
      localStorage.removeItem("auth")
    })
}

// Crear interceptor de actualización de autenticación
createAuthRefreshInterceptor(axiosService, refreshAuthLogic)

// Función fetcher para realizar solicitudes GET usando axiosService
export async function fetcher(url) {
  const res = await axiosService.get(url)
  return res.data
}

// Exportar axiosService como el módulo predeterminado
export default axiosService
