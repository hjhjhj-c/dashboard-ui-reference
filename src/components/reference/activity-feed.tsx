import {
  CheckIcon,
  PlayIcon,
  RotateCcwIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

const KIND = {
  done: { icon: CheckIcon, tone: "bg-success/12 text-success ring-success/25" },
  started: { icon: PlayIcon, tone: "bg-chart-1/12 text-chart-1 ring-chart-1/25" },
  // 앰버는 글자색으로 쓰면 라이트 모드에서 대비가 안 나와요 — 항상 꽉 채워 씁니다
  retried: {
    icon: RotateCcwIcon,
    tone: "bg-warning text-warning-foreground ring-warning",
  },
  failed: {
    icon: XIcon,
    tone: "bg-destructive/10 text-destructive ring-destructive/25",
  },
  warned: {
    icon: TriangleAlertIcon,
    tone: "bg-destructive/10 text-destructive ring-destructive/25",
  },
} as const

type ActivityKind = keyof typeof KIND

type ActivityItem = {
  kind: ActivityKind
  title: string
  detail?: string
  /** ISO 문자열 또는 Date */
  at: string | Date
}

/**
 * 활동 피드 — 무슨 일이 언제 있었는지 시간 역순으로 쌓아요.
 *
 * 대시보드의 숫자가 "지금 얼마인가"를 말한다면, 이 목록은 "왜 그렇게 됐나"를 말합니다.
 * 숫자가 갑자기 튀었을 때 사람이 제일 먼저 찾는 게 이거예요.
 *
 * 왼쪽 세로선은 마지막 항목에서 끊어 목록의 끝을 눈으로 알 수 있게 했습니다.
 */
function ActivityFeed({
  items,
  className,
}: {
  items: ActivityItem[]
  className?: string
}) {
  return (
    <ol className={cn("flex flex-col", className)}>
      {items.map((item, i) => {
        const { icon: Icon, tone } = KIND[item.kind]
        const date = item.at instanceof Date ? item.at : new Date(item.at)
        const isLast = i === items.length - 1

        return (
          <li key={`${item.title}-${i}`} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full ring-1",
                  tone
                )}
              >
                <Icon className="size-3.5" aria-hidden />
              </span>
              {isLast ? null : <span className="w-px flex-1 bg-border" />}
            </div>

            <div className={cn("min-w-0 flex-1", isLast ? "pb-0" : "pb-5")}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                <p className="min-w-0 text-sm font-medium" title={item.title}>
                  {item.title}
                </p>
                <time
                  dateTime={date.toISOString()}
                  className="shrink-0 text-xs text-muted-foreground tabular-nums"
                >
                  {date.toLocaleString("ko-KR", {
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>
              {item.detail ? (
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {item.detail}
                </p>
              ) : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export { ActivityFeed }
export type { ActivityItem, ActivityKind }
