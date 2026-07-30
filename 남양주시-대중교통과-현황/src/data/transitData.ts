import {
  ModalSplitItem,
  BusCategorySummary,
  RegionalExpressBus,
  ThankYouBus,
  MBus,
  DoubleDeckerStat,
  DailyPassengerStat,
  AirportBus,
  LowFloorBusStat,
  TaxiSummary,
  TaxiShelterInfo,
  QuietTaxiStat,
  TaxiStand,
  TransportOperator,
  FuelTypeStat,
  SmartShelter,
  TransitSubsidy,
  BudgetYearInfo
} from '../types';

// 1. 수송분담률 (2025년 기준)
export const MODAL_SPLIT_DATA: ModalSplitItem[] = [
  { category: '승용차', tripsPerDay: 545128, sharePercent: 60.08, color: '#3b82f6' },
  { category: '버스', tripsPerDay: 247372, sharePercent: 27.26, color: '#10b981' },
  { category: '철도', tripsPerDay: 75771, sharePercent: 8.35, color: '#8b5cf6' },
  { category: '택시', tripsPerDay: 39111, sharePercent: 4.31, color: '#f59e0b' }
];

export const MODAL_SPLIT_TOTAL = 907382;

// 2. 버스 현황 요약 (124개 노선 730대)
export const BUS_CATEGORY_SUMMARY: BusCategorySummary[] = [
  { category: '광역버스', subCategory: '광역급행(M버스)', routesCount: 5, licensedCount: 49, note: '경기고속 포함 (2개노선 23대)' },
  { category: '광역버스', subCategory: '직행좌석', routesCount: 23, licensedCount: 180, note: '2층버스 25대 포함' },
  { category: '일반시내', subCategory: '시내버스', routesCount: 66, licensedCount: 396, note: '땡큐·벽지·공영버스 포함' },
  { category: '마을버스', subCategory: '마을버스', routesCount: 30, licensedCount: 105, note: '도시형 교통모델 포함' }
];

// 3 & 4. 직행좌석 & 광역버스 상세 노선
export const REGIONAL_EXPRESS_BUSES: RegionalExpressBus[] = [
  // 진접
  { id: '100', region: '진접', routeNumber: '100', operator: '대원운수', origin: '진벌리', destination: '강변역', busCount: 9, direction: '강변방면', busType: '직행좌석' },
  { id: '105', region: '진접', routeNumber: '105', operator: '대원운수', origin: '진벌리', destination: '불암산역', busCount: 6, direction: '불암산역방면', busType: '직행좌석' },
  { id: '105-1', region: '진접', routeNumber: '105-1', operator: '대원운수', origin: '광릉내', destination: '불암산역', busCount: 5, direction: '불암산역방면', busType: '직행좌석' },
  { id: '2000', region: '진접', routeNumber: '2000', operator: '경기운수', origin: '진벌리', destination: '강남역', busCount: 9, direction: '강남방면', busType: '직행좌석' },
  { id: '2000-1', region: '진접', routeNumber: '2000-1', operator: '경기운수', origin: '진벌리', destination: '강남역', busCount: 9, direction: '강남방면', busType: '직행좌석' },
  { id: '11', region: '진접', routeNumber: '11', operator: '경기버스', origin: '내촌', destination: '강변역', busCount: 5, direction: '강변방면', busType: '직행좌석' },
  { id: '7007', region: '진접', routeNumber: '7007', operator: '경기버스', origin: '광릉내', destination: '강남역', busCount: 12, direction: '강남방면', busType: '직행좌석' },
  { id: '8012', region: '진접', routeNumber: '8012', operator: '경기버스', origin: '광릉내', destination: '잠실역', busCount: 15, doubleDeckerCount: 4, direction: '잠실방면', busType: '직행좌석' },

  // 별내
  { id: '1001', region: '별내', routeNumber: '1001', operator: '대원운수', origin: '청학리', destination: '잠실역', busCount: 13, doubleDeckerCount: 5, direction: '잠실방면', busType: '직행좌석' },

  // 다산
  { id: 'M2353', region: '다산', routeNumber: 'M2353', operator: '대원운수', origin: '다산진건지구', destination: '잠실역', busCount: 10, direction: '잠실방면', busType: '광역급행' },
  { id: '1003', region: '다산', routeNumber: '1003', operator: '대원운수', origin: '다산진건지구', destination: '잠실역', busCount: 10, doubleDeckerCount: 2, direction: '잠실방면', busType: '직행좌석' },
  { id: '1006', region: '다산', routeNumber: '1006', operator: '대원운수', origin: '다산진건지구', destination: '강변역', busCount: 7, direction: '강변방면', busType: '직행좌석' },

  // 호평평내
  { id: 'M2323', region: '호평평내', routeNumber: 'M2323', operator: '경기고속', origin: '호평동', destination: '잠실역', busCount: 13, direction: '잠실방면', busType: '광역급행' },
  { id: 'M2352', region: '호평평내', routeNumber: 'M2352', operator: '대원운수', origin: '평내동', destination: '잠실역', busCount: 10, direction: '잠실방면', busType: '광역급행' },
  { id: '1000-1', region: '호평평내', routeNumber: '1000-1', operator: '대원운수', origin: '호평동', destination: '잠실역', busCount: 2, direction: '잠실방면', busType: '직행좌석' },
  { id: '1000', region: '호평평내', routeNumber: '1000', operator: '경기운수', origin: '호평동', destination: '잠실역', busCount: 6, direction: '잠실방면', busType: '직행좌석' },

  // 화도
  { id: 'M2316', region: '화도', routeNumber: 'M2316', operator: '경기고속', origin: '화도영남아파트', destination: '잠실역', busCount: 10, direction: '잠실방면', busType: '광역급행' },
  { id: 'M2341', region: '화도', routeNumber: 'M2341', operator: '대원운수', origin: '화도월산부영', destination: '잠실역', busCount: 6, direction: '잠실방면', busType: '광역급행' },
  { id: '1100', region: '화도', routeNumber: '1100', operator: '대원운수', origin: '차산리', destination: '신사역', busCount: 10, direction: '강남방면', busType: '직행좌석' },
  { id: '1200', region: '화도', routeNumber: '1200', operator: '대원운수', origin: '차산리', destination: '잠실역', busCount: 4, direction: '잠실방면', busType: '직행좌석' },
  { id: '1200-1', region: '화도', routeNumber: '1200-1', operator: '대원운수', origin: '차산리', destination: '잠실역', busCount: 4, direction: '잠실방면', busType: '직행좌석' },
  { id: '8001', region: '화도', routeNumber: '8001', operator: '대원운수', origin: '대성리', destination: '신사역', busCount: 3, direction: '강남방면', busType: '직행좌석' },
  { id: '8002', region: '화도', routeNumber: '8002', operator: '대원운수', origin: '대성리', destination: '잠실역', busCount: 12, doubleDeckerCount: 12, direction: '잠실방면', busType: '직행좌석' },
  { id: '8002-1', region: '화도', routeNumber: '8002-1', operator: '대원운수', origin: '대성리', destination: '잠실역', busCount: 11, direction: '잠실방면', busType: '직행좌석' },

  // 와부
  { id: '1660', region: '와부', routeNumber: '1660', operator: '대원운수', origin: '도곡리', destination: '강변역', busCount: 8, direction: '강변방면', busType: '직행좌석' },
  { id: '1670', region: '와부', routeNumber: '1670', operator: '대원운수', origin: '도곡리', destination: '잠실역', busCount: 6, doubleDeckerCount: 2, direction: '잠실방면', busType: '직행좌석' },
  { id: '1670-1', region: '와부', routeNumber: '1670-1', operator: '대원운수', origin: '도곡리', destination: '잠실역', busCount: 5, direction: '잠실방면', busType: '직행좌석' },
  { id: '1700', region: '와부', routeNumber: '1700', operator: '대원운수', origin: '도곡리', destination: '강남역', busCount: 9, direction: '강남방면', busType: '직행좌석' }
];

