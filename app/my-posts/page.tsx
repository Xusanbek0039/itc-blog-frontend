"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Loading } from "@/components/layout/loading"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api"
import { PlusCircle, Edit, Trash2, Calendar, Heart, MessageCircle } from "lucide-react"

interface Article {
  _id: string
  title: string
  content: string
  image?: string
  category: string
  createdAt: string
  likes: string[]
  likesCount: number
}

export default function MyPostsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMyArticles()
  }, [])

  const fetchMyArticles = async () => {
    try {
      const response = await api.get("/articles")

      // Backend javobini to'g'ri formatda olish
      let articlesData = response.data

      // Agar javob object bo'lib, articles property'si bo'lsa
      if (articlesData && typeof articlesData === "object" && articlesData.articles) {
        articlesData = articlesData.articles
      }

      // Array ekanligini tekshirish va foydalanuvchi maqolalarini filtrlash
      if (Array.isArray(articlesData)) {
        const myArticles = articlesData.filter((article: any) => article.author._id === user?.id)
        setArticles(myArticles)
      } else {
        console.error("API response is not an array:", articlesData)
        setArticles([])
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch your articles",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this article?")) {
      try {
        await api.delete(`/articles/${id}`)
        setArticles((prev) => prev.filter((article) => article._id !== id))
        toast({
          title: "Success",
          description: "Article deleted successfully!",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete article",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">My Articles</h1>
            <Button asChild>
              <Link href="/create">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create New Article
              </Link>
            </Button>
          </div>

          {loading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Card key={article._id} className="overflow-hidden">
                  {article.image && (
                    <div className="relative h-48 bg-muted">
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{article.category}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(article.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold line-clamp-2">
                      <Link href={`/article/${article._id}`} className="hover:text-primary">
                        {article.title}
                      </Link>
                    </h3>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3">
                      {article.content.replace(/<[^>]*>/g, "").substring(0, 150)}...
                    </p>
                  </CardContent>

                  <CardFooter className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        {article.likesCount}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Comments
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/edit/${article._id}`}>
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Link>
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(article._id)}>
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {!loading && articles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">
                You haven't written any articles yet. Start sharing your knowledge!
              </p>
              <Button asChild>
                <Link href="/create">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Write Your First Article
                </Link>
              </Button>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  )
}
