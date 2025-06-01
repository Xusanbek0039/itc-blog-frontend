"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Calendar, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { api } from "@/lib/api"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface Article {
  _id: string
  title: string
  content: string
  image?: string
  author: {
    name: string // 'username' o'rniga 'name'
    _id: string
  }
  category: string
  createdAt: string
  likes: number
  commentsCount?: number
}

interface BlogCardProps {
  article: Article
}

export function BlogCard({ article }: BlogCardProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [likes, setLikes] = useState(article.likes || 0)
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to like articles",
        variant: "destructive",
      })
      return
    }

    try {
      if (isLiked) {
        await api.delete(`/articles/${article._id}/like`)
        setLikes((prev) => prev - 1)
        setIsLiked(false)
      } else {
        await api.post(`/articles/${article._id}/like`)
        setLikes((prev) => prev + 1)
        setIsLiked(true)
      }
    } catch (error) {
      // Demo rejimda like qilish
      if (article._id.startsWith("mock-")) {
        setIsLiked(!isLiked)
        setLikes((prev) => (isLiked ? prev - 1 : prev + 1))
        toast({
          title: "Demo rejim",
          description: "Demo rejimda like qo'shildi",
        })
        return
      }

      toast({
        title: "Error",
        description: "Failed to update like",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
      <Link href={`/article/${article._id}`}>
        {article.image && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}

        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="text-xs">
              {article.category}
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              {new Date(article.createdAt).toLocaleDateString()}
            </div>
          </div>
          <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
        </CardHeader>

        <CardContent className="pb-3">
          <p className="text-muted-foreground line-clamp-3 text-sm">
            {article.content.replace(/<[^>]*>/g, "").substring(0, 150)}...
          </p>
        </CardContent>
      </Link>

      <CardFooter className="flex items-center justify-between pt-3 border-t">
        <div className="flex items-center text-sm text-muted-foreground">
          <User className="h-3 w-3 mr-1" />
          <span className="truncate max-w-[120px]">{article.author.name}</span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`h-8 px-2 ${isLiked ? "text-red-500 hover:text-red-600" : "hover:text-red-500"} transition-colors`}
          >
            <Heart className={`h-4 w-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
            <span className="text-xs">{likes}</span>
          </Button>

          <Button variant="ghost" size="sm" asChild className="h-8 px-2 hover:text-blue-500 transition-colors">
            <Link href={`/article/${article._id}#comments`}>
              <MessageCircle className="h-4 w-4 mr-1" />
              <span className="text-xs">{article.commentsCount || 0}</span>
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
