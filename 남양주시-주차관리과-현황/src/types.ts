export interface EnforcementZone {
  id: string;
  region: string; // 지역별 (e.g. 와부읍)
  count: number; // 지정개소
  distanceKm: number; // 거리(km)
}

export interface ParkingCategory {
  type: '노상주차장' | '노외주차장' | '합계';
  totalSites: number;
  totalSpaces: number;
  paidSites: number;
  paidSpaces: number;
  freeSites: number;
  freeSpaces: number;
}

export type ProjectStage = '공사중' | '설계중' | '기획중';

export interface ConstructionProject {
  id: string;
  name: string; // 사업명
  totalBudgetMillionWon: number; // 사업비 (백만원)
  securedBudgetMillionWon: number | null; // 확보액
  unsecuredBudgetMillionWon: number | null; // 미확보액
  capacity: number; // 주차대수
  structure: string; // 지하/지상/지평식 구조
  statusText: string; // 추진현황
  progressPercent: number; // 공정률 %
  stage: ProjectStage;
  futureSchedule: { date: string; task: string }[]; // 향후계획
  remarks?: string; // 비고
}
