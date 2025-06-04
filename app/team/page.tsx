"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Youtube,
  MessageCircle,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Users,
  Code,
  Star,
  ArrowRight,
  Sparkles,
  Award,
} from "lucide-react"

export default function TeamPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const stats = [
    { icon: Users, label: "Team members", value: "15+" },
    { icon: Code, label: "Projects", value: "50+" },
    { icon: Star, label: "Customers", value: "100+" },
    { icon: Award, label: "Experience", value: "5+ yil" },
  ]

  const socialChannels = [
    {
      id: "telegram",
      title: "Telegram Chanell",
      description: "IT news, useful tips and motivational posts. New information every day!",
      icon: MessageCircle,
      color: "from-blue-500 to-cyan-500",
      buttonText: "Subscribe",
      buttonColor: "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600",
      link: "https://t.me/it_creative_news",
      features: [
      "📱 Daily IT News",
      "💡 Useful Tips",
      "🚀 Motivational Content",
      "👥 Active Community",
      ],
    },
    {
      id: "youtube",
      title: "Our YouTube Channel",
      description: "Video tutorials, tech reviews, and live streams. For professional development!",
      icon: Youtube,
      color: "from-red-500 to-pink-500",
      buttonText: "Channel view",
      buttonColor: "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600",
      link: "https://youtube.com/@it_creative",
      features: ["🎥 Video lessons", "🔴 Live broadcasts", "📊 Technology reviews", "🎯 Practical projects"],
    },
  ]

  const teamMembers = [
    {
      name: "Husan Suyunov",
      role: "Lead Developer & Founder",
      bio: "Full-Stack developer with 5+ years of experience. Expert in React, Node.js, and modern technologies.",
      avatar: "https://ui-avatars.com/api/?name=Husan+Suyunov&background=6366f1&color=fff&size=200",
      skills: [
          "Python",
          "Django",
          "FastAPI",
          "PostgreSQL",
          "MongoDB",
          "REST API",
          "JWT",
          "HTML",
          "CSS",
          "JavaScript",
          "TypeScript",
          "React",
          "Next.js",
          "Tailwind CSS",
          "Git",
          "GitHub",
          "Docker",
          "Linux",
          "CI/CD",
          "Testing (Pytest, Jest)",
          "Node.js (asosiy tushunchalar)"
          ],
                social: {
        telegram: "https://t.me/husanbek_coder",
        youtube: "https://youtube.com/@it_creative",
        email: "itpark0071@gmail.com",
      },
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div
            className={`text-center transform transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-30 animate-pulse" />
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full">
                  <Sparkles className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              IT Creatives
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
We create a digital future through modern technologies and creative solutions            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`transform transition-all duration-700 delay-${index * 100} ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                >
                  <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <stat.icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Channels Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
Our Channels            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
Join us for the latest news and useful information in the IT industry            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {socialChannels.map((channel, index) => (
              <Card
                key={channel.id}
                className={`group relative overflow-hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 transform ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${channel.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <CardHeader className="relative">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${channel.color} shadow-lg`}>
                      <channel.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold">{channel.title}</CardTitle>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">{channel.description}</p>
                </CardHeader>

                <CardContent className="relative space-y-6">
                  <div className="grid grid-cols-2 gap-3">
                    {channel.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className={`w-full ${channel.buttonColor} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105`}
                  >
                    <a
                      href={channel.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2"
                    >
                      <span className="font-semibold">{channel.buttonText}</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-indigo-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
Our Team            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
Professional and experienced team of experts            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card
                key={member.name}
                className={`bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 transform ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                    <div className="relative group">
                      <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                      <Avatar className="relative h-32 w-32 border-4 border-white shadow-xl">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-3xl font-bold mb-2">{member.name}</h3>
                      <p className="text-xl text-blue-600 font-semibold mb-4">{member.role}</p>
                      <p className="text-muted-foreground text-lg leading-relaxed mb-6">{member.bio}</p>

                      <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                        {member.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex justify-center md:justify-start space-x-4">
                        <Button variant="outline" size="sm" asChild className="hover:bg-blue-50 hover:border-blue-300">
                          <a href={member.social.telegram} target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Telegram
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild className="hover:bg-red-50 hover:border-red-300">
                          <a href={member.social.youtube} target="_blank" rel="noopener noreferrer">
                            <Youtube className="h-4 w-4 mr-2" />
                            YouTube
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="hover:bg-green-50 hover:border-green-300"
                        >
                          <a href={`mailto:${member.social.email}`}>
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
Connection            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
Do you have any questions? Contact us!            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-indigo-900 border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Mail className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-muted-foreground">itpark0071@gmail.com</p>
                  </div>

                  <div className="text-center">
                    <div className="bg-gradient-to-r from-green-500 to-teal-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Phone className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">Phone</h3>
                    <p className="text-muted-foreground">+998 97 521 66 86</p>
                  </div>

                  <div className="text-center">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <MapPin className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">Address</h3>
                    <p className="text-muted-foreground">Djizzax, O'zbekiston</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center space-x-6 mb-8">
              <a
                href="https://t.me/it_creative_news"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 p-3 rounded-full transition-all duration-300 hover:scale-110"
              >
                <MessageCircle className="h-6 w-6" />
              </a>
              <a
                href="https://youtube.com/@it_creative"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-500 hover:bg-red-600 p-3 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Youtube className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com/husanbek_coder"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-500 hover:bg-pink-600 p-3 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>

            <div className="flex justify-center items-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-yellow-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                IT Creative
              </span>
            </div>

            <p className="text-slate-300 mb-4">
We create a digital future through modern technologies and creative solutions            </p>

            <div className="border-t border-slate-700 pt-8">
              <p className="text-slate-400">© 2024 IT Creative. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
