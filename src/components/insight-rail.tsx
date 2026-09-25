import { Cell, Pie, PieChart } from "recharts"
import { TriangleAlertIcon } from "lucide-react"

import { CardContent, CardHeader } from "@/components/ui/card"
import { ActivityFeed } from "@/components/reference/activity-feed"
import { AlertRow, DeviceStrip } from "@/components/reference/alert-panel"
import { HatchBarChart } from "@/components/reference/hatch-bar-chart"
import { StatusBadge } from "@/components/reference/indicators"
import {
  MatrixHeatmap,
  MatrixLegend,
  type MatrixRow,
} from "@/components/reference/matrix-heatmap"
import { MetricList } from "@/components/reference/metric-list"
import { Panel } from "@/components/reference/panel"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const yieldConfig = {
  collect: { label: "수집", color: "var(--chart-1)" },
  clean: { label: "정제", color: "var(--chart-2)" },
  load: { label: "적재", color: "var(--chart-3)" },
} satisfies ChartConfig

const yieldData = [
  { stage: "collect", value: 100 },
  { stage: "clean", value: 89 },
  { stage: "load", value: 53 },
]

const activityItems = [
  {
    kind: "failed" as const,
    title: "채널 B 적재 실패",
    detail: "스키마 불일치 — 컬럼 order_at 이 응답에 없어요",
    at: "2024-06-30T09:12:00",
  },
  {
    kind: "retried" as const,
    title: "채널 B 재시도 3회차",
    detail: "5분 뒤 자동 재시도해요",
    at: "2024-06-30T09:05:00",
  },
  {
    kind: "done" as const,
    title: "일별 매출 집계 완료",
    detail: `${(12480).toLocaleString("ko-KR")}건 적재`,
    at: "2024-06-30T08:40:00",
  },
]

const matrixRows: MatrixRow[] = [
  { label: "채널 A", cells: ["pass", "pass", "warn", "pass", "pass", "pass", "pass", "pass"] },
  { label: "채널 B", cells: ["pass", "pass", "pass", "fail", "pass", "pass", "warn", "pass"] },
  { label: "채널 C", cells: ["pass", "warn", "pass", "pass", "pass", "fail", "pass", "pass"] },
  { label: "채널 D", cells: ["pass", "pass", "pass", "pass", "warn", "pass", "pass", "pass"] },
  { label: "채널 E", cells: ["warn", "pass", "fail", "pass", "pass", "pass", "pass", "warn"] },
  { label: "채널 F", cells: ["pass", "fail", "pass", "pass", "pass", "warn", "pass", "pass"] },
]

const sourceConfig = {
  desktop: { label: "웹", color: "var(--chart-1)" },
  mobile: { label: "모바일 앱", color: "var(--chart-2)" },
} satisfies ChartConfig

// 2024년 6월 목업을 집계한 고정 예시예요. 왼쪽 차트의 기간 선택과는 독립적이에요.
const sourceTotals = { desktop: 8792, mobile: 9090 }
const sourceTotal = sourceTotals.desktop + sourceTotals.mobile
const sourceData = (Object.keys(sourceTotals) as (keyof typeof sourceTotals)[]).map((key) => ({
  source: key,
  value: sourceTotals[key],
  fill: `var(--color-${key})`,
}))
const completed = 1196
const target = 1280
const completionRate = (completed / target) * 100
const formatPercent = (value: number) => value.toLocaleString("ko-KR", { maximumFractionDigits: 1 })
const failedChecks = matrixRows.reduce((count, row) => count + row.cells.filter((cell) => cell === "fail").length, 0)

