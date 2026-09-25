import type * as React from "react"
import { TriangleAlertIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * 경고 배너 — Ventra의 "Active Alert" 카드가 원본이에요.
 *
 * 어두운 인셋 줄 위에 붉은 아이콘 칩 + 제목 + 부제를 놓고,
 * 카드 아래쪽에만 붉은 기운이 번지게 해서 시선을 아래로 끌어요.
 */
function AlertRow({
  title,
  detail,
  action,
  className,
}: {
  title: string
  detail: string
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl bg-destructive/8 p-3 ring-1 ring-destructive/20",
        className
      )}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-destructive text-white">
        <TriangleAlertIcon className="size-4" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium" title={title}>
          {title}
        </p>
        <p className="truncate text-xs text-muted-foreground" title={detail}>
          {detail}
        </p>
      </div>
      {action}
    </div>
  )
}

/**
 * 장비 줄 — 여러 대 중 한 대만 붉게 물들여 "어느 놈인지" 한눈에 보여줘요.
 */
function DeviceStrip({
  count,
  alertIndex,
  labelPrefix = "설비",
  className,
}: {
  count: number
  alertIndex: number
  labelPrefix?: string
  className?: string
}) {
  return (
    <div className={cn("flex items-end gap-2", className)}>
      {Array.from({ length: count }, (_, i) => {
        const isAlert = i === alertIndex
        return (
          <div
            key={i}
            title={`${labelPrefix} ${i + 1}${isAlert ? " · 점검 필요" : ""}`}
            className={cn(
              "flex h-10 flex-1 flex-col justify-end rounded-md p-1 ring-1",
              isAlert
                ? "bg-destructive/15 ring-destructive"
                : "bg-muted ring-border"
            )}
          >
            <span
              className={cn(
                "h-1.5 w-full rounded-xs",
                isAlert ? "bg-destructive" : "bg-muted-foreground/25"
              )}
              aria-hidden
            />
          </div>
        )
      })}
    </div>
  )
}

export { AlertRow, DeviceStrip }
