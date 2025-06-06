"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Loading } from "@/components/layout/loading"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api"
import { ExternalLink, Github, Calendar, User, Code, Sparkles, AlertTriangle, RefreshCw } from "lucide-react"

interface PortfolioItem {
  _id: string
  title: string
  description: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  imageUrl?: string
  author: {
    name: string
    _id: string
  }
  createdAt: string
}

const mockWorks: PortfolioItem[] = [
  {
    _id: "mock-work-1",
    title: "Husanbek Portfolio ",
    description:
      "A portfolio website created using a modern 3D model. If you want, you can also watch it, and you can create a similar website for yourself using any UI design.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe", "Socket.io"],
    liveUrl: "https://husanbek-coder.uz",
    githubUrl: "https://github.com/xusanbek0039",
    imageUrl: "https://husanbek-coder.uz/_next/image?url=%2Fassets%2Fprojects-screenshots%2Fportfolio%2Flanding.png&w=384&q=75",
    author: {
      name: "Husan Suyunov",
      _id: "mock-user-1",
    },
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
  },
  {
    _id: "mock-work-2",
    title: "IT Center CRM API",
    description:
      "IT Center CRM API is a powerful and scalable backend system for IT training centers, aimed at automating the management of students, courses, payments, teachers and admins. Main Goal: Provide a RESTful API to manage the learning process and administrative work in IT training centers in one place..",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS","Python","Django DRF"],
    liveUrl: "https://itclms.uz",
    githubUrl: "https://github.com/xusanbek0039",
    imageUrl: "https://advantiss.com/wp-content/uploads/2020/11/crm-system-with-school-search-api-integration-career-guidance-service-platform_page-0001-scaled.jpg",
    author: {
      name: "Husan Suyunov",
      _id: "mock-user-1",
    },
    createdAt: new Date(Date.now() - 86400000 * 60).toISOString(),
  },
  {
    _id: "mock-work-3",
    title: "Goodever online shop",
    description:
      "Goodever Online Shop API — Powerful Backend for Modern E-commerce Goodever Online Shop API is a fully RESTful architecture, scalable and secure backend system for online stores. The project is designed for product management, order processing, user authentication and payment monitoring.",
    technologies: ["Vue.js", "Laravel", "MySQL", "Redis", "AWS S3","Figma UI","cPanel"],
    liveUrl: "https://goodever.uz",
    githubUrl: "https://github.com/xusanbek0039",
    imageUrl: "https://husanbek-coder.uz/_next/image?url=%2Fassets%2Fprojects-screenshots%2Fgoodever%2F1.png&w=384&q=75",
    author: {
      name: "Husan Suyunov",
      _id: "mock-user-1",
    },
    createdAt: new Date(Date.now() - 86400000 * 90).toISOString(),
  },
  {
    _id: "mock-work-4",
    title: "Mobile Banking App",
    description:
      "Xavfsiz mobil banking ilovasi. Biometric authentication, real-time transactions va advanced security features bilan.",
    technologies: ["React Native", "Node.js", "MongoDB", "JWT", "Biometric API"],
    liveUrl: "https://banking-demo.itcreative.uz",
    githubUrl: "https://github.com/itcreative/mobile-banking",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2340&auto=format&fit=crop",
    author: {
      name: "Husan Suyunov",
      _id: "mock-user-1",
    },
    createdAt: new Date(Date.now() - 86400000 * 120).toISOString(),
  },
]

export default function WorksPage() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [useMockData, setUseMockData] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchPortfolioItems()
  }, [])

  const fetchPortfolioItems = async () => {
    try {
      setLoading(true)
      setError(null)

      // Check if the portfolio endpoint is available in the API
      try {
        // First check available endpoints
        const healthResponse = await api.get("/health")
        const availableEndpoints = healthResponse.data?.availableEndpoints || []

        if (availableEndpoints.includes("GET /api/portfolio")) {
          // If portfolio endpoint exists, use it
          const response = await api.get("/portfolio")
          if (Array.isArray(response.data)) {
            setPortfolioItems(response.data)
            setUseMockData(false)
            return
          }
        }

        // If we reach here, either the endpoint doesn't exist or returned invalid data
        console.log("Portfolio endpoint not available, using mock data")
        handleUseMockData()
      } catch (error) {
        console.error("Failed to check API endpoints:", error)
        handleUseMockData()
      }
    } catch (error: any) {
      console.error("Failed to fetch portfolio items:", error)
      setError("Portfolio ma'lumotlarini yuklashda xatolik yuz berdi")
      handleUseMockData()
    } finally {
      setLoading(false)
    }
  }

  const handleUseMockData = () => {
    setUseMockData(true)
    setError(null)
    setPortfolioItems(mockWorks)
    toast({
      title: "Demo rejimi",
      description: "Demo loyihalar yuklandi.",
    })
  }

  const handleRetry = () => {
    fetchPortfolioItems()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-30 animate-pulse" />
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full">
                  <Code className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
Work Done            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
Projects and developments created by our team            </p>

            <div className="flex justify-center space-x-4">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="text-2xl font-bold text-blue-600">{portfolioItems.length}+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-sm text-muted-foreground">Success</div>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="text-2xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">


          </div>

          {useMockData && (
            <div>


            </div>
          )}

          {loading ? (
            <Loading />
          ) : error && !useMockData ? (
            <div className="text-center py-12">
              <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">An error occurred.</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <div className="space-x-2">
                <Button onClick={handleRetry}>
                  <RefreshCw className="h-4 w-4 mr-2" />
Retry                </Button>
              </div>
            </div>
          ) : (
            <>
              {portfolioItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {portfolioItems.map((item, index) => (
                    <Card
                      key={item._id}
                      className="group overflow-hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 transform"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {item.imageUrl && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={item.imageUrl || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute top-4 right-4">
                            <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
                          </div>
                        </div>
                      )}

                      <CardHeader>
                        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                          {item.title}
                        </CardTitle>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            {item.author.name}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(item.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {item.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex space-x-2 pt-4">
                          {item.liveUrl && (
                            <Button
                              variant="default"
                              size="sm"
                              asChild
                              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                            >
                              <a href={item.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-3 w-3 mr-1" />
View                              </a>
                            </Button>
                          )}
                          {item.githubUrl && (
                            <Button variant="outline" size="sm" asChild className="flex-1">
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
              ) : (
                <div className="text-center py-12">
                  <Code className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
                  <p className="text-muted-foreground mb-4">
New projects will be added soon. Follow us!                  </p>

                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-4">Do you have a project?</h2>
            <p className="text-xl mb-8 opacity-90">Contact us and bring your idea to life!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                <a href="/contact">Connection</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                <a href="/team">Meet the team</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
