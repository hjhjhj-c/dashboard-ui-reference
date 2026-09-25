export const dashboardViews = {
  overview: { label: "대시보드", title: "데이터 수집 현황", description: "흩어진 데이터의 흐름과 운영 상태를 한눈에 살펴봐요." },
  charts: { label: "그래프 예시", title: "데이터를 읽는 다양한 방법", description: "비교부터 분포까지, 목적에 맞는 그래프를 살펴봐요." },
  datasets: { label: "데이터셋", title: "데이터셋 관리", description: "수집 중인 데이터셋의 상태와 담당자를 확인해요." },
  quality: { label: "운영 품질", title: "작은 이상도 놓치지 않도록", description: "채널별 점검 결과와 최근 처리 내역을 확인해요." },
  detail: { label: "상세 페이지", title: "물류센터 입출고 데이터", description: "현장 이미지부터 수집 정보까지, 하나의 데이터셋을 자세히 살펴봐요." },
  modals: { label: "모달 예시", title: "중요한 순간에, 명확한 대화", description: "입력과 확인, 완료까지. 상황에 맞는 모달을 직접 사용해 봐요." },
  reference: { label: "부품 라이브러리", title: "다음 화면을 위한 부품들", description: "대시보드에 바로 활용할 수 있는 화면 부품을 모았어요." },
} as const

export type DashboardView = keyof typeof dashboardViews
