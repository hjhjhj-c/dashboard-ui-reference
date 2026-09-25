/** 상세 페이지용 독립 샘플. 실제 물류센터나 운영 데이터를 나타내지 않아요. */
export const detailDataset = {
  id: "DS-024",
  name: "물류센터 입출고 데이터",
  image: "images/warehouse-operations.png",
  imageAlt: "상자가 정돈된 높은 보관 랙 사이로 중앙 통로가 이어지는 물류센터 내부",
  description: "물류센터에서 발생한 입고와 출고 기록을 일별로 모은 데이터셋이에요. 품목별 이동량을 비교하고, 작업이 집중되는 시간과 재고 흐름을 살펴볼 수 있어요.",
  rowCount: 12480,
  owner: "물류 데이터팀",
  source: "창고 관리 시스템 · WMS",
  updatedAt: "2024-06-30T09:00:00+09:00",
  fields: [
    { key: "recorded_at", name: "처리 일시", type: "datetime", description: "입출고가 처리된 시각이에요. 한국 시간(KST)을 사용해요." },
    { key: "center_code", name: "센터 코드", type: "string", description: "처리한 물류센터를 구분하는 코드예요." },
    { key: "operation", name: "작업 구분", type: "string", description: "입고 또는 출고로 구분해요." },
    { key: "item_code", name: "품목 코드", type: "string", description: "이동한 품목을 구분하는 코드예요." },
    { key: "quantity", name: "처리 수량", type: "integer", description: "해당 작업에서 처리한 수량이에요. 단위는 개예요." },
  ],
} as const
