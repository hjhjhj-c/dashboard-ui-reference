"use client"

import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "radix-ui"
import {
  ArrowUpRightIcon,
  CheckIcon,
  CircleCheckIcon,
  FolderOpenIcon,
  FolderPlusIcon,
  InfoIcon,
  PlusIcon,
  Trash2Icon,
  TriangleAlertIcon,
} from "lucide-react"

import { EmptyState } from "@/components/reference/empty-state"
import { ExampleDialog } from "@/components/reference/example-dialog"
import { Panel } from "@/components/reference/panel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type ExampleCollection = {
  id: string
  name: string
  description: string
  createdAt: Date
}

type DialogMode = "create" | "success" | null

const initialCollection: ExampleCollection = {
  id: "monthly-sales-example",
  name: "월간 매출 분석",
  description: "채널별 매출과 전환율을 모아 보는 예시 컬렉션이에요.",
  createdAt: new Date("2026-09-01T09:00:00+09:00"),
}

function ExampleCard({
  kind,
  description,
  children,
  action,
}: {
  kind: string
  description: string
  children: React.ReactNode
  action: React.ReactNode
}) {
  return (
    <Panel className="min-w-0 gap-5">
      <CardHeader className="gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{kind}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-border bg-muted/40 p-5" aria-hidden>{children}</div>
      </CardContent>
      <CardFooter className="bg-transparent">{action}</CardFooter>
    </Panel>
  )
}