// 5. 땡큐버스 및 트롤리버스
export const THANK_YOU_BUSES: ThankYouBus[] = [
  { region: '다산권역', routeNumber: '땡큐10', operator: '대원운수', origin: '다산차고지', destination: '호평알프하임', busCount: 8, trolleyCount: 0, openedDate: '2019.12.24' },
  { region: '다산권역', routeNumber: '땡큐11', operator: '대원운수', origin: '수택차고지', destination: '다산역', busCount: 9, trolleyCount: 0, openedDate: '2020.05.22' },
  { region: '다산권역', routeNumber: '땡큐12', operator: '대원운수', origin: '수택차고지', destination: '다산역', busCount: 4, trolleyCount: 0, openedDate: '2023.01.01' },
  { region: '별내권역', routeNumber: '땡큐20', operator: '태산운수', origin: '별내차고지', destination: '금곡동', busCount: 12, trolleyCount: 0, openedDate: '2020.01.06' },
  { region: '별내권역', routeNumber: '땡큐30', operator: '대원운수', origin: '청학리', destination: '금곡동', busCount: 10, trolleyCount: 0, openedDate: '2020.04.29' },
  { region: '별내권역', routeNumber: '땡큐50', operator: '대원운수', origin: '청학리', destination: '금곡동', busCount: 15, trolleyCount: 0, openedDate: '2020.03.30' },
  { region: '별내권역', routeNumber: '땡큐51', operator: '대원운수', origin: '청학리', destination: '덕소삼거리', busCount: 1, trolleyCount: 0, openedDate: '2026.05.11' },
  { region: '별내권역', routeNumber: '땡큐85', operator: '흥안운수', origin: '별내차고지', destination: '별내역', busCount: 11, trolleyCount: 0, openedDate: '2023.04.01' },
  { region: '진접/오남', routeNumber: '땡큐31', operator: '경기버스', origin: '진벌리', destination: '극동성호@', busCount: 9, trolleyCount: 0, openedDate: '2023.04.01' },
  { region: '진접/오남', routeNumber: '땡큐60', operator: '경기운수', origin: '대경대', destination: '금곡동', busCount: 12, trolleyCount: 0, openedDate: '2020.03.30' },
  { region: '진접/오남', routeNumber: '땡큐70', operator: '경기운수', origin: '진벌리', destination: '금곡동', busCount: 10, trolleyCount: 1, openedDate: '2019.12.24' },
  { region: '진접/오남', routeNumber: '땡큐90', operator: '경기버스', origin: '광릉내', destination: '가운지구', busCount: 14, trolleyCount: 1, openedDate: '2020.02.19' },
  { region: '와부권역', routeNumber: '땡큐61/88-1/99', operator: '태화상운/와부마을/덕소교통', origin: '우성아파트', destination: '금곡동', busCount: 9, trolleyCount: 0, openedDate: '2020.03.09' },
  { region: '북한강변', routeNumber: '땡큐58-3', operator: '대원운수', origin: '대성리', destination: '도농역', busCount: 6, trolleyCount: 4, openedDate: '2023.01.01' },
  { region: '화도수동', routeNumber: '58', operator: '대원운수', origin: '차산리차고지', destination: '다산유적지', busCount: 6, trolleyCount: 4, openedDate: '2022.06.24' }
];

// 6. M버스
export const M_BUSES: MBus[] = [
  { routeNumber: 'M2341', operator: '대원운수', origin: '화도월산부영', destination: '잠실광역환승센터', busCount: 6, openedDate: '2019.04.29', note: '대광위 준공영제 (2020.11.24~)' },
  { routeNumber: 'M2352', operator: '대원운수', origin: '평내동(평내농협.대명루첸)', destination: '잠실광역환승센터', busCount: 10, openedDate: '2021.05.10', note: '대광위 준공영제 (2024.03.04~)' },
  { routeNumber: 'M2353', operator: '대원운수', origin: '다산진건지구', destination: '잠실광역환승센터', busCount: 10, openedDate: '2022.03.02', note: '대광위 준공영제 (2023.07.17~)' },
  { routeNumber: 'M2316', operator: '경기고속', origin: '화도영남아파트', destination: '잠실광역환승센터', busCount: 10, openedDate: '2012.06.08', note: '대광위 준공영제 (2022.07.25~)' },
  { routeNumber: 'M2323', operator: '경기고속', origin: '호평동', destination: '잠실광역환승센터', busCount: 13, openedDate: '2013.10.14', note: '대광위 준공영제 (2022.10.01~)' }
];

// 7. 2층버스 도입 현황
export const DOUBLE_DECKER_STATS: DoubleDeckerStat[] = [
  { year: '2015', total: 5, diesel: 5, electric: 0, hwado: 1, jinjeop: 1, hopyeong: 0, wabu: 0, byeolnae: 2, dasan: 1 },
  { year: '2016', total: 3, diesel: 3, electric: 0, hwado: 2, jinjeop: 1, hopyeong: 0, wabu: 0, byeolnae: 0, dasan: 0 },
  { year: '2017', total: 5, diesel: 5, electric: 0, hwado: 3, jinjeop: 1, hopyeong: 0, wabu: 0, byeolnae: 1, dasan: 0 },
  { year: '2018', total: 5, diesel: 5, electric: 0, hwado: 0, jinjeop: 1, hopyeong: 0, wabu: 0, byeolnae: 2, dasan: 2 },
  { year: '2019', total: 10, diesel: 10, electric: 0, hwado: 3, jinjeop: 1, hopyeong: 0, wabu: 2, byeolnae: 1, dasan: 3 },
  { year: '2021', total: 8, diesel: 4, electric: 4, hwado: 3, jinjeop: 2, hopyeong: 0, wabu: 0, byeolnae: 1, dasan: 2 }
];

// 8. 1일 이용객 현황 (2026. 6. 기준)
export const DAILY_PASSENGER_STATS: DailyPassengerStat[] = [
  { type: '광역버스', averageDaily: 19071, share: 10.48 },
  { type: '시내버스', averageDaily: 132361, share: 72.72 },
  { type: '마을버스', averageDaily: 30587, share: 16.80 }
];

export const DAILY_PASSENGER_TOTAL = 182019;

// 9. 공항버스 현황
export const AIRPORT_BUSES: AirportBus[] = [
  { routeNumber: '8843', operator: '경기고속', origin: '마석', via: '평내, 금곡, 도농역, 인창동, 김포공항', destination: '인천공항', distanceKm: 120.8, dailyTrips: '19회 (심야 3회)', note: '운행중' },
  { routeNumber: '8844', operator: '경기고속', origin: '광릉내', via: '장현, 진접택지, 오남역, 내각리, 별내동, 김포공항', destination: '인천공항', distanceKm: 129.3, dailyTrips: '7회 (심야 2회)', note: '운행중' },
  { routeNumber: '4800', operator: '경기고속', origin: '덕소', via: '다산동, 갈매동, 불암산영업소', destination: '인천공항', distanceKm: 112.2, dailyTrips: '5회', note: '운행중 (2025.3.1.~)' }
];

// 10. 저상버스 현황 (총 52개 노선 212대)
export const LOW_FLOOR_BUS_SUMMARY = {
  totalRoutes: 52,
  totalBuses: 212,
  cityBusRoutes: 33,
  cityBusTotal: 158,
  cityBusElectric: 142,
  cityBusCNG: 16,
  villageBusRoutes: 19,
  villageBusTotal: 54,
  villageBusElectric: 54
};

