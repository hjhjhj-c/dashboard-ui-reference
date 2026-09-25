import { CheckIcon, MinusIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type TimelineState = "done" | "failed" | "upcoming"

const STATE = {
  done: {
    icon: CheckIcon,
    label: "완료",
    chip: "bg-success text-success-foreground",
  },
  failed: {
    icon: XIcon,
    label: "실패",
    chip: "bg-destructive/15 text-destructive",
  },
  upcoming: {
    icon: MinusIcon,
    label: "예정",
    chip: "bg-muted text-muted-foreground",
  },
} as const

type TimelineCell = { label: string; state: TimelineState }

/**
 * 달력형 타임라인 — CreditPros 상세 패널의 월별 격자가 원본이에요.
 *
 * 한 칸이 한 달. 이름 아래 동그란 상태 칩을 두고,
 * 상태는 색 + 아이콘 + 툴팁 텍스트 세 가지로 동시에 알려줘요.
 */
function TimelineGrid({
  title,
  cells,
  columns = 6,
  className,
}: {
  title?: string
  cells: TimelineCell[]
  columns?: number
  className?: string
}) {
  return (
    <section className={cn("flex flex-col gap-2", className)}>
      {title ? (
        <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
      ) : null}
      <ul
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {cells.map((cell) => {
          const { icon: Icon, label, chip } = STATE[cell.state]
          return (
            <li
              key={cell.label}
              title={`${cell.label} · ${label}`}
              className="flex flex-col items-center gap-2 rounded-xl bg-muted/60 px-1 py-3"
            >
              <span className="w-full truncate text-center text-xs text-muted-foreground">
                {cell.label}
              </span>
              <span
                className={cn(
                  "flex size-6 items-center justify-center rounded-full",
                  chip
                )}
              >
                <Icon className="size-3.5" aria-hidden />
                <span className="sr-only">{label}</span>
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export { TimelineGrid }
export type { TimelineCell, TimelineState }
