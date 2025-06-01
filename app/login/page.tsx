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
import { Terminal, Eye, EyeOff, AlertTriangle } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login, useMockUser } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [serverError, setServerError] = useState<string | null>(null)

  const handleUseDemoMode = () => {
    useMockUser()
    toast({
      title: "Demo rejim",
      description: "Demo foydalanuvchi sifatida kirdingiz",
    })
    router.push("/")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setServerError(null)
    setLoading(true)

    try {
      await login(email, password)
      toast({
        title: "Muvaffaqiyat!",
        description: "Tizimga muvaffaqiyatli kirdingiz!",
      })
      router.push("/")
    } catch (error: any) {
      console.error("Login error:", error)

      let errorMessage = "Kirish jarayonida xatolik yuz berdi"

      if (error.response?.status === 400) {
        errorMessage = "Email yoki parol noto'g'ri"
      } else if (error.response?.status === 401) {
        errorMessage = "Email yoki parol noto'g'ri"
      } else if (error.response?.status === 404) {
        errorMessage = "Foydalanuvchi topilmadi"
      } else if (error.response?.status === 500) {
        errorMessage = "Server xatoligi. Iltimos, keyinroq urinib ko'ring"
        setServerError("Server ma'lumotlar bazasiga ulanishda muammo yuz berdi")
      } else if (!error.response) {
        errorMessage = "Internet aloqasi yo'q yoki server javob bermayapti"
        setServerError("Server bilan aloqa yo'q. Internet aloqangizni tekshiring")
      } else {
        const backendError = error.response?.data?.message || error.response?.data?.error
        if (backendError) {
          errorMessage = backendError
        }
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
            <CardTitle className="text-2xl">Xush kelibsiz</CardTitle>
            <CardDescription>Hisobingizga kiring</CardDescription>
          </CardHeader>

          {serverError && (
            <div className="mx-6 mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-md flex items-start">
              <AlertTriangle className="h-5 w-5 text-destructive mr-2 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <p className="text-sm font-medium text-destructive">{serverError}</p>
                <Button size="sm" variant="outline" onClick={handleUseDemoMode}>
                  Demo rejimda davom etish
                </Button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
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
                <Label htmlFor="password">Parol</Label>
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
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>

              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Yoki</span>
                </div>
              </div>

              <Button type="button" variant="outline" className="w-full" onClick={handleUseDemoMode}>
                Demo rejimda davom etish
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  )
}
