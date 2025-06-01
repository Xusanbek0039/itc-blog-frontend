"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Clock, RefreshCw } from "lucide-react"

interface ServerStatus {
  status: "online" | "offline" | "checking"
  message: string
  lastChecked: Date | null
}

export function ServerStatus() {
  const [serverStatus, setServerStatus] = useState<ServerStatus>({
    status: "checking",
    message: "Tekshirilmoqda...",
    lastChecked: null,
  })

  const checkServerStatus = async () => {
    setServerStatus((prev) => ({ ...prev, status: "checking", message: "Tekshirilmoqda..." }))

    try {
      const response = await fetch("https://itc-blog-api.onrender.com/api/health", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        setServerStatus({
          status: "online",
          message: `Server ishlayapti - ${data.message || "OK"}`,
          lastChecked: new Date(),
        })
      } else {
        throw new Error(`HTTP ${response.status}`)
      }
    } catch (error) {
      console.error("Server status check failed:", error)
      setServerStatus({
        status: "offline",
        message: "Server bilan aloqa yo'q",
        lastChecked: new Date(),
      })
    }
  }

  useEffect(() => {
    checkServerStatus()

    // Har 30 soniyada tekshirish
    const interval = setInterval(checkServerStatus, 30000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = () => {
    switch (serverStatus.status) {
      case "online":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "offline":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "checking":
        return <Clock className="h-4 w-4 text-yellow-500 animate-pulse" />
    }
  }

  const getStatusBadge = () => {
    switch (serverStatus.status) {
      case "online":
        return <Badge className="bg-green-500">Online</Badge>
      case "offline":
        return <Badge variant="destructive">Offline</Badge>
      case "checking":
        return <Badge variant="secondary">Tekshirilmoqda</Badge>
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center space-x-2">
            {getStatusIcon()}
            <span>Server holati</span>
          </span>
          {getStatusBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{serverStatus.message}</p>

        {serverStatus.lastChecked && (
          <p className="text-xs text-muted-foreground">
            Oxirgi tekshiruv: {serverStatus.lastChecked.toLocaleTimeString()}
          </p>
        )}

        <Button onClick={checkServerStatus} variant="outline" size="sm" className="w-full">
          <RefreshCw className="h-3 w-3 mr-2" />
          Qayta tekshirish
        </Button>
      </CardContent>
    </Card>
  )
}
