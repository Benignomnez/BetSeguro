import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container max-w-4xl py-6 md:py-12">
      <div className="mb-6">
        <Skeleton className="h-6 w-32" />
      </div>

      <Skeleton className="h-8 w-48 mb-6" />

      <div className="grid gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="mb-2">
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-8 w-24 rounded-full" />
                </div>
                <Skeleton className="w-20 h-20 rounded-full mb-2" />
                <Skeleton className="h-6 w-16 mb-1" />
                <Skeleton className="h-4 w-32" />
                <div className="mt-2">
                  <Skeleton className="h-4 w-24 mb-1" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </div>

              <div className="flex flex-col items-center">
                <Skeleton className="h-6 w-8 mb-2" />
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-2">
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-8 w-24 rounded-full" />
                </div>
                <Skeleton className="w-20 h-20 rounded-full mb-2" />
                <Skeleton className="h-6 w-16 mb-1" />
                <Skeleton className="h-4 w-32" />
                <div className="mt-2">
                  <Skeleton className="h-4 w-24 mb-1" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Skeleton className="h-16 w-full max-w-md rounded-md" />
            </div>

            <div className="mt-6">
              <Skeleton className="h-20 w-full rounded-md" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>

        <Skeleton className="h-4 w-48 mx-auto" />
      </div>
    </div>
  )
}

