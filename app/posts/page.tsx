"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Loading } from "@/components/layout/loading"
import { BlogCard } from "@/components/blog/blog-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api"
import { mockArticles } from "@/lib/mock-data"
import { Search, Filter, ChevronLeft, ChevronRight, AlertTriangle, RefreshCw, Grid3X3, List } from "lucide-react"

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

const CATEGORIES = [
  "All",
  "Frontend",
  "Backend",
  "Mobile",
  "DevOps",
  "Database",
  "AI/ML",
  "Web3",
  "Tutorial",
  "News",
  "Opinion",
  "Umumiy",
]

const POSTS_PER_PAGE = 6

export default function PostsPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [useMockData, setUseMockData] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchArticles()
  }, [])

  useEffect(() => {
    filterAndSortArticles()
  }, [articles, searchTerm, selectedCategory, sortBy])

  useEffect(() => {
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, selectedCategory, sortBy])

  const fetchArticles = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get("/articles")
      let articlesData = response.data

      if (articlesData && typeof articlesData === "object" && articlesData.articles) {
        articlesData = articlesData.articles
      }

      if (Array.isArray(articlesData)) {
        setArticles(articlesData)
      } else {
        setArticles([])
      }
      setUseMockData(false)
    } catch (error: any) {
      console.error("Failed to fetch articles:", error)
      setError("Maqolalarni yuklashda xatolik yuz berdi")
      setArticles([])

      toast({
        title: "Xatolik!",
        description: "Server bilan aloqa yo'q. Demo ma'lumotlar yuklandi.",
        variant: "destructive",
      })

      // Automatically use mock data on error
      handleUseMockData()
    } finally {
      setLoading(false)
    }
  }

  const handleUseMockData = () => {
    setUseMockData(true)
    setError(null)
    if (Array.isArray(mockArticles)) {
      setArticles(mockArticles)
    } else {
      setArticles([])
    }
    toast({
      title: "Demo rejimi",
      description: "Demo ma'lumotlar yuklandi.",
    })
  }

  const filterAndSortArticles = () => {
    let filtered = [...articles]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.author.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((article) => article.category === selectedCategory)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "popular":
          return b.likes - a.likes
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    setFilteredArticles(filtered)
  }

  const totalPages = Math.ceil(filteredArticles.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const currentArticles = filteredArticles.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const renderPagination = () => {
    if (totalPages <= 1) return null

    const pages = []
    const maxVisiblePages = 5

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return (
      <div className="flex items-center justify-center space-x-2 mt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {startPage > 1 && (
          <>
            <Button variant="outline" size="sm" onClick={() => handlePageChange(1)}>
              1
            </Button>
            {startPage > 2 && <span className="px-2">...</span>}
          </>
        )}

        {pages.map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2">...</span>}
            <Button variant="outline" size="sm" onClick={() => handlePageChange(totalPages)}>
              {totalPages}
            </Button>
          </>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            All posts by IT Creators
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
All articles written by developers. Find the article you need by searching and filtering.          </p>
        </div>

        {useMockData && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-700 dark:text-yellow-400 p-4 rounded-lg mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Search and Filter</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by article, author, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "All" ? "All categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort Filter */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="popular">Most popular</SelectItem>
                  <SelectItem value="title">Alphabetically</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="flex-1"
                >
                  <Grid3X3 className="h-4 w-4 mr-2" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="flex-1"
                >
                  <List className="h-4 w-4 mr-2" />
                  List
                </Button>
              </div>

              {/* Results Info */}
              <div className="flex items-center justify-center">
                <Badge variant="secondary" className="text-sm">
                  {filteredArticles.length} results
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        {loading ? (
          <Loading />
        ) : error && !useMockData ? (
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Xatolik yuz berdi</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <div className="space-x-2">
              <Button onClick={fetchArticles}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
 
            </div>
          </div>
        ) : (
          <>
            {/* Articles Grid/List */}
            {currentArticles.length > 0 ? (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}
              >
                {currentArticles.map((article) => (
                  <BlogCard key={article._id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nothing found</h3>
                <p className="text-muted-foreground mb-4">
                  Change your search term or select a different category.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("All")
                  }}
                >
                  Cleaning filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {renderPagination()}

            {/* Stats */}
            {filteredArticles.length > 0 && (
              <div className="text-center mt-8 text-sm text-muted-foreground">
                {startIndex + 1}-{Math.min(endIndex, filteredArticles.length)} / {filteredArticles.length} articles
are displayed
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
