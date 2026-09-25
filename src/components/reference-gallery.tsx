"use client"

import * as React from "react"
import {
  CalendarCheckIcon,
  GaugeIcon,
  LayersIcon,
  LineChartIcon,
  SparklesIcon,
  WalletIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { ActivityFeed } from "@/components/reference/activity-feed"
import { CompositionBar } from "@/components/reference/composition-bar"
import { EmptyState } from "@/components/reference/empty-state"
import { FilterBar, type ActiveFilter } from "@/components/reference/filter-bar"
import { ForecastChart } from "@/components/reference/forecast-chart"
import { FunnelSteps } from "@/components/reference/funnel-steps"
import {
  GradientTile,
  GradientTileAdd,
} from "@/components/reference/gradient-tiles"
import { GradientSummaryCard } from "@/components/reference/gradient-summary-card"
import {
  DeltaBadge,
  DotMatrix,
  RingSteps,
  StatusBadge,
} from "@/components/reference/indicators"
import { LiquidPill } from "@/components/reference/liquid-pill"
import {
  ChartSkeleton,
  StatCardSkeleton,
  TableSkeleton,
} from "@/components/reference/loading-blocks"
import { Panel, PanelHeader } from "@/components/reference/panel"
import {
  DayPicker,
  PeriodStepper,
  PillTabs,
} from "@/components/reference/pill-tabs"
import { RadialGauge } from "@/components/reference/radial-gauge"
import { RankingList } from "@/components/reference/ranking-list"
import { ScoreGauge } from "@/components/reference/score-gauge"
import { Sparkline } from "@/components/reference/sparkline"
import { StepProgress } from "@/components/reference/step-progress"
import { TimelineGrid } from "@/components/reference/timeline-grid"
import { TrendLineChart } from "@/components/reference/trend-line-chart"
import type { ChartConfig } from "@/components/ui/chart"

/** 레퍼런스 한 칸 — 이름, 언제 쓰는지, 그리고 실물 */
function Spec({
  title,
  usage,
  children,
  className,
}: {
  title: string
  usage: string
  children: React.ReactNode
  className?: string
}) {
  return (
    // min-w-0이 없으면 그리드 칸이 내용보다 작아지지 못해서,
    // 창을 줄일 때 Recharts가 예전 너비를 붙들고 가로 스크롤이 생겨요.
    <section className={cn("min-w-0", className)}>
      <h4 className="font-heading text-sm font-medium">{title}</h4>
      <p className="mt-1 mb-3 text-xs text-muted-foreground">{usage}</p>
      <div className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
        {children}
      </div>
    </section>
  )
}

/** 부품 묶음 — 제목 한 줄 + 2열 그리드 */
function Group({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="font-heading text-base font-medium text-muted-foreground">
        {title}
      </h3>
      <div className="grid grid-cols-1 gap-6 @3xl/main:grid-cols-2">
        {children}
      </div>
    </section>
  )
}

const trendConfig = {
  api: { label: "API 연동", color: "var(--chart-1)" },
  batch: { label: "배치 적재", color: "var(--chart-4)" },
  manual: { label: "수기 업로드", color: "var(--chart-5)" },
} satisfies ChartConfig

const trendData = [
  { label: "1월", api: 712, batch: 724, manual: 701 },
  { label: "2월", api: 718, batch: 719, manual: 706 },
  { label: "3월", api: 724, batch: 715, manual: 712 },
  { label: "4월", api: 730, batch: 708, manual: 716 },
  { label: "5월", api: 722, batch: 713, manual: 709 },
  { label: "6월", api: 719, batch: 721, manual: 714 },
  { label: "7월", api: 726, batch: 717, manual: 710 },
]

const forecastData = [
  { label: "6월 1일", value: 820 },
  { label: "6월 5일", value: 940 },
  { label: "6월 9일", value: 1180 },
  { label: "6월 13일", value: 1090 },
  { label: "6월 17일", value: 1320 },
  { label: "6월 21일", value: 1410 },
  { label: "6월 25일", value: 1360 },
  { label: "6월 29일", value: 1520 },
]

const timelineCells = [
  { label: "1월", state: "done" as const },
  { label: "2월", state: "done" as const },
  { label: "3월", state: "done" as const },
  { label: "4월", state: "failed" as const },
  { label: "5월", state: "done" as const },
  { label: "6월", state: "done" as const },
  { label: "7월", state: "upcoming" as const },
  { label: "8월", state: "upcoming" as const },
  { label: "9월", state: "upcoming" as const },
  { label: "10월", state: "upcoming" as const },
  { label: "11월", state: "upcoming" as const },
  { label: "12월", state: "upcoming" as const },
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
  {
    kind: "started" as const,
    title: "정기 수집 시작",
    at: "2024-06-30T08:00:00",
  },
]

/**
 * 레퍼런스 갤러리.
 *
 * 대시보드 본문에서 쓰지 않은 부품까지 한자리에 모아 뒀어요.
 * 새 화면을 만들 때 여기서 골라 `src/components/reference/`에서 그대로 가져다 쓰면 됩니다.
 */
export function ReferenceGallery() {
  const [tab, setTab] = React.useState("a")
  const [day, setDay] = React.useState(3)
  const [query, setQuery] = React.useState("매출")
  const [filters, setFilters] = React.useState<ActiveFilter[]>([
    { field: "유형", value: "실시간 스트림" },
    { field: "상태", value: "진행 중" },
  ])

  return (
    <section className="flex flex-col gap-10">
      <header>
        <h2 className="font-heading text-2xl font-medium tracking-tight">
          레퍼런스 부품
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          차트와 화면 부품을 종류별로 모았어요. 코드는{" "}
          <code className="rounded-sm bg-muted px-1 py-0.5 text-xs">
            src/components/reference/
          </code>{" "}
          에 있습니다.
        </p>
      </header>

      <Group title="차트와 수치">
        <Spec
          title="다중 선형 차트"
          usage="여러 계열을 비교하되 하나만 주인공일 때. 강조 지점은 하이라이트 배지 + 점선 + 삼각형 마커로 찍어요."
          className="@3xl/main:col-span-2"
        >
          <Panel className="ring-0">
            <PanelHeader icon={<LineChartIcon />} title="채널별 처리 점수" />
            <CardContent>
              <TrendLineChart
                data={trendData}
                config={trendConfig}
                primaryKey="api"
              />
            </CardContent>
          </Panel>
        </Spec>

        <Spec
          title="실측 → 예측 차트"
          usage="같은 지표인데 성질이 다를 때. 색을 늘리지 않고 실선·점선으로 나눕니다."
        >
          <ForecastChart data={forecastData} splitIndex={5} />
        </Spec>

        <Spec
          title="방사형 게이지"
          usage="상한이 정해진 값 하나를 작은 자리에. 달성률·가동률·사용량에 잘 맞아요."
        >
          <RadialGauge
            value={68}
            label="월 목표 달성률"
            caption="목표 대비 진행"
          />
        </Spec>

        <Spec
          title="구간 게이지"
          usage="숫자 하나만으로는 좋은지 나쁜지 모를 때. 구간을 잘라 두고 포인터로 위치를 찍어요."
        >
          <ScoreGauge
            value={730}
            min={600}
            unit="점"
            bands={[
              { max: 630, tone: "bad", label: "주의" },
              { max: 690, tone: "warn", label: "보통" },
              { max: 730, tone: "ok", label: "양호" },
              { max: 800, tone: "good", label: "우수" },
            ]}
          />
        </Spec>

        <Spec
          title="구성비 막대"
          usage="합쳐서 100%인 값. 파이 차트보다 자리를 덜 먹고 비율 비교도 정확해요."
        >
          <CompositionBar
            segments={[
              { label: "실시간 스트림", value: 52400, tone: "chart-1" },
              { label: "정기 수집", value: 38100, tone: "chart-2" },
              { label: "외부 연동", value: 24800, tone: "chart-3" },
              { label: "수동 업로드", value: 13150, tone: "chart-4" },
            ]}
          />
        </Spec>

        <Spec
          title="순위 목록"
          usage="상위 N개를 값 순으로. 이름이 길어도 잘리지 않고 증감까지 한 줄에 들어가요."
        >
          <RankingList
            items={[
              { label: "일별 매출 집계", value: 12480, delta: 8.4 },
              { label: "고객 문의 로그", value: 9310, delta: -2.1 },
              { label: "재고 스냅샷", value: 7620, delta: 3.7 },
              { label: "웹 트래픽 원본", value: 5140, delta: 0 },
            ]}
          />
        </Spec>

        <Spec
          title="퍼널"
          usage="단계를 지날 때마다 얼마나 남는지. 단계 사이에 직전 대비 전환율을 적어 어디서 새는지 보여줘요."
        >
          <FunnelSteps
            steps={[
              { label: "수집 요청", value: 128450 },
              { label: "파싱 성공", value: 124900 },
              { label: "검증 통과", value: 118200 },
              { label: "적재 완료", value: 116840 },
            ]}
          />
        </Spec>

        <Spec
          title="스파크라인"
          usage="KPI 카드나 표 셀 안에 넣는 손톱만 한 추이선. 정확한 값은 옆의 숫자가 책임져요."
        >
          <div className="flex flex-col gap-4">
            {[
              { label: "수집량", data: [12, 18, 15, 22, 28, 26, 34], tone: "brand" as const, delta: 12.5 },
              { label: "실패 건수", data: [30, 26, 28, 20, 16, 14, 9], tone: "success" as const, delta: -8.2 },
              { label: "평균 지연", data: [8, 9, 14, 12, 19, 24, 27], tone: "destructive" as const, delta: 6.1 },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-4"
              >
                <span className="text-sm text-muted-foreground">{row.label}</span>
                <span className="flex items-center gap-3">
                  <Sparkline data={row.data} tone={row.tone} />
                  <DeltaBadge value={row.delta} />
                </span>
              </div>
            ))}
          </div>
        </Spec>

        <Spec
          title="상태·진행 인디케이터"
          usage="숫자 옆에 붙여 '전체 중 어디쯤'을 알려주는 작은 부품들이에요."
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">도트 매트릭스</span>
              <DotMatrix value={17} total={24} columns={8} />
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">링 스텝</span>
              <RingSteps value={3} />
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">증감 배지</span>
              <span className="flex gap-2">
                <DeltaBadge value={12.5} />
                <DeltaBadge value={-8.2} />
                <DeltaBadge value={0} />
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">상태 배지</span>
              <span className="flex flex-wrap justify-end gap-2">
                <StatusBadge status="running" />
                <StatusBadge status="done" />
                <StatusBadge status="waiting" />
                <StatusBadge status="alert" />
              </span>
            </div>
          </div>
        </Spec>

        <Spec
          title="그라디언트 타일"
          usage="지표를 카드보다 가볍게 늘어놓을 때. 그라디언트는 index.css의 .mesh-* 유틸리티로만 정해요."
        >
          <div className="grid grid-cols-2 gap-3">
            <GradientTile
              label="일 평균 수집"
              value="16.2"
              unit="만건"
              delta={1}
              mesh="warm"
            />
            <GradientTile
              label="중복 제거율"
              value="2.8"
              unit="%"
              delta={-1}
              mesh="cool"
            />
            <GradientTile
              label="저장 용량"
              value="76"
              unit="GB"
              delta={0}
              mesh="brand"
            />
            <GradientTileAdd />
          </div>
        </Spec>

        <Spec
          title="그라디언트 요약 카드"
          usage="상세 화면의 첫 화면. 큰 숫자 하나와 그 숫자의 진행 위치를 함께 보여줍니다."
        >
          <GradientSummaryCard
            icon={<WalletIcon />}
            title="주문 수집 배치"
            label="처리 완료"
            prefix="₩"
            value={(12340).toLocaleString("ko-KR")}
            secondary={{ label: "기간", value: "36개월" }}
            progress={82}
            progressLeftLabel="처리함"
            progressLeftValue={`${(12340).toLocaleString("ko-KR")}건`}
            progressRightLabel="남음"
            progressRightValue={`${(2660).toLocaleString("ko-KR")}건`}
            footerLabel="다음 배치"
            footerValue={new Date("2024-07-03").toLocaleDateString("ko-KR")}
          />
        </Spec>
      </Group>

      <Group title="상태와 피드백">
        <Spec
          title="단계 진행 표시"
          usage="퍼센트 하나보다 '정제까지 끝났고 적재 중'이 더 많은 걸 알려줄 때."
          className="@3xl/main:col-span-2"
        >
          <StepProgress
            current={2}
            steps={[
              { label: "수집", detail: "1분 12초" },
              { label: "정제", detail: "3분 04초" },
              { label: "적재", detail: "진행 중" },
              { label: "검증", detail: "대기" },
            ]}
          />
        </Spec>

        <Spec
          title="활동 피드"
          usage="숫자가 '지금 얼마인가'라면 이건 '왜 그렇게 됐나'예요. 이상이 보일 때 제일 먼저 찾는 목록."
        >
          <ActivityFeed items={activityItems} />
        </Spec>

        <Spec
          title="빈 상태"
          usage="왜 비었는지 · 지금 어떤 상태인지 · 다음에 뭘 하면 되는지, 셋을 항상 같이 말해 줍니다."
        >
          <div className="flex flex-col divide-y">
            <EmptyState
              variant="search"
              title="조건에 맞는 데이터셋이 없어요"
              description="검색어나 필터를 바꿔 보세요."
              action={
                <Button variant="outline" size="sm" className="rounded-full">
                  필터 초기화
                </Button>
              }
            />
            <EmptyState
              variant="error"
              title="수집 서버에 연결하지 못했어요"
              description="잠시 뒤 다시 시도하거나 담당자에게 알려 주세요."
              action={
                <Button size="sm" className="rounded-full">
                  다시 시도
                </Button>
              }
            />
          </div>
        </Spec>

        <Spec
          title="로딩 스켈레톤"
          usage="스피너 대신 들어올 내용과 같은 모양을 깔아요. 데이터가 도착해도 레이아웃이 튀지 않아요."
          className="@3xl/main:col-span-2"
        >
          <div
            className="grid grid-cols-1 gap-4 @2xl/main:grid-cols-3"
            aria-busy="true"
          >
            <StatCardSkeleton />
            <ChartSkeleton />
            <TableSkeleton rows={3} />
          </div>
        </Spec>

        <Spec
          title="리퀴드 캡슐"
          usage="'지금 뭔가 돌아가고 있다'를 알릴 때. 알약 + 메시 그라디언트 + 느린 흐름 애니메이션."
        >
          <div className="flex flex-wrap items-center justify-center gap-3 py-2">
            <LiquidPill states={["수집 중…", "정제 중…", "적재 중…"]} />
            <LiquidPill states={["재시도 중…"]} mesh="mesh-warm" />
            <LiquidPill states={["동기화 중…"]} mesh="mesh-cool" />
          </div>
        </Spec>

        <Spec
          title="달력형 타임라인"
          usage="반복 작업이 달마다 잘 돌았는지 훑을 때. 색 + 아이콘 + 툴팁을 같이 씁니다."
        >
          <Panel className="ring-0">
            <PanelHeader icon={<CalendarCheckIcon />} title="월별 정산 배치" />
            <CardContent>
              <TimelineGrid title="2024년" cells={timelineCells} />
            </CardContent>
          </Panel>
        </Spec>
      </Group>

      <Group title="컨트롤">
        <Spec
          title="필터 바"
          usage="적용된 필터를 항상 눈에 보이게 둡니다. 드롭다운에 숨기면 '왜 3건뿐이지?' 하고 헤매게 돼요."
          className="@3xl/main:col-span-2"
        >
          <FilterBar
            query={query}
            onQueryChange={setQuery}
            filters={filters}
            resultCount={12}
            onRemoveFilter={(target) =>
              setFilters((prev) => prev.filter((f) => f !== target))
            }
            onReset={() => {
              setQuery("")
              setFilters([])
            }}
          />
        </Spec>

        <Spec
          title="선택 컨트롤"
          usage="알약 탭, 요일 선택, 기간 스테퍼. 셋 다 선택된 것만 채워서 표시해요."
        >
          <div className="flex flex-col gap-4">
            <PillTabs
              items={[
                { value: "a", label: "개요", icon: <LayersIcon /> },
                { value: "b", label: "품질", icon: <GaugeIcon /> },
                { value: "c", label: "비용", icon: <SparklesIcon /> },
              ]}
              value={tab}
              onValueChange={setTab}
            />
            <DayPicker value={day} onValueChange={setDay} />
            <PeriodStepper label="6월 6일 – 6월 12일" />
          </div>
        </Spec>
      </Group>
    </section>
  )
}
