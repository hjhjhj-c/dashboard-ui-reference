import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type CompositionSegment = {
  label: string
  value: number
  /** 차트 토큰 이름. 계열 순서대로 chart-1 → chart-2 → … 를 권장해요. */
  tone: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"
}

const TONE = {
  "chart-1": "bg-chart-1",
  "chart-2": "bg-chart-2",
  "chart-3": "bg-chart-3",
  "chart-4": "bg-chart-4",
  "chart-5": "bg-chart-5",
} as const

/**
 * 구성비 막대 — 전체를 100으로 놓고 무엇이 얼마를 차지하는지 한 줄로 보여줘요.
 *
 * 파이 차트보다 자리를 덜 먹고 비율 비교도 정확해서, 채널 구성·유형 분포처럼
 * "합쳐서 100%"인 값에 씁니다. 조각이 좁아 라벨이 안 들어가므로
 * 범례에 이름·값·비율을 모두 적고, 막대 자체에는 툴팁을 붙였어요.
 *
 * Recharts를 쓰지 않는 건 의도한 선택이에요 — 축도 눈금도 없는 한 줄짜리라
 * 양 끝만 둥근 모양을 CSS로 잡는 편이 훨씬 정확합니다.
 */
function CompositionBar({
  segments,
  unit = "건",
  className,
}: {
  segments: CompositionSegment[]
  unit?: string
  className?: string
}) {
  const total = segments.reduce((sum, s) => sum + s.value, 0)
  const percent = (value: number) => (total === 0 ? 0 : (value / total) * 100)

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex h-4 gap-1 overflow-hidden rounded-full">
        {segments.map((segment) => (
          <Tooltip key={segment.label}>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={`${segment.label} ${segment.value.toLocaleString("ko-KR")}${unit}`}
                className={cn(
                  "h-full min-w-1 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  TONE[segment.tone]
                )}
                style={{ flexGrow: percent(segment.value), flexBasis: 0 }}
              />
            </TooltipTrigger>
            <TooltipContent>
              {segment.label} · {segment.value.toLocaleString("ko-KR")}
              {unit} ({percent(segment.value).toFixed(1)}%)
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      <ul className="flex flex-col gap-2">
        {segments.map((segment) => (
          <li
            key={segment.label}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <span className="flex min-w-0 items-center gap-2">
              <span
                className={cn("size-2 shrink-0 rounded-full", TONE[segment.tone])}
                aria-hidden
              />
              <span className="truncate" title={segment.label}>
                {segment.label}
              </span>
            </span>
            <span className="shrink-0 text-muted-foreground tabular-nums">
              {segment.value.toLocaleString("ko-KR")}
              {unit}{" "}
              <span className="text-foreground">
                {percent(segment.value).toFixed(1)}%
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { CompositionBar }
export type { CompositionSegment }
