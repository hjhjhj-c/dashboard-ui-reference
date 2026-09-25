import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type FunnelStep = {
  label: string
  value: number
}

/**
 * 퍼널 — 단계를 지날 때마다 얼마나 남는지 보여줘요.
 *
 * 흔한 삼각형 퍼널 대신 가로 막대를 세로로 쌓았어요. 삼각형은 면적이
 * 실제 비율과 어긋나 보이는 데다 한글 라벨을 넣을 자리가 없거든요.
 * 단계 사이에는 **직전 단계 대비** 전환율을 적어, 어디서 새는지 바로 보이게 했습니다.
 */
function FunnelSteps({
  steps,
  unit = "건",
  className,
}: {
  steps: FunnelStep[]
  unit?: string
  className?: string
}) {
  const first = steps[0]?.value ?? 0

  return (
    <ol className={cn("flex flex-col", className)}>
      {steps.map((step, i) => {
        const overall = first === 0 ? 0 : (step.value / first) * 100
        const prev = steps[i - 1]
        const stepRate =
          prev && prev.value !== 0 ? (step.value / prev.value) * 100 : null
        const dropped = prev ? prev.value - step.value : 0

        return (
          <li key={step.label} className="flex flex-col">
            {stepRate !== null ? (
              <div className="flex items-center gap-1.5 py-1.5 pl-3 text-xs text-muted-foreground">
                <ChevronDownIcon className="size-3.5 shrink-0" aria-hidden />
                <span className="tabular-nums">
                  전환 {stepRate.toFixed(1)}%
                </span>
                <span aria-hidden>·</span>
                <span className="tabular-nums">
                  이탈 {dropped.toLocaleString("ko-KR")}
                  {unit}
                </span>
              </div>
            ) : null}

            <div className="flex flex-col gap-1.5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="min-w-0 truncate text-sm" title={step.label}>
                  {step.label}
                </span>
                <span className="shrink-0 text-sm font-medium tabular-nums">
                  {step.value.toLocaleString("ko-KR")}
                  <span className="text-xs font-normal text-muted-foreground">
                    {unit}
                  </span>
                </span>
              </div>
              <div className="h-7 rounded-lg bg-muted">
                <div
                  className="grow-x flex h-full items-center justify-end rounded-lg bg-chart-1 px-2"
                  style={{
                    width: `${Math.max(overall, 8)}%`,
                    animationDelay: `${i * 90}ms`,
                  }}
                >
                  <span className="text-xs font-medium text-primary-foreground tabular-nums">
                    {overall.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export { FunnelSteps }
export type { FunnelStep }
