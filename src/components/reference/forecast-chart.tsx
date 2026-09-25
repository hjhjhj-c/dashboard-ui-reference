"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, ReferenceDot, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

type ForecastPoint = { label: string; value: number }

/** 실측 마지막 지점에 얹는 유리알 마커 */
function HaloDot({ cx, cy }: { cx?: number; cy?: number }) {
  if (cx == null || cy == null) return null
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={16}
        fill="var(--foreground)"
        fillOpacity={0.06}
        stroke="var(--foreground)"
        strokeOpacity={0.12}
      />
      <circle cx={cx} cy={cy} r={4.5} fill="var(--color-actual)" />
    </g>
  )
}

/**
 * 실측 → 예측 차트.
 *
 * 레퍼런스에서 가져온 규칙 하나: **같은 선인데 성질이 다르면 선의 질감을 바꾼다.**
 * 실측 구간은 실선, 예측 구간은 점선으로 이어 그려서 색을 하나도 더 쓰지 않고 둘을 구분해요.
 */
function ForecastChart({
  data,
  splitIndex,
  actualLabel = "실측",
  forecastLabel = "예측",
  className,
}: {
  data: ForecastPoint[]
  /** 이 인덱스까지가 실측, 이후는 예측 */
  splitIndex: number
  actualLabel?: string
  forecastLabel?: string
  className?: string
}) {
  const config = {
    actual: { label: actualLabel, color: "var(--chart-1)" },
    forecast: { label: forecastLabel, color: "var(--chart-4)" },
  } satisfies ChartConfig

  const merged = React.useMemo(
    () =>
      data.map((point, i) => ({
        label: point.label,
        actual: i <= splitIndex ? point.value : null,
        // 분기점을 양쪽에 모두 넣어야 선이 끊기지 않아요.
        forecast: i >= splitIndex ? point.value : null,
      })),
    [data, splitIndex]
  )

  const split = data[splitIndex]

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <ChartContainer config={config} className="aspect-auto h-[200px] w-full">
        <AreaChart data={merged} margin={{ top: 20, right: 12, bottom: 4, left: 0 }}>
          <defs>
            <linearGradient id="fillActual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-actual)" stopOpacity={0.28} />
              <stop offset="100%" stopColor="var(--color-actual)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 6"
            stroke="var(--border)"
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={40}
            tickCount={4}
            tickMargin={8}
            className="text-xs"
            tick={{ fill: "var(--muted-foreground)" }}
          />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            minTickGap={24}
            className="text-xs"
            tick={{ fill: "var(--muted-foreground)" }}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Area
            dataKey="forecast"
            type="monotone"
            stroke="var(--color-forecast)"
            strokeWidth={2}
            strokeDasharray="2 6"
            strokeLinecap="round"
            fill="none"
            connectNulls
            dot={false}
            isAnimationActive={false}
          />
          <Area
            dataKey="actual"
            type="monotone"
            stroke="var(--color-actual)"
            strokeWidth={2.5}
            fill="url(#fillActual)"
            connectNulls
            dot={false}
            isAnimationActive={false}
          />
          {split ? (
            <ReferenceDot
              x={split.label}
              y={split.value}
              shape={<HaloDot />}
            />
          ) : null}
        </AreaChart>
      </ChartContainer>

      <ul className="flex items-center justify-center gap-5 text-xs">
        <li className="flex items-center gap-1.5 text-foreground">
          <span className="h-0.5 w-5 rounded-full bg-chart-1" aria-hidden />
          {actualLabel}
        </li>
        <li className="flex items-center gap-1.5 text-muted-foreground">
          <svg className="h-0.5 w-5 overflow-visible" aria-hidden>
            <line
              x1="0"
              y1="1"
              x2="20"
              y2="1"
              stroke="var(--chart-4)"
              strokeWidth="2"
              strokeDasharray="2 4"
              strokeLinecap="round"
            />
          </svg>
          {forecastLabel}
        </li>
      </ul>
    </div>
  )
}

export { ForecastChart }
export type { ForecastPoint }
