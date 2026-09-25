import { ArrowUpRightIcon, DownloadIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { dashboardViews, type DashboardView } from "@/lib/dashboard-navigation"

export function DashboardHero({ view, onViewChange, onExport }: {
  view: DashboardView
  onViewChange: (view: DashboardView) => void
  onExport: () => void
}) {
  return (
    <section className="flex flex-wrap items-end justify-between gap-5">
      <div className="min-w-0">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          {dashboardViews[view].title}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{dashboardViews[view].description}</p>
      </div>
      <div className="flex items-center gap-2">
        {view !== "detail" && view !== "modals" && <Button variant="outline" className="h-9 bg-card px-3" onClick={onExport}>
          <DownloadIcon /> 샘플 CSV
        </Button>}
        {view === "overview" ? (
          <Button className="h-9 bg-brand px-3 text-brand-foreground hover:bg-brand-hover" onClick={() => onViewChange("charts")}>
            그래프 둘러보기 <ArrowUpRightIcon />
          </Button>
        ) : null}
      </div>
    </section>
  )
}