/** 외부 데이터를 바꾸지 않는 컬렉션 입력·삭제·완료 모달 예시예요. */
export function ModalExamples() {
  const [collections, setCollections] = React.useState<ExampleCollection[]>([initialCollection])
  const [dialog, setDialog] = React.useState<DialogMode>(null)
  const [collectionToDelete, setCollectionToDelete] = React.useState<ExampleCollection | null>(null)
  const [createdCollection, setCreatedCollection] = React.useState<ExampleCollection | null>(null)
  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [nameError, setNameError] = React.useState("")
  const [announcement, setAnnouncement] = React.useState("")
  const nameRef = React.useRef<HTMLInputElement>(null)
  const addButtonRef = React.useRef<HTMLButtonElement>(null)
  const successButtonRef = React.useRef<HTMLButtonElement>(null)
  const deleteTriggerRef = React.useRef<HTMLElement | null>(null)
  const nameInputId = React.useId()
  const descriptionInputId = React.useId()
  const formId = React.useId()
  const collectionIdPrefix = React.useId()
  const collectionCounterRef = React.useRef(0)

  React.useEffect(() => {
    // 입력 폼에서 완료 상태로 바뀔 때 사라진 제출 버튼의 포커스를 이어 줘요.
    if (dialog === "success") successButtonRef.current?.focus()
  }, [dialog])

  function openCreateDialog() {
    setName("")
    setDescription("")
    setNameError("")
    setCreatedCollection(null)
    setDialog("create")
  }

  function createCollection(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName) {
      setNameError("컬렉션 이름을 입력해 주세요.")
      nameRef.current?.focus()
      return
    }

    const collection: ExampleCollection = {
      id: `${collectionIdPrefix}-${++collectionCounterRef.current}`,
      name: trimmedName,
      description: description.trim(),
      createdAt: new Date(),
    }
    setCollections((current) => [collection, ...current])
    setCreatedCollection(collection)
    setAnnouncement(`${collection.name} 컬렉션을 만들었어요.`)
    setDialog("success")
  }

  function openDeleteDialog(collection: ExampleCollection) {
    deleteTriggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setCollectionToDelete(collection)
  }

  function deleteCollection() {
    if (!collectionToDelete) return
    setCollections((current) => current.filter((collection) => collection.id !== collectionToDelete.id))
    setAnnouncement(`${collectionToDelete.name} 컬렉션을 삭제했어요.`)
    setCollectionToDelete(null)
  }

  return (
    <section className="space-y-7" aria-label="모달 예시">
      <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
        <InfoIcon className="mt-0.5 size-4 shrink-0 text-brand" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">이 화면의 예시 데이터로 직접 체험해 보세요.</span>{" "}
          만든 컬렉션은 이 화면에만 저장돼요. 새로고침하거나 다른 메뉴로 이동하면 초기화돼요.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 @4xl/main:grid-cols-3">
        <ExampleCard kind="입력 모달" description="화면을 벗어나지 않고 컬렉션 이름과 설명을 입력해요." action={<Button className="w-full" variant="outline" onClick={openCreateDialog}><FolderPlusIcon /> 컬렉션 만들기 <ArrowUpRightIcon className="ml-auto" /></Button>}>
          <div className="w-full max-w-xs space-y-3 rounded-xl border border-border bg-card p-4 shadow-sm">
            <span className="flex size-8 items-center justify-center rounded-lg bg-brand/10 text-brand"><FolderPlusIcon className="size-4" /></span>
            <p className="text-sm font-semibold">새 컬렉션</p>
            <div className="space-y-1.5"><span className="text-xs text-muted-foreground">컬렉션 이름</span><div className="rounded-md border border-border px-2.5 py-2 text-xs text-muted-foreground">월간 매출 분석</div></div>
            <div className="h-1.5 w-3/4 rounded-full bg-muted" />
            <div className="h-1.5 w-1/2 rounded-full bg-muted" />
          </div>
        </ExampleCard>

        <ExampleCard kind="확인 모달" description="삭제할 항목과 영향을 보여주고, 취소할 기회를 제공해요." action={<Button className="w-full" variant="outline" disabled={collections.length === 0} onClick={() => collections[0] && openDeleteDialog(collections[0])}><Trash2Icon /> 삭제 확인 열기 <ArrowUpRightIcon className="ml-auto" /></Button>}>
          <div className="w-full max-w-xs space-y-3 rounded-xl border border-border bg-card p-4 shadow-sm">
            <span className="flex size-8 items-center justify-center rounded-lg bg-destructive/10 text-destructive"><TriangleAlertIcon className="size-4" /></span>
            <p className="text-sm font-semibold">컬렉션을 삭제할까요?</p>
            <p className="text-xs leading-relaxed text-muted-foreground">삭제할 항목을 확인한 뒤<br />진행 여부를 선택해요.</p>
            <div className="flex items-center gap-2 border-t border-border pt-3 text-xs text-muted-foreground"><FolderOpenIcon className="size-3.5" /> 선택한 예시 컬렉션</div>
          </div>
        </ExampleCard>

        <ExampleCard kind="완료 모달" description="작업이 끝났음을 알려주고, 다음 행동으로 자연스럽게 이어줘요." action={<Button className="w-full" variant="outline" onClick={() => { setCreatedCollection(null); setDialog("success") }}><CircleCheckIcon /> 완료 상태 보기 <ArrowUpRightIcon className="ml-auto" /></Button>}>
          <div className="flex w-full max-w-xs flex-col items-center gap-3 rounded-xl border border-border bg-card p-4 text-center shadow-sm">
            <span className="flex size-12 items-center justify-center rounded-full bg-success/10 text-success"><CheckIcon className="size-6" /></span>
            <p className="text-sm font-semibold">준비가 끝났어요</p>
            <p className="text-xs leading-relaxed text-muted-foreground">새 컬렉션을 만들었어요.<br />이제 목록에서 확인할 수 있어요.</p>
            <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">작업 완료</span>
          </div>
        </ExampleCard>
      </div>

      <section aria-labelledby="example-collections-title" className="overflow-hidden rounded-2xl border border-border bg-card">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-5">
          <div className="flex items-center gap-2">
            <h2 id="example-collections-title" className="font-semibold">이 화면의 예시 컬렉션</h2>
            <Badge variant="secondary" className="tabular-nums">{collections.length.toLocaleString("ko-KR")}</Badge>
          </div>
          <Button ref={addButtonRef} variant="outline" onClick={openCreateDialog}><PlusIcon /> 컬렉션 추가</Button>
        </header>
        {collections.length > 0 ? (
          <ul className="divide-y divide-border">
            {collections.map((collection) => (
              <li key={collection.id} className="flex items-start gap-3 p-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/40 text-muted-foreground"><FolderOpenIcon className="size-4" /></span>
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="break-words text-sm font-medium">{collection.name}</p>
                  <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-muted-foreground">{collection.description || "설명을 추가하지 않았어요."}</p>
                  <p className="pt-1 text-xs text-muted-foreground tabular-nums">{collection.createdAt.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })} 생성</p>
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" aria-label={`${collection.name} 컬렉션 삭제`} onClick={() => openDeleteDialog(collection)}><Trash2Icon /></Button>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="예시 컬렉션이 없어요" description="컬렉션을 만들어 입력 모달과 완료 모달을 다시 체험해 보세요." action={<Button variant="outline" onClick={openCreateDialog}><PlusIcon /> 첫 컬렉션 만들기</Button>} />
        )}
      </section>
      <p role="status" className="sr-only">{announcement}</p>

      <ExampleDialog
        open={dialog !== null}
        fallbackFocusRef={addButtonRef}
        onOpenChange={(open) => { if (!open) setDialog(null) }}
        title={dialog === "create" ? "컬렉션 만들기" : createdCollection ? "컬렉션을 만들었어요" : "작업이 완료됐어요"}
        description={dialog === "create" ? "함께 살펴볼 데이터를 하나의 컬렉션으로 묶어 보세요." : createdCollection ? "새 컬렉션이 이 화면의 예시 목록에 추가됐어요." : "완료 모달의 미리보기예요. 새 컬렉션은 추가되지 않아요."}
        footer={dialog === "create" ? (
          <><Button variant="outline" onClick={() => setDialog(null)}>취소</Button><Button type="submit" form={formId}><PlusIcon /> 컬렉션 만들기</Button></>
        ) : <Button ref={successButtonRef} onClick={() => setDialog(null)}><CheckIcon /> {createdCollection ? "목록에서 확인하기" : "확인"}</Button>}
      >
        {dialog === "create" ? (
          <form id={formId} noValidate onSubmit={createCollection} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor={nameInputId}>컬렉션 이름 <span className="text-xs text-muted-foreground">필수</span></Label>
              <Input ref={nameRef} id={nameInputId} name="collection-name" value={name} onChange={(event) => { setName(event.target.value); if (nameError) setNameError("") }} placeholder="예: 월간 매출 분석" required maxLength={60} aria-invalid={!!nameError} aria-describedby={nameError ? `${nameInputId}-error` : `${nameInputId}-hint`} className="h-10" />
              <div className="flex items-start justify-between gap-3">
                {nameError ? <p id={`${nameInputId}-error`} role="alert" className="text-xs text-destructive">{nameError}</p> : <p id={`${nameInputId}-hint`} className="text-xs text-muted-foreground">목록에서 알아보기 쉬운 이름을 입력해 주세요.</p>}
                <span className="shrink-0 text-xs text-muted-foreground tabular-nums">{name.length.toLocaleString("ko-KR")} / {(60).toLocaleString("ko-KR")}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={descriptionInputId}>설명 <span className="text-xs text-muted-foreground">선택</span></Label>
              <textarea id={descriptionInputId} name="collection-description" value={description} onChange={(event) => setDescription(event.target.value)} rows={4} maxLength={500} placeholder="어떤 데이터를 모으는 컬렉션인가요?" aria-describedby={`${descriptionInputId}-hint`} className="block w-full resize-y rounded-lg border border-input bg-transparent px-3 py-2 text-base leading-relaxed outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm" />
              <p id={`${descriptionInputId}-hint`} className="text-xs text-muted-foreground">최대 <span className="tabular-nums">{(500).toLocaleString("ko-KR")}</span>자까지 입력할 수 있어요.</p>
            </div>
            <div className="flex items-start gap-2 rounded-lg bg-muted/60 p-3 text-xs leading-relaxed text-muted-foreground"><InfoIcon className="mt-0.5 size-3.5 shrink-0" /><span>이 화면에서만 사용하는 예시예요. 실제 업무 데이터에는 영향을 주지 않아요.</span></div>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-4 py-3 text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-success/10 text-success"><CheckIcon className="size-8" /></span>
            <div className="w-full rounded-xl border border-border bg-muted/30 p-4">
              <p className="break-words font-semibold">{createdCollection?.name ?? "월간 매출 분석"}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{createdCollection ? "입력한 정보가 저장됐어요. 목록에서 확인하거나 삭제할 수 있어요." : "입력 완료 후 결과를 전달하는 화면을 체험하고 있어요."}</p>
            </div>
          </div>
        )}
      </ExampleDialog>

      <AlertDialogPrimitive.Root open={collectionToDelete !== null} onOpenChange={(open) => { if (!open) setCollectionToDelete(null) }}>
        <AlertDialogPrimitive.Portal>
          <AlertDialogPrimitive.Overlay className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-xs" />
          <div className="pointer-events-none fixed inset-4 z-50 grid place-items-center">
            <AlertDialogPrimitive.Content
              className="pointer-events-auto flex max-h-full w-full max-w-md flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl outline-none"
              onCloseAutoFocus={(event) => {
                event.preventDefault()
                const trigger = deleteTriggerRef.current
                if (trigger?.isConnected && !trigger.matches(":disabled, [aria-disabled='true']")) trigger.focus()
                else addButtonRef.current?.focus()
              }}
            >
              <div className="min-h-0 space-y-4 overflow-y-auto overscroll-contain p-6">
                <span className="flex size-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive"><TriangleAlertIcon className="size-5" /></span>
                <div className="space-y-2">
                  <AlertDialogPrimitive.Title className="text-xl font-semibold tracking-tight">컬렉션을 삭제할까요?</AlertDialogPrimitive.Title>
                  <AlertDialogPrimitive.Description className="text-sm leading-relaxed text-muted-foreground">선택한 컬렉션이 이 화면의 예시 목록에서 삭제돼요. 삭제한 항목은 새로 만들어야 해요.</AlertDialogPrimitive.Description>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/30 p-4"><FolderOpenIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" /><div className="min-w-0"><p className="break-words text-sm font-medium">{collectionToDelete?.name}</p><p className="mt-1 text-xs text-muted-foreground">이 화면의 예시 컬렉션</p></div></div>
              </div>
              <footer className="flex shrink-0 flex-col-reverse gap-2 border-t border-border bg-muted/30 px-6 py-4 sm:flex-row sm:justify-end">
                <AlertDialogPrimitive.Cancel asChild><Button variant="outline">취소</Button></AlertDialogPrimitive.Cancel>
                <AlertDialogPrimitive.Action asChild><Button variant="destructive" onClick={deleteCollection}><Trash2Icon /> 컬렉션 삭제</Button></AlertDialogPrimitive.Action>
              </footer>
            </AlertDialogPrimitive.Content>
          </div>
        </AlertDialogPrimitive.Portal>
      </AlertDialogPrimitive.Root>
    </section>
  )
}
