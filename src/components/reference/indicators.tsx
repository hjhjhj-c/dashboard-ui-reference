import {
  CheckCircle2Icon,
  CircleDashedIcon,
  LoaderCircleIcon,
  MinusIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  TriangleAlertIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

/**
 * 도트 매트릭스 — "24/38"처럼 셀 수 있는 진행도를 눈금으로 보여줘요.
 * 레퍼런스의 KPI 카드 오른쪽에 붙던 작은 점 격자입니다.
 */
function DotMatrix({
  value,
  total,
  columns = 6,
  className,
}: {
  value: number
  total: number
  columns?: number
  className?: string
}) {
  const filled = Math.max(0, Math.min(value, total))
  return (
    <div
      className={cn("grid w-fit gap-1", className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      role="img"
      aria-label={`${total}칸 중 ${filled}칸 진행`}
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn(
            "size-1.5 rounded-full",
            i < filled ? "bg-foreground" : "bg-foreground/15"
          )}
        />
      ))}
    </div>
  )
}

/**
 * 링 스텝 — 4단계 중 몇 단계인지 원으로 보여줘요.
 * 마지막 활성 단계만 테두리 링으로 강조하는 게 레퍼런스의 규칙입니다.
 */
function RingSteps({
  value,
  total = 4,
  className,
}: {
  value: number
  total?: number
  className?: string
}) {
  return (
    <div
      className={cn("flex items-center gap-1.5", className)}
      role="img"
      aria-label={`${total}단계 중 ${value}단계`}
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn(
            "size-2.5 rounded-full",
            i < value - 1 && "bg-foreground/20",
            i === value - 1 && "ring-2 ring-foreground ring-inset",
            i > value - 1 && "bg-foreground/10"
          )}
        />
      ))}
    </div>
  )
}

/**
 * 증감 배지 — 그라디언트 타일이나 KPI 카드에 붙는 알약형 델타 표시.
 * 색만으로 구분하지 않도록 화살표 아이콘을 항상 함께 넣어요.
 */
function DeltaBadge({
  value,
  suffix = "%",
  tone = "auto",
  className,
}: {
  value: number
  suffix?: string
  /** auto = 부호에 따라 색 결정, plain = 배경 위에서 쓰는 무채색 */
  tone?: "auto" | "plain"
  className?: string
}) {
  const Icon =
    value > 0 ? TrendingUpIcon : value < 0 ? TrendingDownIcon : MinusIcon
  const label = `${value > 0 ? "+" : ""}${value.toLocaleString("ko-KR")}${suffix}`

  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1 rounded-full px-2 text-xs font-medium tabular-nums",
        tone === "plain"
          ? "bg-white/20 text-white backdrop-blur-sm"
          : value > 0
            ? "bg-success/12 text-success"
            : value < 0
              ? "bg-destructive/10 text-destructive"
              : "bg-muted text-muted-foreground",
        className
      )}
    >
      <Icon className="size-3" aria-hidden />
      {label}
    </span>
  )
}

const STATUS_MAP = {
  running: { label: "가동 중", icon: LoaderCircleIcon, className: "bg-brand/12 text-brand" },
  done: { label: "완료", icon: CheckCircle2Icon, className: "bg-success/12 text-success" },
  waiting: { label: "대기", icon: CircleDashedIcon, className: "bg-muted text-muted-foreground" },
  alert: { label: "점검 필요", icon: TriangleAlertIcon, className: "bg-destructive/10 text-destructive" },
} as const

type StatusKey = keyof typeof STATUS_MAP

/** 상태 배지 — 색 + 아이콘 + 텍스트를 항상 함께 씁니다(색만으로 구분 금지). */
function StatusBadge({
  status,
  label,
  className,
}: {
  status: StatusKey
  label?: string
  className?: string
}) {
  const { label: fallback, icon: Icon, className: tone } = STATUS_MAP[status]
  return (
    <Badge className={cn("h-6 gap-1 px-2", tone, className)}>
      <Icon aria-hidden />
      {label ?? fallback}
    </Badge>
  )
}

export { DotMatrix, RingSteps, DeltaBadge, StatusBadge, STATUS_MAP }
export type { StatusKey }
