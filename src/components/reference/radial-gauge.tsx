"use client"

import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts"

import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const TONE = {
  brand: "var(--chart-1)",
  success: "var(--success)",
  warning: "var(--warning)",
  destructive: "var(--destructive)",
} as const

type GaugeToneKey = keyof typeof TONE

/**
 * 방사형 게이지 — 0~100% 하나를 원으로 보여줘요.
 *
 * 막대보다 자리를 적게 먹으면서 "얼마나 찼는지"가 바로 읽혀서
 * 달성률·가동률·사용량처럼 상한이 정해진 지표에 잘 맞아요.
 * 가운데 숫자는 SVG가 아니라 겹쳐 놓은 div라서 한글도 또렷하게 나옵니다.
 */
function RadialGauge({
  value,
  label,
  caption,
  tone = "brand",
  className,
}: {
  /** 0~100 */
  value: number
  /** 툴팁·범례용 이름 */
  label: string
  /** 원 안쪽 숫자 아래 한 줄 */
  caption?: string
  tone?: GaugeToneKey
  className?: string
}) {
  const clamped = Math.min(100, Math.max(0, value))
  const config = {
    value: { label, color: TONE[tone] },
  } satisfies ChartConfig

  return (
    <div className={cn("relative mx-auto w-full max-w-56", className)}>
      <ChartContainer config={config} className="aspect-square w-full">
        <RadialBarChart
          data={[{ name: label, value: clamped }]}
          startAngle={90}
          endAngle={-270}
          innerRadius="74%"
          outerRadius="100%"
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            dataKey="value"
            angleAxisId={0}
            cornerRadius={999}
            background={{ fill: "var(--muted)" }}
            fill="var(--color-value)"
            isAnimationActive={false}
          />
        </RadialBarChart>
      </ChartContainer>

      <div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1"
        role="img"
        aria-label={`${label} ${clamped}퍼센트`}
      >
        <p className="font-heading text-3xl leading-none font-medium tabular-nums">
          {clamped.toLocaleString("ko-KR")}
          <span className="text-base font-normal text-muted-foreground">%</span>
        </p>
        {caption ? (
          <p className="px-8 text-center text-xs text-muted-foreground">
            {caption}
          </p>
        ) : null}
      </div>
    </div>
  )
}

export { RadialGauge }
export type { GaugeToneKey }
