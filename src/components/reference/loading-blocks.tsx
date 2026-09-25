import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

/**
 * 로딩 스켈레톤 3종.
 *
 * 스피너 하나로 화면 전체를 덮는 대신, **들어올 내용과 같은 모양**을 미리 깔아요.
 * 데이터가 도착했을 때 레이아웃이 튀지 않아서 눈이 덜 피로합니다.
 * 그래서 각 블록의 높이·개수는 실제 부품과 맞춰 뒀어요 —
 * `StatCardSkeleton`은 `StatCard`, `ChartSkeleton`은 차트 카드 높이 그대로입니다.
 *
 * 모두 `aria-hidden`이고 감싸는 영역에 `aria-busy`를 주는 걸 권장해요.
 */
function StatCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-6 rounded-2xl bg-card p-4 ring-1 ring-foreground/10",
        className
      )}
      aria-hidden
    >
      <div className="flex items-start justify-between">
        <Skeleton className="size-10 rounded-full" />
        <Skeleton className="size-8 rounded-full" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-24" />
        <div className="flex items-end justify-between gap-4">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  )
}

function ChartSkeleton({ className }: { className?: string }) {
  // 막대 높이를 들쭉날쭉하게 둬야 '차트가 올 자리'로 읽혀요
  const heights = ["h-16", "h-28", "h-20", "h-36", "h-24", "h-32", "h-14"]

  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-2xl bg-card p-4 ring-1 ring-foreground/10",
        className
      )}
      aria-hidden
    >
      <div className="flex items-center gap-2">
        <Skeleton className="size-7 rounded-full" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="ml-auto h-8 w-28 rounded-full" />
      </div>
      <div className="flex h-40 items-end gap-3">
        {heights.map((height, i) => (
          <Skeleton key={i} className={cn("flex-1 rounded-md", height)} />
        ))}
      </div>
    </div>
  )
}

function TableSkeleton({
  rows = 5,
  className,
}: {
  rows?: number
  className?: string
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10",
        className
      )}
      aria-hidden
    >
      <div className="flex items-center gap-4 border-b bg-muted/50 px-4 py-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="ml-auto h-4 w-16" />
      </div>
      {Array.from({ length: rows }, (_, i) => (
        <div
          key={i}
          className={cn("flex items-center gap-4 px-4 py-3", i > 0 && "border-t")}
        >
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="ml-auto h-4 w-12" />
        </div>
      ))}
    </div>
  )
}

export { StatCardSkeleton, ChartSkeleton, TableSkeleton }
