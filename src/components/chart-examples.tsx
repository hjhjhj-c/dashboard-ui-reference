"use client"

import * as React from "react"
import { ArrowUpRightIcon, ChartPieIcon, InfoIcon } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  XAxis,
  YAxis,
} from "recharts"

import { Panel } from "@/components/reference/panel"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const volumeConfig = {
  api: { label: "API 연동", color: "var(--chart-1)" },
  batch: { label: "배치 적재", color: "var(--chart-2)" },
  file: { label: "파일 업로드", color: "var(--chart-3)" },
} satisfies ChartConfig

const volumeData = [
  { day: "월", api: 16800, batch: 7200, file: 3200 },
  { day: "화", api: 18400, batch: 8500, file: 2800 },
  { day: "수", api: 17600, batch: 8100, file: 4100 },
  { day: "목", api: 22100, batch: 9200, file: 3600 },
  { day: "금", api: 24500, batch: 10500, file: 4200 },
  { day: "토", api: 16400, batch: 6100, file: 2300 },
  { day: "일", api: 15900, batch: 5300, file: 2600 },
]
const totalVolume = volumeData.reduce(
  (total, day) => total + day.api + day.batch + day.file,
  0
)

const sourceConfig = {
  api: { label: "API 연동", color: "var(--chart-1)" },
  batch: { label: "배치 적재", color: "var(--chart-2)" },
  file: { label: "파일 업로드", color: "var(--chart-3)" },
  partner: { label: "외부 파트너", color: "var(--chart-5)" },
} satisfies ChartConfig

const sourceData = [
  { source: "api", value: 119424, fill: "var(--chart-1)" },
  { source: "batch", value: 74640, fill: "var(--chart-2)" },
  { source: "file", value: 34832, fill: "var(--chart-3)" },
  { source: "partner", value: 19904, fill: "var(--chart-5)" },
]
const totalSources = sourceData.reduce((total, source) => total + source.value, 0)

const latencyConfig = {
  p95: { label: "P95 응답 시간", color: "var(--chart-2)" },
  average: { label: "평균 응답 시간", color: "var(--chart-1)" },
} satisfies ChartConfig

const latencyData = [
  { hour: "00시", average: 142, p95: 240 },
  { hour: "03시", average: 136, p95: 226 },
  { hour: "06시", average: 128, p95: 212 },
  { hour: "09시", average: 162, p95: 286 },
  { hour: "12시", average: 154, p95: 264 },
  { hour: "15시", average: 148, p95: 252 },
  { hour: "18시", average: 132, p95: 228 },
  { hour: "21시", average: 126, p95: 210 },
]

const qualityConfig = {
  previous: { label: "이전 점검", color: "var(--chart-4)" },
  current: { label: "이번 점검", color: "var(--chart-1)" },
} satisfies ChartConfig

const qualityData = [
  { metric: "완전성", current: 98, previous: 90 },
  { metric: "정확성", current: 96, previous: 88 },
  { metric: "일관성", current: 94, previous: 86 },
  { metric: "최신성", current: 92, previous: 82 },
  { metric: "유효성", current: 97, previous: 91 },
]
const qualityAverage = qualityData.reduce((sum, row) => sum + row.current, 0) / qualityData.length
const previousQualityAverage = qualityData.reduce((sum, row) => sum + row.previous, 0) / qualityData.length

const tooltipClassName = "min-w-44 gap-2 rounded-xl border-border bg-popover p-3 shadow-lg [&>div:first-child]:font-medium"

function ExampleHeader({ title, type }: { title: string; type: string }) {
  return (
    <CardHeader className="flex flex-wrap items-center justify-between gap-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <span className="text-xs text-muted-foreground">{type}</span>
    </CardHeader>
  )
}

function TooltipValue({
  label,
  value,
  color,
  unit,
}: {
  label: React.ReactNode
  value: unknown
  color?: string
  unit: string
}) {
  return (
    <>
      <span className="h-3 w-1 shrink-0 rounded-full" style={{ backgroundColor: color }} aria-hidden />
      <span className="flex-1 text-muted-foreground">{label}</span>
      <span className="ml-3 font-medium tabular-nums">
        {Number(value).toLocaleString("ko-KR")} {unit}
      </span>
    </>
  )
}

function SeriesLegend({ config, lines = [] }: { config: ChartConfig; lines?: string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground" aria-label="차트 범례">
      {Object.entries(config).map(([key, series]) => (
        <li key={key} className="flex items-center gap-2">
          {lines.includes(key) ? (
            <span className={`w-4 border-t-2 ${key === "previous" ? "border-dashed" : ""}`} style={{ borderColor: series.color }} aria-hidden />
          ) : (
            <span className="size-2 rounded-sm" style={{ backgroundColor: series.color }} aria-hidden />
          )}
          {series.label}
        </li>
      ))}
    </ul>
  )
}

