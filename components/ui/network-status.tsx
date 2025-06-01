"use client"

import { useEffect, useState } from "react"
import { Wifi, WifiOff } from "lucide-react"

export function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [showStatus, setShowStatus] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setShowStatus(true)
      setTimeout(() => setShowStatus(false), 3000)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowStatus(true)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (!showStatus) return null

  return (
    <div
      className={`fixed top-16 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-lg shadow-lg ${
        isOnline ? "bg-green-500 text-white" : "bg-red-500 text-white"
      } animate-in slide-in-from-top-full`}
    >
      <div className="flex items-center space-x-2">
        {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
        <span className="text-sm font-medium">{isOnline ? "Internet aloqasi tiklandi" : "Internet aloqasi yo'q"}</span>
      </div>
    </div>
  )
}
