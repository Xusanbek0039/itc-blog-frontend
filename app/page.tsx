"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Navbar } from "@/components/layout/navbar"
import { Loading } from "@/components/layout/loading"
import { BlogCard } from "@/components/blog/blog-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { AlertTriangle, RefreshCw, Database, Server } from "lucide-react"
import { mockArticles } from "@/lib/mock-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Article {
  _id: string
  title: string
  content: string
  image?: string
  author: {
    name: string
    _id: string
  }
  category: string
  createdAt: string
  likes: number
  commentsCount: number
}

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [useMockData, setUseMockData] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("Fetching articles...")
      const response = await api.get("/articles")
      console.log("Articles response:", response.data)

      // Backend javobini to'g'ri formatda olish va array ekanligini tekshirish
      let articlesData = response.data

      // Agar javob object bo'lib, articles property'si bo'lsa
      if (articlesData && typeof articlesData === "object" && articlesData.articles) {
        articlesData = articlesData.articles
      }

      // Array ekanligini tekshirish va xavfsiz o'rnatish
      if (Array.isArray(articlesData)) {
        setArticles(articlesData)
        console.log("Articles loaded successfully:", articlesData.length, "articles")
      } else {
        console.error("API response is not an array:", articlesData)
        // Xavfsiz fallback - bo'sh array
        setArticles([])

        // Agar bo'sh object bo'lsa, xatolik emas, shunchaki bo'sh ro'yxat
        if (articlesData && Object.keys(articlesData).length === 0) {
          console.log("Empty response, no articles found")
        }
      }
      setUseMockData(false)
    } catch (error: any) {
      console.error("Failed to fetch articles:", error)

      let errorMessage = "Maqolalarni yuklashda xatolik yuz berdi"

      if (error.response?.status === 500) {
        if (error.response.data?.message?.includes("Ma'lumotlar bazasiga ulanish")) {
          errorMessage = "Server ma'lumotlar bazasiga ulanolmayapti. Iltimos, keyinroq urinib ko'ring."
        } else {
          errorMessage = "Server xatoligi yuz berdi"
        }
      } else if (error.response?.status === 404) {
        errorMessage = "API endpoint topilmadi"
      } else if (!error.response) {
        errorMessage = "Internet aloqasi yo'q yoki server ishlamayapti"
      } else {
        errorMessage = error.response?.data?.message || "Noma'lum xatolik"
      }

      setError(errorMessage)
      // Xavfsiz fallback - bo'sh array
      setArticles([])

      // Toast xabarini faqat birinchi urinishda ko'rsatish
      if (retryCount === 0) {
        toast({
          title: "Xatolik!",
          description: errorMessage,
          variant: "destructive",
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1)
    fetchArticles()
  }

  const handleUseMockData = () => {
    setUseMockData(true)
    setError(null)
    // Mock articles array ekanligini tekshirish
    if (Array.isArray(mockArticles)) {
      setArticles(mockArticles)
    } else {
      console.error("Mock articles is not an array!")
      setArticles([])
    }
    toast({
      title: "Demo rejimi",
      description: "Demo ma'lumotlar yuklandi. Bu ma'lumotlar haqiqiy emas.",
    })
  }

  const testServerConnection = async () => {
    try {
      setLoading(true)
      console.log("Testing server connection...")

      // Avval asosiy endpoint'ni test qilamiz
      const healthResponse = await fetch("https://itc-blog-api.onrender.com/")
      const healthData = await healthResponse.json()

      console.log("Server health check:", healthData)

      if (healthResponse.ok) {
        toast({
          title: "Server aloqasi",
          description: "Server ishlayapti, maqolalarni qayta yuklash...",
        })
        fetchArticles()
      } else {
        throw new Error("Server javob bermayapti")
      }
    } catch (error) {
      console.error("Server connection test failed:", error)
      toast({
        title: "Server aloqasi",
        description: "Server bilan aloqa o'rnatilmadi",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const renderContent = () => {
    if (loading) {
      return <Loading />
    }

    if (error && !useMockData) {
      return (
        <div className="flex justify-center">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <CardTitle>Server xatoligi</CardTitle>
              <CardDescription>Server ma'lumotlar bazasiga ulanishda muammo yuz berdi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg border border-muted-foreground/20">
                <h3 className="font-medium flex items-center mb-2">
                  <Database className="h-4 w-4 mr-2" />
                  Xatolik tafsilotlari:
                </h3>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>

              <Tabs defaultValue="retry" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="retry">Qayta urinish</TabsTrigger>
                  <TabsTrigger value="demo">Demo rejim</TabsTrigger>
                </TabsList>
                <TabsContent value="retry" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Button onClick={handleRetry} className="w-full">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Qayta urinish
                    </Button>

                    <Button onClick={testServerConnection} variant="outline" className="w-full">
                      <Server className="h-4 w-4 mr-2" />
                      Server holatini tekshirish
                    </Button>
                  </div>

                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>Agar muammo davom etsa:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Internet aloqangizni tekshiring</li>
                      <li>Bir necha daqiqa kutib, qayta urinib ko'ring</li>
                      <li>Server ishga tushishi uchun vaqt kerak bo'lishi mumkin</li>
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="demo" className="space-y-4 pt-4">
                  <p className="text-sm text-muted-foreground">
                    Demo rejimda saytni ko'rish uchun namunali ma'lumotlardan foydalanishingiz mumkin. Bu ma'lumotlar
                    haqiqiy emas.
                  </p>
                  <Button onClick={handleUseMockData} className="w-full">
                    Demo ma'lumotlarni yuklash
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )
    }

    // Xavfsiz array yaratish va tekshirish
    const displayArticles = useMockData
      ? Array.isArray(mockArticles)
        ? mockArticles
        : []
      : Array.isArray(articles)
        ? articles
        : []

    // Array ekanligini qayta tekshirish
    if (!Array.isArray(displayArticles)) {
      console.error("displayArticles is not an array:", displayArticles)
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">Ma'lumotlarni yuklashda xatolik yuz berdi.</p>
          <Button onClick={handleUseMockData} className="mt-4">
            Demo ma'lumotlarni yuklash
          </Button>
        </div>
      )
    }

    return (
      <>
        {useMockData && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-700 dark:text-yellow-400 p-3 rounded-lg mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <span>Demo rejim - namunali ma'lumotlar ko'rsatilmoqda</span>
            </div>
            <Button size="sm" variant="outline" onClick={handleRetry}>
              <RefreshCw className="h-3 w-3 mr-1" />
              Haqiqiy ma'lumotlarni yuklash
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayArticles.map((article) => (
            <BlogCard key={article._id} article={article} />
          ))}
        </div>

        {displayArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">There are no articles yet. Be the first to write an article!</p>
          </div>
        )}
      </>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Welcome to ITC Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
The Developer Community is a platform for sharing knowledge and creating amazing projects.          </p>
        </div>

        {renderContent()}
      </main>
    </div>
  )
}
