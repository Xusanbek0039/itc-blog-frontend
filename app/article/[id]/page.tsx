"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Navbar } from "@/components/layout/navbar"
import { Loading } from "@/components/layout/loading"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api"
import { Heart, MessageCircle, Calendar, User, Edit, Trash2, Send, AlertTriangle } from "lucide-react"
import { mockArticles, mockComments } from "@/lib/mock-data"

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
  commentsCount?: number
}

interface Comment {
  _id: string
  content: string
  author: {
    name: string
    _id: string
  }
  createdAt: string
}

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()

  const [article, setArticle] = useState<Article | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(true)
  const [submittingComment, setSubmittingComment] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [useMockData, setUseMockData] = useState(false)

  useEffect(() => {
    if (params.id) {
      // Agar mock article ID bo'lsa
      if (params.id.toString().startsWith("mock-")) {
        const mockArticle = mockArticles.find((a) => a._id === params.id)
        if (mockArticle) {
          setArticle(mockArticle)
          setComments(mockComments)
          setUseMockData(true)
          setLoading(false)
          return
        }
      }

      fetchArticle()
      fetchComments()
    }
  }, [params.id])

  const fetchArticle = async () => {
    try {
      const response = await api.get(`/articles/${params.id}`)
      setArticle(response.data)
      setError(null)
    } catch (error: any) {
      console.error("Failed to fetch article:", error)

      // Agar server xatoligi bo'lsa, mock data ko'rsatish taklif qilinadi
      if (error.response?.status === 500) {
        setError("Server xatoligi: Ma'lumotlar bazasiga ulanishda muammo")
        toast({
          title: "Server xatoligi",
          description: "Demo rejimga o'tish uchun 'Demo ko'rish' tugmasini bosing",
          variant: "destructive",
        })
      } else {
        setError("Maqola topilmadi")
        router.push("/")
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchComments = async () => {
    try {
      const response = await api.get(`/articles/${params.id}/comments`)

      // Handle the response structure properly - backend returns {comments: [...]}
      let commentsData = response.data

      // If response has a comments property, extract it
      if (commentsData && typeof commentsData === "object" && commentsData.comments) {
        commentsData = commentsData.comments
      }

      // Ensure commentsData is an array
      if (Array.isArray(commentsData)) {
        setComments(commentsData)
      } else {
        console.error("Comments response is not an array:", commentsData)
        setComments([]) // Fallback to empty array
      }
    } catch (error: any) {
      console.error("Failed to fetch comments:", error)
      setComments([]) // Ensure comments is always an array on error
    }
  }

  const handleLike = async () => {
    if (!user || !article) return

    try {
      // Demo rejimda like qilish
      if (useMockData) {
        setArticle((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null))
        toast({
          title: "Demo rejim",
          description: "Demo rejimda like qo'shildi",
        })
        return
      }

      const isLiked = false // Bu yerda backend'dan like status olish kerak

      if (isLiked) {
        await api.delete(`/articles/${article._id}/like`)
        setArticle((prev) =>
          prev
            ? {
                ...prev,
                likes: prev.likes - 1,
              }
            : null,
        )
      } else {
        await api.post(`/articles/${article._id}/like`)
        setArticle((prev) =>
          prev
            ? {
                ...prev,
                likes: prev.likes + 1,
              }
            : null,
        )
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update like",
        variant: "destructive",
      })
    }
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newComment.trim()) return

    setSubmittingComment(true)
    try {
      // Demo rejimda comment qo'shish
      if (useMockData) {
        const newMockComment = {
          _id: `mock-comment-${Date.now()}`,
          content: newComment,
          author: {
            name: user.name,
            _id: user.id,
          },
          createdAt: new Date().toISOString(),
        }

        // Ensure comments is an array before spreading
        setComments((prev) => (Array.isArray(prev) ? [newMockComment, ...prev] : [newMockComment]))
        setNewComment("")
        toast({
          title: "Demo rejim",
          description: "Demo rejimda comment qo'shildi",
        })
        return
      }

      const response = await api.post(`/articles/${params.id}/comments`, {
        content: newComment,
      })

      // Handle the response - it might be the comment object directly or wrapped
      let newComment_data = response.data
      if (newComment_data && typeof newComment_data === "object" && newComment_data.comment) {
        newComment_data = newComment_data.comment
      }

      // Ensure comments is an array before adding new comment
      setComments((prev) => (Array.isArray(prev) ? [newComment_data, ...prev] : [newComment_data]))
      setNewComment("")

      // Refresh comments to get the latest data
      fetchComments()

      toast({
        title: "Success",
        description: "Comment added successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      })
    } finally {
      setSubmittingComment(false)
    }
  }

  const handleUseMockData = () => {
    // Mock article tanlash
    const mockArticle = mockArticles[0]
    setArticle(mockArticle)
    setComments(mockComments)
    setUseMockData(true)
    setError(null)
    toast({
      title: "Demo rejim",
      description: "Demo ma'lumotlar yuklandi. Bu ma'lumotlar haqiqiy emas.",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <Loading />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex justify-center">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h1 className="text-2xl font-bold">Server xatoligi</h1>
              <p className="text-muted-foreground">{error}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={() => router.push("/")} variant="outline" className="w-full">
                Bosh sahifaga qaytish
              </Button>
              <Button onClick={handleUseMockData} className="w-full">
                Demo ko'rish
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold">Maqola topilmadi</h1>
        </div>
      </div>
    )
  }

  const isAuthor = user && article.author._id === user.id

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {useMockData && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-700 dark:text-yellow-400 p-3 rounded-lg mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <span>Demo rejim - namunali ma'lumotlar ko'rsatilmoqda</span>
            </div>
            <Button size="sm" variant="outline" onClick={() => router.push("/")}>
              Bosh sahifaga qaytish
            </Button>
          </div>
        )}

        <article className="max-w-4xl mx-auto">
          {article.image && (
            <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden">
              <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
            </div>
          )}

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary">{article.category}</Badge>
              {isAuthor && !useMockData && (
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => router.push(`/edit/${article._id}`)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>

            <div className="flex items-center justify-between text-muted-foreground mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {article.author.name}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(article.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={handleLike} disabled={!user}>
                  <Heart className="h-4 w-4 mr-1" />
                  {article.likes}
                </Button>

                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {Array.isArray(comments) ? comments.length : 0}
                </div>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none mb-12 dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, "<br>") }} />
          </div>

          {/* Comments Section */}
          <section id="comments" className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-6">Comments ({Array.isArray(comments) ? comments.length : 0})</h2>

            {user && (
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmitComment}>
                    <Textarea
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={3}
                      className="mb-4"
                    />
                    <Button type="submit" disabled={submittingComment || !newComment.trim()}>
                      <Send className="h-4 w-4 mr-2" />
                      {submittingComment ? "Posting..." : "Post Comment"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {Array.isArray(comments) &&
                comments.map((comment) => (
                  <Card key={comment._id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span className="font-semibold">{comment.author.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p>{comment.content}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>

            {(!Array.isArray(comments) || comments.length === 0) && (
              <p className="text-center text-muted-foreground py-8">No comments yet. Be the first to comment!</p>
            )}
          </section>
        </article>
      </main>
    </div>
  )
}
