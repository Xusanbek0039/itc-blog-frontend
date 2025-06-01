"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Terminal, Eye, EyeOff } from "lucide-react"

export default function RegisterPage() {
  const [name, setName] = useState("") // 'username' o'rniga 'name'
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({}) // Oldingi xatoliklarni tozalash

    // Frontend validatsiya
    const newErrors: { [key: string]: string } = {}

    if (!name.trim()) {
      newErrors.name = "Name entry is required."
    } else if (name.trim().length < 2) {
      newErrors.name = "The name must be at least 2 characters long."
    }

    if (!email.trim()) {
      newErrors.email = "Email is required."
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email format is incorrect."
    }

    if (!password) {
      newErrors.password = "Password entry is required."
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long"
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match."
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)

    try {
      await register(name, email, password) // 'name' yuboramiz
      toast({
        title: "Success!",
        description: "Account created successfully! Welcome!!",
      })
      router.push("/")
    } catch (error: any) {
      console.error("Registration error:", error)

      let errorMessage = "An error occurred while registering."

      if (error.response?.status === 400) {
        const backendError = error.response?.data?.message || error.response?.data?.error
        console.log("Backend error message:", backendError)

        if (backendError) {
          if (typeof backendError === "string") {
            if (backendError.toLowerCase().includes("email")) {
              errorMessage = "This email is already registered."
            } else if (backendError.toLowerCase().includes("mavjud")) {
              errorMessage = "User already exists."
            } else if (
              backendError.toLowerCase().includes("validation") ||
              backendError.toLowerCase().includes("required") ||
              backendError.toLowerCase().includes("to'ldirilishi")
            ) {
              errorMessage = "Fill in all fields."
            } else {
              errorMessage = backendError
            }
          } else {
            errorMessage = "The information was entered incorrectly."
          }
        }
      } else if (error.response?.status === 422) {
        errorMessage = "The data format is incorrect."
      } else if (error.response?.status === 500) {
        errorMessage = "Server error. Please try again later."
      } else if (!error.response) {
        errorMessage = "No internet connection. Please check your internet connection."
      }

      toast({
        title: "Xatolik!",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Terminal className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl">Create a secure account</CardTitle>
            <CardDescription>Enter personal information and register.</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">First name, last name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="First Name Last Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={errors.name ? "border-red-500" : ""}
                  required
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">You Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? "border-red-500" : ""}
                  required
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={errors.password ? "border-red-500" : ""}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                  required
                />
                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating, please wait......" : "Create Account"}
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                Do you have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  )
}
