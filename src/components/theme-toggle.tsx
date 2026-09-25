import * as React from "react"
import { MoonIcon, SunIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(() =>
    document.documentElement.classList.contains("dark")
  )

  function toggle() {
    const next = !isDark
    document.documentElement.classList.toggle("dark", next)
    try {
      localStorage.setItem("theme", next ? "dark" : "light")
    } catch {
      // 저장이 제한돼도 현재 화면의 모드 전환은 유지해요.
    }
    setIsDark(next)
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggle}>
      {isDark ? <SunIcon /> : <MoonIcon />}
      <span className="sr-only">
        {isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      </span>
    </Button>
  )
}
