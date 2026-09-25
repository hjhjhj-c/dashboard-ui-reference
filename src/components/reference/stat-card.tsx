import type * as React from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { IconChip, RoundIconButton } from "@/components/reference/panel"
import { cn } from "@/lib/utils"

/**
 * KPI 카드.
 *
 * 레퍼런스의 해부도는 이렇게 고정돼 있어요.
 *   1행 — 원형 아이콘 칩(+ 필요하면 경고 점) ······ 원형 ↗ 버튼
 *   2행 — 라벨 (평범한 굵기, 흐린 색)
 *   3행 — 아주 큰 숫자 + 작은 단위 ······ 오른쪽에 미니 인디케이터
 */
function StatCard({
  icon,
  label,
  value,
  unit,
  indicator,
  alert = false,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Card>, "children"> & {
  icon: React.ReactNode
  label: string
  value: string
  unit?: string
  indicator?: React.ReactNode
  /** 주의가 필요한 지표에 아이콘 칩 위로 경고 점을 얹어요. */
  alert?: boolean
}) {
  return (
    <Card
      className={cn(
        "justify-between gap-6 rounded-2xl transition duration-300 hover:-translate-y-0.5 hover:shadow-md",
        className
      )}
      {...props}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-2">
        <span className="relative">
          <IconChip size="lg">{icon}</IconChip>
          {alert ? (
            <span
              className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-warning text-xs leading-none font-bold text-warning-foreground ring-2 ring-card"
              aria-label="확인이 필요해요"
            >
              !
            </span>
          ) : null}
        </span>
        <RoundIconButton label={`${label} 자세히 보기`} />
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="text-sm text-muted-foreground" title={label}>
          {label}
        </p>
        <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
          <p className="flex items-baseline gap-0.5 font-heading text-4xl leading-none font-medium tracking-tight tabular-nums">
            {value}
            {unit ? (
              <span className="text-base font-normal text-muted-foreground">
                {unit}
              </span>
            ) : null}
          </p>
          {/* ml-auto라서 줄이 바뀌어도 인디케이터는 항상 오른쪽 끝에 붙어요 */}
          {indicator ? <div className="ml-auto pb-0.5">{indicator}</div> : null}
        </div>
      </CardContent>
    </Card>
  )
}

export { StatCard }
