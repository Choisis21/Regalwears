export default function AccountLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <div className="h-4 w-40 animate-pulse rounded bg-secondary" />
      <div className="mt-10 h-9 w-48 animate-pulse rounded bg-secondary" />
      <div className="mt-8 h-24 w-full animate-pulse rounded-2xl bg-secondary" />
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-48 animate-pulse rounded-2xl bg-secondary"
          />
        ))}
      </div>
    </div>
  );
}
