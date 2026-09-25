import type * as React from "react"
import { ArrowUpRightIcon, BlocksIcon, ChartNoAxesCombinedIcon, DatabaseIcon, ImageIcon, LayoutDashboardIcon, OrbitIcon, PanelsTopLeftIcon, ShieldCheckIcon } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { dashboardViews, type DashboardView } from "@/lib/dashboard-navigation"

const mainItems = [
  { view: "overview", icon: LayoutDashboardIcon },
  { view: "charts", icon: ChartNoAxesCombinedIcon },
  { view: "datasets", icon: DatabaseIcon },
  { view: "quality", icon: ShieldCheckIcon },
] as const

const resourceItems = [
  { view: "detail", icon: ImageIcon },
  { view: "modals", icon: PanelsTopLeftIcon },
  { view: "reference", icon: BlocksIcon },
] as const

export function AppSidebar({ view, onViewChange, ...props }: React.ComponentProps<typeof Sidebar> & {
  view: DashboardView
  onViewChange: (view: DashboardView) => void
}) {
  const { isMobile, setOpenMobile } = useSidebar()
  function navigate(next: DashboardView) {
    onViewChange(next)
    if (isMobile) setOpenMobile(false)
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="gap-6 px-4 pt-5 pb-4 group-data-[collapsible=icon]:px-2">
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => navigate("overview")} className="flex min-w-0 flex-1 items-center gap-2.5 rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-ring group-data-[collapsible=icon]:hidden" aria-label="Astra 대시보드 홈">
            <span className="flex size-8 items-center justify-center rounded-lg bg-brand text-brand-foreground"><OrbitIcon className="size-5" /></span>
            <span className="text-xl font-semibold tracking-tight">astra<span className="text-brand">.</span></span>
          </button>
          <SidebarTrigger className="shrink-0 text-muted-foreground group-data-[collapsible=icon]:mx-auto" />
        </div>
        <div className="flex items-center gap-2.5 rounded-lg border bg-background px-3 py-2.5 group-data-[collapsible=icon]:hidden">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted"><DatabaseIcon className="size-4 text-muted-foreground" /></span>
          <div className="min-w-0"><p className="truncate text-xs font-semibold" title="데이터 대시보드">데이터 대시보드</p><p className="mt-0.5 text-xs text-muted-foreground">팀 워크스페이스</p></div>
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-5">
        <SidebarGroup className="px-3 group-data-[collapsible=icon]:px-2">
          <SidebarGroupLabel className="mb-2 text-xs">워크스페이스</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {mainItems.map(({ view: key, icon: Icon }) => (
                <SidebarMenuItem key={key}>
                  <SidebarMenuButton tooltip={dashboardViews[key].label} isActive={view === key} aria-current={view === key ? "page" : undefined} onClick={() => navigate(key)} className="h-10 rounded-lg px-3 text-muted-foreground data-[active=true]:bg-brand/10 data-[active=true]:font-semibold data-[active=true]:text-brand">
                    <Icon className="size-4" /><span>{dashboardViews[key].label}</span>
                  </SidebarMenuButton>
                  {key === "charts" ? <SidebarMenuBadge className="top-2.5 bg-brand/10 text-brand tabular-nums">4</SidebarMenuBadge> : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="px-3 group-data-[collapsible=icon]:px-2">
          <SidebarGroupLabel className="mb-2 text-xs">리소스</SidebarGroupLabel>
          <SidebarMenu className="gap-1.5">
            {resourceItems.map(({ view: key, icon: Icon }) => (
              <SidebarMenuItem key={key}>
                <SidebarMenuButton tooltip={dashboardViews[key].label} isActive={view === key} aria-current={view === key ? "page" : undefined} onClick={() => navigate(key)} className="h-10 rounded-lg px-3 text-muted-foreground data-[active=true]:bg-brand/10 data-[active=true]:text-brand">
                  <Icon /><span>{dashboardViews[key].label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <div className="mt-auto mx-4 rounded-xl border border-brand/15 bg-brand/5 p-4 group-data-[collapsible=icon]:hidden">
          <ChartNoAxesCombinedIcon className="mb-3 size-5 text-brand" />
          <p className="text-sm font-semibold">같은 데이터, 새로운 시선</p>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">네 가지 그래프로 데이터의 다른 면을 발견해 보세요.</p>
          <button type="button" onClick={() => navigate("charts")} className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring">그래프 예시 보기 <ArrowUpRightIcon className="size-3.5" /></button>
        </div>
      </SidebarContent>
      <SidebarFooter className="mt-4 border-t p-4 group-data-[collapsible=icon]:px-2">
        <div className="flex items-center gap-2.5 group-data-[collapsible=icon]:justify-center">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold" title="김수진 · 데이터 운영">김</span>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden"><p className="text-sm font-medium">김수진</p><p className="text-xs text-muted-foreground">데이터 운영</p></div>
          <span className="ml-auto size-2 rounded-full bg-success group-data-[collapsible=icon]:hidden" role="img" aria-label="활성 사용자" />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
