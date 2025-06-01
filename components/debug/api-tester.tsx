"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { api } from "@/lib/api"

export function ApiTester() {
  const [testData, setTestData] = useState({
    name: "Test User",
    email: "test@example.com",
    password: "123456",
  })
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testServerHealth = async () => {
    setLoading(true)
    try {
      console.log("Testing server health...")
      const response = await fetch("https://itc-blog-api.onrender.com/")
      const data = await response.json()
      setResult({
        success: true,
        type: "health",
        data: data,
        status: response.status,
      })
    } catch (error: any) {
      setResult({
        success: false,
        type: "health",
        error: error.message,
        details: error,
      })
    } finally {
      setLoading(false)
    }
  }

  const testApiHealth = async () => {
    setLoading(true)
    try {
      console.log("Testing API health...")
      const response = await fetch("https://itc-blog-api.onrender.com/api/health")
      const data = await response.json()
      setResult({
        success: true,
        type: "api-health",
        data: data,
        status: response.status,
      })
    } catch (error: any) {
      setResult({
        success: false,
        type: "api-health",
        error: error.message,
        details: error,
      })
    } finally {
      setLoading(false)
    }
  }

  const testArticlesEndpoint = async () => {
    setLoading(true)
    try {
      console.log("Testing articles endpoint...")
      const response = await api.get("/articles")

      // Backend javobini tekshirish
      let articlesData = response.data
      let count = 0

      if (articlesData && typeof articlesData === "object" && articlesData.articles) {
        articlesData = articlesData.articles
        count = articlesData.length || 0
      } else if (Array.isArray(articlesData)) {
        count = articlesData.length
      }

      setResult({
        success: true,
        type: "articles",
        data: response.data,
        count: count,
        format:
          articlesData && typeof articlesData === "object" && articlesData.articles
            ? "object_with_articles"
            : "direct_array",
      })
    } catch (error: any) {
      setResult({
        success: false,
        type: "articles",
        error: error.response?.data || error.message,
        status: error.response?.status,
      })
    } finally {
      setLoading(false)
    }
  }

  const testRegistration = async () => {
    setLoading(true)
    try {
      console.log("Testing registration with:", testData)
      const response = await api.post("/users/register", testData)
      setResult({
        success: true,
        type: "register",
        data: response.data,
      })
    } catch (error: any) {
      console.error("Registration test failed:", error)
      setResult({
        success: false,
        type: "register",
        error: error.response?.data || error.message,
        status: error.response?.status,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>API Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="Name"
            value={testData.name}
            onChange={(e) => setTestData((prev) => ({ ...prev, name: e.target.value }))}
          />
          <Input
            placeholder="Email"
            value={testData.email}
            onChange={(e) => setTestData((prev) => ({ ...prev, email: e.target.value }))}
          />
          <Input
            placeholder="Password"
            type="password"
            value={testData.password}
            onChange={(e) => setTestData((prev) => ({ ...prev, password: e.target.value }))}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={testServerHealth} disabled={loading} size="sm">
            Server Health
          </Button>
          <Button onClick={testApiHealth} disabled={loading} size="sm">
            API Health
          </Button>
          <Button onClick={testArticlesEndpoint} disabled={loading} size="sm">
            Articles
          </Button>
          <Button onClick={testRegistration} disabled={loading} size="sm">
            Register
          </Button>
        </div>

        {result && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant={result.success ? "default" : "destructive"}>{result.success ? "SUCCESS" : "ERROR"}</Badge>
              <Badge variant="outline">{result.type}</Badge>
              {result.status && <Badge variant="secondary">HTTP {result.status}</Badge>}
            </div>
            <div className="p-3 bg-muted rounded text-xs overflow-auto max-h-40">
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
