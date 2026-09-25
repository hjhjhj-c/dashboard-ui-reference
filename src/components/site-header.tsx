import { ChevronRightIcon, Layers2Icon } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { ColorThemeSelector } from "@/components/color-theme-selector"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { dashboardViews, type DashboardView } from "@/lib/dashboard-navigation"

export function SiteHeader({ view }: { view: DashboardView }) {
  return (
    <header className="sticky top-0 z-20 flex h-(--header-height) shrink-0 items-center justify-between gap-3 border-b bg-background px-4 lg:px-8">
      <div className="flex min-w-0 items-center gap-2 text-sm">
        <SidebarTrigger className="md:hidden" />
        <Layers2Icon className="hidden size-4 text-muted-foreground sm:block" />
        <span className="hidden text-muted-foreground sm:inline">데이터 워크스페이스</span>
        <ChevronRightIcon className="hidden size-3.5 text-muted-foreground sm:block" />
        <span className="truncate font-medium" title={dashboardViews[view].label}>{dashboardViews[view].label}</span>
      </div>
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
        <span className="hidden rounded-md border px-2 py-1 text-xs text-muted-foreground md:inline">샘플 데이터</span>
        <ColorThemeSelector />
        <ThemeToggle />
        <span className="flex size-8 items-center justify-center rounded-full bg-brand/10 text-xs font-semibold text-brand" title="김수진 · 데이터 운영">김</span>
      </div>
    </header>
  )
}
