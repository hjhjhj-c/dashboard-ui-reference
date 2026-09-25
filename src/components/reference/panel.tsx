import type * as React from "react"
import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

/**
 * 레퍼런스 카드 골격.
 *
 * 모든 레퍼런스가 공유하는 구조는 세 줄로 요약돼요.
 *   헤더 = 원형 아이콘 칩 + 제목 + 오른쪽 끝 원형 고스트 버튼(↗)
 *   본문 = 숫자·차트 같은 내용물
 *   푸터 = 가운데 정렬된 흐린 설명 한 줄
 */
function Panel({ className, ...props }: React.ComponentProps<typeof Card>) {
  return <Card className={cn("gap-4 rounded-2xl", className)} {...props} />
}

function PanelHeader({
  icon,
  title,
  action,
  className,
}: {
  icon: React.ReactNode
  title: string
  /** 기본값은 ↗ 원형 버튼. false를 주면 액션을 숨겨요. */
  action?: React.ReactNode | false
  className?: string
}) {
  return (
    <CardHeader className={cn("flex flex-row items-center gap-2", className)}>
      <IconChip>{icon}</IconChip>
      <CardTitle className="min-w-0 flex-1 truncate" title={title}>
        {title}
      </CardTitle>
      {action === false ? null : (action ?? <RoundIconButton />)}
    </CardHeader>
  )
}

function PanelCaption({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "px-(--card-spacing) text-center text-xs text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

/** 원형 아이콘 칩 — 카드 제목 앞, KPI 카드 좌상단에 쓰는 부품 */
function IconChip({
  className,
  size = "sm",
  children,
  ...props
}: React.ComponentProps<"span"> & { size?: "sm" | "lg" }) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground",
        size === "sm"
          ? "size-7 [&>svg]:size-3.5"
          : "size-10 [&>svg]:size-5",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

/** 원형 고스트 버튼 — 레퍼런스에서 카드 우상단에 반복해서 나오는 ↗ 버튼 */
function RoundIconButton({
  className,
  label = "자세히 보기",
  children,
  ...props
}: React.ComponentProps<typeof Button> & { label?: string }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={label}
      className={cn(
        "size-8 rounded-full bg-muted text-muted-foreground hover:text-foreground",
        className
      )}
      {...props}
    >
      {children ?? <ArrowUpRightIcon />}
    </Button>
  )
}

export { Panel, PanelHeader, PanelCaption, IconChip, RoundIconButton }
