# 대시보드 UI 레퍼런스 v1.0.0 (Vite + React + shadcn/ui)

**정체성:** 데이터 대시보드 전용 스타터. 사내 데이터 조회·시각화 서비스의 기준 UI입니다.
따뜻한 오프화이트 / 무광 블랙 위에 콘텐츠(숫자·차트·표)가 주인공이 되도록
장식을 절제합니다. 폰트 Pretendard, 라이트/다크 완전 지원, 어조는 해요체.

**팔레트:** 강조는 블루 `#2563EB`(`--brand`) · `#BFDBFE`(`--brand-soft`) · `#60A5FA`(`--highlight`).
상태색은 강조색과 분리해 둡니다 — 성공 `#16A34A`(`--success`) · 주의 `#FFCE06`(`--warning`) ·
실패 `--destructive`. 배경은 따뜻한 오프화이트 `#FBFAF6` / 중성 다크 `#15171B`.
차트는 블루 → 시안 → 바이올렛 → 뉴트럴 2단(`--chart-1`~`--chart-5`).
전부 `src/index.css`에 oklch로 선언돼 있어요 — **컴포넌트에서 hex를 다시 쓰지 않습니다.**

색을 바꾸고 싶으면 `:root` / `.dark`의 변수 값만 교체하세요. 부품 코드는 손댈 필요가 없습니다.

**스택:** Vite 8 · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui(radix, nova 프리셋) ·
Recharts(shadcn Charts) · TanStack Table v9 · lucide-react 아이콘

## 시작하기

이 폴더 전체가 실행 가능한 프로젝트입니다. 새 프로젝트를 시작할 때 폴더를 통째로 복사하세요.

```bash
npm install
```

```bash
npm run dev
```

`npm run build` 결과물은 `dist/`에 생기며, FastAPI 등 어떤 백엔드든 정적 파일로 서빙하면 됩니다.
iCloud 폴더 안에서 직접 `npm install` 하면 동기화 때문에 느려집니다 —
실제 개발은 로컬 경로(예: `~/Projects/`)에 복사해서 하세요.

## 폴더 구조 — 어디를 수정해야 하나

| 경로 | 역할 | 수정해도 되나 |
|---|---|---|
| `src/components/ui/` | shadcn 프리미티브 (버튼·카드·테이블 등 부품) | 원칙적으로 수정하지 않음. 필요한 부품은 `npx shadcn@latest add <이름>`으로 추가 |
| `src/components/reference/` | 레퍼런스 부품 (파일 27개 · 컴포넌트 42종 — 차트·게이지·빈 상태·스켈레톤·피드·필터 등) | 새 화면을 만들 때 **먼저 여기서 골라 쓰세요** |
| `src/components/` | 화면 조립 컴포넌트 (사이드바·KPI 카드·차트·데이터 테이블) | **여기가 주 작업 공간** |
| `src/App.tsx` | 페이지 레이아웃 (사이드바 + 헤더 + 본문) | 페이지 추가 시 수정 |
| `src/index.css` | 테마 토큰(CSS 변수)·전역 스타일 | 색·라운딩 바꿀 때 여기만 |
| `src/app/dashboard/data.json` | 목업 데이터 | 백엔드 연동 시 fetch로 교체 |
| `index.html` | 테마 초기화 스크립트 포함 | 거의 손댈 일 없음 |

## 하드 룰 10

1. 색은 시맨틱 클래스만 쓴다: `bg-background` `bg-card` `text-foreground` `text-muted-foreground`
   `border-border` `bg-primary` `text-destructive`. 임의 hex·`bg-gray-500` 같은 팔레트 직접 지정 금지 —
   다크 모드에서 깨진다.
2. 테마 색을 바꾸고 싶으면 `src/index.css`의 `:root` / `.dark` CSS 변수만 수정한다.
   컴포넌트에서 색을 덮어쓰지 않는다. 단 메시 그라디언트(`.mesh-*`)는 예외 —
   토큰을 물리면 보색이 섞여 탁해지므로 `--mesh-a`~`--mesh-d` 램프를 따로 조율한다.
3. 크기·간격은 Tailwind 스케일(`p-4` `gap-6` `text-sm`)만. `[13px]` 같은 임의 값 금지.
4. 새 UI가 필요하면 (1) `src/components/reference/`에 이미 있는지, (2) `npx shadcn@latest add <이름>`으로
   받을 수 있는지 순서로 먼저 확인한다. 블록(완성 화면)도 있다: `npx shadcn@latest add dashboard-01`.
5. 아이콘은 lucide-react만 쓴다. 이모지·다른 아이콘 세트 혼용 금지.
6. 차트는 `ui/chart.tsx`의 `ChartContainer` + `ChartConfig` 패턴만 쓴다
   (`chart-area-interactive.tsx` 참고). 색은 `var(--chart-1)`~`var(--chart-5)` 또는 `var(--primary)`.
   새 차트에는 `isAnimationActive={false}`를 준다 — 등장 애니메이션이 백그라운드 탭에서
   0% 상태로 굳어 빈 차트로 보이는 일이 있다.
7. 데이터 테이블은 `data-table.tsx` 패턴을 따른다. TanStack v9는 `tableFeatures()`로
   쓸 기능을 등록하는 방식이라 v8 예제 코드를 그대로 붙이면 안 된다.
