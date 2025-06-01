"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Loading } from "@/components/layout/loading"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api"
import { PlusCircle, ExternalLink, Github, Edit, Trash2 } from "lucide-react"

interface PortfolioItem {
  _id: string
  title: string
  description: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  imageUrl?: string
  author: {
    username: string
    _id: string
  }
  createdAt: string
}

export default function PortfolioPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPortfolioItems()
  }, [])

  const fetchPortfolioItems = async () => {
    try {
      const response = await api.get("/portfolio")
      setPortfolioItems(response.data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch portfolio items",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this portfolio item?")) {
      try {
        await api.delete(`/portfolio/${id}`)
        setPortfolioItems((prev) => prev.filter((item) => item._id !== id))
        toast({
          title: "Success",
          description: "Portfolio item deleted successfully!",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete portfolio item",
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
            <h1 className="text-3xl font-bold">Portfolio</h1>
            <Button asChild>
              <Link href="/portfolio/create">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Project
              </Link>
            </Button>
          </div>

          {loading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.map((item) => (
                <Card key={item._id} className="overflow-hidden">
                  {item.imageUrl && (
                    <div className="relative h-48 bg-muted">
                      <img
                        src={item.imageUrl || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      {user && item.author._id === user.id && (
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/portfolio/edit/${item._id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(item._id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">by {item.author.username}</p>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{item.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      {item.liveUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={item.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Live
                          </a>
                        </Button>
                      )}
                      {item.githubUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={item.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-3 w-3 mr-1" />
                            Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && portfolioItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">
                No portfolio items found. Start showcasing your work!
              </p>
              <Button asChild>
                <Link href="/portfolio/create">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Your First Project
                </Link>
              </Button>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  )
}
