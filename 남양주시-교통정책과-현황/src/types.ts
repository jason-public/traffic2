export interface RailwayPlan {
  id: string;
  category: string;
  status: '본 사업' | '추가 검토사업' | '건의 사업';
  lineName: string;
  route: string;
  distance: string;
  budget: string;
  expectedImpact: string;
  progress: string;
  affectedNeighborhoods: string[];
}

export interface GtxOperationItem {
  id: string;
  type: 'GTX' | '경춘선' | 'KTX';
  name: string;
  route: string;
  details: string;
  budget: string;
  impact: string;
  progress: string;
  affectedNeighborhoods: string[];
}

export interface GtxPhase2Item {
  id: string;
  line: string; // 'GTX-D' | 'GTX-E' | 'GTX-F' | 'GTX-G'
  route: string;
  distance: string;
  budget: string;
  impact: string;
  progress: string;
  remarks: string;
  color: string;
  affectedNeighborhoods: string[];
}

export interface UrbanMetroData {
  id: string;
  name: string;
  openingDate: string;
  section: string;
  distance: string;
  weekdayTrips: string;
  holidayTrips: string;
  annualOperatingCost: string;
  dailyRidership: {
    totalAvg: number;
    weekday: number;
    holiday: number;
  };
  stationsCount: number;
  annualBalance: string;
  fundingNotes: string;
}

export interface TransitHubItem {
  id: string;
  category: string;
  projectName: string;
  budgetInHundredMillion: number; // 억원
  implementationPeriod: string;
  implementingEntity: string;
  fundingDivision: string;
  remarks: string;
  affectedNeighborhoods: string[];
}

export interface SafetyFacilitySummary {
  trafficControllers: number; // 신호제어기 1209
  speedCameras: {
    total: number; // 334
    speeding: number; // 51 (후면 5)
    multiFunc: number; // 278 (후면 20)
    bidirectional: number; // 5
  };
  crosswalks: {
    total: number; // 2836
    signal: number; // 2032
    nonSignal: number; // 750
    diagonal: number; // 54
  };
  acousticSignals: number; // 1197
  pedestrianVoiceWait: {
    total: number; // 83
    childZone: number; // 54
  };
  redTimerDisplays: {
    total: number; // 80
    childZone: number; // 54
  };
  floorPedestrianSignals: {
    total: number; // 221
    childZone: number; // 110
    elderlyZone: number; // 4
  };
  protectionZones: {
    children: {
      total: number; // 126 (60,120m)
      elementary: number; // 69
      kindergarten: number; // 34
      daycare: number; // 22
      specialSchool: number; // 1
      note: string; // 병설유치원 56개소 미포함
    };
    disabled: {
      total: number; // 3 (330m)
      living: number; // 2
      rehab: number; // 1
    };
    elderly: {
      total: number; // 8 (1,610m)
      leisure: number; // 6
      medical: number; // 2
    };
  };
  lanes: {
    totalRoutes: number; // 2865
    sectionDistanceKm: number; // 1280
    cityTotalKm: number; // 1500
  };
  trafficImprovementProjects: {
    totalCount: number; // 135
    roundabouts: {
      total: number; // 23
      nationalProvince: number; // 8
      citySelf: number; // 5
      others: number; // 10 (도로건설과 2, LH 2, 민간 6)
    };
  };
  specialTransport: {
    total: number; // 60대
    legalRequirement: number; // 56대
    complianceRatio: string; // 107.1%
  };
}

export interface DistrictFloorSignal {
  region: '남부' | '북부';
  district: string;
  count: number;
  causesCount?: number; // 원인자 수
}