8. 숫자는 `tabular-nums` 클래스 + `toLocaleString("ko-KR")`. 날짜도 `ko-KR` 로케일.
9. 상태(완료/진행 중/대기)는 색만으로 구분하지 않는다 — 배지 + 아이콘/텍스트를 함께 쓴다.
10. 작업 후 라이트/다크 모드 양쪽을 확인한다. 헤더의 토글 버튼으로 전환.

## 사이드바

- 너비는 `App.tsx`의 `--sidebar-width` 하나로 정한다(현재 `calc(var(--spacing) * 60)` = 240px).
- `collapsible="icon"`이라 접으면 48px 아이콘 레일이 남는다. 그래서 접기 버튼을
  사이드바 헤더 안에 둬도 항상 손이 닿는다.
- 레일 상태에서는 라벨이 사라지므로 **메뉴 버튼에 `tooltip` prop을 반드시 넘긴다.**
  빠뜨리면 아이콘만 남아 무슨 메뉴인지 알 수 없다.
- 모바일에서는 `collapsible`이 무시되고 시트로 열린다. 그래서 헤더에도 트리거를
  하나 남겨 두되 `md:hidden`으로 데스크톱에서는 숨긴다.

## 글씨 잘림 방지 규칙

- 전역에 `word-break: keep-all`이 적용돼 있다(`index.css`). 지우지 않는다.
- 셀·제목에 `truncate`나 `line-clamp-*`를 쓸 때는 `title` 속성을 함께 넣어 전체 텍스트를 보여준다.
- 차트 X축은 `tickMargin`·`minTickGap`을 유지한다 — 지우면 라벨이 겹치거나 잘린다.
- 고정 높이(`h-[...]`) 박스 안에 여러 줄 텍스트를 넣지 않는다. 높이는 내용이 정한다.
- 표가 넘칠 때는 칸을 줄이지 말고 상세 내용을 드로어로 뺀다(`TableCellViewer` 패턴).
- 한글에 이탤릭 금지. 강조는 `font-semibold`.

## 백엔드 연동 (FastAPI 등 무엇이든)

목업인 `data.json`을 fetch로 바꾸면 됩니다:

```tsx
const [data, setData] = React.useState<z.infer<typeof schema>[]>([])
React.useEffect(() => {
  fetch("/api/datasets")
    .then((res) => res.json())
    .then(setData)
}, [])
```

- 응답 스키마는 `data-table.tsx`의 `schema`(zod)와 맞추고, 바뀌면 zod 스키마부터 수정한다.
- 개발 중 백엔드 프록시는 `vite.config.ts`에 `server.proxy` 추가:
  `proxy: { "/api": "http://localhost:8000" }`.
- 배포는 `npm run build` 후 `dist/`를 백엔드가 정적 서빙. SPA 라우팅을 쓰면
  모든 경로를 `index.html`로 폴백시킨다.

## 다크 모드 동작

- OS 설정을 기본으로 따르고, 헤더의 토글(`theme-toggle.tsx`)로 수동 전환. 선택은 localStorage에 저장.
- 첫 페인트 전에 `index.html`의 인라인 스크립트가 `<html>`에 `dark` 클래스를 붙여 깜빡임을 막는다 —
  이 스크립트를 지우지 않는다.

## 컴포넌트 지도

| 화면 요소 | 파일 | 비고 |
|---|---|---|
| 페이지 골격 | `App.tsx` | TooltipProvider > SidebarProvider 순서 유지. 사이드바 너비는 `--sidebar-width`(현재 240px) |
| 사이드바 | `app-sidebar.tsx` | 메뉴는 파일 상단 `data` 객체만 수정. 접기 버튼은 사이드바 헤더 안, `collapsible="icon"`이라 접으면 아이콘 레일로 남음 |
| 상단 헤더 | `site-header.tsx` | 알약 탭 + 원형 아이콘 버튼 + 사용자 칩 + 테마 토글. 여기 접기 버튼은 모바일 전용(`md:hidden`) |
| 히어로 (큰 제목 + 상태 캡슐) | `dashboard-hero.tsx` | |
| KPI 카드 4종 | `section-cards.tsx` | 반응형: 1→2→4열 자동 |
| 기간 선택 영역 차트 | `chart-area-interactive.tsx` | ChartConfig 라벨만 바꾸면 범례·툴팁 연동 |
| 오른쪽 인사이트 레일 | `insight-rail.tsx` | 진행률·경고·점검 매트릭스·채널 상세 |
| 데이터 테이블 | `data-table.tsx` | 정렬·필터·페이지네이션·열 토글·행 드래그·상세 드로어 포함 |
| 레퍼런스 부품 갤러리 | `reference-gallery.tsx` | 재사용 부품 전시장. 카탈로그는 `docs/04-레퍼런스-부품.md` |
| 테마 토글 | `theme-toggle.tsx` | |

## 더 알아보기

| 주제 | 문서 |
|---|---|
| 구조·작업 순서·자주 하는 실수 | `docs/01-구조와-규칙.md` |
| 차트 추가·수정 (ChartConfig 패턴) | `docs/02-차트.md` |
| 테이블 수정·서버 연동 (TanStack v9) | `docs/03-테이블.md` |
| 레퍼런스 부품 카탈로그·출처·사용법 | `docs/04-레퍼런스-부품.md` |
