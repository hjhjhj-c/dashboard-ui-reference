# Astra 데이터 대시보드 · 사내 사용 가이드

사내 데이터 조회·시각화 화면을 만들 때 복사해서 쓰는 **프런트엔드 UI 스타터**예요. 먼저 샘플 화면에서 필요한 구성을 고른 뒤, 서비스 이름과 데이터를 교체하고 사내 API를 연결해 사용해요.

React 19 · TypeScript · Vite 8 · Tailwind CSS v4 · shadcn/ui · Recharts · TanStack Table v9를 사용해요. 한국어 글꼴은 Pretendard이며, 반응형 화면과 라이트·다크 모드, 5가지 컬러 테마가 포함돼 있어요. 설치 버전은 [package-lock.json](./package-lock.json)을 기준으로 해요.

**현재 화면의 수치·사용자·처리 상태는 모두 샘플이에요. 로그인, 권한 관리, 백엔드와 데이터 저장 기능은 연결돼 있지 않아요.** 화면 검토와 개발 출발점으로 사용할 수 있으며, 운영 서비스로 쓰려면 아래 연동 단계를 진행해 주세요.

바로가기: [실행](#1-처음-실행하기) · [화면 사용](#2-화면-사용하기) · [수정 위치](#3-어디를-수정하면-되나요) · [API 연동](#4-사내-api-연결하기) · [배포](#5-빌드하고-사내에-배포하기) · [제작 규칙](#6-공통-제작-규칙) · [문제 해결](#7-자주-생기는-문제)

## 1. 처음 실행하기

### 준비

- 새 환경에서는 Node.js 22.12 이상과 npm을 준비해요. 현재 설치된 Vite가 허용하는 전체 범위는 `^20.19.0 || >=22.12.0`이에요.
- 이 프로젝트의 소스와 `package-lock.json`을 새 작업 폴더에 복사해요. `node_modules/`와 `dist/`는 복사하지 않아도 돼요.
- iCloud 등 동기화 폴더 대신 `~/Projects/` 같은 로컬 폴더에서 개발하면 의존성 설치와 파일 변경이 빨라요.

복사한 폴더를 터미널에서 열고 실행해요.

```bash
npm ci
npm run dev
```

터미널에 표시된 `Local` 주소를 브라우저로 열어요. 기본 주소는 `http://localhost:5173`이며, 포트가 사용 중이면 다른 번호로 실행될 수 있어요. 종료할 때는 터미널에서 `Ctrl+C`를 눌러요.

| 명령 | 용도 |
|---|---|
| `npm ci` | 잠금 파일에 맞춰 의존성 설치 |
| `npm run dev` | 개발 서버 실행. 소스를 저장하면 화면에 반영돼요 |
| `npm run lint` | 코드 규칙 검사 |
| `npm run build` | TypeScript 검사 후 배포 파일을 `dist/`에 생성 |
| `npm run preview` | 빌드 결과를 로컬에서 확인. 먼저 빌드해야 해요 |

의존성을 의도적으로 추가·변경할 때는 `npm install`을 사용하고 `package.json`과 `package-lock.json`을 함께 관리해요.

## 2. 화면 사용하기

사이드바와 상단 탭은 같은 화면으로 이동해요. 사이드바는 데스크톱에서 아이콘만 남도록 접을 수 있고, 모바일에서는 헤더의 메뉴 버튼으로 열어요.

| 화면 | 주소 뒤에 붙일 값 | 사용 방법 |
|---|---|---|
| 개요 / 대시보드 | `#overview` | KPI, 일별 데이터 유입, 소스 비중, 파이프라인과 데이터셋을 확인해요 |
| 그래프 예시 | `#charts` | `전체`·`비교·추이`·`분포·구성`으로 4종 그래프를 골라 봐요 |
| 데이터셋 | `#datasets` | 페이지 이동, 행 선택, 표시 열 변경, 행 드래그를 해봐요. 이름을 누르면 상세 패널이 열려요 |
| 운영 품질 | `#quality` | 점검 결과, 처리 내역, 채널 정보를 보여주는 예시를 확인해요 |
| 상세 페이지 | `#detail` | 물류센터 이미지 확대, 소개·필드 정의·변경 이력과 샘플 CSV를 확인해요 |
| 모달 예시 | `#modals` | 입력·삭제 확인·완료 안내 모달을 직접 열고 조작해요 |
| 부품 라이브러리 | `#reference` | 차트·게이지·빈 상태·로딩·필터 등 재사용할 UI 부품을 살펴봐요 |

예를 들어 개발 서버의 `http://localhost:5173/#charts`로 바로 그래프 화면을 열 수 있어요. 사내 서버에 올린 뒤에는 같은 방식으로 **배포 주소 + `#charts`**를 공유해요. `localhost` 주소는 실행한 사람의 컴퓨터를 가리키므로 동료에게 공유할 서비스 주소로 사용할 수 없어요.

### 차트 읽기

- 개요의 `7일 / 30일 / 90일`은 **일별 데이터 유입 차트에만** 적용돼요. KPI·소스 도넛·표의 데이터는 함께 변경되지 않아요.
- 샘플의 기준일은 **2024년 6월 30일**이에요. 오른쪽 유입 소스 도넛은 2024년 6월 전체 합계예요.
- 그래프 위에 마우스를 올리거나 차트에 키보드 포커스를 두고 방향키를 누르면 세부 값을 확인할 수 있어요.
- 그래프 예시의 누적 막대·도넛·막대와 선·레이더는 각각 독립된 데이터예요. 서로 또는 개요의 수치와 합산하지 않아요.

### 모달과 이미지 상세 페이지

- `#detail`에서 이미지를 누르면 확대 모달이 열려요. `소개`·`필드 정의`·`변경 이력` 탭을 전환하고, `데이터셋 목록`으로 돌아갈 수 있어요. 표의 이름을 눌러 여는 기존 상세 패널과는 별도의 화면 예시예요.
- 물류센터 이미지는 **실제 시설을 나타내지 않는 AI 생성 이미지**예요. `관심 데이터` 표시는 현재 상세 화면에서만 유지돼요.
- 상세 화면의 `샘플 CSV 받기`는 물류 필드 5개와 예시 3행이 들어 있는 별도 파일이에요. 상단의 `샘플 CSV`가 내보내는 데이터셋 목록 20행과 달라요.
- `#modals`에서는 컬렉션 생성·삭제 확인·완료 안내를 살펴봐요. 예시 화면의 변경은 메모리에만 적용되며 서버에 저장되지 않아요.

공용 모달을 복사하거나 이미지와 데이터를 교체하려면 [모달과 상세 페이지 가이드](./docs/05-모달과-상세페이지.md)를 참고해요.

### 컬러와 밝기 바꾸기

헤더의 팔레트 버튼에서 **블루·바이올렛·틸·로즈·앰버**를 선택해요. 옆의 해·달 버튼으로 라이트·다크 모드를 전환해요. 모바일에서는 팔레트 버튼에 아이콘만 표시돼요.

- 기본 컬러는 블루예요. 밝기는 처음 접속할 때 OS 설정을 따르고, 직접 선택한 뒤에는 그 선택을 사용해요.
- 선택은 현재 브라우저의 해당 사이트에 저장돼요. 다른 기기나 다른 포트·도메인에는 자동으로 공유되지 않아요.
- 컬러를 바꾸면 강조색과 주요 차트 계열이 함께 바뀌어요. 성공·주의·실패 상태색은 유지돼요.

### 현재 동작하는 기능과 예시용 UI

| 구분 | 현재 동작 |
|---|---|
| 화면 이동·차트 기간·그래프 유형 필터·테마 | 실제로 동작해요 |
| 표의 행 선택·드래그·페이지·표시 열 | 브라우저 안에서 동작해요. 개요와 데이터셋이 같은 표를 공유하며, 다른 화면을 방문해도 상태가 유지돼요. 새로고침하면 초기화돼요 |
| `샘플 CSV` | 원본 `src/app/dashboard/data.json`의 20행을 `astra-sample-datasets.csv`로 내려받아요. 화면에서 바꾼 값·행 순서·선택·표시 열은 반영하지 않아요 |
| 상세 페이지의 이미지 확대·탭·관심 표시 | 현재 화면에서 동작해요. 관심 표시는 화면을 떠나거나 새로고침하면 초기화돼요 |
| 상세 페이지의 `샘플 CSV 받기` | `public/samples/warehouse-operations.csv`의 3행을 내려받아요. 기본 정보의 전체 행 수와는 별도예요 |
| 모달 예시의 생성·삭제·완료 | 생성·삭제는 메모리 목록에 반영돼요. 완료 미리보기는 목록을 바꾸지 않아요. 다른 화면으로 이동하거나 새로고침하면 초기화돼요 |
| 표의 목표·상한 입력, 담당자 선택 | 입력 UI 예시예요. 목표·상한의 완료 알림도 서버 저장을 의미하지 않아요 |
| `데이터셋 추가`, 행 메뉴의 수정·복제·즐겨찾기·삭제, 표 상세 패널의 `저장` | 업무 처리가 연결돼 있지 않은 버튼이에요 |
| 표 내부의 월간 리포트·담당자별·즐겨찾기 | 빈 예시 패널이에요. 모바일의 `보기` 선택기도 이 패널들과 아직 연결돼 있지 않아요 |
| 표 정렬·필터 | 라이브러리 기능과 상태만 준비돼 있어요. 사용자용 조작 UI는 별도로 구현해야 해요. 전역 검색은 기능 등록과 입력 UI 모두 추가해야 해요 |

실제 서비스에서는 사용하지 않을 예시 버튼을 제거하거나, API와 연결한 뒤 제공해 주세요. 부품 라이브러리 안의 버튼과 상태도 컴포넌트 시연용이므로 각 파일의 동작을 확인하고 가져와요.

## 3. 어디를 수정하면 되나요?

| 바꾸려는 내용 | 수정할 파일 |
|---|---|
| 메뉴 이름·화면 제목·설명 | [src/lib/dashboard-navigation.ts](./src/lib/dashboard-navigation.ts)의 `dashboardViews` |
| 사이드바 메뉴 순서·아이콘, Astra 로고·팀 이름·사용자 예시 | [app-sidebar.tsx](./src/components/app-sidebar.tsx)의 `mainItems`·`resourceItems`와 JSX |
| 헤더·사용자 표시 | [site-header.tsx](./src/components/site-header.tsx) |
| 상단 액션 버튼 | [dashboard-hero.tsx](./src/components/dashboard-hero.tsx). CSV 처리 함수는 `App.tsx`의 `exportDatasets` |
| 화면 배치·탭·샘플 기준일·하단 브랜드 문구 | [src/App.tsx](./src/App.tsx) |
| 브라우저 탭 제목·파비콘 | [index.html](./index.html), `public/favicon.svg` |
| KPI 값·단위·설명·작은 추이선 | [section-cards.tsx](./src/components/section-cards.tsx)의 `metrics` |
| 메인 추이 차트·기간·날짜 | [chart-area-interactive.tsx](./src/components/chart-area-interactive.tsx)의 `trafficData`와 `chartConfig` |
| 그래프 예시 4종 | [chart-examples.tsx](./src/components/chart-examples.tsx)의 데이터·설정·`examples` |
| 소스 비중·파이프라인·운영 품질 데이터 | [insight-rail.tsx](./src/components/insight-rail.tsx) |
| 데이터셋 샘플 행 | [data.json](./src/app/dashboard/data.json) |
| 표의 열·검증 스키마·상세 패널·행 액션 | [data-table.tsx](./src/components/data-table.tsx) |
| 이미지 포함 상세 화면·이미지 확대·관심 표시 | [dataset-detail-page.tsx](./src/components/dataset-detail-page.tsx) |
| 상세 화면 데이터·필드 정의·이미지 설명 | [detail-data.ts](./src/app/dashboard/detail-data.ts) |
| 상세 이미지·생성 출처·물류 샘플 CSV | [public/images/](./public/images/), [warehouse-operations.csv](./public/samples/warehouse-operations.csv) |
| 모달 예시와 입력·삭제 처리 | [modal-examples.tsx](./src/components/modal-examples.tsx) |
| 공용 모달 셸 | [example-dialog.tsx](./src/components/reference/example-dialog.tsx) |
| 색·글꼴·라운딩·전역 스타일 | [src/index.css](./src/index.css) |
| 재사용 부품 | [src/components/reference/](./src/components/reference/), [부품 카탈로그](./docs/04-레퍼런스-부품.md) |

**`data.json`만 바꾸면 표와 샘플 CSV만 바뀌어요.** KPI·차트·운영 품질·이미지 상세 페이지는 각 파일의 별도 샘플을 사용하므로, 실제 데이터로 전환할 때 각각 연결해야 해요.

### 새 화면 추가하기

1. 부품 라이브러리에서 쓸 컴포넌트를 찾고 `src/components/`에 화면을 조립해요.
2. `dashboard-navigation.ts`의 `dashboardViews`에 새 키·라벨·제목·설명을 추가해요. 상단 탭은 이 목록을 사용해요.
3. `App.tsx`에 같은 키의 `TabsContent`와 컴포넌트를 추가해요. 사이드바에도 보여주려면 `app-sidebar.tsx`의 `mainItems` 또는 `resourceItems`에 키와 아이콘을 등록해요.
4. 새 `#키` 주소, 뒤로 가기, 모바일 메뉴, 라이트·다크 화면을 확인해요.

현재는 URL 해시로 화면을 전환하므로 화면 추가만을 위해 별도 라우터를 설치할 필요는 없어요. `TooltipProvider > SidebarProvider` 순서와 개요·데이터셋이 공유하는 `DataTable` 구조는 유지해 주세요.

### 그래프 바꾸기

기존 차트를 복사해 데이터 배열과 `ChartConfig`부터 바꾸는 방법이 가장 간단해요.

- 데이터 키와 `ChartConfig`의 키, `dataKey`를 일치시켜요. `label`은 툴팁·범례에 표시할 이름이에요.
- `ChartContainer`와 `ChartConfig`를 사용하고 색은 `var(--chart-1)`부터 `var(--chart-5)`까지의 토큰을 참조해요.
- 차트 높이는 `h-60` 같은 Tailwind 스케일로 정하고 `aspect-auto`를 함께 사용해요. 카드 전체의 높이를 고정하지 않아요.
- `Area`·`Bar`·`Line`·`Pie`·`Radar` 등 데이터 시리즈에는 `isAnimationActive={false}`를 지정해요. 백그라운드 탭에서 차트가 빈 상태로 멈추는 것을 방지해요.
- 축의 `tickMargin`·`minTickGap`과 Y축 여백을 유지하고, 숫자·날짜·단위를 함께 확인해요.

메인 차트의 기간 선택은 날짜 계산 대신 배열의 마지막 7·30·90행을 가져와요. 실제 API를 연결할 때는 **날짜 오름차순, 하루 한 행**으로 정리하고 누락일 처리 방식을 정해야 해요. 데이터가 적으면 그만큼만 표시돼요. 빈 배열 처리와 로딩 상태를 추가하고, 화면에 고정된 `2024년`·기준일·소스 합계도 실제 조회 기간에 맞춰 바꿔 주세요.

### 회사 컬러 적용하기

컴포넌트에 색을 직접 넣지 않고 `src/index.css`의 토큰을 수정해요.

| 대상 | 수정 위치 |
|---|---|
| 기본 블루의 라이트·다크 색 | `:root`, `.dark` |
| 다른 팔레트의 라이트 색 | `:root[data-color-theme="violet"]` 등 |
| 다른 팔레트의 다크 색 | `:root.dark[data-color-theme="violet"]` 등 |
| 팔레트 목록·이름·선택 기본값 | `color-theme-selector.tsx` |
| 최초 표시 시 테마 복원·기본값·허용 목록 | `index.html`의 초기화 스크립트 |

새 팔레트를 추가할 때는 CSS의 밝은·어두운 토큰과 견본 색, 선택 메뉴, `index.html`의 허용 목록을 함께 추가해요. 기본 선택을 바꾸려면 메뉴의 기본값과 초기화 스크립트의 기본값도 일치시켜요. 초기화 스크립트는 첫 화면의 색상 깜빡임을 막으므로 유지해 주세요.

설정 저장 키는 밝기 `theme`(`light`/`dark`), 컬러 `dashboard-color-theme`(`blue` 등)예요. 값이 저장되지 않는 환경에서도 현재 창의 테마는 바꿀 수 있어요.

## 4. 사내 API 연결하기

아래는 **새로 추가할 조회 연동 예시**예요. 현재 프로젝트에 `/api/datasets` 서버가 포함돼 있는 것은 아니에요.

### 응답 형식 맞추기

현재 표는 다음 형태의 JSON 배열을 사용해요. `id`는 중복되지 않는 숫자, 나머지 필드는 문자열이에요. 특히 `target`과 `limit`도 문자열이에요.

```json
[
  {
    "id": 1,
    "header": "일별 매출 집계",
    "type": "정기 수집",
    "status": "완료",
    "target": "100",
    "limit": "120",
    "reviewer": "김지현"
  }
]
```

검증 기준은 `data-table.tsx`의 `schema`예요. 상태 UI는 `완료`·`진행 중`·`대기`를 사용해요. 필드를 바꾸면 `schema`, `columns`, `columnLabels`, 상세 패널 `TableCellViewer`, CSV 내보내기의 열 매핑도 함께 수정해요.

### 조회 결과를 표에 전달하기

예를 들어 `src/components/dataset-table-from-api.tsx`를 만들어요.

```tsx
import { useEffect, useState } from "react"
import { z } from "zod"
import { DataTable, schema } from "@/components/data-table"

type Dataset = z.infer<typeof schema>

export function DatasetTableFromApi() {
  const [rows, setRows] = useState<Dataset[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const response = await fetch("/api/datasets", {
          signal: controller.signal,
        })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const parsed = z.array(schema).parse(await response.json())
        if (!controller.signal.aborted) setRows(parsed)
      } catch {
        if (!controller.signal.aborted) {
          setError("데이터를 불러오지 못했어요. API 응답을 확인해 주세요.")
        }
      }
    }

    void load()
    return () => controller.abort()
  }, [])

  if (error) return <p role="alert" className="text-destructive">{error}</p>
  if (rows === null) {
    return <p role="status" className="text-muted-foreground">데이터를 불러오고 있어요.</p>
  }
  return <DataTable data={rows} />
}
```

`App.tsx`에서 `DatasetTableFromApi`를 import하고 기존 `<DataTable data={data} />` 한 곳을 `<DatasetTableFromApi />`로 교체해요. 사용하지 않게 된 `DataTable` import는 제거해요. 샘플 CSV를 유지한다면 원본 `data.json` import는 아직 필요해요.

현재 `DataTable`은 `data` prop을 **처음 마운트할 때만 내부 상태로 복사**해요. 그래서 위 예시는 조회가 끝난 뒤 표를 처음 렌더링해요. 빈 배열로 먼저 마운트한 뒤 prop만 바꾸면 새 데이터가 표시되지 않아요. 재조회·실시간 갱신이 필요하면 표의 데이터 상태를 부모에서 관리하도록 바꾸거나, 갱신 시 선택·순서를 어떻게 처리할지 정한 뒤 명시적으로 동기화해요.

### 개발 서버에서 API로 연결하기

백엔드가 `http://localhost:8000`에서 실행된다면 `vite.config.ts`의 기존 `defineConfig` 객체에 다음 `server` 항목을 추가해요. 기존 `plugins`와 `resolve`는 유지해요.

```ts
server: {
  proxy: {
    "/api": "http://localhost:8000",
  },
},
```

설정 후 개발 서버를 다시 실행해요. 이 예시는 `/api/datasets`를 백엔드의 `/api/datasets`로 그대로 전달해요. **Vite 프록시는 개발용**이므로 배포 서버에서도 `/api`를 실제 백엔드로 연결해야 해요.

### 조회 다음에 연결할 것

- 표의 저장·추가·삭제·담당자 변경을 실제 API와 연결하고, 응답이 성공한 뒤 상태와 완료 알림을 갱신해요.
- KPI·차트·운영 품질도 실제 응답으로 교체하고, 지표의 집계 기간과 단위를 화면에 표시해요.
- CSV를 실제 내보내기로 바꿀 때는 전체 데이터·조회 결과·선택한 행 중 무엇을 내보낼지 정하고 `exportDatasets`를 수정해요.
- 로그인·사용자 정보·데이터 접근 권한은 회사 인증 방식과 백엔드에서 처리해요. 화면의 사용자 이름은 현재 고정 문구예요.
- API 키·DB 비밀번호는 브라우저 코드에 넣지 않아요. `VITE_*` 환경 변수도 클라이언트 번들에 포함되므로 비밀값 저장소로 사용하지 않아요.

## 5. 빌드하고 사내에 배포하기

```bash
npm run lint
npm run build
npm run preview
```

로컬 미리보기에서 확인한 뒤 `dist/`의 **전체 내용**을 사내 정적 웹 서버나 기존 백엔드의 정적 파일 경로에 배포해요. nginx·FastAPI 등 회사에서 사용하는 서버를 이용할 수 있어요. `npm run dev`와 `npm run preview`는 사내 운영 서버 대신 사용하지 않아요.

- 현재 화면 전환은 `#charts` 같은 해시 방식이에요. `/charts`라는 서버 경로를 따로 만들 필요는 없어요.
- `/dashboard/` 같은 하위 경로에 배포한다면 Vite의 `base`와 `index.html`의 파비콘 경로를 맞춘 뒤 다시 빌드해요. 위 API 예시의 `/api`는 도메인 루트 기준이라는 점도 확인해요.
- 나중에 `/datasets` 같은 경로 기반 라우터로 바꾸면 해당 프런트엔드 경로를 `index.html`로 연결하는 서버 설정이 필요해요. `/api` 요청은 백엔드로 보내요.
- 새 버전은 같은 빌드에서 나온 `index.html`과 `assets/`를 함께 배포해요.

### 배포 전 확인

- [ ] 샘플 수치·사용자·고정 기준일을 서비스 목적에 맞게 교체했어요.
- [ ] 제공할 버튼은 실제로 동작하며, 예시용 액션은 정리했어요.
- [ ] API의 로딩·빈 결과·오류 상태와 필요한 인증을 확인했어요.
- [ ] 라이트·다크와 사용할 컬러에서 글씨·상태·차트가 읽혀요.
- [ ] 모바일에서 가로 넘침, 잘린 축 이름, 표 상세 패널을 확인했어요.
- [ ] 배포 주소에서 새로고침·직접 해시 접근·API 요청이 동작해요.

## 6. 공통 제작 규칙

1. 색은 `bg-background`, `bg-card`, `text-muted-foreground`, `text-destructive` 같은 시맨틱 클래스를 사용해요. 컴포넌트에 hex나 임의 팔레트 색을 넣지 않아요.
2. 간격과 크기는 `p-4`, `gap-6`, `text-sm` 같은 Tailwind 스케일을 사용해요.
3. 새 UI는 `src/components/reference/`에서 먼저 찾고, 없으면 shadcn 부품을 확인해요. `src/components/ui/` 프리미티브는 직접 수정하기보다 사용하는 쪽에서 조합해요.
4. 아이콘은 `lucide-react`, 숫자는 `tabular-nums`와 `toLocaleString("ko-KR")`, 날짜는 `ko-KR` 로케일을 사용해요.
5. 상태는 색뿐 아니라 텍스트·아이콘으로도 구분해요. 말줄임에는 `title`을 제공하고 한글 `word-break: keep-all`을 유지해요.
6. 표는 현재 TanStack v9의 `useTable`·`tableFeatures()` 패턴을 따라요. v8의 `useReactTable` 예제를 그대로 붙이지 않아요.

## 7. 자주 생기는 문제

| 증상 | 확인할 곳 |
|---|---|
| `npm ci`가 잠금 파일 불일치로 실패해요 | 의존성 변경이 의도된 것인지 확인하고 `npm install` 후 두 package 파일을 함께 반영해요 |
| 브라우저에서 개발 화면이 안 열려요 | 터미널의 실제 `Local` 주소와 포트, Node 버전, 서버 실행 상태를 확인해요 |
| `data.json`을 바꿨는데 차트는 그대로예요 | 표·CSV와 차트 데이터는 별도예요. 3절의 수정 위치를 확인해요 |
| API 응답은 왔는데 표가 비어 있어요 | 응답이 배열이고 `schema`에 맞는지, 표를 빈 배열로 먼저 마운트하지 않았는지 확인해요 |
| 저장 알림이 떴는데 새로고침하면 돌아와요 | 현재 표의 저장은 예시예요. 저장 API와 성공 후 데이터 갱신을 연결해야 해요 |
| 테마가 새로고침 후 사라져요 | 브라우저 저장 제한 여부와 접속 도메인·포트가 바뀌었는지 확인해요 |
| 빌드 후 API 대신 HTML이 반환돼요 | 개발 프록시는 배포에 적용되지 않아요. 서버의 `/api` 전달 설정을 확인해요 |
| 차트가 비거나 라벨이 잘려요 | 컨테이너 높이, 데이터 키, 축 여백, 시리즈의 `isAnimationActive={false}`를 확인해요 |

## 더 자세한 문서

- [구조와 규칙](./docs/01-구조와-규칙.md) — 화면 구성과 개발 원칙
- [차트](./docs/02-차트.md) — `ChartConfig`, 축, 데이터 연결
- [데이터 테이블](./docs/03-테이블.md) — 열 추가와 서버 연동
- [레퍼런스 부품](./docs/04-레퍼런스-부품.md) — 재사용 부품과 사용 예시
- [모달과 상세 페이지](./docs/05-모달과-상세페이지.md) — 공용 모달 사용, 이미지 교체, 상세 데이터와 API 연결
- [AGENTS.md](./AGENTS.md), [CLAUDE.md](./CLAUDE.md) — 코딩 에이전트용 작업 규칙. 현재 화면 사용법과 파일 위치는 이 README를 먼저 참고해요.
