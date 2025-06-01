"use client"

import { Terminal, Loader2 } from "lucide-react"

export function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4">
        <div className="relative">
          <Terminal className="h-12 w-12 mx-auto text-primary" />
          <Loader2 className="h-6 w-6 absolute top-3 left-1/2 transform -translate-x-1/2 animate-spin text-primary" />
        </div>
        <div className="space-y-2">
          <div className="text-lg font-mono">
            <span className="typing-animation">Loading...</span>
            <span className="terminal-cursor">_</span>
          </div>
          <p className="text-sm text-muted-foreground">Loading data</p>
        </div>
      </div>
    </div>
  )
}