export const LOW_FLOOR_BUS_ROUTES: LowFloorBusStat[] = [
  // 일반시내버스 (33개 노선 158대)
  { busType: '일반시내', operator: '대원운수', routeNumber: '1', origin: '진벌리', destination: '강변역', totalCount: 7, electricCount: 0, cngCount: 7 },
  { busType: '일반시내', operator: '대원운수', routeNumber: '1-4', origin: '차산리', destination: '미사동', totalCount: 9, electricCount: 9, cngCount: 0 },
  { busType: '일반시내', operator: '대원운수', routeNumber: '168', origin: '차산리', destination: '도곡리', totalCount: 3, electricCount: 3, cngCount: 0 },
  { busType: '일반시내', operator: '대원운수', routeNumber: '7', origin: '훈련장입구', destination: '삼익아파트', totalCount: 2, electricCount: 2, cngCount: 0 },
  { busType: '일반시내', operator: '대원운수', routeNumber: '30', origin: '대성리', destination: '청량리', totalCount: 1, electricCount: 1, cngCount: 0 },
  { busType: '일반시내', operator: '대원운수', routeNumber: '55', origin: '사능차고지', destination: '55번종점', totalCount: 7, electricCount: 7, cngCount: 0 },
  { busType: '일반시내', operator: '대원운수', routeNumber: '58', origin: '차산리', destination: '다산유적지', totalCount: 2, electricCount: 2, cngCount: 0 },
  { busType: '일반시내', operator: '대원운수', routeNumber: '65', origin: '차산리', destination: '청량리', totalCount: 10, electricCount: 10, cngCount: 0 },
  { busType: '일반시내', operator: '대원운수', routeNumber: '65-1', origin: '차산리', destination: '석계역', totalCount: 1, electricCount: 1, cngCount: 0 },
  { busType: '일반시내', operator: '대원운수', routeNumber: '97', origin: '호평동', destination: '아산병원', totalCount: 7, electricCount: 7, cngCount: 0 },
  { busType: '일반시내', operator: '대원운수', routeNumber: '98', origin: '차산리', destination: '오남', totalCount: 3, electricCount: 3, cngCount: 0 },
  { busType: '일반시내', operator: '대원운수', routeNumber: '98-1', origin: '차산리', destination: '오남', totalCount: 1, electricCount: 1, cngCount: 0 },
  { busType: '일반시내', operator: '대원운수', routeNumber: '112-1', origin: '도곡리', destination: '강변역', totalCount: 6, electricCount: 0, cngCount: 6 },
  { busType: '일반시내', operator: '대원운수', routeNumber: '166-1', origin: '도곡리', destination: '청량리', totalCount: 3, electricCount: 0, cngCount: 3 },
  { busType: '일반시내', operator: '대원운수', routeNumber: '땡큐21', origin: '마석역', destination: '가곡리', totalCount: 2, electricCount: 2, cngCount: 0 },
  { busType: '일반시내', operator: '대원운수', routeNumber: '땡큐23', origin: '마석역', destination: '창현리', totalCount: 1, electricCount: 1, cngCount: 0 },
  { busType: '일반시내', operator: '대원운수', routeNumber: '땡큐24', origin: '맹골', destination: '창현초', totalCount: 3, electricCount: 3, cngCount: 0 },
  { busType: '일반시내', operator: '대원운수', routeNumber: '땡큐33', origin: '외구운', destination: '비금리', totalCount: 7, electricCount: 7, cngCount: 0 },
  { busType: '일반시내', operator: '대원운수', routeNumber: '땡큐34', origin: '차산리', destination: '축령산', totalCount: 2, electricCount: 2, cngCount: 0 },
  { busType: '일반시내', operator: '대원운수', routeNumber: '땡큐35', origin: '화도정수장', destination: '수산리', totalCount: 2, electricCount: 2, cngCount: 0 },
  { busType: '일반시내', operator: '대원운수', routeNumber: '땡큐36', origin: '차산리', destination: '지둔리', totalCount: 1, electricCount: 1, cngCount: 0 },
  { busType: '일반시내', operator: '대원운수', routeNumber: '땡큐37', origin: '차산리', destination: '만취대', totalCount: 1, electricCount: 1, cngCount: 0 },
  { busType: '일반시내', operator: '대원운수', routeNumber: '땡큐32', origin: '차산리', destination: '호평동', totalCount: 4, electricCount: 4, cngCount: 0 },
  { busType: '일반시내', operator: '경기버스', routeNumber: '23', origin: '내촌', destination: '천호역', totalCount: 22, electricCount: 22, cngCount: 0 },
  { busType: '일반시내', operator: '경기버스', routeNumber: '땡큐90', origin: '광릉내', destination: '가운지구', totalCount: 3, electricCount: 3, cngCount: 0 },
  { busType: '일반시내', operator: '경기버스', routeNumber: '707', origin: '진벌리', destination: '청량리', totalCount: 7, electricCount: 7, cngCount: 0 },
  { busType: '일반시내', operator: '경기버스', routeNumber: '155', origin: '청학리', destination: '석계역', totalCount: 11, electricCount: 11, cngCount: 0 },
  { busType: '일반시내', operator: '경기버스', routeNumber: '115', origin: '사능', destination: '석계역', totalCount: 8, electricCount: 8, cngCount: 0 },
  { busType: '일반시내', operator: '경기운수', routeNumber: '9', origin: '진벌리', destination: '강변역', totalCount: 15, electricCount: 15, cngCount: 0 },
  { busType: '일반시내', operator: '경기운수', routeNumber: '10-5', origin: '호평동', destination: '당고개역', totalCount: 2, electricCount: 2, cngCount: 0 },
  { busType: '일반시내', operator: '경기운수', routeNumber: '21', origin: '경복대', destination: '의정부역', totalCount: 2, electricCount: 2, cngCount: 0 },
  { busType: '일반시내', operator: '경기운수', routeNumber: '202', origin: '진벌리', destination: '청량리', totalCount: 1, electricCount: 1, cngCount: 0 },
  { busType: '일반시내', operator: '경기운수', routeNumber: '땡큐11', origin: '사릉', destination: '현대테라타워', totalCount: 2, electricCount: 2, cngCount: 0 },

  // 마을버스 (19개 노선 54대)
  { busType: '마을버스', operator: '풍양운수', routeNumber: '2, 2A', origin: '봉선사', destination: '한양병원', totalCount: 6, electricCount: 6, cngCount: 0 },
  { busType: '마을버스', operator: '풍양운수', routeNumber: '2-2, 2-2A', origin: '봉선사', destination: '한양병원', totalCount: 2, electricCount: 2, cngCount: 0 },
  { busType: '마을버스', operator: '와부버스', routeNumber: '88-2', origin: '월문5리', destination: '한강우성A', totalCount: 1, electricCount: 1, cngCount: 0 },
  { busType: '마을버스', operator: '와부버스', routeNumber: '88-3', origin: '덕소역', destination: '운길산역', totalCount: 2, electricCount: 2, cngCount: 0 },
  { busType: '마을버스', operator: '태화상운', routeNumber: '88', origin: '군인아파트', destination: '한강우성A', totalCount: 1, electricCount: 1, cngCount: 0 },
  { busType: '마을버스', operator: '태화상운', routeNumber: '88', origin: '군인아파트', destination: '한강우성A', totalCount: 2, electricCount: 2, cngCount: 0 },
  { busType: '마을버스', operator: '태화상운', routeNumber: '63', origin: '시우리종점', destination: '동부센트레빌', totalCount: 1, electricCount: 1, cngCount: 0 },
  { busType: '마을버스', operator: '덕소교통', routeNumber: '99-2', origin: '동부센트레빌', destination: '어룡', totalCount: 1, electricCount: 1, cngCount: 0 },
  { busType: '마을버스', operator: '덕소교통', routeNumber: '99-1A', origin: '동부센트레빌', destination: '안골', totalCount: 1, electricCount: 1, cngCount: 0 },
  { busType: '마을버스', operator: '덕소교통', routeNumber: '99-2A', origin: '동부센트레빌', destination: '궁마을', totalCount: 1, electricCount: 1, cngCount: 0 },
  { busType: '마을버스', operator: '태산운수', routeNumber: '80', origin: '오남역', destination: '별내차고지', totalCount: 10, electricCount: 10, cngCount: 0 },
  { busType: '마을버스', operator: '태산운수', routeNumber: '땡큐20', origin: '별내차고지', destination: '금곡동', totalCount: 2, electricCount: 2, cngCount: 0 },
  { busType: '마을버스', operator: '태산운수', routeNumber: '82A', origin: '별내차고지', destination: '태릉입구역', totalCount: 6, electricCount: 6, cngCount: 0 },
  { busType: '마을버스', operator: '태산운수', routeNumber: '82B', origin: '별내차고지', destination: '태릉입구역', totalCount: 6, electricCount: 6, cngCount: 0 },
  { busType: '마을버스', operator: '태산운수', routeNumber: '48', origin: '별내차고지', destination: '별내역2번출구', totalCount: 3, electricCount: 3, cngCount: 0 },
  { busType: '마을버스', operator: '태산운수', routeNumber: '48-1', origin: '별내차고지', destination: '갈매순환삼거리', totalCount: 4, electricCount: 4, cngCount: 0 },
  { busType: '마을버스', operator: '태산운수', routeNumber: '86', origin: '별내차고지', destination: '삼육대후문', totalCount: 1, electricCount: 1, cngCount: 0 },
  { busType: '마을버스', operator: '태산운수', routeNumber: '81', origin: '덕송초', destination: '별가람역', totalCount: 3, electricCount: 3, cngCount: 0 }
];

