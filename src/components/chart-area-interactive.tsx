"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { CardContent, CardHeader } from "@/components/ui/card"
import { Panel } from "@/components/reference/panel"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "기간을 선택할 수 있는 영역 차트"

const trafficData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
]

const chartConfig = {
  visitors: {
    label: "전체",
  },
  desktop: {
    label: "웹",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "모바일 앱",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

const formatDate = (value: string) =>
  new Date(`${value}T00:00:00`).toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
  })

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("30")
  const uid = React.useId().replace(/:/g, "")
  const titleId = `traffic-title-${uid}`
  const descriptionId = `traffic-description-${uid}`
  // The sample contains one row per day. Slicing includes exactly 7, 30 or 90 days.
  const filteredData = trafficData.slice(-Number(timeRange))
  const total = filteredData.reduce(
    (acc, row) => ({
      desktop: acc.desktop + row.desktop,
      mobile: acc.mobile + row.mobile,
    }),
    { desktop: 0, mobile: 0 }
  )
  const sum = total.desktop + total.mobile
  const period = `${formatDate(filteredData[0].date)} – ${formatDate(filteredData.at(-1)!.date)}`
  const axisDates = Array.from({ length: 5 }, (_, index) =>
    filteredData[Math.round(index * (filteredData.length - 1) / 4)].date
  )
  const axisMaximum = Math.ceil(
    Math.max(...filteredData.flatMap((row) => [row.desktop, row.mobile])) / 200
  ) * 200

  return (
    <Panel className="h-full min-w-0 gap-4 py-5" aria-labelledby={titleId}>
      <CardHeader className="flex flex-wrap items-start justify-between gap-4 px-6">
        <div>
          <h2 id={titleId} className="text-base font-semibold">일별 데이터 유입</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">웹과 모바일 앱의 흐름을 비교해요</p>
        </div>
        <ToggleGroup
          type="single"
          value={timeRange}
          onValueChange={(value) => value && setTimeRange(value)}
          aria-label="데이터 유입 조회 기간"
          className="gap-1 rounded-lg bg-muted p-1"
        >
          {[7, 30, 90].map((days) => (
            <ToggleGroupItem
              key={days}
              value={String(days)}
              aria-label={`최근 ${days}일`}
              className="h-8 rounded-md px-3 text-xs text-muted-foreground data-[state=on]:bg-card data-[state=on]:text-foreground data-[state=on]:shadow-sm"
            >
              {days.toLocaleString("ko-KR")}일
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </CardHeader>

      <CardContent className="flex flex-wrap items-end justify-between gap-4 px-6">
        <div>
          <p className="text-xs text-muted-foreground">선택 기간 총 유입</p>
          <p className="mt-1 text-4xl font-semibold tracking-tight tabular-nums">
            {sum.toLocaleString("ko-KR")}
            <span className="ml-1.5 text-sm font-normal tracking-normal text-muted-foreground">건</span>
          </p>
        </div>
        <dl className="flex gap-6 pb-1">
          <div>
            <dt className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-0.5 w-4 rounded-full bg-chart-1" aria-hidden />웹
            </dt>
            <dd className="mt-1 pl-6 text-sm font-medium tabular-nums">{total.desktop.toLocaleString("ko-KR")}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-4 border-t-2 border-dashed border-chart-2" aria-hidden />모바일 앱
            </dt>
            <dd className="mt-1 pl-6 text-sm font-medium tabular-nums">{total.mobile.toLocaleString("ko-KR")}</dd>
          </div>
        </dl>
      </CardContent>

      <CardContent className="min-h-0 flex-1 px-3 sm:px-5">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-60 w-full tabular-nums"
          aria-describedby={descriptionId}
        >
          <AreaChart accessibilityLayer data={filteredData} margin={{ top: 16, right: 16, bottom: 4, left: 0 }}>
            <defs>
              <linearGradient id={`fill-desktop-${uid}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-desktop)" stopOpacity={0.2} />
                <stop offset="55%" stopColor="var(--color-desktop)" stopOpacity={0.07} />
                <stop offset="100%" stopColor="var(--color-desktop)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id={`fill-mobile-${uid}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-mobile)" stopOpacity={0.12} />
                <stop offset="55%" stopColor="var(--color-mobile)" stopOpacity={0.04} />
                <stop offset="100%" stopColor="var(--color-mobile)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.6} />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={40}
              tickCount={4}
              tickMargin={12}
              domain={[0, axisMaximum]}
              allowDecimals={false}
              tick={{ fill: "var(--muted-foreground)" }}
              tickFormatter={(value: number) => value.toLocaleString("ko-KR")}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              minTickGap={24}
              ticks={axisDates}
              interval="preserveStartEnd"
              padding={{ left: 4, right: 4 }}
              tick={{ fill: "var(--muted-foreground)" }}
              tickFormatter={formatDate}
            />
            <ChartTooltip
              cursor={{ stroke: "var(--muted-foreground)", strokeOpacity: 0.3, strokeDasharray: "3 5" }}
              offset={16}
              isAnimationActive={false}
              itemSorter={(item) => item.dataKey === "desktop" ? 0 : 1}
              content={
                <ChartTooltipContent
                  className="min-w-44 gap-2 rounded-xl border-border bg-card px-3.5 py-3 shadow-lg"
                  labelClassName="border-b border-border pb-2 text-foreground"
                  labelFormatter={(value) => formatDate(String(value))}
                  indicator="dot"
                  formatter={(value, name) => (
                    <div className="flex w-full items-center justify-between gap-6">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        {/* impeccable-disable-next-line border-accent-on-rounded: This border is the dashed chart legend mark, not a card accent. */}
                        <span className={name === "desktop" ? "h-0.5 w-3 rounded-full bg-chart-1" : "w-3 border-t-2 border-dashed border-chart-2"} aria-hidden />
                        {chartConfig[name as "desktop" | "mobile"]?.label}
                      </span>
                      <span className="font-semibold tabular-nums">{Number(value).toLocaleString("ko-KR")}<span className="ml-1 font-normal text-muted-foreground">건</span></span>
                    </div>
                  )}
                />
              }
            />
            <Area
              dataKey="mobile"
              type="monotone"
              fill={`url(#fill-mobile-${uid})`}
              stroke="var(--color-mobile)"
              strokeWidth={2}
              strokeDasharray="4 5"
              strokeLinecap="round"
              strokeLinejoin="round"
              activeDot={{ r: 4, fill: "var(--card)", stroke: "var(--color-mobile)", strokeWidth: 2 }}
              isAnimationActive={false}
            />
            <Area
              dataKey="desktop"
              type="monotone"
              fill={`url(#fill-desktop-${uid})`}
              stroke="var(--color-desktop)"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              activeDot={{ r: 4, fill: "var(--card)", stroke: "var(--color-desktop)", strokeWidth: 2.5 }}
              isAnimationActive={false}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <p id={descriptionId} className="flex flex-wrap justify-between gap-2 border-t border-border px-6 pt-4 text-xs text-muted-foreground">
        <span className="tabular-nums">2024년 {period} · {filteredData.length.toLocaleString("ko-KR")}일</span>
        <span>예시 데이터 · 단위: 건</span>
      </p>
    </Panel>
  )
}
