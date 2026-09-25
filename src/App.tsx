import * as React from "react"
import { ArrowRightIcon, CalendarDaysIcon } from "lucide-react"
import { toast } from "sonner"
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DashboardHero } from "@/components/dashboard-hero"
import { DataTable } from "@/components/data-table"
import { InsightRail, OperationalDetails } from "@/components/insight-rail"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { Toaster } from "@/components/ui/sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"
import { dashboardViews, type DashboardView } from "@/lib/dashboard-navigation"
import data from "@/app/dashboard/data.json"

const ChartExamples = React.lazy(() => import("@/components/chart-examples").then((module) => ({ default: module.ChartExamples })))
const DatasetDetailPage = React.lazy(() => import("@/components/dataset-detail-page").then((module) => ({ default: module.DatasetDetailPage })))
const ModalExamples = React.lazy(() => import("@/components/modal-examples").then((module) => ({ default: module.ModalExamples })))
const ReferenceGallery = React.lazy(() => import("@/components/reference-gallery").then((module) => ({ default: module.ReferenceGallery })))
const viewKeys = Object.keys(dashboardViews) as DashboardView[]

function currentView(): DashboardView {
  const hash = window.location.hash.slice(1)
  return viewKeys.includes(hash as DashboardView) ? hash as DashboardView : "overview"
}

function exportDatasets() {
  const keys = ["id", "header", "type", "status", "target", "limit", "reviewer"] as const
  const csv = [
    ["ID", "이름", "유형", "상태", "목표", "상한", "담당자"],
    ...data.map((row) => keys.map((key) => String(row[key]))),
  ].map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(",")).join("\r\n")
  const url = URL.createObjectURL(new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8;" }))
  const link = document.createElement("a")
  link.href = url
  link.download = "astra-sample-datasets.csv"
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
  toast.success("샘플 데이터셋을 CSV로 내보냈어요.")
}

function ViewLoading() {
  return <div className="grid gap-4 sm:grid-cols-2" role="status" aria-label="화면을 불러오고 있어요"><Skeleton className="h-80 rounded-xl" /><Skeleton className="h-80 rounded-xl" /></div>
}

export default function App() {
  const [view, setView] = React.useState<DashboardView>(currentView)
  React.useEffect(() => {
    const onHashChange = () => setView(currentView())
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  function navigate(next: DashboardView) {
    setView(next)
    window.location.hash = next
    window.scrollTo({ top: 0, behavior: "instant" })
  }

  return (
    <TooltipProvider>
      <SidebarProvider style={{ "--sidebar-width": "calc(var(--spacing) * 60)", "--header-height": "calc(var(--spacing) * 16)" } as React.CSSProperties}>
        <AppSidebar view={view} onViewChange={navigate} />
        <SidebarInset className="min-w-0">
          <SiteHeader view={view} />
          <div className="@container/main mx-auto flex w-full max-w-400 flex-1 flex-col px-4 py-6 lg:px-8 lg:py-8">
            <DashboardHero view={view} onViewChange={navigate} onExport={exportDatasets} />
            <Tabs value={view} onValueChange={(value) => navigate(value as DashboardView)} className="mt-6 gap-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-1">
                <div className="min-w-0 max-w-full overflow-x-auto pb-1">
                  <TabsList variant="line" aria-label="대시보드 화면" className="h-10 gap-4">
                    {viewKeys.map((key) => <TabsTrigger key={key} value={key} className="px-1 py-2 text-sm data-active:text-brand after:bg-brand">{key === "overview" ? "개요" : dashboardViews[key].label}</TabsTrigger>)}
                  </TabsList>
                </div>
                {view !== "modals" && <p className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground tabular-nums"><CalendarDaysIcon className="size-3.5" />{new Date(2024, 5, 30).toLocaleDateString("ko-KR")} 기준</p>}
              </div>
              <TabsContent value={view === "datasets" ? "datasets" : "overview"} forceMount className="space-y-6 data-[state=inactive]:hidden">
                <React.Activity mode={view === "overview" ? "visible" : "hidden"}>
                <SectionCards />
                <div className="grid items-start gap-4 @4xl/main:grid-cols-3">
                  <div className="min-w-0 @4xl/main:col-span-2"><ChartAreaInteractive /></div>
                  <InsightRail />
                </div>
                </React.Activity>
                <section className="min-w-0 rounded-xl border bg-card p-4 sm:p-5">
                  <div className={view === "overview" ? "mb-5 flex items-center justify-between gap-3" : "hidden"}>
                    <div><h2 className="text-base font-semibold">데이터셋 현황</h2><p className="mt-1 text-xs text-muted-foreground">수집 상태와 담당자를 확인해요.</p></div>
                    <Button variant="ghost" onClick={() => navigate("datasets")}>전체 보기 <ArrowRightIcon /></Button>
                  </div>
                  <DataTable data={data} />
                </section>
              </TabsContent>
              <TabsContent value="charts"><React.Suspense fallback={<ViewLoading />}><ChartExamples /></React.Suspense></TabsContent>
              <TabsContent value="quality"><OperationalDetails /></TabsContent>
              <TabsContent value="detail"><React.Suspense fallback={<ViewLoading />}><DatasetDetailPage onBack={() => navigate("datasets")} onOpenModals={() => navigate("modals")} /></React.Suspense></TabsContent>
              <TabsContent value="modals"><React.Suspense fallback={<ViewLoading />}><ModalExamples /></React.Suspense></TabsContent>
              <TabsContent value="reference"><React.Suspense fallback={<ViewLoading />}><ReferenceGallery /></React.Suspense></TabsContent>
            </Tabs>
            <footer className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t pt-4 text-xs text-muted-foreground"><span>astra. · 데이터 대시보드</span><span>화면의 모든 수치는 UI 확인을 위한 샘플이에요.</span></footer>
          </div>
        </SidebarInset>
        <Toaster position="top-center" />
      </SidebarProvider>
    </TooltipProvider>
  )
}
