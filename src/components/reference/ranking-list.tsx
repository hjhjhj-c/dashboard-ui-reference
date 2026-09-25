import { DeltaBadge } from "@/components/reference/indicators"
import { cn } from "@/lib/utils"

type RankingItem = {
  label: string
  value: number
  /** 전 기간 대비 증감(%). 없으면 배지를 그리지 않아요. */
  delta?: number
}

/**
 * 순위 목록 — 상위 N개를 값 순으로 세우고 뒤에 막대를 깔아요.
 *
 * 막대 차트보다 이쪽이 나은 경우가 많습니다. 항목 이름이 길어도 잘리지 않고,
 * 숫자·비율·증감을 한 줄에 같이 놓을 수 있거든요.
 * 막대 길이는 1위 값을 100%로 잡은 상대 길이예요.
 */
function RankingList({
  items,
  unit = "건",
  className,
}: {
  items: RankingItem[]
  unit?: string
  className?: string
}) {
  const max = Math.max(...items.map((item) => item.value), 1)

  return (
    <ol className={cn("flex flex-col gap-3", className)}>
      {items.map((item, i) => (
        <li key={item.label} className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-full text-xs font-medium tabular-nums",
                i === 0
                  ? "bg-chart-1 text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
              aria-hidden
            >
              {i + 1}
            </span>
            <span className="min-w-0 flex-1 truncate text-sm" title={item.label}>
              <span className="sr-only">{i + 1}위 </span>
              {item.label}
            </span>
            {typeof item.delta === "number" ? (
              <DeltaBadge value={item.delta} />
            ) : null}
            <span className="shrink-0 text-sm font-medium tabular-nums">
              {item.value.toLocaleString("ko-KR")}
              <span className="text-xs font-normal text-muted-foreground">
                {unit}
              </span>
            </span>
          </div>
          {/* 막대는 순위를 눈으로 훑기 위한 보조선이라 라벨을 따로 달지 않아요 */}
          <div className="ml-8 h-1.5 rounded-full bg-muted" aria-hidden>
            <div
              className={cn(
                "grow-x h-full rounded-full",
                i === 0 ? "bg-chart-1" : "bg-chart-1/40"
              )}
              style={{
                width: `${(item.value / max) * 100}%`,
                animationDelay: `${i * 70}ms`,
              }}
            />
          </div>
        </li>
      ))}
    </ol>
  )
}

export { RankingList }
export type { RankingItem }
