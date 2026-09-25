"use client"

import type * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type PillTabItem = {
  value: string
  label: string
  icon?: React.ReactNode
}

/**
 * 알약 탭 — Ventra 상단 내비게이션이 원본이에요.
 *
 * 선택된 탭만 채워서 진하게, 나머지는 얇은 테두리만. 아이콘은 왼쪽에 붙입니다.
 * 탭 자체가 스크롤되게 두어 화면이 좁아져도 라벨을 줄이지 않아요.
 */
function PillTabs({
  items,
  value,
  onValueChange,
  className,
}: {
  items: PillTabItem[]
  value: string
  onValueChange?: (value: string) => void
  className?: string
}) {
  return (
    <div
      role="tablist"
      aria-label="화면 전환"
      className={cn(
        "flex items-center gap-1.5 overflow-x-auto rounded-full bg-muted/60 p-1",
        className
      )}
    >
      {items.map((item) => {
        const selected = item.value === value
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onValueChange?.(item.value)}
            className={cn(
              "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3 text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "[&_svg]:size-3.5 [&_svg]:shrink-0",
              selected
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-card hover:text-foreground"
            )}
          >
            {item.icon}
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

/**
 * 기간 스테퍼 — "‹ 6월 6일 – 6월 12일 ›" 형태의 좌우 이동 컨트롤.
 * 드롭다운보다 손이 덜 가서, 연속된 기간을 훑을 때 잘 맞아요.
 */
function PeriodStepper({
  label,
  onPrev,
  onNext,
  className,
}: {
  label: string
  onPrev?: () => void
  onNext?: () => void
  className?: string
}) {
  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="rounded-full"
        aria-label="이전 기간"
        onClick={onPrev}
      >
        <ChevronLeftIcon />
      </Button>
      <span className="min-w-0 truncate px-1 text-sm tabular-nums" title={label}>
        {label}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="rounded-full"
        aria-label="다음 기간"
        onClick={onNext}
      >
        <ChevronRightIcon />
      </Button>
    </div>
  )
}

/**
 * 요일 선택 — 원형 칩 일곱 개. 선택된 하나만 채웁니다.
 * 스마트보틀 레퍼런스의 주간 선택기를 한국어 요일로 옮겼어요.
 */
function DayPicker({
  days = ["일", "월", "화", "수", "목", "금", "토"],
  value,
  onValueChange,
  className,
}: {
  days?: string[]
  value: number
  onValueChange?: (index: number) => void
  className?: string
}) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {days.map((day, i) => {
        const selected = i === value
        return (
          <button
            key={day}
            type="button"
            aria-pressed={selected}
            aria-label={`${day}요일`}
            onClick={() => onValueChange?.(i)}
            className={cn(
              "flex size-8 items-center justify-center rounded-full text-xs font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selected
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground ring-1 ring-border hover:text-foreground"
            )}
          >
            {day}
          </button>
        )
      })}
    </div>
  )
}

export { PillTabs, PeriodStepper, DayPicker }
export type { PillTabItem }
