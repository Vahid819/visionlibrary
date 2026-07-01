import React from 'react'
import { Skeleton } from "@/components/ui/skeleton";

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background to-muted/40 p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="rounded-xl border bg-card p-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-10 w-28 rounded-lg" />
        </div>
      </div>

      {/* Stats */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="rounded-xl border bg-card p-5 space-y-3"
          >
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-16" />
            <Skeleton className="h-3 w-32" />
          </div>
        ))}
      </section>

      {/* Main Content */}
      <section className="grid gap-6 lg:grid-cols-3">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          {/* Seat Layout */}
          <div className="rounded-xl border bg-card p-5">
            <Skeleton className="h-6 w-36 mb-6" />

            <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
              {[...Array(50)].map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-12 w-full rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="rounded-xl border bg-card p-5 space-y-4">
            <Skeleton className="h-6 w-40" />

            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex justify-between items-center"
              >
                <div className="space-y-2">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-3 w-24" />
                </div>

                <Skeleton className="h-8 w-20 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          <div className="rounded-xl border bg-card p-5 space-y-4">
            <Skeleton className="h-6 w-40" />

            {[...Array(4)].map((_, index) => (
              <Skeleton
                key={index}
                className="h-11 w-full rounded-lg"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardSkeleton