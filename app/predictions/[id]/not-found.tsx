import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h2 className="text-2xl font-bold mb-4">Game Not Found</h2>
      <p className="text-muted-foreground mb-6">The game you're looking for doesn't exist or may have been removed.</p>
      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  )
}

