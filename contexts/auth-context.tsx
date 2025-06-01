"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { api } from "@/lib/api"
import { mockUser } from "@/lib/mock-data"

interface User {
  id: string
  _id: string
  name: string
  email: string
  bio?: string
  avatar?: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
  updateUser: (userData: Partial<User>) => void
  useMockUser: () => void
  isMockUser: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isMockUser, setIsMockUser] = useState(false)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (!initialized) {
      initializeAuth()
    }
  }, [initialized])

  const initializeAuth = async () => {
    try {
      // Check for mock user first
      const savedMockUser = localStorage.getItem("mockUser")
      if (savedMockUser === "true") {
        setUser(mockUser)
        setIsMockUser(true)
        setLoading(false)
        setInitialized(true)
        return
      }

      // Check for real user token
      const savedToken = localStorage.getItem("token")
      if (savedToken) {
        setToken(savedToken)

        // Set axios default header
        api.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`

        try {
          const response = await api.get("/users/profile")
          const userData = response.data.user || response.data
          setUser(userData)
          setIsMockUser(false)
        } catch (error: any) {
          console.error("Token validation failed:", error)
          // Clear invalid token
          localStorage.removeItem("token")
          setToken(null)
          delete api.defaults.headers.common["Authorization"]
        }
      }
    } catch (error) {
      console.error("Auth initialization error:", error)
    } finally {
      setLoading(false)
      setInitialized(true)
    }
  }

  const login = async (email: string, password: string) => {
    const response = await api.post("/users/login", {
      email: email.trim(),
      password: password,
    })

    const { token: newToken, user: userData } = response.data

    setToken(newToken)
    setUser(userData)
    setIsMockUser(false)
    localStorage.setItem("token", newToken)
    localStorage.removeItem("mockUser")

    // Set axios default header
    api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`
  }

  const register = async (name: string, email: string, password: string) => {
    const requestData = {
      name: name.trim(),
      email: email.trim(),
      password: password,
    }

    const response = await api.post("/users/register", requestData)

    if (response.data.token && response.data.user) {
      const { token: newToken, user: userData } = response.data
      setToken(newToken)
      setUser(userData)
      setIsMockUser(false)
      localStorage.setItem("token", newToken)
      localStorage.removeItem("mockUser")

      // Set axios default header
      api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`
    } else {
      throw new Error(response.data.message || "Registration failed")
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    setIsMockUser(false)
    localStorage.removeItem("token")
    localStorage.removeItem("mockUser")

    // Remove axios default header
    delete api.defaults.headers.common["Authorization"]
  }

  const updateUser = (userData: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...userData } : null))
  }

  const useMockUser = () => {
    setUser(mockUser)
    setIsMockUser(true)
    setToken(null)
    localStorage.removeItem("token")
    localStorage.setItem("mockUser", "true")

    // Remove axios default header for mock user
    delete api.defaults.headers.common["Authorization"]
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        loading,
        updateUser,
        useMockUser,
        isMockUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
