import * as React from "react"
import { PaletteIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const colorThemes = [
  { value: "blue", label: "블루", swatch: "bg-theme-blue" },
  { value: "violet", label: "바이올렛", swatch: "bg-theme-violet" },
  { value: "teal", label: "틸", swatch: "bg-theme-teal" },
  { value: "rose", label: "로즈", swatch: "bg-theme-rose" },
  { value: "amber", label: "앰버", swatch: "bg-theme-amber" },
] as const

type ColorTheme = (typeof colorThemes)[number]["value"]
const storageKey = "dashboard-color-theme"

function normalizeTheme(value: string | null | undefined): ColorTheme {
  return colorThemes.find((theme) => theme.value === value)?.value ?? "blue"
}

export function ColorThemeSelector() {
  const [value, setValue] = React.useState<ColorTheme>(() =>
    normalizeTheme(document.documentElement.dataset.colorTheme)
  )
  const [canSave, setCanSave] = React.useState(true)
  const selectedTheme = colorThemes.find((theme) => theme.value === value)!

  React.useEffect(() => {
    function syncTheme(event: StorageEvent) {
      if (event.key !== storageKey && event.key !== null) return
      const next = normalizeTheme(event.newValue)
      document.documentElement.dataset.colorTheme = next
      setValue(next)
    }
    window.addEventListener("storage", syncTheme)
    return () => window.removeEventListener("storage", syncTheme)
  }, [])

  function changeTheme(nextValue: string) {
    const next = normalizeTheme(nextValue)
    document.documentElement.dataset.colorTheme = next
    setValue(next)
    try {
      localStorage.setItem(storageKey, next)
      setCanSave(true)
    } catch {
      // 브라우저가 저장을 제한해도 현재 화면의 컬러 선택은 적용해요.
      setCanSave(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-8 gap-2 bg-card px-2 sm:px-3"
          aria-label={`컬러 테마 선택, 현재 ${selectedTheme.label}`}
          title={`컬러 테마 · ${selectedTheme.label}`}
        >
          <PaletteIcon className="text-brand" />
          <span className="hidden text-xs sm:inline">{selectedTheme.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-2">
        <DropdownMenuLabel className="px-2 py-2 text-foreground">컬러 테마</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={value} onValueChange={changeTheme} aria-label="컬러 테마">
          {colorThemes.map((theme) => (
            <DropdownMenuRadioItem key={theme.value} value={theme.value} className="min-h-10 gap-3 pl-2">
              <span className={`size-4 shrink-0 rounded-full ring-1 ring-foreground/10 ${theme.swatch}`} aria-hidden />
              <span>{theme.label}</span>
              {theme.value === "blue" ? <span className="text-xs text-muted-foreground">기본</span> : null}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <p className="px-2 py-2 text-xs leading-relaxed text-muted-foreground" role="status">
          {canSave
            ? "선택한 컬러는 이 브라우저에 저장돼요. 라이트·다크 모드에 모두 적용돼요."
            : "현재 창에 적용했어요. 이 브라우저에서는 선택을 저장할 수 없어요."}
        </p>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
