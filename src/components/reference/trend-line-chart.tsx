"use client"

import * as React from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

type TrendPoint = Record<string, string | number> & { label: string }

/** 강조 지점에 얹는 알약 배지 (--highlight) */
function FocusBadge({
  cx,
  cy,
  value,
}: {
  cx?: number
  cy?: number
  value: string
}) {
  if (cx == null || cy == null) return null
  const width = Math.max(46, value.length * 11 + 20)
  return (
    <g transform={`translate(${cx}, ${cy})`}>
      <rect
        x={-width / 2}
        y={-15}
        width={width}
        height={30}
        rx={15}
        fill="var(--highlight)"
      />
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={13}
        fontWeight={600}
        fill="var(--highlight-foreground)"
      >
        {value}
      </text>
    </g>
  )
}

/** 축 위에 놓이는 삼각형 마커 */
function AxisMarker({ cx, cy }: { cx?: number; cy?: number }) {
  if (cx == null || cy == null) return null
  return (
    <path
      d={`M ${cx - 7} ${cy + 5} L ${cx + 7} ${cy + 5} L ${cx} ${cy - 6} Z`}
      fill="var(--foreground)"
    />
  )
}

/**
 * 다중 선형 차트 — 레퍼런스의 "Credit History" 카드가 원본이에요.
 *
 * 규칙:
 *   · 주계열 하나만 진하게, 나머지 비교 계열은 흐린 회색으로 눕힌다
 *   · 격자는 점선 가로선만
 *   · 강조 지점은 하이라이트 알약 배지 + 점선 세로선 + 축 위 삼각형 마커로 찍는다
 *   · X축 라벨은 강조 지점 하나만 보여줘 눈이 그리로 가게 한다
 */
function TrendLineChart({
  data,
  config,
  primaryKey,
  focusIndex,
  valueFormatter = (v) => v.toLocaleString("ko-KR"),
  className,
}: {
  data: TrendPoint[]
  config: ChartConfig
  primaryKey: string
  /** 강조할 데이터 인덱스. 기본값은 주계열의 최댓값 지점 */
  focusIndex?: number
  valueFormatter?: (value: number) => string
  className?: string
}) {
  const seriesKeys = Object.keys(config)
  const compareKeys = seriesKeys.filter((key) => key !== primaryKey)

  const focus = React.useMemo(() => {
    if (data.length === 0) return null
    const index =
      focusIndex ??
      data.reduce(
        (best, row, i) =>
          Number(row[primaryKey]) > Number(data[best][primaryKey]) ? i : best,
        0
      )
    const row = data[index]
    return { row, value: Number(row[primaryKey]) }
  }, [data, focusIndex, primaryKey])

  const domain = React.useMemo(() => {
    const values = data.flatMap((row) =>
      seriesKeys.map((key) => Number(row[key]))
    )
    const min = Math.min(...values)
    const max = Math.max(...values)
    const pad = Math.max(1, (max - min) * 0.35)
    return [Math.floor(min - pad), Math.ceil(max + pad * 0.6)] as [
      number,
      number,
    ]
  }, [data, seriesKeys])

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <ChartContainer config={config} className="aspect-auto h-[220px] w-full">
        <LineChart data={data} margin={{ top: 28, right: 12, bottom: 8, left: 0 }}>
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 6"
            stroke="var(--border)"
          />
          <YAxis
            domain={domain}
            tickLine={false}
            axisLine={false}
            tickCount={4}
            width={44}
            tickMargin={8}
            className="text-xs"
            tick={{ fill: "var(--muted-foreground)" }}
          />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            minTickGap={24}
            ticks={focus ? [focus.row.label] : undefined}
            className="text-xs"
            tick={{ fill: "var(--muted-foreground)" }}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

          {compareKeys.map((key) => (
            <Line
              key={key}
              dataKey={key}
              type="monotone"
              stroke={`var(--color-${key})`}
              strokeWidth={2}
              dot={false}
              activeDot={false}
              isAnimationActive={false}
            />
          ))}
          <Line
            dataKey={primaryKey}
            type="monotone"
            stroke={`var(--color-${primaryKey})`}
            strokeWidth={2.5}
            isAnimationActive={false}
            dot={{
              r: 3.5,
              fill: `var(--color-${primaryKey})`,
              stroke: "var(--card)",
              strokeWidth: 2,
            }}
            activeDot={{ r: 5 }}
          />

          {focus ? (
            <>
              <ReferenceLine
                x={focus.row.label}
                stroke="var(--muted-foreground)"
                strokeDasharray="4 4"
                strokeOpacity={0.6}
              />
              <ReferenceDot
                x={focus.row.label}
                y={domain[0]}
                shape={<AxisMarker />}
              />
              <ReferenceDot
                x={focus.row.label}
                y={focus.value}
                shape={<FocusBadge value={valueFormatter(focus.value)} />}
              />
            </>
          ) : null}
        </LineChart>
      </ChartContainer>

      <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 px-2">
        {seriesKeys.map((key) => (
          <li
            key={key}
            className={cn(
              "flex items-center gap-1.5 text-xs",
              key === primaryKey ? "text-foreground" : "text-muted-foreground"
            )}
          >
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: `var(--color-${key})` }}
              aria-hidden
            />
            {config[key]?.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export { TrendLineChart }
export type { TrendPoint }
