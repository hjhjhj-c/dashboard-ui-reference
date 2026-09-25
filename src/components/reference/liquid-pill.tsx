"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * 리퀴드 캡슐 — tranmautritam의 "liquid button"이 원본이에요.
 *
 * 만드는 법은 두 단계뿐입니다.
 *   1. 알약 모양으로 깎고 안쪽에 메시 그라디언트를 채운다
 *   2. 그라디언트를 천천히 흐르게 하고 위쪽에 얇은 하이라이트를 얹는다
 *
 * 처리 중·집계 중처럼 "지금 뭔가 돌아가고 있다"를 알릴 때 씁니다.
 * `prefers-reduced-motion`이 켜져 있으면 애니메이션은 자동으로 멈춰요.
 */
function LiquidPill({
  states,
  interval = 2400,
  mesh = "mesh-brand",
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  /** 순서대로 돌아가며 보여줄 문구. 하나만 주면 고정 문구가 돼요. */
  states: string[]
  interval?: number
  mesh?: "mesh-brand" | "mesh-warm" | "mesh-cool"
}) {
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    if (states.length < 2) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % states.length),
      interval
    )
    return () => window.clearInterval(id)
  }, [states.length, interval])

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3",
        "liquid-surface liquid-glow transition-transform duration-300 hover:scale-105",
        mesh,
        className
      )}
      role="status"
      aria-live="polite"
      {...props}
    >
      {/* 위쪽 유리 하이라이트 */}
      <span
        className="pointer-events-none absolute inset-x-3 top-0.5 h-1/3 rounded-full bg-white/25 blur-md"
        aria-hidden
      />
      <span className="relative font-heading text-base font-semibold text-white drop-shadow-sm">
        {states[index]}
      </span>
    </div>
  )
}

export { LiquidPill }