/** 개요에는 소스 구성과 처리 현황만 남기고, 자세한 진단은 품질 화면에 보여줘요. */
export function InsightRail() {
  return (
    <div className="grid min-w-0 gap-4 @xl/main:grid-cols-2 @4xl/main:grid-cols-1">
      <Panel className="gap-3 py-5">
        <CardHeader className="px-5">
          <h2 className="text-base font-semibold">유입 소스</h2>
          <p className="text-xs text-muted-foreground">2024년 6월 · 30일 합계</p>
        </CardHeader>
        <CardContent className="flex items-center gap-4 px-5">
          <div className="relative w-28 shrink-0">
            <ChartContainer config={sourceConfig} className="aspect-square w-full" aria-label="6월 유입 소스별 구성 비율">
              <PieChart accessibilityLayer>
                <ChartTooltip
                  cursor={false}
                  offset={12}
                  isAnimationActive={false}
                  content={
                    <ChartTooltipContent
                      className="rounded-xl border-border bg-card px-3.5 py-3 shadow-lg"
                      hideLabel
                      nameKey="source"
                      formatter={(value, name) => (
                        <div className="flex items-center gap-4">
                          <span>{sourceConfig[name as keyof typeof sourceConfig]?.label}</span>
                          <span className="font-medium tabular-nums">{Number(value).toLocaleString("ko-KR")}건</span>
                        </div>
                      )}
                    />
                  }
                />
                <Pie data={sourceData} dataKey="value" nameKey="source" innerRadius="73%" outerRadius="94%" paddingAngle={5} cornerRadius={4} startAngle={90} endAngle={-270} stroke="var(--card)" strokeWidth={2} isAnimationActive={false}>
                  {sourceData.map((item) => <Cell key={item.source} fill={item.fill} />)}
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1" aria-hidden>
              <span className="text-xl font-semibold tracking-tight tabular-nums">{formatPercent(sourceTotals.desktop / sourceTotal * 100)}<span className="text-xs font-normal">%</span></span>
              <span className="text-xs text-muted-foreground">웹 비중</span>
            </div>
          </div>
          <dl className="min-w-0 flex-1 space-y-4">
            {sourceData.map((item) => (
              <div key={item.source}>
                <dt className="flex items-center justify-between gap-2 text-xs">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <span className={item.source === "desktop" ? "size-2 rounded-full bg-chart-1" : "size-2 rounded-full bg-chart-2"} aria-hidden />
                    {sourceConfig[item.source].label}
                  </span>
                  <span className="tabular-nums">{formatPercent(item.value / sourceTotal * 100)}%</span>
                </dt>
                <dd className="mt-1 text-base font-semibold tabular-nums">{item.value.toLocaleString("ko-KR")}<span className="ml-1 text-xs font-normal text-muted-foreground">건</span></dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Panel>

      <Panel className="gap-4 py-5">
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2 px-5">
          <h2 className="text-base font-semibold">파이프라인 현황</h2>
          <StatusBadge status="running" label="처리 중" />
        </CardHeader>
        <CardContent className="space-y-3 px-5">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-2xl font-semibold tracking-tight tabular-nums">{formatPercent(completionRate)}<span className="ml-0.5 text-sm font-normal text-muted-foreground">%</span></p>
            <p className="text-xs text-muted-foreground tabular-nums">{completed.toLocaleString("ko-KR")} / {target.toLocaleString("ko-KR")}건 완료</p>
          </div>
          <div role="progressbar" aria-label="파이프라인 처리 진행률" aria-valuemin={0} aria-valuemax={target} aria-valuenow={completed} aria-valuetext={`${target.toLocaleString("ko-KR")}건 중 ${completed.toLocaleString("ko-KR")}건 완료`} className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-chart-1" style={{ width: `${completionRate}%` }} />
          </div>
          <div className="flex items-start gap-2 border-t border-border pt-3 text-xs">
            <TriangleAlertIcon className="mt-0.5 size-3.5 shrink-0 text-destructive" aria-hidden />
            <p className="leading-relaxed text-muted-foreground"><span className="font-medium text-foreground">채널 B 적재 실패</span> · 스키마를 확인해 주세요</p>
          </div>
        </CardContent>
      </Panel>
    </div>
  )
}

/** 데이터 품질 화면에서 사용하는 상세 진단 패널이에요. */
export function OperationalDetails() {
  return (
    <div className="grid min-w-0 gap-6 xl:grid-cols-2">
      <Panel className="gap-5 py-6">
        <CardHeader className="px-6">
          <h2 className="text-base font-semibold">채널별 점검 결과</h2>
          <p className="text-sm text-muted-foreground">6개 채널의 최근 8회 점검 기록이에요</p>
        </CardHeader>
        <CardContent className="space-y-4 px-6">
          <MatrixLegend summary={`실패 ${failedChecks.toLocaleString("ko-KR")}건`} />
          <MatrixHeatmap rows={matrixRows} />
        </CardContent>
      </Panel>

      <Panel className="gap-5 py-6">
        <CardHeader className="px-6">
          <h2 className="text-base font-semibold">최근 활동</h2>
          <p className="text-sm text-muted-foreground">2024년 6월 30일 · 예시 기록</p>
        </CardHeader>
        <CardContent className="px-6"><ActivityFeed items={activityItems} /></CardContent>
      </Panel>

      <Panel className="gap-5 py-6">
        <CardHeader className="flex flex-row items-start justify-between gap-3 px-6">
          <div>
            <h2 className="text-base font-semibold">채널 B-04</h2>
            <p className="mt-1 text-sm text-muted-foreground">주문 수집기 상태를 살펴봐요</p>
          </div>
          <StatusBadge status="alert" label="점검 필요" />
        </CardHeader>
        <CardContent className="space-y-4 px-6">
          <MetricList items={[
            { label: "상태", value: <StatusBadge status="running" /> },
            { label: "처리율", value: `${(92.4).toLocaleString("ko-KR")}%` },
            { label: "평균 지연", value: `${(18.2).toLocaleString("ko-KR")}초` },
            { label: "큐 적재량", value: `${(248).toLocaleString("ko-KR")}건` },
          ]} />
          <div className="space-y-3 border-t border-border pt-4">
            <AlertRow title="채널 B · 수집기 3" detail="스키마 불일치로 적재 실패" />
            <DeviceStrip count={6} alertIndex={3} labelPrefix="수집기" />
          </div>
        </CardContent>
      </Panel>

      <Panel className="gap-5 py-6">
        <CardHeader className="px-6">
          <h2 className="text-base font-semibold">단계별 처리 진행률</h2>
          <p className="text-sm text-muted-foreground">수집부터 적재까지 병목을 확인해요</p>
        </CardHeader>
        <CardContent className="px-6">
          <HatchBarChart data={yieldData} config={yieldConfig} className="h-48" />
        </CardContent>
        <p className="px-6 text-xs text-muted-foreground">별도 배치 기준의 예시 진행률이에요</p>
      </Panel>
    </div>
  )
}