// 11. 택시 현황 요약
export const TAXI_SUMMARY: TaxiSummary[] = [
  { category: '일반택시', licenses: 342, companiesCount: 6, driversCount: 565, note: '법인택시' },
  { category: '개인택시', licenses: 949, companiesCount: 1, driversCount: 949, note: '1개 조합' },
  { category: '합계', licenses: 1291, companiesCount: 7, driversCount: 1514, note: '면허대수 기준' }
];

// 택시쉼터 현황
export const TAXI_SHELTERS: TaxiShelterInfo[] = [
  {
    name: '남부택시쉼터',
    location: '남양주시 늘을1로 39-36 (호평동 546-6 외 5필지)',
    scale: '건축 연면적 446㎡ (2층) / 부지 2,165㎡',
    operationMode: '민간위탁 (개인택시조합)',
    hours: '평일 09:00 ~ 18:00 (토·일 공휴일 휴무)',
    facilities: ['사무실', '휴게실', '체력단련실', '샤워실', '회의실'],
    dailyUsers: '30인/일 (개인 25인/일, 법인 5인/일)'
  },
  {
    name: '북부택시쉼터',
    location: '남양주시 경복대로 120-9 (오남읍 양지리 248-16 일원)',
    scale: '건축 연면적 340.85㎡ (2층) / 부지 1,182㎡',
    operationMode: '민간위탁 (법인택시노조연합회)',
    hours: '평일 09:00 ~ 18:00 (토·일 공휴일 휴무)',
    facilities: ['사무실', '휴게실', '체력단련실', '샤워실', '회의실'],
    dailyUsers: '20인/일 (개인 5인/일, 법인 15인/일)'
  }
];

// 12. 고요한택시 (청각장애인 택시)
export const QUIET_TAXI_STATS: QuietTaxiStat[] = [
  { company: '금성운수(합)', count: 1 },
  { company: '신안운수(주)', count: 2 },
  { company: '영훈운수(주)', count: 0 }
];

// 13. 택시승차대 현황 (53개소 중 대표 데이터 목록)
export const TAXI_STANDS: TaxiStand[] = [
  { id: 1, location: '호평동 700 (이마트)', type: '쉘터형', solarLighting: false, installedYear: 2023 },
  { id: 2, location: '진접읍 장현리 644-6 (장현 시내)', type: '포스트형', solarLighting: false, installedYear: 2007 },
  { id: 3, location: '와부읍 덕소리 111-2 (맥도날드 앞)', type: '포스트형', solarLighting: false, installedYear: 2007 },
  { id: 4, location: '금곡동 153-3 (금곡삼거리)', type: '쉘터형', solarLighting: false, installedYear: 2008 },
  { id: 5, location: '와부읍 덕소리 473-1 (덕소삼거리)', type: '포스트형', solarLighting: false, installedYear: 2008 },
  { id: 6, location: '와부읍 도곡리 1024-2 (경의중앙선 도심역)', type: '포스트형', solarLighting: false, installedYear: 2008 },
  { id: 7, location: '평내동 630 (택지지구 중심상가 노상)', type: '쉘터형', solarLighting: false, installedYear: 2009 },
  { id: 8, location: '조안면 진중리 200-4 (경의중앙선 운길산역)', type: '포스트형', solarLighting: false, installedYear: 2009 },
  { id: 9, location: '진건읍 용정리 722-1 (진건농협 앞)', type: '쉘터형', solarLighting: false, installedYear: 2010 },
  { id: 10, location: '다산동 4338-1 (광일협동조합)', type: '쉘터형', solarLighting: false, installedYear: 2010 },
  { id: 11, location: '별내면 청학리 418-5 (청학보건진료소)', type: '쉘터형', solarLighting: false, installedYear: 2010 },
  { id: 12, location: '진접읍 장현리 329-2 (홈플러스)', type: '쉘터형', solarLighting: false, installedYear: 2010 },
  { id: 13, location: '와부읍 덕소리 160-14 (덕소코오롱아파트)', type: '포스트형', solarLighting: false, installedYear: 2010 },
  { id: 14, location: '금곡동 660 (동남할인마트)', type: '쉘터형', solarLighting: false, installedYear: 2010 },
  { id: 15, location: '진건읍 사능리 604-10 (경춘선 사릉역)', type: '포스트형', solarLighting: false, installedYear: 2010 },
  { id: 16, location: '화도읍 마석우리 349 (중흥아파트)', type: '쉘터형', solarLighting: false, installedYear: 2010 },
  { id: 17, location: '화도읍 마석우리 245-2 (경춘선 마석역)', type: '쉘터형', solarLighting: false, installedYear: 2011 },
  { id: 18, location: '진접읍 금곡리 1127-82 (엠타워 맞은편)', type: '포스트형', solarLighting: false, installedYear: 2012 },
  { id: 19, location: '화도읍 묵현리 320-41 (경춘선 천마산역)', type: '쉘터형', solarLighting: false, installedYear: 2013 },
  { id: 20, location: '진접읍 금곡리 1127-112 (홈플러스 익스프레스)', type: '포스트형', solarLighting: false, installedYear: 2013 },
  { id: 21, location: '퇴계원읍 퇴계원리 218-142 (퇴계원역 광장)', type: '포스트형', solarLighting: false, installedYear: 2014 },
  { id: 22, location: '진접읍 연평리 101-14 (이마트)', type: '쉘터형', solarLighting: false, installedYear: 2014 },
  { id: 23, location: '평내동 660 (경춘선 평내호평역)', type: '포스트형', solarLighting: false, installedYear: 2015 },
  { id: 24, location: '별내동 1017 (새마을금고)', type: '포스트형', solarLighting: false, installedYear: 2015 },
  { id: 25, location: '별내동 851 (현대아이파크 2차)', type: '포스트형', solarLighting: false, installedYear: 2015 },
  { id: 26, location: '평내동 197-6 (부부치과)', type: '포스트형', solarLighting: false, installedYear: 2016 },
  { id: 27, location: '진접읍 금곡리 1127-113 (홈플러스익스프레스 뒤편)', type: '포스트형', solarLighting: false, installedYear: 2016 },
  { id: 28, location: '다산동 4056-7 (경의중앙선 도농역)', type: '쉘터형', solarLighting: false, installedYear: 2016 },
  { id: 29, location: '화도읍 묵현리 405-11 (한누리요양병원)', type: '포스트형', solarLighting: false, installedYear: 2016 },
  { id: 30, location: '화도읍 창현리 716 (원병원 교차로)', type: '쉘터형', solarLighting: false, installedYear: 2017 },
  { id: 31, location: '별내동 1032 (신안인스빌아파트 맞은편)', type: '포스트형', solarLighting: false, installedYear: 2018 },
  { id: 32, location: '오남읍 오남리 344-8 (현대자동차 블루핸즈)', type: '쉘터형', solarLighting: false, installedYear: 2018 },
  { id: 33, location: '다산동 4001-7 (부영프라자)', type: '포스트형', solarLighting: false, installedYear: 2018 },
  { id: 34, location: '별내동 889 (별내자동차검사소 맞은편)', type: '포스트형', solarLighting: false, installedYear: 2018 },
  { id: 35, location: '퇴계원읍 퇴계원리 286-20 (극동아파트)', type: '쉘터형', solarLighting: true, installedYear: 2019 },
  { id: 36, location: '진접읍 금곡리 1127-4 (롯데시네마)', type: '쉘터형', solarLighting: true, installedYear: 2019 },
  { id: 37, location: '별내동 989 (이마트)', type: '쉘터형', solarLighting: true, installedYear: 2019 },
  { id: 38, location: '다산동 6142 (현대아울렛)', type: '쉘터형', solarLighting: false, installedYear: 2020 },
  { id: 39, location: '다산동 6261 (다산중앙로 양방향)', type: '쉘터형', solarLighting: false, installedYear: 2020 },
  { id: 40, location: '다산동 6288 (다산지금로 양방향)', type: '쉘터형', solarLighting: false, installedYear: 2020 },
  { id: 41, location: '평내동 647-11 (리치플러스)', type: '쉘터형', solarLighting: true, installedYear: 2020 },
  { id: 42, location: '호평동 231-15 (대명 루첸아파트 상가 입구 앞)', type: '쉘터형', solarLighting: true, installedYear: 2020 },
  { id: 43, location: '다산동 6260 (다산자이 아이비플레이스)', type: '쉘터형', solarLighting: false, installedYear: 2021 },
  { id: 44, location: '와부읍 덕소리 590-34 (경의중앙선 덕소역)', type: '쉘터형', solarLighting: false, installedYear: 2021 },
  { id: 45, location: '진접읍 부평리 708-12 (부평2지구)', type: '쉘터형', solarLighting: false, installedYear: 2022 },
  { id: 46, location: '오남읍 양지리 723-1 (진접선 오남역)', type: '쉘터형', solarLighting: false, installedYear: 2022 },
  { id: 47, location: '와부읍 팔당리 358-5 (경의중앙선 팔당역)', type: '쉘터형', solarLighting: true, installedYear: 2022 },
  { id: 48, location: '별내동 836 (별내별가람역)', type: '포스트형', solarLighting: false, installedYear: 2022 },
  { id: 49, location: '화도읍 마석우리 270 (새마을금고 앞)', type: '쉘터형', solarLighting: true, installedYear: 2022 },
  { id: 50, location: '다산동 6285 (국민연금 남양주지사 앞)', type: '포스트형', solarLighting: false, installedYear: 2024 },
  { id: 51, location: '별내동 986 (별내역)', type: '쉘터형', solarLighting: false, installedYear: 2024 },
  { id: 52, location: '다산동 6284 (힐스테이트 지금디포레 오피스텔)', type: '포스트형', solarLighting: false, installedYear: 2025 },
  { id: 53, location: '호평동 675-2 (버스차고지 앞)', type: '포스트형', solarLighting: false, installedYear: 2025 }
];