function VolumeExample() {
  const gradientId = React.useId().replace(/:/g, "")
  return (
    <Panel className="min-w-0 gap-5 @container/chart-panel">
      <ExampleHeader title="요일별 처리량" type="누적 막대" />
      <CardContent className="space-y-6">
        <div>
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight tabular-nums">{totalVolume.toLocaleString("ko-KR")}</span>
            <span className="text-sm text-muted-foreground">건 / 주간 합계</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">채널별 처리량과 전체 규모를 함께 비교해요.</p>
        </div>
        <ChartContainer config={volumeConfig} className="h-60 w-full aspect-auto tabular-nums" aria-label="월요일부터 일요일까지 API, 배치, 파일의 일별 처리량 누적 막대 차트">
          <BarChart accessibilityLayer data={volumeData} margin={{ top: 12, right: 0, left: 0, bottom: 4 }} barCategoryGap="36%">
            <defs>
              {Object.keys(volumeConfig).map((key) => (
                <linearGradient key={key} id={`${gradientId}-${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={`var(--color-${key})`} stopOpacity={0.95} />
                  <stop offset="100%" stopColor={`var(--color-${key})`} stopOpacity={0.72} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.55} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={12} minTickGap={16} />
            <YAxis tickLine={false} axisLine={false} tickMargin={10} width={52} domain={[0, 45000]} ticks={[0, 15000, 30000, 45000]} tickFormatter={(value: number) => value === 0 ? "0" : `${(value / 10000).toLocaleString("ko-KR")}만`} />
            <ChartTooltip cursor={{ fill: "var(--muted)", fillOpacity: 0.4, radius: 6 }} content={<ChartTooltipContent className={tooltipClassName} labelFormatter={(label) => `${label}요일 처리량`} formatter={(value, name) => {
              const series = volumeConfig[String(name) as keyof typeof volumeConfig]
              return <TooltipValue label={series?.label ?? name} value={value} color={series?.color} unit="건" />
            }} />} />
            <Bar dataKey="api" stackId="volume" fill={`url(#${gradientId}-api)`} maxBarSize={32} isAnimationActive={false} />
            <Bar dataKey="batch" stackId="volume" fill={`url(#${gradientId}-batch)`} maxBarSize={32} isAnimationActive={false} />
            <Bar dataKey="file" stackId="volume" fill={`url(#${gradientId}-file)`} radius={[5, 5, 0, 0]} maxBarSize={32} isAnimationActive={false} />
          </BarChart>
        </ChartContainer>
        <SeriesLegend config={volumeConfig} />
      </CardContent>
      <CardFooter className="mt-auto gap-2 bg-muted/20 text-xs text-muted-foreground">
        <ArrowUpRightIcon className="size-4 shrink-0 text-brand" />
        <span>금요일 처리량이 <span className="font-medium text-foreground tabular-nums">{(39200).toLocaleString("ko-KR")}건</span>으로 가장 많아요.</span>
      </CardFooter>
    </Panel>
  )
}

function SourceExample() {
  return (
    <Panel className="min-w-0 gap-5 @container/chart-panel">
      <ExampleHeader title="수집 소스 구성" type="도넛" />
      <CardContent className="flex flex-1 flex-col gap-6">
        <div>
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight tabular-nums">{(48).toLocaleString("ko-KR")}<span className="text-xl">%</span></span>
            <span className="text-sm text-muted-foreground">API 연동 비중</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">전체 수집량에서 각 소스가 차지하는 비율이에요.</p>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-6 @md/chart-panel:flex-row">
          <div className="relative w-52 shrink-0">
            <ChartContainer config={sourceConfig} className="h-60 w-full aspect-auto tabular-nums" aria-label="API 48%, 배치 30%, 파일 14%, 외부 파트너 8%의 수집 소스 구성 도넛 차트">
              <PieChart accessibilityLayer>
                <ChartTooltip content={<ChartTooltipContent className={tooltipClassName} hideLabel formatter={(value, name) => {
                  const series = sourceConfig[String(name) as keyof typeof sourceConfig]
                  return <TooltipValue label={series?.label ?? name} value={value} color={series?.color} unit="건" />
                }} />} />
                <Pie data={sourceData} dataKey="value" nameKey="source" innerRadius={76} outerRadius={98} paddingAngle={4} cornerRadius={5} stroke="var(--card)" strokeWidth={2} startAngle={90} endAngle={-270} isAnimationActive={false} />
              </PieChart>
            </ChartContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1">
              <span className="text-xs text-muted-foreground">총 수집량</span>
              <span className="text-2xl font-semibold tracking-tight tabular-nums">{totalSources.toLocaleString("ko-KR")}</span>
              <span className="text-xs text-muted-foreground">건</span>
            </div>
          </div>
          <ul className="w-full min-w-0 divide-y divide-border/60 text-xs" aria-label="수집 소스별 비율">
            {sourceData.map((source) => (
              <li key={source.source} className="flex items-center gap-2.5 py-3 first:pt-0 last:pb-0">
                <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: source.fill }} aria-hidden />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="font-medium">{sourceConfig[source.source as keyof typeof sourceConfig].label}</div>
                  <div className="text-muted-foreground tabular-nums">{source.value.toLocaleString("ko-KR")}건</div>
                </div>
                <span className="font-semibold tabular-nums">{(source.value / totalSources * 100).toLocaleString("ko-KR", { maximumFractionDigits: 0 })}%</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="mt-auto gap-2 bg-muted/20 text-xs text-muted-foreground">
        <ChartPieIcon className="size-4 shrink-0 text-brand" />
        <span>API와 배치 적재가 전체의 <span className="font-medium text-foreground tabular-nums">{(78).toLocaleString("ko-KR")}%</span>를 차지해요.</span>
      </CardFooter>
    </Panel>
  )
}

function LatencyExample() {
  const gradientId = React.useId().replace(/:/g, "")
  return (
    <Panel className="min-w-0 gap-5 @container/chart-panel">
      <ExampleHeader title="시간대별 응답 속도" type="막대 + 선" />
      <CardContent className="space-y-6">
        <div>
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight tabular-nums">{(126).toLocaleString("ko-KR")}</span>
            <span className="text-sm text-muted-foreground">ms / 마지막 구간 평균</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">평균과 느린 응답 구간을 같은 축에서 비교해요.</p>
        </div>
        <ChartContainer config={latencyConfig} className="h-60 w-full aspect-auto tabular-nums" aria-label="하루 8개 시간대의 평균 및 P95 응답 시간을 밀리초로 비교한 차트">
          <ComposedChart accessibilityLayer data={latencyData} margin={{ top: 12, right: 8, left: 0, bottom: 4 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-p95)" stopOpacity={0.38} />
                <stop offset="100%" stopColor="var(--color-p95)" stopOpacity={0.08} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.55} />
            <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={12} minTickGap={20} interval="preserveStartEnd" />
            <YAxis tickLine={false} axisLine={false} tickMargin={10} width={52} domain={[0, 320]} ticks={[0, 100, 200, 300]} tickFormatter={(value: number) => value.toLocaleString("ko-KR")} />
            <ChartTooltip cursor={{ stroke: "var(--border)", strokeDasharray: "3 4" }} content={<ChartTooltipContent className={tooltipClassName} formatter={(value, name) => {
              const series = latencyConfig[String(name) as keyof typeof latencyConfig]
              return <TooltipValue label={series?.label ?? name} value={value} color={series?.color} unit="ms" />
            }} />} />
            <Bar dataKey="p95" fill={`url(#${gradientId})`} radius={[5, 5, 0, 0]} maxBarSize={24} isAnimationActive={false} />
            <Line dataKey="average" type="monotone" stroke="var(--color-average)" strokeWidth={2.5} strokeLinecap="round" dot={{ r: 3, fill: "var(--card)", stroke: "var(--color-average)", strokeWidth: 2 }} activeDot={{ r: 5, fill: "var(--color-average)", stroke: "var(--card)", strokeWidth: 3 }} isAnimationActive={false} />
          </ComposedChart>
        </ChartContainer>
        <SeriesLegend config={latencyConfig} lines={["average"]} />
      </CardContent>
      <CardFooter className="mt-auto gap-2 bg-muted/20 text-xs text-muted-foreground">
        <InfoIcon className="size-4 shrink-0" />
        <span>P95는 요청 <span className="tabular-nums">{(95).toLocaleString("ko-KR")}%</span>가 이 시간 안에 응답했다는 뜻이에요.</span>
      </CardFooter>
    </Panel>
  )
}

function QualityExample() {
  return (
    <Panel className="min-w-0 gap-5 @container/chart-panel">
      <ExampleHeader title="데이터 품질 균형" type="레이더" />
      <CardContent className="space-y-6">
        <div>
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight tabular-nums">{qualityAverage.toLocaleString("ko-KR")}</span>
            <span className="text-sm text-muted-foreground">점 / 다섯 항목 평균</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">항목별 강점과 개선할 지점을 함께 살펴봐요.</p>
        </div>
        <div className="flex flex-col items-center gap-6 @md/chart-panel:flex-row">
          <ChartContainer config={qualityConfig} className="h-60 w-60 max-w-full shrink-0 aspect-auto tabular-nums" aria-label="완전성, 정확성, 일관성, 최신성, 유효성의 이전 및 이번 점검 점수를 100점 척도로 비교한 레이더 차트">
            <RadarChart accessibilityLayer data={qualityData} outerRadius="70%" margin={{ top: 12, right: 12, bottom: 12, left: 12 }}>
              <PolarGrid stroke="var(--border)" strokeOpacity={0.65} gridType="circle" radialLines={false} />
              <PolarAngleAxis dataKey="metric" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
              <PolarRadiusAxis domain={[0, 100]} tickCount={5} tick={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent className={tooltipClassName} labelFormatter={(_label, payload) => payload?.[0]?.payload?.metric} formatter={(value, name) => {
                const series = qualityConfig[String(name) as keyof typeof qualityConfig]
                return <TooltipValue label={series?.label ?? name} value={value} color={series?.color} unit="점" />
              }} />} />
              <Radar dataKey="previous" stroke="var(--color-previous)" strokeWidth={1.5} strokeDasharray="3 4" fill="var(--color-previous)" fillOpacity={0.02} isAnimationActive={false} />
              <Radar dataKey="current" stroke="var(--color-current)" strokeWidth={2} strokeLinejoin="round" fill="var(--color-current)" fillOpacity={0.1} dot={{ r: 3, fill: "var(--card)", stroke: "var(--color-current)", strokeWidth: 2 }} isAnimationActive={false} />
            </RadarChart>
          </ChartContainer>
          <ul className="w-full min-w-0 space-y-3 text-xs" aria-label="이번 점검의 항목별 점수">
            {qualityData.map((row) => (
              <li key={row.metric} className="flex items-baseline justify-between gap-3">
                <span className="text-muted-foreground">{row.metric}</span>
                <span className="font-medium tabular-nums">{row.current.toLocaleString("ko-KR")}<span className="ml-1 font-normal text-muted-foreground">점</span></span>
              </li>
            ))}
          </ul>
        </div>
        <SeriesLegend config={qualityConfig} lines={["previous", "current"]} />
      </CardContent>
      <CardFooter className="mt-auto gap-2 bg-muted/20 text-xs text-muted-foreground">
        <ArrowUpRightIcon className="size-4 shrink-0 text-brand" />
        <span>이전 점검보다 평균 <span className="font-medium text-foreground tabular-nums">{(qualityAverage - previousQualityAverage).toLocaleString("ko-KR", { maximumFractionDigits: 1 })}점</span> 높아졌어요. 모든 항목은 <span className="tabular-nums">{(100).toLocaleString("ko-KR")}점</span> 기준이에요.</span>
      </CardFooter>
    </Panel>
  )
}

const examples = [
  { id: "volume", category: "comparison", component: VolumeExample },
  { id: "source", category: "distribution", component: SourceExample },
  { id: "latency", category: "comparison", component: LatencyExample },
  { id: "quality", category: "distribution", component: QualityExample },
]

/** 독립적인 목업 데이터로 차트의 비교·분포 패턴을 살펴보는 예시 모음이에요. */
export function ChartExamples() {
  const [category, setCategory] = React.useState("all")
  const visibleExamples = examples.filter((example) => category === "all" || example.category === category)

  return (
    <section id="chart-examples" className="flex scroll-mt-24 flex-col gap-5" aria-labelledby="chart-examples-title">
      <header className="flex flex-col gap-4 @3xl/main:flex-row @3xl/main:items-end @3xl/main:justify-between">
        <div>
          <h2 id="chart-examples-title" className="text-base font-semibold">그래프 예시 <span className="ml-1 text-muted-foreground tabular-nums">{visibleExamples.length.toLocaleString("ko-KR")}</span></h2>
          <p className="mt-1 text-xs text-muted-foreground">각 예시는 독립적인 샘플 데이터를 사용해요.</p>
        </div>
        <div role="group" aria-label="그래프 유형 필터" className="flex w-fit max-w-full flex-wrap gap-1 rounded-xl border border-border bg-muted/40 p-1">
          {[
            { value: "all", label: "전체" },
            { value: "comparison", label: "비교·추이" },
            { value: "distribution", label: "분포·구성" },
          ].map((item) => (
            <Button key={item.value} variant={category === item.value ? "secondary" : "ghost"} size="sm" aria-pressed={category === item.value} onClick={() => setCategory(item.value)} className={category === item.value ? "rounded-lg bg-card shadow-sm" : "rounded-lg text-muted-foreground"}>
              {item.label}
            </Button>
          ))}
        </div>
      </header>
      <p className="sr-only" role="status">그래프 예시 {visibleExamples.length.toLocaleString("ko-KR")}개 표시 중</p>
      <div className="grid grid-cols-1 gap-5 @3xl/main:grid-cols-2">
        {visibleExamples.map(({ id, component: Example }) => <Example key={id} />)}
      </div>
      <p className="text-xs text-muted-foreground">각 그래프는 독립적인 예시 데이터를 사용해요. 그래프 위에 마우스를 올리거나 키보드로 탐색하면 세부 값을 확인할 수 있어요.</p>
    </section>
  )
}
