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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api"
import { PlusCircle, X } from "lucide-react"

export default function CreatePortfolioPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    liveUrl: "",
    githubUrl: "",
    imageUrl: "",
  })
  const [technologies, setTechnologies] = useState<string[]>([])
  const [newTech, setNewTech] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const addTechnology = () => {
    if (newTech.trim() && !technologies.includes(newTech.trim())) {
      setTechnologies((prev) => [...prev, newTech.trim()])
      setNewTech("")
    }
  }

  const removeTechnology = (tech: string) => {
    setTechnologies((prev) => prev.filter((t) => t !== tech))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await api.post("/portfolio", {
        ...formData,
        technologies,
        liveUrl: formData.liveUrl || undefined,
        githubUrl: formData.githubUrl || undefined,
        imageUrl: formData.imageUrl || undefined,
      })

      toast({
        title: "Success",
        description: "Portfolio item created successfully!",
      })

      router.push("/portfolio")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create portfolio item",
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
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PlusCircle className="h-6 w-6" />
                <span>Add Portfolio Project</span>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    placeholder="My Awesome Project"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project..."
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Technologies Used</Label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add technology (e.g., React, Node.js)"
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
                    />
                    <Button type="button" onClick={addTechnology}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="flex items-center space-x-1">
                        <span>{tech}</span>
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeTechnology(tech)} />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="liveUrl">Live URL (optional)</Label>
                    <Input
                      id="liveUrl"
                      type="url"
                      placeholder="https://myproject.com"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData((prev) => ({ ...prev, liveUrl: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="githubUrl">GitHub URL (optional)</Label>
                    <Input
                      id="githubUrl"
                      type="url"
                      placeholder="https://github.com/user/repo"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData((prev) => ({ ...prev, githubUrl: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Project Image URL (optional)</Label>
                  <Input
                    id="imageUrl"
                    type="url"
                    placeholder="https://example.com/project-screenshot.jpg"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))}
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Project"}
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
