"use client"

import { RotateCcwIcon, SearchIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type ActiveFilter = {
  /** 무엇으로 걸렀는지 (예: "유형") */
  field: string
  /** 값 (예: "실시간 스트림") */
  value: string
}

/**
 * 필터 바 — 검색창 + 지금 걸려 있는 필터 칩 + 전체 해제.
 *
 * 핵심은 **적용된 필터를 항상 눈에 보이게 두는 것**이에요.
 * 드롭다운 안에만 숨겨 두면 "왜 결과가 3건뿐이지?" 하고 헤매게 됩니다.
 * 칩에는 필드 이름까지 적어서 `유형: 실시간 스트림`처럼 읽히게 했어요.
 */
function FilterBar({
  query,
  onQueryChange,
  placeholder = "이름으로 검색",
  filters = [],
  onRemoveFilter,
  onReset,
  resultCount,
  className,
}: {
  query: string
  onQueryChange?: (value: string) => void
  placeholder?: string
  filters?: ActiveFilter[]
  onRemoveFilter?: (filter: ActiveFilter) => void
  onReset?: () => void
  /** 현재 걸러진 결과 수. 넘기면 오른쪽에 표시해요. */
  resultCount?: number
  className?: string
}) {
  const hasFilters = filters.length > 0 || query.length > 0

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-0 flex-1">
          <SearchIcon
            className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            value={query}
            onChange={(event) => onQueryChange?.(event.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
            className="rounded-full pl-9"
          />
        </div>

        {typeof resultCount === "number" ? (
          <span
            className="shrink-0 text-sm text-muted-foreground tabular-nums"
            aria-live="polite"
          >
            {resultCount.toLocaleString("ko-KR")}건
          </span>
        ) : null}

        {hasFilters ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="shrink-0 rounded-full"
            onClick={onReset}
          >
            <RotateCcwIcon />
            전체 해제
          </Button>
        ) : null}
      </div>

      {filters.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <li key={`${filter.field}-${filter.value}`}>
              <button
                type="button"
                onClick={() => onRemoveFilter?.(filter)}
                className="flex items-center gap-1.5 rounded-full bg-muted py-1 pr-1.5 pl-3 text-xs transition-colors outline-none hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="text-muted-foreground">{filter.field}</span>
                <span className="font-medium">{filter.value}</span>
                <span className="flex size-4 items-center justify-center rounded-full bg-foreground/10">
                  <XIcon className="size-3" aria-hidden />
                </span>
                <span className="sr-only">필터 제거</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export { FilterBar }
export type { ActiveFilter }
