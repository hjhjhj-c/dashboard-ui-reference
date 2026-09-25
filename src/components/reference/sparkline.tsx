import { cn } from "@/lib/utils"

const TONE = {
  brand: "var(--chart-1)",
  success: "var(--success)",
  destructive: "var(--destructive)",
  muted: "var(--muted-foreground)",
} as const

type SparklineTone = keyof typeof TONE

/**
 * 스파크라인 — KPI 카드나 표 셀 안에 들어가는 손톱만 한 추이선이에요.
 *
 * 축도 눈금도 툴팁도 없습니다. "올라가는 중인지 내려가는 중인지"만 알려주는
 * 보조 표시라서, 정확한 값은 옆의 숫자가 책임져요.
 *
 * 여기만 Recharts를 쓰지 않습니다(하드 룰 6의 예외). 80×28px짜리에
 * ResponsiveContainer를 얹으면 얻는 것 없이 리사이즈 관측만 늘어나거든요.
 * 색은 그대로 차트 토큰을 참조하므로 다크 모드는 알아서 따라옵니다.
 */
function Sparkline({
  data,
  tone = "brand",
  width = 80,
  height = 28,
  showArea = true,
  label,
  className,
}: {
  data: number[]
  tone?: SparklineTone
  width?: number
  height?: number
  showArea?: boolean
  /** 스크린 리더용 설명. 없으면 장식으로 처리해요. */
  label?: string
  className?: string
}) {
  if (data.length < 2) return null

  const pad = 2
  const min = Math.min(...data)
  const max = Math.max(...data)
  const span = max - min || 1

  const points = data.map((value, i) => {
    const x = pad + (i / (data.length - 1)) * (width - pad * 2)
    const y = height - pad - ((value - min) / span) * (height - pad * 2)
    return [x, y] as const
  })

  const line = points.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ")
  const area = `${points[0][0]},${height} ${line} ${points[points.length - 1][0]},${height}`
  const last = points[points.length - 1]
  const stroke = TONE[tone]

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={cn("overflow-visible", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {showArea ? (
        <polygon points={area} fill={stroke} fillOpacity={0.12} />
      ) : null}
      <polyline
        points={line}
        fill="none"
        stroke={stroke}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={last[0]} cy={last[1]} r={2.5} fill={stroke} />
    </svg>
  )
}

export { Sparkline }
export type { SparklineTone }
