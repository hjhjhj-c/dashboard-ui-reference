import { ActivityIcon, DatabaseIcon, DownloadIcon, UsersIcon } from "lucide-react"
import { Sparkline } from "@/components/reference/sparkline"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const metrics = [
  { label: "총 수집 데이터", value: 128450, unit: "건", icon: DatabaseIcon, detail: "누적 수집량", values: [86, 92, 88, 101, 114, 109, 128], note: "최근 7개월" },
  { label: "오늘 신규 유입", value: 1234, unit: "건", icon: DownloadIcon, detail: "마지막 수집일 기준", values: [720, 810, 760, 980, 890, 1120, 1234], note: "일별 예시" },
  { label: "활성 사용자", value: 342, unit: "명", icon: UsersIcon, detail: "현재 워크스페이스", values: [240, 272, 251, 290, 318, 302, 342], note: "일별 예시" },
  { label: "처리 성공률", value: 98.2, unit: "%", icon: ActivityIcon, detail: "전체 처리 건수 기준", values: [97.1, 97.4, 97.3, 97.8, 97.6, 98, 98.2], note: "일별 예시" },
]

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 @lg/main:grid-cols-2 @4xl/main:grid-cols-4">
      {metrics.map(({ label, value, unit, icon: Icon, detail, values, note }) => (
        <Card key={label} className="gap-4 rounded-xl py-5 shadow-xs">
          <CardHeader className="flex items-center justify-between px-5">
            <p className="text-sm text-muted-foreground">{label}</p>
            <Icon className="size-4 text-muted-foreground" aria-hidden />
          </CardHeader>
          <CardContent className="px-5">
            <div className="flex items-baseline gap-1.5">
              <p className="text-3xl leading-none font-semibold tracking-tight tabular-nums">{value.toLocaleString("ko-KR")}</p>
              <span className="text-sm text-muted-foreground">{unit}</span>
            </div>
            <div className="mt-5 flex items-end justify-between gap-3">
              <p className="text-xs leading-relaxed text-muted-foreground">{detail}<br /><span>{note}</span></p>
              <Sparkline data={values} width={64} height={28} showArea={false} label={`${label} ${note} 추이`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
