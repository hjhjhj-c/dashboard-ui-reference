"use client"

import * as React from "react"
import { Bar, BarChart, Cell, LabelList, XAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

type HatchBarPoint = {
  /** ChartConfig의 키. 막대 색과 라벨을 여기서 가져와요. */
  stage: string
  /** 0~100 진행률 */
  value: number
}

/** 막대 꼭대기에 얹히는 흰 알약 라벨 */
function PercentPill(props: {
  x?: number | string
  y?: number | string
  width?: number | string
  value?: number | string
}) {
  const x = Number(props.x)
  const y = Number(props.y)
  const width = Number(props.width)
  if ([x, y, width].some(Number.isNaN)) return null

  const text = `${props.value}%`
  const pillWidth = Math.max(42, text.length * 8 + 20)
  return (
    <g transform={`translate(${x + width / 2}, ${y})`}>
      <rect
        x={-pillWidth / 2}
        y={-2}
        width={pillWidth}
        height={26}
        rx={13}
        fill="var(--card)"
        stroke="var(--border)"
      />
      <text
        y={11}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight={600}
        fill="var(--card-foreground)"
      >
        {text}
      </text>
    </g>
  )
}

/**
 * 해치 막대 차트 — Ventra의 "Production Yield" 카드가 원본이에요.
 *
 * 규칙:
 *   · 채워진 구간은 굵고 둥근 막대, 남은 구간은 사선 해치로 비워둔다
 *   · 각 막대 꼭대기에 흰 알약으로 퍼센트를 찍는다
 *   · 단계별 색은 ChartConfig에서만 정한다
 */
function HatchBarChart({
  data,
  config,
  className,
}: {
  data: HatchBarPoint[]
  config: ChartConfig
  className?: string
}) {
  const uid = React.useId().replace(/:/g, "")
  const hatchId = `hatch-${uid}`

  return (
    <ChartContainer
      config={config}
      className={cn("aspect-auto h-[180px] w-full", className)}
    >
      <BarChart data={data} margin={{ top: 26, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <pattern
            id={hatchId}
            patternUnits="userSpaceOnUse"
            width={7}
            height={7}
            patternTransform="rotate(-45)"
          >
            <rect width={7} height={7} fill="var(--muted)" />
            <line
              x1={0}
              y1={0}
              x2={0}
              y2={7}
              stroke="var(--muted-foreground)"
              strokeOpacity={0.45}
              strokeWidth={1}
            />
          </pattern>
        </defs>
        <XAxis
          dataKey="stage"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          minTickGap={8}
          className="text-xs"
          tick={{ fill: "var(--muted-foreground)" }}
          tickFormatter={(key: string) => String(config[key]?.label ?? key)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar
          dataKey="value"
          radius={14}
          maxBarSize={64}
          isAnimationActive={false}
          background={{ fill: `url(#${hatchId})`, radius: 14 }}
        >
          {data.map((point) => (
            <Cell key={point.stage} fill={`var(--color-${point.stage})`} />
          ))}
          <LabelList dataKey="value" content={<PercentPill />} />
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}

export { HatchBarChart }
export type { HatchBarPoint }
