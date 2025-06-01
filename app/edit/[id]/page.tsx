"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Loading } from "@/components/layout/loading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api"
import { Edit } from "lucide-react"

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

export default function EditPostPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Umumiy", // Default qiymat
    image: "",
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchArticle()
    }
  }, [params.id])

  const fetchArticle = async () => {
    try {
      const response = await api.get(`/articles/${params.id}`)
      const article = response.data
      setFormData({
        title: article.title,
        content: article.content,
        category: article.category || "Umumiy", // Fallback to default
        image: article.image || "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Article not found",
        variant: "destructive",
      })
      router.push("/my-posts")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Frontend validatsiya
    if (formData.title.trim().length < 5) {
      toast({
        title: "Xatolik!",
        description: "Sarlavha kamida 5 ta belgidan iborat bo'lishi kerak",
        variant: "destructive",
      })
      return
    }

    if (formData.title.trim().length > 200) {
      toast({
        title: "Xatolik!",
        description: "Sarlavha 200 ta belgidan oshmasligi kerak",
        variant: "destructive",
      })
      return
    }

    if (formData.content.trim().length < 50) {
      toast({
        title: "Xatolik!",
        description: "Maqola matni kamida 50 ta belgidan iborat bo'lishi kerak",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)

    try {
      const updateData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        category: formData.category || "Umumiy",
        language: "en", // MongoDB text search uchun qo'llab-quvvatlanadigan til
        ...(formData.image && formData.image.trim() && { image: formData.image.trim() }),
      }

      await api.put(`/articles/${params.id}`, updateData)

      toast({
        title: "Success",
        description: "Article updated successfully!",
      })

      router.push(`/article/${params.id}`)
    } catch (error: any) {
      let errorMessage = "Failed to update article"

      if (error.response?.status === 400) {
        const backendError = error.response?.data?.message
        if (backendError?.includes("enum value")) {
          errorMessage = `Selected category "${formData.category}" is not accepted. Using "Umumiy" instead.`
          // Avtomatik ravishda "Umumiy"ga o'zgartirish
          setFormData((prev) => ({ ...prev, category: "Umumiy" }))
        } else {
          errorMessage = backendError || "Invalid data provided"
        }
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <Navbar />
          <Loading />
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Edit className="h-6 w-6" />
                <span>Maqolani tahrirlash</span>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Maqola sarlavhasini kiriting..."
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    maxLength={200}
                    required
                  />
                  <p className="text-xs text-muted-foreground">{formData.title.length}/200 belgi</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategoriya</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
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
                    <p className="text-xs text-muted-foreground">
                      Agar joriy kategoriya ro'yxatda yo'q bo'lsa, "Umumiy" tanlanadi
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Rasm URL (ixtiyoriy)</Label>
                    <Input
                      id="image"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={formData.image}
                      onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Maqola matni</Label>
                  <Textarea
                    id="content"
                    placeholder="Maqola matnini shu yerga yozing..."
                    value={formData.content}
                    onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                    rows={15}
                    className="font-mono"
                    required
                  />
                  <p className="text-xs text-muted-foreground">{formData.content.length} belgi (kamida 50 ta kerak)</p>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Bekor qilish
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? "Saqlanmoqda..." : "O'zgarishlarni saqlash"}
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
