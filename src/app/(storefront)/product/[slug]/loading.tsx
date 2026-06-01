export default function ProductLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <div className="h-4 w-56 animate-pulse rounded bg-secondary" />

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Gallery */}
        <div className="flex flex-col-reverse gap-4 sm:flex-row">
          <div className="flex gap-3 sm:flex-col">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="size-16 animate-pulse rounded-lg bg-secondary sm:size-20"
              />
            ))}
          </div>
          <div className="aspect-[3/4] flex-1 animate-pulse rounded-2xl bg-secondary" />
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div className="h-8 w-2/3 animate-pulse rounded bg-secondary" />
          <div className="h-4 w-32 animate-pulse rounded bg-secondary" />
          <div className="h-6 w-24 animate-pulse rounded bg-secondary" />
          <div className="h-20 w-full animate-pulse rounded bg-secondary" />
          <div className="h-10 w-40 animate-pulse rounded bg-secondary" />
          <div className="h-12 w-full animate-pulse rounded-full bg-secondary" />
        </div>
      </div>
    </div>
  );
}
