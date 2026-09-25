import { cn } from "@/lib/utils"

type StatRowItem = {
  value: string
  label: string
  /** 앞에 찍히는 점 색. 차트 계열과 짝을 맞춰 쓰세요. */
  dot?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "muted"
}

const DOT_CLASS = {
  "chart-1": "bg-chart-1",
  "chart-2": "bg-chart-2",
  "chart-3": "bg-chart-3",
  "chart-4": "bg-chart-4",
  muted: "bg-muted-foreground",
} as const

/**
 * 요약 수치 줄 — 큰 숫자 아래 작은 점 + 라벨, 칸 사이는 얇은 세로 구분선.
 * 차트 위에 올려 "이 그래프가 무슨 숫자인지" 먼저 알려주는 용도예요.
 */
function StatRow({
  items,
  className,
}: {
  items: StatRowItem[]
  className?: string
}) {
  return (
    <dl className={cn("flex items-stretch", className)}>
      {items.map((item, i) => (
        <div
          key={item.label}
          className={cn(
            "flex min-w-0 flex-1 flex-col gap-1",
            i > 0 && "border-l pl-4",
            i < items.length - 1 && "pr-4"
          )}
        >
          <dd className="truncate font-heading text-xl leading-none font-medium tabular-nums">
            {item.value}
          </dd>
          <dt className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
            <span
              className={cn(
                "size-1.5 shrink-0 rounded-full",
                DOT_CLASS[item.dot ?? "muted"]
              )}
              aria-hidden
            />
            <span className="truncate" title={item.label}>
              {item.label}
            </span>
          </dt>
        </div>
      ))}
    </dl>
  )
}

export { StatRow }
export type { StatRowItem }
