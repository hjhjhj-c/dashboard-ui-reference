import type * as React from "react"
import {
  InboxIcon,
  SearchXIcon,
  TriangleAlertIcon,
  WifiOffIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

const VARIANT = {
  empty: {
    icon: InboxIcon,
    tone: "bg-muted text-muted-foreground",
  },
  search: {
    icon: SearchXIcon,
    tone: "bg-muted text-muted-foreground",
  },
  error: {
    icon: TriangleAlertIcon,
    tone: "bg-destructive/10 text-destructive",
  },
  offline: {
    icon: WifiOffIcon,
    tone: "bg-warning text-warning-foreground",
  },
} as const

type EmptyVariant = keyof typeof VARIANT

/**
 * 빈 상태 — 보여줄 게 없을 때 화면을 그냥 비워 두지 않기 위한 부품이에요.
 *
 * 세 가지를 반드시 같이 말해 줍니다. **왜 비었는지 · 지금 어떤 상태인지 ·
 * 다음에 뭘 하면 되는지.** "데이터가 없습니다"만 덩그러니 두면
 * 고장인지 원래 그런 건지 알 수가 없어요.
 *
 * 카드 본문 자리에 그대로 끼워 넣도록 만들었습니다.
 */
function EmptyState({
  variant = "empty",
  title,
  description,
  action,
  className,
}: {
  variant?: EmptyVariant
  title: string
  description?: string
  /** 보통 Button 하나. 다음 행동이 없으면 생략해요. */
  action?: React.ReactNode
  className?: string
}) {
  const { icon: Icon, tone } = VARIANT[variant]

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 px-6 py-10 text-center",
        className
      )}
      role={variant === "error" ? "alert" : undefined}
    >
      <span
        className={cn(
          "flex size-12 items-center justify-center rounded-full",
          tone
        )}
      >
        <Icon className="size-5" aria-hidden />
      </span>
      <div className="flex flex-col gap-1">
        <p className="font-heading text-sm font-medium">{title}</p>
        {description ? (
          <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? <div className="pt-1">{action}</div> : null}
    </div>
  )
}

export { EmptyState }
export type { EmptyVariant }
