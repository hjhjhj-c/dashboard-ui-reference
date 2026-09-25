import { PlusIcon } from "lucide-react"

import { DeltaBadge } from "@/components/reference/indicators"
import { cn } from "@/lib/utils"

const MESH = {
  brand: "mesh-brand",
  warm: "mesh-warm",
  cool: "mesh-cool",
} as const

type MeshKey = keyof typeof MESH

/**
 * 메시 그라디언트 타일.
 *
 * 레퍼런스에서 홈 화면 하단에 깔리던 알약형 지표 타일이에요.
 * 라벨은 가운데 위, 큰 숫자는 왼쪽 아래, 증감 배지는 오른쪽 아래에 둡니다.
 * 그라디언트는 index.css의 `.mesh-*` 유틸리티에서만 정의해요.
 */
function GradientTile({
  label,
  value,
  unit,
  delta,
  mesh = "brand",
  className,
}: {
  label: string
  value: string
  unit?: string
  delta?: number
  mesh?: MeshKey
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative flex min-h-28 flex-col justify-between rounded-3xl p-4 text-white ring-1 ring-foreground/10",
        // 면은 아주 느리게 흐르고, 마우스를 올리면 살짝 뜨면서 광택이 한 번 지나가요
        "mesh-drift sheen transition duration-300 hover:-translate-y-1 hover:shadow-xl",
        MESH[mesh],
        className
      )}
    >
      <p
        className="text-center text-xs font-medium text-white/85"
        title={label}
      >
        {label}
      </p>
      <div className="flex items-end justify-between gap-2">
        <p className="flex items-baseline gap-0.5 font-heading text-3xl leading-none font-medium tabular-nums drop-shadow-sm">
          {value}
          {unit ? (
            <span className="text-sm font-normal text-white/80">{unit}</span>
          ) : null}
        </p>
        {typeof delta === "number" ? (
          <DeltaBadge value={delta} tone="plain" />
        ) : null}
      </div>
    </div>
  )
}

/** 지표를 추가하는 빈 타일 — 그리드의 마지막 칸을 비워두지 않기 위한 부품 */
function GradientTileAdd({
  label = "지표 추가",
  className,
  ...props
}: React.ComponentProps<"button"> & { label?: string }) {
  return (
    <button
      type="button"
      className={cn(
        "flex min-h-28 flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-border text-sm text-muted-foreground transition duration-300 hover:-translate-y-1 hover:border-brand hover:text-foreground",
        className
      )}
      {...props}
    >
      <PlusIcon className="size-5" aria-hidden />
      {label}
    </button>
  )
}

export { GradientTile, GradientTileAdd }
export type { MeshKey }
