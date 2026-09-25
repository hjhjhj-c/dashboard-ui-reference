import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type MatrixLevel = "pass" | "warn" | "fail" | "none"

const LEVEL = {
  pass: { className: "bg-success", label: "정상" },
  warn: { className: "bg-warning", label: "주의" },
  fail: { className: "bg-destructive", label: "실패" },
  none: { className: "bg-muted", label: "데이터 없음" },
} as const

type MatrixRow = {
  label: string
  cells: MatrixLevel[]
}

/**
 * 점검 매트릭스 — Ventra의 "Inspection Matrix"가 원본이에요.
 *
 * 행은 라인·배치처럼 반복되는 대상, 열은 시간 순서. 한 칸이 한 번의 점검입니다.
 * 색만으로는 못 읽으니 각 칸에 툴팁으로 "라인 A · 3회차 · 실패"를 붙여 뒀어요.
 */
function MatrixHeatmap({
  rows,
  columnLabel = (i) => `${i + 1}회차`,
  className,
}: {
  rows: MatrixRow[]
  columnLabel?: (index: number) => string
  className?: string
}) {
  const columns = Math.max(...rows.map((row) => row.cells.length), 0)

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {rows.map((row) => (
        <div key={row.label} className="flex items-center gap-3">
          <span
            className="w-16 shrink-0 truncate text-xs text-muted-foreground"
            title={row.label}
          >
            {row.label}
          </span>
          <div
            className="grid min-w-0 flex-1 gap-1.5"
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          >
            {row.cells.map((cell, i) => (
              <Tooltip key={i}>
                <TooltipTrigger asChild>
                  <span
                    tabIndex={0}
                    className={cn(
                      "h-5 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      LEVEL[cell].className
                    )}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  {row.label} · {columnLabel(i)} · {LEVEL[cell].label}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/** 매트릭스 범례 — 색이 무슨 뜻인지 위에 먼저 알려줘요. */
function MatrixLegend({
  summary,
  className,
}: {
  summary?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs",
        className
      )}
    >
      {(["pass", "warn", "fail"] as const).map((level) => (
        <span key={level} className="flex items-center gap-1.5">
          <span
            className={cn("size-2.5 rounded-sm", LEVEL[level].className)}
            aria-hidden
          />
          <span className="text-muted-foreground">{LEVEL[level].label}</span>
        </span>
      ))}
      {summary ? (
        <span className="ml-auto text-muted-foreground tabular-nums">
          {summary}
        </span>
      ) : null}
    </div>
  )
}

export { MatrixHeatmap, MatrixLegend }
export type { MatrixLevel, MatrixRow }
