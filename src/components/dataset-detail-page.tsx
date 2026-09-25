import * as React from "react"
import { ArrowLeftIcon, ArrowUpRightIcon, BookmarkIcon, CheckIcon, DownloadIcon, ExpandIcon, FileSpreadsheetIcon, ImageOffIcon } from "lucide-react"

import { detailDataset } from "@/app/dashboard/detail-data"
import { ActivityFeed } from "@/components/reference/activity-feed"
import { ExampleDialog } from "@/components/reference/example-dialog"
import { MetricList } from "@/components/reference/metric-list"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const updateHistory = [
  { kind: "done" as const, title: "6월 데이터 수집 완료", detail: "입출고 기록의 필수 항목과 중복 여부를 점검했어요.", at: "2024-06-30T09:00:00+09:00" },
  { kind: "done" as const, title: "필드 설명 보완", detail: "처리 일시의 기준 시간대와 수량 단위를 명시했어요.", at: "2024-06-24T14:30:00+09:00" },
  { kind: "started" as const, title: "데이터셋 등록", detail: "물류 데이터팀에서 첫 수집을 시작했어요.", at: "2024-06-01T09:00:00+09:00" },
]

export function DatasetDetailPage({ onBack, onOpenModals }: { onBack: () => void; onOpenModals: () => void }) {
  const [imageOpen, setImageOpen] = React.useState(false)
  const [saved, setSaved] = React.useState(false)
  const [imageError, setImageError] = React.useState(false)
  const imageUrl = `${import.meta.env.BASE_URL}${detailDataset.image}`

  return (
    <article className="space-y-6" aria-label="물류센터 입출고 데이터 상세 예시">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" onClick={onBack} className="-ml-2 text-muted-foreground"><ArrowLeftIcon /> 데이터셋 목록</Button>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" aria-pressed={saved} onClick={() => setSaved((value) => !value)} className="h-9 bg-card">
            <BookmarkIcon className={saved ? "fill-brand text-brand" : ""} />{saved ? "관심 해제" : "관심 데이터"}
          </Button>
          <Button asChild className="h-9 bg-brand text-brand-foreground hover:bg-brand-hover">
            <a href={`${import.meta.env.BASE_URL}samples/warehouse-operations.csv`} download="warehouse-operations-sample.csv"><DownloadIcon /> 샘플 CSV 받기</a>
          </Button>
        </div>
      </div>

      <div className="grid items-start gap-6 @4xl/main:grid-cols-3">
        <div className="min-w-0 space-y-6 @4xl/main:col-span-2">
          <figure className="overflow-hidden rounded-2xl border bg-card">
            <button type="button" className="group relative block w-full overflow-hidden bg-muted outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-ring" aria-label="물류센터 이미지 크게 보기" onClick={() => setImageOpen(true)} disabled={imageError}>
              {imageError ? (
                <span className="flex h-64 flex-col items-center justify-center gap-3 px-6 text-sm text-muted-foreground"><ImageOffIcon className="size-8" />이미지를 불러오지 못했어요.</span>
              ) : (
                <img src={imageUrl} alt={detailDataset.imageAlt} width={1536} height={1024} onError={() => setImageError(true)} className="h-64 w-full object-cover transition-transform duration-300 ease-out motion-safe:group-hover:scale-105 sm:h-80" />
              )}
              {!imageError && <span className="absolute right-4 bottom-4 flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-xs font-medium text-foreground shadow-sm"><ExpandIcon className="size-3.5" /> 크게 보기</span>}
            </button>
            <figcaption className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-xs text-muted-foreground">
              <span>보관 랙과 입출고 작업 공간</span>
              <span>AI 생성 이미지 · 가상 시설</span>
            </figcaption>
          </figure>

          <Tabs defaultValue="introduction" className="gap-6">
            <TabsList variant="line" aria-label="데이터셋 상세 정보" className="h-10 w-full justify-start gap-6 border-b p-0">
              <TabsTrigger value="introduction" className="h-10 flex-none px-0 data-active:text-brand after:bg-brand">소개</TabsTrigger>
              <TabsTrigger value="fields" className="h-10 flex-none px-0 data-active:text-brand after:bg-brand">필드 정의 <span className="text-xs text-muted-foreground tabular-nums">{detailDataset.fields.length.toLocaleString("ko-KR")}</span></TabsTrigger>
              <TabsTrigger value="history" className="h-10 flex-none px-0 data-active:text-brand after:bg-brand">변경 이력</TabsTrigger>
            </TabsList>
            <TabsContent value="introduction" className="space-y-7">
              <section className="space-y-3" aria-labelledby="dataset-introduction">
                <h2 id="dataset-introduction" className="text-base font-semibold">데이터셋 소개</h2>
                <p className="max-w-prose text-sm leading-7 text-muted-foreground">{detailDataset.description}</p>
              </section>
              <section className="space-y-3" aria-labelledby="dataset-uses">
                <h2 id="dataset-uses" className="text-base font-semibold">이렇게 활용해요</h2>
                <ul className="space-y-3 text-sm">
                  {["날짜별 입고·출고 수량을 비교해 업무량을 파악해요.", "센터와 품목별로 묶어 재고 이동 패턴을 살펴봐요.", "운영 리포트의 원천 데이터와 지표 정의를 공유해요."].map((text) => <li key={text} className="flex items-start gap-2.5"><CheckIcon className="mt-0.5 size-4 shrink-0 text-brand" /><span>{text}</span></li>)}
                </ul>
              </section>
              <div className="rounded-xl border bg-muted/30 p-4 text-xs leading-6 text-muted-foreground">
                화면의 수치와 변경 이력은 독립적인 예시예요. 내려받는 CSV에는 필드 구조를 확인할 수 있는 샘플 { (3).toLocaleString("ko-KR") }행이 들어 있어요.
              </div>
            </TabsContent>
            <TabsContent value="fields">
              <h2 className="mb-4 text-base font-semibold">필드 정의</h2>
              <dl className="divide-y rounded-xl border bg-card px-4">
                {detailDataset.fields.map((field) => (
                  <div key={field.key} className="space-y-2 py-4">
                    <dt className="flex flex-wrap items-center gap-2"><span className="font-medium">{field.name}</span><code className="text-xs text-muted-foreground">{field.key}</code><Badge variant="outline" className="ml-auto">{field.type}</Badge></dt>
                    <dd className="text-sm leading-6 text-muted-foreground">{field.description}</dd>
                  </div>
                ))}
              </dl>
            </TabsContent>
            <TabsContent value="history">
              <h2 className="mb-5 text-base font-semibold">변경 이력</h2>
              <ActivityFeed items={updateHistory} />
            </TabsContent>
          </Tabs>
        </div>

        <aside className="min-w-0 space-y-5" aria-label="데이터셋 기본 정보">
          <section className="rounded-2xl border bg-card p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold">기본 정보</h2>
              <Badge variant="outline" className="gap-1.5"><CheckIcon /> 수집 완료</Badge>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{detailDataset.id} · 예시 데이터셋</p>
            <div className="mt-5 border-t pt-2">
              <MetricList items={[
                { label: "담당 팀", value: detailDataset.owner },
                { label: "데이터 원천", value: detailDataset.source },
                { label: "수집 주기", value: "매일 09:00" },
                { label: "기준 시간대", value: "한국 · KST" },
                { label: "전체 행 수", value: `${detailDataset.rowCount.toLocaleString("ko-KR")}행` },
                { label: "필드 수", value: `${detailDataset.fields.length.toLocaleString("ko-KR")}개` },
                { label: "최종 갱신", value: new Date(detailDataset.updatedAt).toLocaleDateString("ko-KR", { timeZone: "Asia/Seoul" }) },
              ]} />
            </div>
            <p className="mt-4 border-t pt-4 text-xs leading-5 text-muted-foreground" role="status">{saved ? "현재 화면에서 관심 데이터로 표시했어요. 새로고침하거나 화면을 나가면 초기화돼요." : "관심 데이터 표시는 현재 화면에서만 유지돼요."}</p>
          </section>
          <section className="rounded-2xl border bg-card p-5">
            <div className="flex items-start gap-3"><FileSpreadsheetIcon className="mt-0.5 size-5 shrink-0 text-brand" /><div><h2 className="text-sm font-semibold">먼저 구조를 살펴보세요</h2><p className="mt-2 text-xs leading-6 text-muted-foreground">샘플 CSV와 필드 정의를 참고해 사내 데이터에 맞는 상세 화면을 만들 수 있어요.</p></div></div>
            <Button variant="ghost" onClick={onOpenModals} className="mt-4 w-full justify-between text-brand">모달 예시 둘러보기 <ArrowUpRightIcon /></Button>
          </section>
        </aside>
      </div>

      <ExampleDialog open={imageOpen} onOpenChange={setImageOpen} title="물류센터 이미지" description="상세 페이지에 사용하는 AI 생성 예시 이미지예요. 실제 시설의 사진이 아니에요." className="max-w-5xl" bodyClassName="p-0">
        <img src={imageUrl} alt={detailDataset.imageAlt} width={1536} height={1024} className="h-auto max-h-dvh w-full object-contain" />
      </ExampleDialog>
    </article>
  )
}
