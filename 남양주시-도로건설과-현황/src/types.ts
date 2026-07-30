export type SectionType = 'section1' | 'section2' | 'section3' | 'dashboard' | 'search';

export type StatusCategory = 
  | '공사준공' 
  | '공사중' 
  | '실시설계중' 
  | '보상협의중' 
  | '행정절차중' 
  | '발주준비중'
  | '계획/기타';

export interface ProjectItem {
  id: string;
  section: 'section1' | 'section2'; // section1: 국도/국지도/지방도, section2: 시군도/도시계획도로
  categoryName: string; // e.g. "1. 국도·국지도·지방도" or "2. 시군도·도시계획도로"
  name: string; // 사업명
  agency: string; // 시행주체
  workload: string; // 사업량 (L=..., B=...)
  costTotal: number; // 사업비 (백만원)
  costSecured?: number; // 확보액 (백만원)
  costUnsecured?: number; // 미확보액 (백만원)
  statusText: string; // 추진현황
  statusCategory: StatusCategory;
  progressPercent?: number; // 공정률 % or 보상률 %
  futurePlan: string; // 향후계획
  notes?: string; // 비고
  region?: string; // e.g., 화도읍, 진접읍, 오남읍, 별내동, 와부읍, 금곡동, 수동면, 조안면 등
}

export interface RoadStatusItem {
  id: string;
  category: string; // 고속국도, 일반국도, 지방도, 국지도, 시도
  routeCount: number; // 노선
  lengthKm: number; // 연장 (km)
  pavedKm: number; // 포장 (km)
  unpavedKm: number; // 비포장 (km)
  paveRatePercent: number; // 포장율 (%)
  sharedSectionKm: number; // 중용구간 (km)
  notes?: string;
}

export interface RuralRoadStatusItem {
  id: string;
  grade: string; // 면도, 리도
  routeCount: number; // 노선수
  lengthKm: number; // 연장 (km)
  pavedKm: number; // 포장 (km)
  unpavedKm: number; // 비포장 (km)
  unopenedKm: number; // 미개설 (km)
  paveRatePercent: number; // 포장율 (%)
}
