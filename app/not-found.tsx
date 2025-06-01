import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Terminal, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6">
        <Terminal className="h-16 w-16 mx-auto text-muted-foreground" />
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md">The page you're looking for doesn't exist or has been moved.</p>
        </div>
        <Button asChild>
          <Link href="/">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  )
}
