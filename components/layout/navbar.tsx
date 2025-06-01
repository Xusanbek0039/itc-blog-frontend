"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useTheme } from "@/contexts/theme-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import {
  Code,
  Home,
  PlusCircle,
  FileText,
  User,
  LogOut,
  LogIn,
  Moon,
  Sun,
  Terminal,
  Youtube,
  MessageCircle,
  Menu,
  X,
  Search,
  Sparkles,
  Users,
  Mail,
  Briefcase,
  Send,
} from "lucide-react"

export function Navbar() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  const navigationItems = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      show: true,
    },
    {
      href: "/posts",
      label: "Posts",
      icon: Search,
      show: true,
    },
    {
      href: "/works",
      label: "Work done",
      icon: Briefcase,
      show: true,
    },
    {
      href: "/team",
      label: "Team",
      icon: Users,
      show: true,
    },
    {
      href: "/contact",
      label: "Connection",
      icon: Mail,
      show: true,
    },
    {
      href: "/create",
      label: "Create",
      icon: PlusCircle,
      show: !!user,
    },
    // {
    //   href: "/my-posts",
    //   label: "My Posts",
    //   icon: FileText,
    //   show: !!user,
    // },
    // {
    //   href: "/portfolio",
    //   label: "Portfolio",
    //   icon: Code,
    //   show: !!user,
    // },
    {
      href: "/profile",
      label: "Profile",
      icon: User,
      show: !!user,
    },
  ]

  const socialLinks = [
    {
      href: "https://youtube.com/@it_creative",
      icon: Youtube,
      label: "YouTube",
      color: "text-red-500 hover:text-red-600",
    },
    {
      href: "https://t.me/it_creative_news",
      icon: Send,
      label: "Telegram",
      color: "text-blue-500 hover:text-blue-600",
    },
  ]

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <nav className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-xl font-bold group">
            <div className="relative">
              <Terminal className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
              <Sparkles className="h-3 w-3 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
              itc-blog.uz
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems
              .filter((item) => item.show)
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "hover:bg-accent hover:scale-105"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Social Links */}
            <div className="flex items-center space-x-1">
              {socialLinks.map((link) => (
                <Button
                  key={link.href}
                  variant="ghost"
                  size="icon"
                  asChild
                  className={`h-9 w-9 transition-all duration-200 hover:scale-110 ${link.color}`}
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                    <link.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 transition-all duration-200 hover:scale-110"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-yellow-500" />
              ) : (
                <Moon className="h-4 w-4 text-blue-600" />
              )}
            </Button>

            {/* User Actions */}
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden xl:flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="hover:bg-destructive hover:text-destructive-foreground"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button asChild variant="default" size="sm" className="shadow-md hover:shadow-lg transition-shadow">
                <Link href="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme Toggle for Mobile */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 transition-all duration-200 hover:scale-110"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-yellow-500" />
              ) : (
                <Moon className="h-4 w-4 text-blue-600" />
              )}
            </Button>

            {/* Mobile Menu Trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-accent">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[400px] p-0 overflow-hidden">
                <div className="flex flex-col h-full bg-gradient-to-b from-background to-muted/20 overflow-y-auto">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b bg-card/50 flex-shrink-0">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Terminal className="h-6 w-6 text-primary" />
                        <Sparkles className="h-2 w-2 text-yellow-500 absolute -top-0.5 -right-0.5 animate-pulse" />
                      </div>
                      <span className="font-bold text-lg bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        itc-blog.uz
                      </span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={closeMobileMenu} className="h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* User Info */}
                  {user && (
                    <div className="p-6 border-b bg-card/30 flex-shrink-0">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-lg">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Scrollable Navigation Content */}
                  <div className="flex-1 overflow-y-auto">
                    <div className="p-6">
                      <div className="space-y-2">
                        {navigationItems
                          .filter((item) => item.show)
                          .map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={closeMobileMenu}
                              className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-200 w-full ${
                                isActive(item.href)
                                  ? "bg-primary text-primary-foreground shadow-lg"
                                  : "hover:bg-accent hover:scale-105"
                              }`}
                            >
                              <item.icon className="h-5 w-5" />
                              <span className="font-medium text-base">{item.label}</span>
                            </Link>
                          ))}
                      </div>

                      {/* Social Links */}
                      <div className="mt-8 pt-6 border-t">
                        <p className="text-sm font-semibold text-muted-foreground mb-4 px-4">Social networks</p>
                        <div className="space-y-2">
                          {socialLinks.map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center space-x-4 px-4 py-3 rounded-xl hover:bg-accent transition-all duration-200 ${link.color}`}
                            >
                              <link.icon className="h-5 w-5" />
                              <span className="font-medium">{link.label}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="p-6 border-t bg-card/30 flex-shrink-0">
                    {user ? (
                      <Button
                        onClick={() => {
                          logout()
                          closeMobileMenu()
                        }}
                        variant="outline"
                        className="w-full hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    ) : (
                      <Button asChild variant="default" className="w-full shadow-md" onClick={closeMobileMenu}>
                        <Link href="/login">
                          <LogIn className="h-4 w-4 mr-2" />
                          Login
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
