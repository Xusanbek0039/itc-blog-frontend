"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Navbar } from "@/components/layout/navbar"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api"
import { User, Lock, Save, Camera, Upload, X } from "lucide-react"

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    bio: "",
    avatar: "",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [loading, setLoading] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
        avatar: user.avatar || "",
      })
    }
  }, [user])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await api.put("/users/profile", profileData)
      updateUser(response.data.user || response.data)
      toast({
        title: "Muvaffaqiyat!",
        description: "Profil muvaffaqiyatli yangilandi!",
      })
    } catch (error: any) {
      toast({
        title: "Xatolik!",
        description: error.response?.data?.message || "Profilni yangilashda xatolik",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Xatolik!",
        description: "Yangi parollar mos kelmaydi",
        variant: "destructive",
      })
      return
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Xatolik!",
        description: "Yangi parol kamida 6 ta belgidan iborat bo'lishi kerak",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      await api.put("/users/password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      toast({
        title: "Muvaffaqiyat!",
        description: "Parol muvaffaqiyatli o'zgartirildi!",
      })
    } catch (error: any) {
      toast({
        title: "Xatolik!",
        description: error.response?.data?.message || "Parolni o'zgartirishda xatolik",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Xatolik!",
        description: "Fayl hajmi 5MB dan oshmasligi kerak",
        variant: "destructive",
      })
      return
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Xatolik!",
        description: "Faqat rasm fayllari qabul qilinadi",
        variant: "destructive",
      })
      return
    }

    setUploadingAvatar(true)

    try {
      // Convert to base64 for demo purposes
      const reader = new FileReader()
      reader.onload = async (e) => {
        const base64 = e.target?.result as string

        // For demo, we'll use a placeholder service
        const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=random&size=200`

        // Update profile data
        const updatedData = { ...profileData, avatar: avatarUrl }
        setProfileData(updatedData)

        // Update user in context
        updateUser({ avatar: avatarUrl })

        toast({
          title: "Muvaffaqiyat!",
          description: "Avatar muvaffaqiyatli yangilandi!",
        })

        setUploadingAvatar(false)
      }

      reader.readAsDataURL(file)
    } catch (error) {
      toast({
        title: "Xatolik!",
        description: "Avatar yuklashda xatolik yuz berdi",
        variant: "destructive",
      })
      setUploadingAvatar(false)
    }
  }

  const handleAvatarUrlUpdate = () => {
    if (profileData.avatar) {
      updateUser({ avatar: profileData.avatar })
      toast({
        title: "Muvaffaqiyat!",
        description: "Avatar URL yangilandi!",
      })
    }
  }

  const removeAvatar = () => {
    setProfileData((prev) => ({ ...prev, avatar: "" }))
    updateUser({ avatar: "" })
    toast({
      title: "Avatar o'chirildi",
      description: "Avatar muvaffaqiyatli o'chirildi",
    })
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Profil sozlamalari</h1>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Profil</span>
                </TabsTrigger>
                <TabsTrigger value="password" className="flex items-center space-x-2">
                  <Lock className="h-4 w-4" />
                  <span>Parol</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profil ma'lumotlari</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                      {/* Avatar Section */}
                      <div className="flex flex-col items-center space-y-4">
                        <div className="relative">
                          <Avatar className="h-24 w-24">
                            <AvatarImage src={profileData.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                              {user?.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>

                          {profileData.avatar && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                              onClick={removeAvatar}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadingAvatar}
                          >
                            {uploadingAvatar ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
                                Yuklanmoqda...
                              </>
                            ) : (
                              <>
                                <Camera className="h-4 w-4 mr-2" />
                                Rasm yuklash
                              </>
                            )}
                          </Button>

                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarUpload}
                            className="hidden"
                          />
                        </div>

                        <p className="text-xs text-muted-foreground text-center">
                          JPG, PNG yoki GIF. Maksimal hajm 5MB.
                        </p>
                      </div>

                      {/* Avatar URL Input */}
                      <div className="space-y-2">
                        <Label htmlFor="avatar">Avatar URL (ixtiyoriy)</Label>
                        <div className="flex space-x-2">
                          <Input
                            id="avatar"
                            type="url"
                            placeholder="https://example.com/avatar.jpg"
                            value={profileData.avatar}
                            onChange={(e) => setProfileData((prev) => ({ ...prev, avatar: e.target.value }))}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleAvatarUrlUpdate}
                            disabled={!profileData.avatar}
                          >
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="name">To'liq ism</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          placeholder="O'zingiz haqingizda..."
                          value={profileData.bio}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                          rows={4}
                        />
                      </div>

                      <Button type="submit" disabled={loading} className="w-full">
                        <Save className="h-4 w-4 mr-2" />
                        {loading ? "Saqlanmoqda..." : "O'zgarishlarni saqlash"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="password">
                <Card>
                  <CardHeader>
                    <CardTitle>Parolni o'zgartirish</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Joriy parol</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Yangi parol</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
                          required
                          minLength={6}
                        />
                        <p className="text-xs text-muted-foreground">Kamida 6 ta belgi bo'lishi kerak</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Yangi parolni tasdiqlang</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                          required
                          minLength={6}
                        />
                      </div>

                      <Button type="submit" disabled={loading} className="w-full">
                        <Lock className="h-4 w-4 mr-2" />
                        {loading ? "O'zgartirilmoqda..." : "Parolni o'zgartirish"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
