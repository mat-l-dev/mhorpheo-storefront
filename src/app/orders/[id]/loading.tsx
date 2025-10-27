export default function OrderLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs Skeleton */}
        <div className="mb-8 flex items-center space-x-2">
          <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Header Skeleton */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="h-20 w-20 animate-pulse rounded-full bg-gray-200" />
          </div>
          <div className="mb-2 flex justify-center">
            <div className="h-9 w-80 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="flex justify-center">
            <div className="h-6 w-48 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="mt-4 flex justify-center">
            <div className="h-8 w-32 animate-pulse rounded-full bg-gray-200" />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Timeline Skeleton */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 h-7 w-48 animate-pulse rounded bg-gray-200" />
              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                      <div className="h-3 w-48 animate-pulse rounded bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Skeleton */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 h-7 w-56 animate-pulse rounded bg-gray-200" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-5 w-5 animate-pulse rounded bg-gray-200" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                      <div className="h-3 w-40 animate-pulse rounded bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Products Skeleton */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 h-7 w-32 animate-pulse rounded bg-gray-200" />
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-20 w-20 animate-pulse rounded-lg bg-gray-200" />
                    <div className="flex-1 space-y-2">
                      <div className="h-5 w-48 animate-pulse rounded bg-gray-200" />
                      <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Summary Skeleton */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 h-6 w-40 animate-pulse rounded bg-gray-200" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                  </div>
                ))}
              </div>
            </div>

            {/* Actions Skeleton */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-3 h-6 w-24 animate-pulse rounded bg-gray-200" />
              <div className="space-y-2">
                <div className="h-11 w-full animate-pulse rounded-lg bg-gray-200" />
                <div className="h-11 w-full animate-pulse rounded-lg bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
