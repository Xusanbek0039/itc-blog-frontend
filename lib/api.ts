import axios from "axios"

export const api = axios.create({
  baseURL: "https://itc-blog-api.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 soniya timeout (server sekin bo'lishi mumkin)
})

// Add token to requests automatically
api.interceptors.request.use(
  (config) => {
    console.log("🚀 API Request:", config.method?.toUpperCase(), config.url)

    // Request body'ni log qilish (debug uchun)
    if (config.data) {
      console.log("Request data:", config.data)
    }

    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error("❌ Request setup error:", error)
    return Promise.reject(error)
  },
)

// Handle auth errors and other responses
api.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", response.status, response.config.url)

    // Response data'ni log qilish (debug uchun)
    if (response.data) {
      console.log("Response data:", response.data)
    }

    return response
  },
  (error) => {
    console.error("❌ API Error Details:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
    })

    // Network error
    if (!error.response) {
      console.error("🌐 Network error - no response received")
      return Promise.reject({
        ...error,
        message: "Internet aloqasi yo'q yoki server javob bermayapti",
      })
    }

    // Handle different status codes
    switch (error.response.status) {
      case 400:
        console.error("⚠️ HTTP Error 400:", error.response.data)
        break
      case 401:
        console.error("🔒 Unauthorized - removing token")
        localStorage.removeItem("token")
        if (window.location.pathname !== "/login" && window.location.pathname !== "/register") {
          window.location.href = "/login"
        }
        break
      case 403:
        console.error("🚫 Forbidden access")
        break
      case 404:
        console.error("🔍 Resource not found")
        break
      case 500:
        console.error("💥 Server error")
        break
      default:
        console.error(`⚠️ HTTP Error ${error.response.status}:`, error.response.data)
    }

    return Promise.reject(error)
  },
)
