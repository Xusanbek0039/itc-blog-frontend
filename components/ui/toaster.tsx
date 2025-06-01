"use client"

import { useToast } from "@/hooks/use-toast"
import { X, CheckCircle, AlertCircle, Info } from "lucide-react"
import { Button } from "./button"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  const getIcon = (variant: string) => {
    switch (variant) {
      case "destructive":
        return <AlertCircle className="h-4 w-4" />
      case "success":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded-lg shadow-lg border animate-in slide-in-from-right-full ${
            toast.variant === "destructive"
              ? "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200"
              : "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200"
          }`}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">{getIcon(toast.variant || "default")}</div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm">{toast.title}</h4>
              {toast.description && <p className="text-sm opacity-90 mt-1 break-words">{toast.description}</p>}
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6 flex-shrink-0" onClick={() => dismiss(toast.id)}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
