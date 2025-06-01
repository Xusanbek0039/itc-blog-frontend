"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Youtube,
  Instagram,
  Globe,
  Users,
  Sparkles,
} from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Xabar yuborildi!",
        description: "Tez orada siz bilan bog'lanamiz. Rahmat!",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      toast({
        title: "Xatolik!",
        description: "Xabar yuborishda xatolik yuz berdi. Qayta urinib ko'ring.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "info@itcreative.uz",
      description: "Bizga email yuboring",
      color: "from-blue-500 to-cyan-500",
      link: "mailto:info@itcreative.uz",
    },
    {
      icon: Phone,
      title: "Telefon",
      value: "+998 90 123 45 67",
      description: "Bizga qo'ng'iroq qiling",
      color: "from-green-500 to-teal-500",
      link: "tel:+998901234567",
    },
    {
      icon: MapPin,
      title: "Manzil",
      value: "Toshkent, O'zbekiston",
      description: "Bizning ofisimiz",
      color: "from-purple-500 to-pink-500",
      link: "https://maps.google.com",
    },
    {
      icon: Clock,
      title: "Ish vaqti",
      value: "Dush-Juma: 9:00-18:00",
      description: "Bizning ish soatlari",
      color: "from-orange-500 to-red-500",
      link: null,
    },
  ]

  const socialLinks = [
    {
      icon: MessageCircle,
      name: "Telegram",
      url: "https://t.me/itcreative_uz",
      color: "bg-blue-500 hover:bg-blue-600",
      description: "Telegram kanalimiz",
    },
    {
      icon: Youtube,
      name: "YouTube",
      url: "https://youtube.com/@it_creative",
      color: "bg-red-500 hover:bg-red-600",
      description: "Video darslar",
    },
    {
      icon: Instagram,
      name: "Instagram",
      url: "https://instagram.com/itcreative_uz",
      color: "bg-pink-500 hover:bg-pink-600",
      description: "Rasmlar va yangiliklar",
    },
    {
      icon: Globe,
      name: "Website",
      url: "https://itcreative.uz",
      color: "bg-indigo-500 hover:bg-indigo-600",
      description: "Rasmiy saytimiz",
    },
  ]

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
                  <Mail className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Bog'lanish
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Savollaringiz bormi? Loyiha haqida gaplashmoqchimisiz? Biz bilan bog'laning!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card
                key={info.title}
                className="group relative overflow-hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <CardContent className="p-6 text-center relative">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${info.color} shadow-lg mb-4`}>
                    <info.icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold mb-2">{info.title}</h3>
                  <p className="text-lg font-semibold text-primary mb-1">{info.value}</p>
                  <p className="text-sm text-muted-foreground">{info.description}</p>

                  {info.link && (
                    <Button asChild variant="ghost" size="sm" className="mt-4 hover:bg-primary/10 hover:text-primary">
                      <a href={info.link} target="_blank" rel="noopener noreferrer">
                        Bog'lanish
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Social */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center space-x-2">
                  <Send className="h-6 w-6 text-primary" />
                  <span>Xabar Yuborish</span>
                </CardTitle>
                <p className="text-muted-foreground">Formani to'ldiring va biz tez orada siz bilan bog'lanamiz.</p>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ismingiz</Label>
                      <Input
                        id="name"
                        placeholder="Ismingizni kiriting"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Mavzu</Label>
                    <Input
                      id="subject"
                      placeholder="Xabar mavzusi"
                      value={formData.subject}
                      onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Xabar</Label>
                    <Textarea
                      id="message"
                      placeholder="Xabaringizni shu yerga yozing..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Yuborilmoqda...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Xabar Yuborish
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Social Links & Info */}
            <div className="space-y-8">
              {/* Social Media */}
              <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold flex items-center space-x-2">
                    <Users className="h-6 w-6 text-primary" />
                    <span>Ijtimoiy Tarmoqlar</span>
                  </CardTitle>
                  <p className="text-muted-foreground">Bizni ijtimoiy tarmoqlarda kuzatib boring!</p>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((social) => (
                      <Button
                        key={social.name}
                        asChild
                        variant="outline"
                        className="h-auto p-4 hover:scale-105 transition-all duration-300"
                      >
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center space-y-2"
                        >
                          <div className={`p-3 rounded-full ${social.color} transition-colors duration-300`}>
                            <social.icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="text-center">
                            <div className="font-semibold">{social.name}</div>
                            <div className="text-xs text-muted-foreground">{social.description}</div>
                          </div>
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Additional Info */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-indigo-900 border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <Sparkles className="h-8 w-8 text-yellow-500" />
                    <h3 className="text-2xl font-bold">Nima uchun biz?</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                      <div>
                        <h4 className="font-semibold">Tez javob</h4>
                        <p className="text-sm text-muted-foreground">24 soat ichida javob beramiz</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                      <div>
                        <h4 className="font-semibold">Professional yondashuv</h4>
                        <p className="text-sm text-muted-foreground">Har bir loyihaga individual yondashamiz</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
                      <div>
                        <h4 className="font-semibold">Zamonaviy texnologiyalar</h4>
                        <p className="text-sm text-muted-foreground">Eng so'nggi texnologiyalardan foydalanamiz</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Optional) */}
      <section className="py-16 bg-gradient-to-r from-slate-100 to-blue-100 dark:from-slate-800 dark:to-indigo-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bizning Joylashuvimiz
            </h2>
            <p className="text-lg text-muted-foreground">Toshkent shahrida joylashganmiz</p>
          </div>

          <Card className="max-w-4xl mx-auto bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-slate-700 dark:to-indigo-800 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Interaktiv Xarita</h3>
                  <p className="text-muted-foreground">Tez orada qo'shiladi</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
