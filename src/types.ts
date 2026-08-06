export type TabType = 
  | 'overview' 
  | 'bus' 
  | 'stops' 
  | 'taxi' 
  | 'operators' 
  | 'policy' 
  | 'search' 
  | 'ai';

// 1. 수송분담률
export interface ModalSplitItem {
  category: string;
  tripsPerDay: number;
  sharePercent: number;
  color: string;
}

// 2. 버스 현황
export interface BusCategorySummary {
  category: string;
  subCategory?: string;
  routesCount: number;
  licensedCount: number;
  note?: string;
}

// 3 & 4. 직행좌석 & 광역버스
export interface RegionalExpressBus {
  id: string;
  region: '진접' | '별내' | '다산' | '호평평내' | '화도' | '와부' | '전체';
  routeNumber: string;
  operator: string;
  origin: string;
  destination: string;
  busCount: number;
  doubleDeckerCount?: number;
  direction: '강변방면' | '잠실방면' | '강남방면' | '불암산역방면' | '기타';
  busType: '직행좌석' | '광역급행';
}

// 5. 땡큐버스 및 트롤리버스
export interface ThankYouBus {
  region: string;
  routeNumber: string;
  operator: string;
  origin: string;
  destination: string;
  busCount: number;
  trolleyCount: number;
  openedDate: string;
}

// 6. 광역급행버스 (M버스)
export interface MBus {
  routeNumber: string;
  operator: string;
  origin: string;
  destination: string;
  busCount: number;
  openedDate: string;
  note: string;
}

// 7. 2층버스 연도별
export interface DoubleDeckerStat {
  year: string;
  total: number;
  diesel: number;
  electric: number;
  hwado: number;
  jinjeop: number;
  hopyeong: number;
  wabu: number;
  byeolnae: number;
  dasan: number;
}

// 8. 이용객 현황
export interface DailyPassengerStat {
  type: string;
  averageDaily: number;
  share: number;
}

// 9. 공항버스
export interface AirportBus {
  routeNumber: string;
  operator: string;
  origin: string;
  via: string;
  destination: string;
  distanceKm: number;
  dailyTrips: string;
  note: string;
}

// 10. 저상버스
export interface LowFloorBusStat {
  busType: '일반시내' | '마을버스';
  operator: string;
  routeNumber: string;
  origin: string;
  destination: string;
  totalCount: number;
  electricCount: number;
  cngCount: number;
}

// 11 & 12. 택시 현황 및 고요한택시
export interface TaxiSummary {
  category: '일반택시' | '개인택시' | '합계';
  licenses: number;
  companiesCount: number;
  driversCount: number;
  note?: string;
}

export interface TaxiShelterInfo {
  name: string;
  location: string;
  scale: string;
  operationMode: string;
  hours: string;
  facilities: string[];
  dailyUsers: string;
}

export interface QuietTaxiStat {
  company: string;
  count: number;
}

// 13. 택시승차대
export interface TaxiStand {
  id: number;
  location: string;
  type: '포스트형' | '쉘터형';
  solarLighting: boolean;
  installedYear: number;
}

// 14. 운수업체
export interface TransportOperator {
  category: '일반택시' | '시내버스' | '마을버스';
  name: string;
  representative: string;
  address: string;
  licenses: number;
  phone: string;
  fax?: string;
  note?: string;
  routesCount?: number;
}

// 15. 택시 유종별
export interface FuelTypeStat {
  type: string;
  lpg: number;
  electric: number;
  hybrid: number;
  total: number;
}

// 16. 버스정류장 & 스마트승강장
export interface SmartShelter {
  id: string;
  name: string;
  region: string;
  stopNumber: string;
  stopName: string;
  address: string;
  installedYearMonth: string;
}

// 17. 대중교통비 지원
export interface TransitSubsidy {
  id: string;
  title: string;
  targetGroup: string;
  ageRange: string;
  method: string;
  limit: string;
  cycle: string;
  paymentType: string;
  budget2026Total: number;
  cityBudget2026: number;
  targetCount: string;
  subscribers: string;
  avgPayment: string;
  description: string;
}

export interface BudgetYearInfo {
  category: string;
  y2024Budget: number;
  y2024Spent: number;
  y2025Budget: number;
  y2025Spent: number;
  y2026Budget: number;
  y2026Spent: number;
  y2026Required: number;
  y2026Shortage: number;
}
