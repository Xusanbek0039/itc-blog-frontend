"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api"
import { PlusCircle, AlertTriangle } from "lucide-react"

// Backend Article modelidan olingan to'g'ri kategoriyalar
const VALID_CATEGORIES = [
  { value: "Frontend", label: "Frontend" },
  { value: "Backend", label: "Backend" },
  { value: "Mobile", label: "Mobile" },
  { value: "DevOps", label: "DevOps" },
  { value: "Database", label: "Database" },
  { value: "AI/ML", label: "AI/ML" },
  { value: "Web3", label: "Web3" },
  { value: "Tutorial", label: "Tutorial" },
  { value: "News", label: "News" },
  { value: "Opinion", label: "Opinion" },
  { value: "Umumiy", label: "Umumiy" },
]

export default function CreatePostPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("Umumiy") // Default qiymat
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({})
  const router = useRouter()
  const { toast } = useToast()

  // validateForm funksiyasini backend validatsiyasi bilan mos keltiramiz
  const validateForm = () => {
    const errors: { [key: string]: string } = {}

    // Title validation - backend: minlength: 5, maxlength: 200
    if (!title.trim()) {
      errors.title = "Sarlavha kiritish majburiy"
    } else if (title.trim().length < 5) {
      errors.title = "Sarlavha kamida 5 ta belgidan iborat bo'lishi kerak"
    } else if (title.trim().length > 200) {
      errors.title = "Sarlavha 200 ta belgidan oshmasligi kerak"
    }

    // Content validation - backend: minlength: 50
    if (!content.trim()) {
      errors.content = "Maqola matni kiritish majburiy"
    } else if (content.trim().length < 50) {
      errors.content = "Maqola matni kamida 50 ta belgidan iborat bo'lishi kerak"
    }

    // Category validation - backend: required, enum
    if (!category) {
      errors.category = "Kategoriya tanlash majburiy"
    }

    // URL validation
    if (image && !image.match(/^(http|https):\/\/[^ "]+$/)) {
      errors.image = "Rasm URL manzili noto'g'ri formatda"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Formani tekshirish
    if (!validateForm()) {
      toast({
        title: "Xatolik!",
        description: "Forma ma'lumotlarini to'g'ri to'ldiring",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Ma'lumotlarni tozalash va tayyorlash - backend format bo'yicha
      const articleData = {
        title: title.trim(),
        content: content.trim(),
        category: category || "Umumiy",
        language: "en", // MongoDB text search uchun qo'llab-quvvatlanadigan til
        ...(image && image.trim() && { image: image.trim() }),
      }

      // API so'rovini debug qilish
      console.log("Sending article data:", articleData)

      const response = await api.post("/articles", articleData)

      console.log("Create article response:", response.data)

      toast({
        title: "Muvaffaqiyat!",
        description: "Maqola muvaffaqiyatli yaratildi!",
      })

      router.push("/")
    } catch (error: any) {
      console.error("Create article error:", error)

      let errorMessage = "Maqola yaratishda xatolik yuz berdi"

      if (error.response?.status === 400) {
        // Backend validatsiya xatoliklarini ko'rsatish
        const backendError = error.response?.data?.message || error.response?.data?.error
        console.log("Backend validation error:", backendError)

        if (typeof backendError === "string") {
          if (backendError.includes("enum value") || backendError.includes("valid enum")) {
            errorMessage = `Tanlangan kategoriya "${category}" backend tomonidan qabul qilinmaydi. "Umumiy" kategoriyasini ishlatamiz.`

            // Avtomatik ravishda "Umumiy" kategoriyasiga o'tkazish
            setCategory("Umumiy")
            setValidationErrors({ category: "Kategoriya avtomatik 'Umumiy'ga o'zgartirildi" })
          } else if (backendError.includes("required")) {
            errorMessage = "Barcha majburiy maydonlarni to'ldiring"
          } else if (backendError.includes("validation")) {
            errorMessage = "Ma'lumotlar formati noto'g'ri"
          } else {
            errorMessage = backendError
          }
        } else {
          errorMessage = "Ma'lumotlar noto'g'ri kiritilgan. Barcha maydonlarni tekshiring"
        }
      } else if (error.response?.status === 401) {
        errorMessage = "Tizimga kirish talab qilinadi"
        router.push("/login")
      } else if (error.response?.status === 500) {
        errorMessage = "Server xatoligi. Iltimos, keyinroq urinib ko'ring"
      } else if (!error.response) {
        errorMessage = "Internet aloqasi yo'q"
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
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PlusCircle className="h-6 w-6" />
                <span>Yangi maqola yaratish</span>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className={validationErrors.title ? "text-destructive" : ""}>
                    Sarlavha {validationErrors.title && <span className="text-destructive">*</span>}
                  </Label>
                  <Input
                    id="title"
                    placeholder="Maqola sarlavhasini kiriting..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={validationErrors.title ? "border-destructive" : ""}
                    maxLength={200}
                  />
                  {validationErrors.title && <p className="text-sm text-destructive">{validationErrors.title}</p>}
                  <p className="text-xs text-muted-foreground">{title.length}/200 belgi</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category" className={validationErrors.category ? "text-destructive" : ""}>
                      Kategoriya
                    </Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className={validationErrors.category ? "border-destructive" : ""}>
                        <SelectValue placeholder="Kategoriya tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        {VALID_CATEGORIES.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {validationErrors.category && (
                      <p className="text-sm text-destructive">{validationErrors.category}</p>
                    )}
                    <p className="text-xs text-muted-foreground">Default: "Umumiy" kategoriyasi ishlatiladi</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image" className={validationErrors.image ? "text-destructive" : ""}>
                      Rasm URL (ixtiyoriy)
                    </Label>
                    <Input
                      id="image"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className={validationErrors.image ? "border-destructive" : ""}
                    />
                    {validationErrors.image && <p className="text-sm text-destructive">{validationErrors.image}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content" className={validationErrors.content ? "text-destructive" : ""}>
                    Maqola matni {validationErrors.content && <span className="text-destructive">*</span>}
                  </Label>
                  <Textarea
                    id="content"
                    placeholder="Maqola matnini shu yerga yozing..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={15}
                    className={`font-mono ${validationErrors.content ? "border-destructive" : ""}`}
                  />
                  {validationErrors.content && <p className="text-sm text-destructive">{validationErrors.content}</p>}
                  <p className="text-sm text-muted-foreground">{content.length} belgi (kamida 50 ta kerak)</p>
                  <p className="text-sm text-muted-foreground">
                    Markdown formatini ishlatishingiz mumkin. Masalan: **qalin matn**, *kursiv*, `kod`
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Backend validatsiya qoidalari:</p>
                      <ul className="list-disc list-inside space-y-1 mt-1 text-muted-foreground">
                        <li>Sarlavha: 5-200 belgi oralig'ida bo'lishi kerak</li>
                        <li>Maqola matni: kamida 50 ta belgi bo'lishi kerak</li>
                        <li>Kategoriya: majburiy maydon (11 ta variant)</li>
                        <li>Rasm URL: ixtiyoriy, lekin to'g'ri format bo'lishi kerak</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Bekor qilish
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Nashr qilinmoqda..." : "Maqolani nashr qilish"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  )
}
