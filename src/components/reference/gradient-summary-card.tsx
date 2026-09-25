import type * as React from "react"
import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * 그라디언트 요약 카드 — CreditPros의 대출 상세 패널이 원본이에요.
 *
 * 하나의 큰 숫자를 주인공으로 두고, 그 숫자가 전체의 어디쯤인지를
 * 바로 아래 점선 트랙으로 이어서 보여줍니다. 색은 그라디언트 한 겹뿐이라
 * 숫자가 배경에 묻히지 않아요.
 */
function GradientSummaryCard({
  icon,
  title,
  label,
  value,
  prefix,
  secondary,
  progress,
  progressLeftLabel,
  progressLeftValue,
  progressRightLabel,
  progressRightValue,
  footerLabel,
  footerValue,
  mesh = "mesh-brand",
  className,
}: {
  icon: React.ReactNode
  title: string
  label: string
  value: string
  prefix?: string
  secondary?: { label: string; value: string }
  /** 0~100 */
  progress: number
  progressLeftLabel: string
  progressLeftValue: string
  progressRightLabel: string
  progressRightValue: string
  footerLabel?: string
  footerValue?: string
  mesh?: "mesh-brand" | "mesh-warm" | "mesh-cool"
  className?: string
}) {
  return (
    <section
      className={cn(
        "relative flex flex-col gap-6 overflow-hidden rounded-3xl p-6 text-white ring-1 ring-foreground/10",
        "mesh-drift",
        mesh,
        className
      )}
    >
      <header className="flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full ring-1 ring-white/50 [&>svg]:size-5">
          {icon}
        </span>
        <h3 className="min-w-0 flex-1 truncate font-heading text-lg font-medium" title={title}>
          {title}
        </h3>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={`${title} 자세히 보기`}
          className="size-9 rounded-full bg-black/25 text-white hover:bg-black/40 hover:text-white"
        >
          <ArrowUpRightIcon />
        </Button>
      </header>

      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div className="min-w-0">
          <p className="text-sm text-white/80">{label}</p>
          <p className="flex items-baseline gap-1 font-heading text-5xl leading-none font-medium tracking-tight tabular-nums">
            {prefix ? (
              <span className="text-2xl font-normal text-white/80">{prefix}</span>
            ) : null}
            {value}
          </p>
        </div>
        {secondary ? (
          <div className="text-right">
            <p className="text-xs text-white/70">{secondary.label}</p>
            <p className="text-lg font-medium tabular-nums">{secondary.value}</p>
          </div>
        ) : null}
      </div>

      {/* 점선 트랙 + 위치 표식 */}
      <div className="flex flex-col gap-2">
        <div className="relative h-2 rounded-full bg-white/25">
          {/* 너비는 값이, 등장은 grow-x가 맡아요 */}
          <div
            className="grow-x h-2 rounded-full bg-white"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
          <span
            className="absolute -top-1 size-4 rounded-full bg-highlight ring-2 ring-white/70"
            style={{
              left: `${Math.min(100, Math.max(0, progress))}%`,
              transform: "translateX(-50%)",
            }}
            aria-hidden
          />
        </div>
        <div className="flex items-start justify-between gap-4 text-xs">
          <span className="min-w-0">
            <span className="block text-white/70">{progressLeftLabel}</span>
            <span className="block text-sm font-medium tabular-nums">
              {progressLeftValue}
            </span>
          </span>
          <span className="min-w-0 text-right">
            <span className="block text-white/70">{progressRightLabel}</span>
            <span className="block text-sm font-medium tabular-nums">
              {progressRightValue}
            </span>
          </span>
        </div>
      </div>

      {footerLabel ? (
        <footer className="flex items-center justify-between gap-4 border-t border-white/25 pt-4 text-sm">
          <span className="text-white/80">{footerLabel}</span>
          <span className="font-medium tabular-nums">{footerValue}</span>
        </footer>
      ) : null}
    </section>
  )
}

export { GradientSummaryCard }