// 14. 운수업체 현황 Detailed Data
export const GENERAL_TAXI_OPERATORS = [
  { name: '영훈운수(주)', representative: '조현의', address: '오남읍 진건오남로 735-7', licenses: 62, phone: '031-575-2294', fax: '031-575-2443' },
  { name: '신안운수(주)', representative: '안성섭, 안재민', address: '화도읍 비룡로 141번길 57-2', licenses: 56, phone: '031-594-0455', fax: '031-594-0466' },
  { name: '광일협동조합', representative: '송준', address: '미금로 57-3 (다산동)', licenses: 60, phone: '031-563-5318', fax: '031-557-2863' },
  { name: '성구운수(합)', representative: '정순철', address: '진접읍 금강로 1657', licenses: 58, phone: '031-566-2286', fax: '031-567-4220' },
  { name: '(주)새한산업', representative: '윤효일, 황오곤', address: '경춘로 855-23 (금곡동)', licenses: 53, phone: '031-568-3541', fax: '031-568-3540' },
  { name: '금성운수(합)', representative: '이세중', address: '진관로24번길12(다산동)', licenses: 53, phone: '031-595-1248', fax: '031-591-8233' }
];

export const PRIVATE_TAXI_UNION_INFO = {
  category: '개인택시',
  licenses: 949,
  address: '늘을1로 39-36',
  head: '장재식',
  phone: '031-592-2141',
  fax: '031-594-2142'
};

export const MODEL_DRIVER_ASSOCIATIONS = [
  { name: '남양주 남부 모범운전자회', head: '박상우', address: '늘을1로 39-36', phone: '031-566-4133', members: 94 },
  { name: '남양주 북부 모범운전자회', head: '김석종', address: '경복대로 120-9', phone: '031-527-4582', members: 66 }
];

export const TAXI_SHELTERS_COMPARISON = [
  {
    name: '남부택시쉼터 (19년 12월 운영개시)',
    location: '호평동 546-6 외 5필지',
    scale: '연면적 446㎡(2개동) / 부지 2,165㎡',
    operationMode: '민간위탁(개인택시조합)',
    hours: '평일 09:00 ~ 18:00 (토·일 공휴일 휴무)',
    facilities: '체력단련실, 관리실, 샤워실, 휴게실, 회의실 등'
  },
  {
    name: '북부택시쉼터 (25년 4월 운영개시)',
    location: '오남읍 양지리 248-16 일원',
    scale: '연면적 340.85㎡(2개동) / 부지 1,182㎡',
    operationMode: '민간위탁(법인택시노조연합회)',
    hours: '평일 09:00 ~ 18:00 (토·일 공휴일 휴무)',
    facilities: '체력단련실, 관리실, 샤워실, 휴게실, 회의실 등'
  }
];

export const CITY_BUS_OPERATORS = [
  { name: '(주)경기운수', representative: '허상준', address: '진접읍 경복대로 497', licenseDate: '80. 6. 30', vehicles: 106, phone: '031-574-0169' },
  { name: '(주)경기버스', representative: '허상준', address: '진접읍 경복대로 497', licenseDate: '82. 7. 18', vehicles: 123, phone: '031-574-0169' },
  { name: '(주)대원운수', representative: '허상준', address: '와부읍 덕소로 320', licenseDate: '99. 3. 20', vehicles: 376, phone: '031-521-4037' }
];

export interface TownBusDetailItem {
  company: string;
  representative: string;
  phone: string;
  routeNumber: string;
  origin: string;
  destination: string;
  busCount: number | string;
  distanceKm: number;
  note?: string;
  rowSpan?: number;
  isFirstInCompany?: boolean;
}

