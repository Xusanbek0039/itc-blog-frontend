"use client"

import { Navbar } from "@/components/layout/navbar"
import { ApiTester } from "@/components/debug/api-tester"
import { ServerStatus } from "@/components/ui/server-status"

export default function DebugPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8 text-center">API Debug & Server Status</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Server Status</h2>
            <ServerStatus />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">API Tester</h2>
            <ApiTester />
          </div>
        </div>
      </main>
    </div>
  )
}
