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
      newErrors.name = "Ism kiritish majburiy"
    } else if (name.trim().length < 2) {
      newErrors.name = "Ism kamida 2 ta belgidan iborat bo'lishi kerak"
    }

    if (!email.trim()) {
      newErrors.email = "Email kiritish majburiy"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email formati noto'g'ri"
    }

    if (!password) {
      newErrors.password = "Parol kiritish majburiy"
    } else if (password.length < 6) {
      newErrors.password = "Parol kamida 6 ta belgidan iborat bo'lishi kerak"
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Parollar mos kelmaydi"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)

    try {
      await register(name, email, password) // 'name' yuboramiz
      toast({
        title: "Muvaffaqiyat!",
        description: "Hisob muvaffaqiyatli yaratildi! Xush kelibsiz!",
      })
      router.push("/")
    } catch (error: any) {
      console.error("Registration error:", error)

      let errorMessage = "Ro'yxatdan o'tishda xatolik yuz berdi"

      if (error.response?.status === 400) {
        const backendError = error.response?.data?.message || error.response?.data?.error
        console.log("Backend error message:", backendError)

        if (backendError) {
          if (typeof backendError === "string") {
            if (backendError.toLowerCase().includes("email")) {
              errorMessage = "Bu email allaqachon ro'yxatdan o'tgan"
            } else if (backendError.toLowerCase().includes("mavjud")) {
              errorMessage = "Foydalanuvchi allaqachon mavjud"
            } else if (
              backendError.toLowerCase().includes("validation") ||
              backendError.toLowerCase().includes("required") ||
              backendError.toLowerCase().includes("to'ldirilishi")
            ) {
              errorMessage = "Barcha maydonlarni to'ldiring"
            } else {
              errorMessage = backendError
            }
          } else {
            errorMessage = "Ma'lumotlar noto'g'ri kiritilgan"
          }
        }
      } else if (error.response?.status === 422) {
        errorMessage = "Ma'lumotlar formati noto'g'ri"
      } else if (error.response?.status === 500) {
        errorMessage = "Server xatoligi. Iltimos, keyinroq urinib ko'ring"
      } else if (!error.response) {
        errorMessage = "Internet aloqasi yo'q. Iltimos, internetni tekshiring"
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
            <CardTitle className="text-2xl">Jamiyatga qo'shiling</CardTitle>
            <CardDescription>Dasturchi hisobingizni yarating</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">To'liq ism</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ism Familiya"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={errors.name ? "border-red-500" : ""}
                  required
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Parolni tasdiqlang</Label>
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
                {loading ? "Hisob yaratilmoqda..." : "Hisob yaratish"}
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                Hisobingiz bormi?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Kirish
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  )
}