export const TOWN_BUS_DETAILED_ROWS: TownBusDetailItem[] = [
  // 와부버스 (4노선)
  { company: '와부버스', representative: '김경모', phone: '031-576-9388', routeNumber: '88', origin: '군인@', destination: '도곡리', busCount: 1, distanceKm: 5.8, note: '도시형 교통모델 (시내버스 한정면허)', rowSpan: 4, isFirstInCompany: true },
  { company: '와부버스', representative: '김경모', phone: '031-576-9388', routeNumber: '땡큐88-1', origin: '도곡리', destination: '금곡', busCount: 3, distanceKm: 16.7 },
  { company: '와부버스', representative: '김경모', phone: '031-576-9388', routeNumber: '88-2', origin: '글개울', destination: '도곡리', busCount: 1, distanceKm: 13.9 },
  { company: '와부버스', representative: '김경모', phone: '031-576-9388', routeNumber: '88-3', origin: '덕소역', destination: '운길산역', busCount: 2, distanceKm: 20.0 },

  // 덕소교통 (6노선)
  { company: '덕소교통', representative: '김향미', phone: '031-577-0399', routeNumber: '땡큐99', origin: '도곡리', destination: '금곡', busCount: 3, distanceKm: 16.7, rowSpan: 6, isFirstInCompany: true },
  { company: '덕소교통', representative: '김향미', phone: '031-577-0399', routeNumber: '99-1', origin: '동부@', destination: '자운동', busCount: 2, distanceKm: 8.6 },
  { company: '덕소교통', representative: '김향미', phone: '031-577-0399', routeNumber: '99-1A', origin: '동부@', destination: '안골', busCount: '-', distanceKm: 8.3 },
  { company: '덕소교통', representative: '김향미', phone: '031-577-0399', routeNumber: '99-2', origin: '동부@', destination: '어룡', busCount: 4, distanceKm: 8.0, note: '농어촌 공영버스' },
  { company: '덕소교통', representative: '김향미', phone: '031-577-0399', routeNumber: '99-2A', origin: '동부@', destination: '궁마을', busCount: '-', distanceKm: 6.3 },
  { company: '덕소교통', representative: '김향미', phone: '031-577-0399', routeNumber: '99-3', origin: '와부농협', destination: '어룡', busCount: 1, distanceKm: 10.0 },

  // 태화상운(주) (5노선)
  { company: '태화상운(주)', representative: '김경모', phone: '031-576-9388', routeNumber: '60', origin: '도곡리', destination: '월문리', busCount: 4, distanceKm: 12.5, rowSpan: 5, isFirstInCompany: true },
  { company: '태화상운(주)', representative: '김경모', phone: '031-576-9388', routeNumber: '땡큐61', origin: '도곡리', destination: '금곡', busCount: 3, distanceKm: 16.7 },
  { company: '태화상운(주)', representative: '김경모', phone: '031-576-9388', routeNumber: '88', origin: '군인@', destination: '도곡리', busCount: 1, distanceKm: 5.8 },
  { company: '태화상운(주)', representative: '김경모', phone: '031-576-9388', routeNumber: '63', origin: '동부@', destination: '시우리', busCount: 1, distanceKm: 29.4, note: '농어촌 공영버스' },
  { company: '태화상운(주)', representative: '김경모', phone: '031-576-9388', routeNumber: '64', origin: '봉인사', destination: '금곡', busCount: 1, distanceKm: 5.3 },

  // 흥안운수(주) (3노선)
  { company: '흥안운수(주)', representative: '조장우', phone: '02-936-6000', routeNumber: '33-1', origin: '당고개역', destination: '에코랜드수영장', busCount: 6, distanceKm: 9.6, rowSpan: 3, isFirstInCompany: true },
  { company: '흥안운수(주)', representative: '조장우', phone: '02-936-6000', routeNumber: '땡큐85', origin: '별내차고지', destination: '별내하우스토리', busCount: 11, distanceKm: 12.3 },
  { company: '흥안운수(주)', representative: '조장우', phone: '02-936-6000', routeNumber: '85-1', origin: '당고개역', destination: '별내역', busCount: 1, distanceKm: 9.5 },

  // (주)태산운수 (8노선)
  { company: '(주)태산운수', representative: '김해숙', phone: '031-529-1207', routeNumber: '땡큐20', origin: '별내차고지', destination: '금곡', busCount: 12, distanceKm: 20.5, rowSpan: 8, isFirstInCompany: true },
  { company: '(주)태산운수', representative: '김해숙', phone: '031-529-1207', routeNumber: '80', origin: '오남역', destination: '부대앞', busCount: 10, distanceKm: 20.7 },
  { company: '(주)태산운수', representative: '김해숙', phone: '031-529-1207', routeNumber: '82A', origin: '남양@', destination: '태릉입구역', busCount: 6, distanceKm: 13.2 },
  { company: '(주)태산운수', representative: '김해숙', phone: '031-529-1207', routeNumber: '82B', origin: '별내빙상장', destination: '태릉입구역', busCount: 6, distanceKm: 11.5 },
  { company: '(주)태산운수', representative: '김해숙', phone: '031-529-1207', routeNumber: '48', origin: '부대앞', destination: '별내역2번출구', busCount: 2, distanceKm: 9.2 },
  { company: '(주)태산운수', representative: '김해숙', phone: '031-529-1207', routeNumber: '48-1', origin: '부대앞', destination: '갈매순환삼거리', busCount: 4, distanceKm: 16.0 },
  { company: '(주)태산운수', representative: '김해숙', phone: '031-529-1207', routeNumber: '86', origin: '별내차고지', destination: '삼육대후문', busCount: 2, distanceKm: 17.0 },
  { company: '(주)태산운수', representative: '김해숙', phone: '031-529-1207', routeNumber: '81', origin: '덕송초', destination: '별내가람역', busCount: 3, distanceKm: 11.8, note: '도시형 교통모델 (시내버스 한정면허)' },

  // (주)풍양운수 (4노선)
  { company: '(주)풍양운수', representative: '정준호', phone: '031-571-3511', routeNumber: '2', origin: '봉선사', destination: '한양병원', busCount: 9, distanceKm: 14.0, rowSpan: 4, isFirstInCompany: true },
  { company: '(주)풍양운수', representative: '정준호', phone: '031-571-3511', routeNumber: '2A', origin: '봉선사', destination: '신우@', busCount: '-', distanceKm: 12.5 },
  { company: '(주)풍양운수', representative: '정준호', phone: '031-571-3511', routeNumber: '2-2', origin: '봉선사', destination: '한양병원', busCount: 2, distanceKm: 14.0 },
  { company: '(주)풍양운수', representative: '정준호', phone: '031-571-3511', routeNumber: '2-2A', origin: '봉선사', destination: '신일@', busCount: '-', distanceKm: 12.5 }
];

