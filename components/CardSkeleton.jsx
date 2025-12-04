export default function CardSkeleton() {
  return (
    <div className="relative min-w-[calc(33.333%-11px)] w-[calc(33.333%-11px)] sm:min-w-[180px] sm:w-[180px] md:min-w-[200px] md:w-[200px] lg:w-[calc(18%-13px)] overflow-hidden rounded-xl bg-neutral-800 aspect-[2/3] shrink-0">
      <div className="absolute inset-0 shimmer"></div>

      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
        <div className="h-3 w-3/4 bg-neutral-700 rounded"></div>
        <div className="h-3 w-1/2 bg-neutral-700 rounded"></div>
      </div>
    </div>
  );
}
