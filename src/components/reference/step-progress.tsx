import { CheckIcon, LoaderCircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type Step = {
  label: string
  /** 부가 설명 한 줄. 소요 시간이나 건수를 넣으면 좋아요. */
  detail?: string
}

/**
 * 단계 진행 표시 — 지금 어느 단계까지 왔는지 가로로 보여줘요.
 *
 * 퍼센트 하나(`68%`)보다 이쪽이 유용할 때가 있어요. 파이프라인처럼
 * 단계마다 하는 일이 다르면, 숫자보다 "정제까지는 끝났고 적재 중"이
 * 훨씬 많은 걸 알려주거든요.
 *
 * 진행 중인 단계는 회전하는 아이콘, 끝난 단계는 체크, 남은 단계는 번호로
 * 구분합니다 — 색뿐 아니라 모양으로도 읽히게요.
 */
function StepProgress({
  steps,
  current,
  className,
}: {
  steps: Step[]
  /** 0부터 시작하는 현재 단계 인덱스. steps.length면 전부 완료예요. */
  current: number
  className?: string
}) {
  return (
    <ol className={cn("flex gap-2", className)}>
      {steps.map((step, i) => {
        const done = i < current
        const active = i === current

        return (
          <li key={step.label} className="flex min-w-0 flex-1 flex-col gap-2">
            {/* 단계 막대 — 끝난 단계는 채우고, 진행 중은 절반만 */}
            <span
              className={cn(
                "h-1.5 rounded-full",
                done ? "bg-chart-1" : "bg-muted"
              )}
              aria-hidden
            >
              {active ? (
                <span className="grow-x block h-full w-1/2 rounded-full bg-chart-1" />
              ) : null}
            </span>

            <div className="flex min-w-0 items-start gap-2">
              <span
                className={cn(
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-xs font-medium tabular-nums",
                  done && "bg-chart-1 text-primary-foreground",
                  active && "bg-chart-1/12 text-chart-1",
                  !done && !active && "bg-muted text-muted-foreground"
                )}
              >
                {done ? (
                  <CheckIcon className="size-3" aria-hidden />
                ) : active ? (
                  <LoaderCircleIcon className="size-3 animate-spin" aria-hidden />
                ) : (
                  i + 1
                )}
              </span>

              <div className="min-w-0">
                <p
                  className={cn(
                    "truncate text-sm",
                    active ? "font-medium" : "text-muted-foreground"
                  )}
                  title={step.label}
                >
                  {step.label}
                  <span className="sr-only">
                    {done ? " — 완료" : active ? " — 진행 중" : " — 대기"}
                  </span>
                </p>
                {step.detail ? (
                  <p className="truncate text-xs text-muted-foreground tabular-nums">
                    {step.detail}
                  </p>
                ) : null}
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export { StepProgress }
export type { Step }