// 14. 운수업체 현황 (기존 호환 유지)
export const TRANSPORT_OPERATORS: TransportOperator[] = [
  // 일반택시
  { category: '일반택시', name: '영훈운수(주)', representative: '조현의', address: '오남읍 진건오남로 735-7', licenses: 62, phone: '031-575-2294', fax: '031-575-2443' },
  { category: '일반택시', name: '신안운수(주)', representative: '안성섭, 안재민', address: '화도읍 비룡로 141번길 57-2', licenses: 56, phone: '031-594-0455', fax: '031-594-0466' },
  { category: '일반택시', name: '광일협동조합', representative: '송준', address: '미금로 57-3 (다산동)', licenses: 60, phone: '031-563-5318', fax: '031-557-2863' },
  { category: '일반택시', name: '성구운수(합)', representative: '정순철', address: '진접읍 금강로 1657', licenses: 58, phone: '031-566-2286', fax: '031-567-4220' },
  { category: '일반택시', name: '(주)새한산업', representative: '윤효일, 황오곤', address: '경춘로 855-23 (금곡동)', licenses: 53, phone: '031-568-3541', fax: '031-568-3540' },
  { category: '일반택시', name: '금성운수(합)', representative: '이세중', address: '진관로24번길12 (다산동)', licenses: 53, phone: '031-595-1248', fax: '031-591-8233' },

  // 시내버스 (관내 3개 업체)
  { category: '시내버스', name: '(주)경기운수', representative: '허상준', address: '진접읍 경복대로 497', licenses: 106, phone: '031-574-0169', note: '면허일자: 80.6.30' },
  { category: '시내버스', name: '(주)경기버스', representative: '허상준', address: '진접읍 경복대로 497', licenses: 123, phone: '031-574-0169', note: '면허일자: 82.7.18' },
  { category: '시내버스', name: '(주)대원운수', representative: '허상준', address: '와부읍 덕소로 320', licenses: 376, phone: '031-521-4037', note: '면허일자: 99.3.20' },

  // 마을버스 (관내 6개 업체)
  { category: '마을버스', name: '와부버스', representative: '김경모', address: '와부읍 덕소리', licenses: 7, phone: '031-576-9388', routesCount: 4 },
  { category: '마을버스', name: '덕소교통', representative: '김향미', address: '와부읍 덕소리', licenses: 14, phone: '031-577-0399', routesCount: 6 },
  { category: '마을버스', name: '태화상운(주)', representative: '김경모', address: '와부읍 월문리', licenses: 10, phone: '031-576-9388', routesCount: 5 },
  { category: '마을버스', name: '흥안운수(주)', representative: '조장우', address: '별내동 차고지', licenses: 18, phone: '02-936-6000', routesCount: 3 },
  { category: '마을버스', name: '(주)태산운수', representative: '김해숙', address: '별내동 차고지', licenses: 45, phone: '031-529-1207', routesCount: 8 },
  { category: '마을버스', name: '(주)풍양운수', representative: '정준호', address: '오남읍 봉선사', licenses: 11, phone: '031-571-3511', routesCount: 4 }
];

// 15. 택시 유종별 현황
export const FUEL_TYPE_STATS: FuelTypeStat[] = [
  { type: '일반택시', lpg: 342, electric: 0, hybrid: 0, total: 342 },
  { type: '개인택시', lpg: 777, electric: 168, hybrid: 4, total: 949 },
  { type: '합계', lpg: 1119, electric: 168, hybrid: 4, total: 1291 }
];

export const DETAILED_TAXI_FUEL_DATA = {
  total: { registered: 1291, lpg: 1119, electric: 168, hybrid: 4 },
  generalTotal: { registered: 342, lpg: 342, electric: 0, hybrid: 0 },
  generalOperators: [
    { name: '영훈운수(주)', registered: 62, lpg: 62, electric: 0, hybrid: 0 },
    { name: '신안운수(주)', registered: 56, lpg: 56, electric: 0, hybrid: 0 },
    { name: '광일협동조합', registered: 60, lpg: 60, electric: 0, hybrid: 0 },
    { name: '성구운수(합)', registered: 58, lpg: 58, electric: 0, hybrid: 0 },
    { name: '(주)새한산업', registered: 53, lpg: 53, electric: 0, hybrid: 0 },
    { name: '금성운수(합)', registered: 53, lpg: 53, electric: 0, hybrid: 0 }
  ],
  privateTaxi: { registered: 949, lpg: 777, electric: 168, hybrid: 4 }
};

// 16. 버스정류장 현황 요약 & 스마트 승강장
export const BUS_STOP_SUMMARY = {
  total: 1913,
  shelterType: 1053,
  independentInfo: 39,
  signpost: 521,
  noSignpost: 257,
  smartShelter: 43
};

export const SMART_SHELTERS: SmartShelter[] = [
  { id: '스마트-1', name: '스마트-1', region: '호평동', stopNumber: '23475', stopName: '호평상업지구.이마트', address: '호평동 700', installedYearMonth: '2019.12' },
  { id: '스마트-2', name: '스마트-2', region: '진접읍', stopNumber: '23208', stopName: '봉현마을', address: '진접읍 장현리 659-1', installedYearMonth: '2019.12' },
  { id: '스마트-3', name: '스마트-3', region: '별내면', stopNumber: '23023', stopName: '별내도서관', address: '별내면 청학리 422-17', installedYearMonth: '2019.12' },
  { id: '스마트-4', name: '스마트-4', region: '화도읍', stopNumber: '23631', stopName: '마석역', address: '화도읍 마석우리 247', installedYearMonth: '2019.12' },
  { id: '스마트-5', name: '스마트-5', region: '진건읍', stopNumber: '49374', stopName: '사능역.진건파출소', address: '진건읍 사능리 606-13', installedYearMonth: '2019.12' },
  { id: '스마트-6', name: '스마트-6', region: '평내동', stopNumber: '23479', stopName: '평내호평역①', address: '평내동 660', installedYearMonth: '2023.04' },
  { id: '스마트-7', name: '스마트-7', region: '평내동', stopNumber: '23920', stopName: '평내호평역②', address: '평내동 660', installedYearMonth: '2023.04' },
  { id: '스마트-8', name: '스마트-8', region: '평내동', stopNumber: '23915', stopName: '평내호평역③', address: '평내동 24-11', installedYearMonth: '2023.04' },
  { id: '스마트-9', name: '스마트-9', region: '평내동', stopNumber: '23456', stopName: '평내동주민자치센터', address: '평내동 268-5', installedYearMonth: '2024.07' },
  { id: '스마트-10', name: '스마트-10', region: '평내동', stopNumber: '23457', stopName: '평내초교앞', address: '평내동 203-12', installedYearMonth: '2024.07' },
  { id: '스마트-11', name: '스마트-11', region: '호평동', stopNumber: '23493', stopName: '임광그대가아파트', address: '호평동 256', installedYearMonth: '2024.07' },
  { id: '스마트-12', name: '스마트-12', region: '호평동', stopNumber: '23494', stopName: '호평도서관', address: '호평동 369-6', installedYearMonth: '2024.07' },
  { id: '스마트-13', name: '스마트-13', region: '호평동', stopNumber: '23496', stopName: '호평동주민자치센터', address: '호평동 703 / 669', installedYearMonth: '2024.07' },
  { id: '스마트-14', name: '스마트-14', region: '호평동', stopNumber: '23503', stopName: '효성해링턴플레이스.구룡터', address: '호평동 92-3', installedYearMonth: '2024.07' },
  { id: '스마트-15', name: '스마트-15', region: '평내동', stopNumber: '23750', stopName: '평내상업지구', address: '평내동 268-16', installedYearMonth: '2024.07' },
  { id: '스마트-16', name: '스마트-16', region: '호평동', stopNumber: '23999', stopName: '호평체육문화센터', address: '호평동 694-2', installedYearMonth: '2024.07' },
  { id: '스마트-17', name: '스마트-17', region: '호평동', stopNumber: '49182', stopName: '호평상업지구.이마트', address: '호평동 700', installedYearMonth: '2024.07' },
  { id: '스마트-18', name: '스마트-18', region: '화도읍', stopNumber: '23506', stopName: '경성큰마을아파트', address: '화도읍 묵현리 600-12', installedYearMonth: '2024.07' },
  { id: '스마트-19', name: '스마트-19', region: '화도읍', stopNumber: '23513', stopName: '천마산휴게소.한누리요양병원', address: '화도읍 묵현리 411-23', installedYearMonth: '2024.07' },
  { id: '스마트-20', name: '스마트-20', region: '화도읍', stopNumber: '23576', stopName: '삼신푸른솔.두산위브트레지움', address: '화도읍 묵현리 산152-11', installedYearMonth: '2024.07' },
  { id: '스마트-21', name: '스마트-21', region: '화도읍', stopNumber: '23580', stopName: '중흥아파트', address: '화도읍 마석우리 381', installedYearMonth: '2024.07' },
  { id: '스마트-22', name: '스마트-22', region: '화도읍', stopNumber: '23586', stopName: '대림아파트.신도브래뉴1차아파트', address: '화도읍 마석우리 447-5', installedYearMonth: '2024.07' },
  { id: '스마트-23', name: '스마트-23', region: '수동면', stopNumber: '23663', stopName: '수동면사무소', address: '수동면 운수리 95-123', installedYearMonth: '2024.07' },
  { id: '스마트-24', name: '스마트-24', region: '화도읍', stopNumber: '23910', stopName: '송라초교, 신명스카이뷰', address: '화도읍 마석우리 583', installedYearMonth: '2024.07' },
  { id: '스마트-25', name: '스마트-25', region: '화도읍', stopNumber: '23908', stopName: '신명아파트', address: '화도읍 창현리 753', installedYearMonth: '2024.07' },
  { id: '스마트-26', name: '스마트-26', region: '화도읍', stopNumber: '49395', stopName: '월산지구부영1.2단지', address: '화도읍 답내리 516-7', installedYearMonth: '2024.07' },
  { id: '스마트-27', name: '스마트-27', region: '화도읍', stopNumber: '49489', stopName: '보학마을.라온프라이빗아파트', address: '화도읍 녹촌리 산5-2', installedYearMonth: '2024.07' },
  { id: '스마트-28', name: '스마트-28', region: '다산동', stopNumber: '49806', stopName: '한양수자인1차입구', address: '다산동 6256', installedYearMonth: '2025.00' },
  { id: '스마트-29', name: '스마트-29', region: '다산동', stopNumber: '49264', stopName: '유승한내들골든뷰', address: '다산동 6256', installedYearMonth: '2025.00' },
  { id: '스마트-30', name: '스마트-30', region: '다산동', stopNumber: '49886', stopName: '다산선형공원', address: '다산동 6261', installedYearMonth: '2025.00' },
  { id: '스마트-31', name: '스마트-31', region: '다산동', stopNumber: '49792', stopName: '반도유보라정문.다산포레스트2단지', address: '다산동 6253', installedYearMonth: '2025.00' },
  { id: '스마트-32', name: '스마트-32', region: '다산동', stopNumber: '49782', stopName: '자연앤e편한세상3차정문', address: '다산동 6268', installedYearMonth: '2025.00' },
  { id: '스마트-33', name: '스마트-33', region: '다산동', stopNumber: '49845', stopName: '다산센트럴파크, F1단독택지', address: '다산동 6269-1', installedYearMonth: '2025.00' },
  { id: '스마트-34', name: '스마트-34', region: '다산동', stopNumber: '23087', stopName: '다산해모르.다산센트레빌.롯데아파트', address: '다산동 6298', installedYearMonth: '2025.00' },
  { id: '스마트-35', name: '스마트-35', region: '다산동', stopNumber: '49831', stopName: '금강펜테리움1차', address: '다산동 6288', installedYearMonth: '2025.00' },
  { id: '스마트-36', name: '스마트-36', region: '다산동', stopNumber: '49834', stopName: '금강펜트리움2차.반도유보라신안인스빌', address: '다산동 6288', installedYearMonth: '2025.00' },
  { id: '스마트-37', name: '스마트-37', region: '금곡동', stopNumber: '23393', stopName: '금곡동구종점, 금곡초교', address: '금곡동 153-3', installedYearMonth: '2025.00' },
  { id: '스마트-38', name: '스마트-38', region: '금곡동', stopNumber: '23373', stopName: '사능입구,금곡우체국,남양주고용복지플러스센터', address: '금곡동 423-23', installedYearMonth: '2025.00' },
  { id: '스마트-39', name: '스마트-39', region: '금곡동', stopNumber: '23369', stopName: '사능입구,금곡우체국', address: '금곡동 402-8', installedYearMonth: '2025.00' },
  { id: '스마트-40', name: '스마트-40', region: '금곡동', stopNumber: '23367', stopName: '사능입구,금곡우체국', address: '금곡동 404-215', installedYearMonth: '2025.00' },
  { id: '스마트-41', name: '스마트-41', region: '금곡동', stopNumber: '23359', stopName: '양병원', address: '금곡동 428-8', installedYearMonth: '2025.00' }
];

