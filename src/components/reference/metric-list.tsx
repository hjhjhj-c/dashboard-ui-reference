import type * as React from "react"

import { cn } from "@/lib/utils"

type MetricListItem = {
  label: string
  /** 문자열이면 오른쪽 정렬 숫자로, ReactNode면 배지 같은 부품을 그대로 넣어요. */
  value: React.ReactNode
}

/**
 * 속성 목록 — Ventra "Active Zone" 카드의 아랫부분이 원본이에요.
 *
 * 왼쪽에 흐린 라벨, 오른쪽에 또렷한 값. 줄마다 얇은 구분선을 넣어
 * 값이 길어져도 어느 라벨의 값인지 눈이 헷갈리지 않게 합니다.
 */
function MetricList({
  items,
  className,
}: {
  items: MetricListItem[]
  className?: string
}) {
  return (
    <dl className={cn("flex flex-col", className)}>
      {items.map((item, i) => (
        <div
          key={item.label}
          className={cn(
            "flex items-center justify-between gap-4 py-2.5",
            i > 0 && "border-t"
          )}
        >
          <dt
            className="min-w-0 shrink truncate text-sm text-muted-foreground"
            title={item.label}
          >
            {item.label}
          </dt>
          <dd className="text-right text-sm font-medium tabular-nums">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export { MetricList }
export type { MetricListItem }
