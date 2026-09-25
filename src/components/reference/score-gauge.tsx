import { cn } from "@/lib/utils"

type GaugeTone = "bad" | "warn" | "ok" | "good"

const TONE = {
  bad: "bg-destructive",
  warn: "bg-warning",
  ok: "bg-success-soft",
  good: "bg-success",
} as const

type GaugeBand = {
  /** 이 구간의 상한값 */
  max: number
  tone: GaugeTone
  label: string
}

/**
 * 구간 게이지 — CreditPros의 신용점수 게이지가 원본이에요.
 *
 * 하나의 긴 막대를 뜻 있는 구간으로 잘라 두고, 지금 값이 어느 구간에 있는지
 * 삼각형 포인터로 찍어 줍니다. 값 하나만 크게 보여주는 것보다
 * "좋은 편인지 나쁜 편인지"가 즉시 읽혀요.
 */
function ScoreGauge({
  value,
  min,
  bands,
  unit,
  className,
}: {
  value: number
  min: number
  bands: GaugeBand[]
  unit?: string
  className?: string
}) {
  const max = bands[bands.length - 1].max
  const span = max - min
  const clamped = Math.min(Math.max(value, min), max)
  const position = ((clamped - min) / span) * 100
  const activeIndex = bands.findIndex((band) => clamped <= band.max)
  const active = bands[activeIndex === -1 ? bands.length - 1 : activeIndex]

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <p className="flex items-baseline gap-0.5 font-heading text-4xl leading-none font-medium tabular-nums">
          {value.toLocaleString("ko-KR")}
          {unit ? (
            <span className="text-base font-normal text-muted-foreground">
              {unit}
            </span>
          ) : null}
        </p>
        <p className="text-sm text-muted-foreground">{active.label}</p>
      </div>

      <div className="relative pt-4">
        {/* 삼각형 포인터 + 세로선 */}
        <div
          className="absolute top-0 bottom-0 flex flex-col items-center"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
          aria-hidden
        >
          <svg viewBox="0 0 12 8" className="h-2 w-3 fill-foreground">
            <path d="M0 0 H12 L6 8 Z" />
          </svg>
          <span className="w-px flex-1 bg-foreground" />
        </div>

        <div className="flex gap-1.5">
          {bands.map((band, i) => {
            const from = i === 0 ? min : bands[i - 1].max
            const weight = (band.max - from) / span
            const isActive = band === active
            return (
              <div
                key={band.label}
                className="flex min-w-0 flex-col gap-1.5"
                style={{ flexGrow: weight, flexBasis: 0 }}
              >
                <div
                  className={cn(
                    "h-12 rounded-lg transition-opacity",
                    TONE[band.tone],
                    isActive
                      ? "opacity-100 ring-2 ring-foreground ring-offset-2 ring-offset-card"
                      : "opacity-45"
                  )}
                  title={`${band.label} 구간`}
                />
                <span className="truncate text-center text-xs text-muted-foreground tabular-nums">
                  {band.max.toLocaleString("ko-KR")}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export { ScoreGauge }
export type { GaugeBand, GaugeTone }
