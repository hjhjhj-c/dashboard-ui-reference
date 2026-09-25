"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"
import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ExampleDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
  bodyClassName?: string
  closeLabel?: string
  fallbackFocusRef?: React.RefObject<HTMLElement | null>
}

/** 제어형 모달 셸. 긴 본문은 내부에서 스크롤하고, 닫으면 열기 전 요소로 포커스를 돌려줘요. */
export function ExampleDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
  bodyClassName,
  closeLabel = "닫기",
  fallbackFocusRef,
}: ExampleDialogProps) {
  const returnFocusRef = React.useRef<HTMLElement | null>(null)

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-xs" />
        <div className="pointer-events-none fixed inset-4 z-50 grid place-items-center">
          <DialogPrimitive.Content
            className={cn("pointer-events-auto relative flex max-h-full w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl outline-none", className)}
            onOpenAutoFocus={() => {
              returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
            }}
            onCloseAutoFocus={(event) => {
              event.preventDefault()
              const trigger = returnFocusRef.current
              if (trigger?.isConnected && !trigger.matches(":disabled, [aria-disabled='true']")) trigger.focus()
              else fallbackFocusRef?.current?.focus()
            }}
          >
            <header className="shrink-0 space-y-2 p-6 pr-14">
              <DialogPrimitive.Title className="font-heading text-xl font-semibold tracking-tight">{title}</DialogPrimitive.Title>
              <DialogPrimitive.Description className="text-sm leading-relaxed text-muted-foreground">{description}</DialogPrimitive.Description>
            </header>
            <div className={cn("min-h-0 overflow-y-auto overscroll-contain px-6 pb-6", bodyClassName)}>{children}</div>
            {footer ? <footer className="flex shrink-0 flex-col-reverse gap-2 border-t border-border bg-muted/30 px-6 py-4 sm:flex-row sm:justify-end">{footer}</footer> : null}
            <DialogPrimitive.Close asChild>
              <Button type="button" variant="ghost" size="icon" className="absolute top-4 right-4 text-muted-foreground" aria-label={closeLabel}>
                <XIcon />
              </Button>
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </div>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
