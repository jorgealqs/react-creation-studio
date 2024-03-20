import axios from "axios"

// Configuración de axiosServiceFormData
const axiosServiceFormData = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "multipart/form-data",
  },
})

// Interceptor para agregar el token de acceso a las solicitudes salientes
axiosServiceFormData.interceptors.request.use(async (config) => {
  // Obtener el token de acceso del almacenamiento local
  const { access } = JSON.parse(localStorage.getItem("auth"))
  // Agregar el token de acceso a los headers de la solicitud
  config.headers.Authorization = `Bearer ${access}`
  return config
})

// Interceptor para manejar errores de respuestas
axiosServiceFormData.interceptors.response.use(
  (res) => Promise.resolve(res),
  (err) => Promise.reject(err),
)

// Exportar axiosServiceFormData como el módulo predeterminado
export default axiosServiceFormData
