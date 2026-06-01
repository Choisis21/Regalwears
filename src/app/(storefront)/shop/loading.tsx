export default function ShopLoading() {
  return (
    <div>
      {/* Banner */}
      <div className="h-[40vh] min-h-[280px] w-full animate-pulse bg-secondary" />

      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <div className="h-4 w-40 animate-pulse rounded bg-secondary" />
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] w-full rounded-2xl bg-secondary" />
              <div className="mt-4 h-4 w-3/4 rounded bg-secondary" />
              <div className="mt-2 h-4 w-1/3 rounded bg-secondary" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
