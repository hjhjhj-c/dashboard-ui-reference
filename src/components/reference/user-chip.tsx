import { ChevronDownIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

/**
 * 사용자 칩 — Ventra 헤더 오른쪽 끝의 부품이에요.
 *
 * 아바타 + 이름(진하게) + 역할(흐리게) + 펼침 화살표를 알약 하나에 담습니다.
 * 좁은 화면에서는 이름·역할을 숨기고 아바타만 남겨요.
 */
function UserChip({
  name,
  role,
  avatar,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  name: string
  role: string
  avatar?: string
}) {
  return (
    <button
      type="button"
      className={cn(
        "flex items-center gap-2 rounded-full bg-muted/60 py-1 pr-2 pl-1 text-left transition-colors outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      {...props}
    >
      <Avatar className="size-8">
        <AvatarImage src={avatar} alt="" />
        <AvatarFallback className="text-xs">{name.slice(0, 1)}</AvatarFallback>
      </Avatar>
      <span className="hidden min-w-0 flex-col sm:flex">
        <span className="truncate text-xs font-medium" title={name}>
          {name}
        </span>
        <span className="truncate text-xs text-muted-foreground" title={role}>
          {role}
        </span>
      </span>
      <ChevronDownIcon
        className="hidden size-4 text-muted-foreground sm:block"
        aria-hidden
      />
    </button>
  )
}

export { UserChip }