// 17. 대중교통비 지원 정책
export const TRANSIT_SUBSIDIES: TransitSubsidy[] = [
  {
    id: 'kpass',
    title: 'K-패스 지원사업 (국도비/K-PASS)',
    targetGroup: '만 19세 이상 주민',
    ageRange: '만 19세 이상',
    method: '카드사 앱/홈페이지 신청, 월 15회 이상 사용 시 환급',
    limit: '무제한 환급 (일반 20%, 어르신/청년 30%, 저소득층 53%)',
    cycle: '매월 계좌 환급',
    paymentType: '계좌 환급 (현금)',
    budget2026Total: 17835600,
    cityBudget2026: 6218800,
    targetCount: '612,037명',
    subscribers: '107,876명 (2026.7 기준)',
    avgPayment: '44,655원/월',
    description: '지역 구분 없이 전국 모든 대중교통 수단 이용 시 환급 (고속·시외버스, KTX 등 제외). 고유가 대응 K패스 확대 지원 적용.'
  },
  {
    id: 'senior',
    title: '어르신 교통비 지원사업',
    targetGroup: '만 65세 이상 어르신',
    ageRange: '만 65세 이상',
    method: '관내 농협 방문 신청 (농협 교통카드)',
    limit: '연 최대 12만원 (분기당 각 3만원)',
    cycle: '분기별 지급',
    paymentType: '현금 환급',
    budget2026Total: 5120396,
    cityBudget2026: 5120396,
    targetCount: '142,550명',
    subscribers: '134,612명 (2026.7 기준)',
    avgPayment: '21,777원/분기',
    description: '어르신들의 이동권 보장 및 교통비 절감을 위해 남양주시 시비 100%로 연간 최대 12만원 지원.'
  },
  {
    id: 'youth',
    title: '경기도 어린이·청소년 교통비 지원사업',
    targetGroup: '만 6세 ~ 18세 어린이·청소년',
    ageRange: '만 6세 ~ 만 18세',
    method: '지원플랫폼을 통한 온라인 신청',
    limit: '연 최대 24만원 (분기당 각 6만원)',
    cycle: '분기별 지급',
    paymentType: '남양주사랑상품권 (지역화폐)',
    budget2026Total: 804064,
    cityBudget2026: 402032,
    targetCount: '92,548명',
    subscribers: '29,774명 (2025 기준)',
    avgPayment: '24,295원/년',
    description: '대중교통 이용 빈도가 높은 청소년에게 분기별 최대 6만원, 연간 24만원 지역화폐 환급 지원.'
  }
];

// 사업별 예산/집행/필요액 현황 (단위: 백만원)
export const BUDGET_YEAR_ANALYTICS: BudgetYearInfo[] = [
  {
    category: '어르신 교통비',
    y2024Budget: 5020,
    y2024Spent: 5020,
    y2025Budget: 5120,
    y2025Spent: 5120,
    y2026Budget: 5120,
    y2026Spent: 3225,
    y2026Required: 6520,
    y2026Shortage: 1400
  },
  {
    category: 'K-패스',
    y2024Budget: 5960,
    y2024Spent: 5960,
    y2025Budget: 11940,
    y2025Spent: 11940,
    y2026Budget: 17836,
    y2026Spent: 11660,
    y2026Required: 27285,
    y2026Shortage: 9449
  },
  {
    category: '어린이·청소년 교통비',
    y2024Budget: 1258,
    y2024Spent: 1258,
    y2025Budget: 870,
    y2025Spent: 870,
    y2026Budget: 804,
    y2026Spent: 804,
    y2026Required: 1259,
    y2026Shortage: 455
  },
  {
    category: '합 계',
    y2024Budget: 12238,
    y2024Spent: 12238,
    y2025Budget: 17930,
    y2025Spent: 17930,
    y2026Budget: 23760,
    y2026Spent: 15689,
    y2026Required: 35064,
    y2026Shortage: 11304
  }
];
