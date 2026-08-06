import React from 'react';
import {
  MODAL_SPLIT_DATA,
  MODAL_SPLIT_TOTAL,
  BUS_CATEGORY_SUMMARY,
  REGIONAL_EXPRESS_BUSES,
  THANK_YOU_BUSES,
  M_BUSES,
  DOUBLE_DECKER_STATS,
  DAILY_PASSENGER_STATS,
  DAILY_PASSENGER_TOTAL,
  AIRPORT_BUSES,
  LOW_FLOOR_BUS_SUMMARY,
  LOW_FLOOR_BUS_ROUTES,
  TAXI_SUMMARY,
  TAXI_SHELTERS,
  QUIET_TAXI_STATS,
  TAXI_STANDS,
  TRANSPORT_OPERATORS,
  GENERAL_TAXI_OPERATORS,
  PRIVATE_TAXI_UNION_INFO,
  MODEL_DRIVER_ASSOCIATIONS,
  TAXI_SHELTERS_COMPARISON,
  CITY_BUS_OPERATORS,
  TOWN_BUS_DETAILED_ROWS,
  FUEL_TYPE_STATS,
  DETAILED_TAXI_FUEL_DATA,
  BUS_STOP_SUMMARY,
  SMART_SHELTERS,
  TRANSIT_SUBSIDIES,
  BUDGET_YEAR_ANALYTICS
} from '../data/transitData';
import { TabType } from '../types';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import {
  Car,
  Bus,
  MapPin,
  Sparkles,
  Phone,
  Building2,
  CheckCircle2,
  CreditCard,
  Layers,
  Calendar,
  Zap,
  Info,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  TrendingUp,
  Users,
  ShieldCheck,
  Search
} from 'lucide-react';

interface OverviewSectionProps {
  onSelectTab?: (
    tab: TabType,
    subTab?: 'express' | 'thankyou' | 'mbus' | 'double' | 'airport' | 'lowfloor'
  ) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ onSelectTab }) => {
  const [showLowFloorDetails, setShowLowFloorDetails] = React.useState<boolean>(true);
  const [lowFloorFilter, setLowFloorFilter] = React.useState<'전체' | '일반시내' | '마을버스'>('전체');

  const [showTaxiStandDetails, setShowTaxiStandDetails] = React.useState<boolean>(true);
  const [taxiStandFilter, setTaxiStandFilter] = React.useState<'전체' | '포스트형' | '쉘터형' | '태양광'>('전체');
  const [taxiStandSearch, setTaxiStandSearch] = React.useState<string>('');

  const [operatorCategory, setOperatorCategory] = React.useState<'일반택시' | '개인택시' | '시내버스' | '마을버스'>('일반택시');

  const filteredLowFloorRoutes = React.useMemo(() => {
    if (lowFloorFilter === '전체') return LOW_FLOOR_BUS_ROUTES;
    return LOW_FLOOR_BUS_ROUTES.filter((r) => r.busType === lowFloorFilter);
  }, [lowFloorFilter]);

  const filteredTaxiStands = React.useMemo(() => {
    return TAXI_STANDS.filter((stand) => {
      let matchesType = true;
      if (taxiStandFilter === '포스트형') matchesType = stand.type === '포스트형';
      if (taxiStandFilter === '쉘터형') matchesType = stand.type === '쉘터형';
      if (taxiStandFilter === '태양광') matchesType = stand.solarLighting === true;

      const matchesSearch =
        !taxiStandSearch ||
        stand.location.toLowerCase().includes(taxiStandSearch.toLowerCase()) ||
        stand.id.toString().includes(taxiStandSearch);

      return matchesType && matchesSearch;
    });
  }, [taxiStandFilter, taxiStandSearch]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const pdfIndexItems = [
    { num: 1, title: '수송분담률' },
    { num: 2, title: '버스 현황 요약' },
    { num: 3, title: '직행좌석버스' },
    { num: 4, title: '광역버스 세부노선' },
    { num: 5, title: '땡큐·트롤리버스' },
    { num: 6, title: '광역급행(M버스)' },
    { num: 7, title: '2층버스 현황' },
    { num: 8, title: '1일 이용객 현황' },
    { num: 9, title: '공항버스 현황' },
    { num: 10, title: '저상버스 현황' },
    { num: 11, title: '택시 및 쉼터' },
    { num: 12, title: '고요한택시' },
    { num: 13, title: '택시승차대' },
    { num: 14, title: '관할 운수업체' },
    { num: 15, title: '택시 유종별' },
    { num: 16, title: '승강장 & 스마트' },
    { num: 17, title: '교통비지원·예산' },
  ];

  return (
    <div className="space-y-8 pb-12">

      {/* 1~17 Table of Contents / Index Navigator */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="border-b border-slate-100 pb-2 flex flex-col space-y-0.5">
          <span className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>남양주시 대중교통 현황 자료</span>
          </span>
          <span className="text-[11px] text-slate-500 font-mono pl-5.5">클릭 시 해당 번호 항목으로 이동</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {pdfIndexItems.map((item) => (
            <button
              key={item.num}
              onClick={() => scrollToSection(`sec-${item.num}`)}
              className="flex items-center space-x-1.5 p-2 rounded-lg bg-slate-50 hover:bg-blue-50 hover:border-blue-300 border border-slate-200 text-left transition group"
            >
              <span className="w-5 h-5 rounded bg-slate-800 text-white text-[10px] font-bold font-mono flex items-center justify-center shrink-0 group-hover:bg-blue-600">
                {item.num}
              </span>
              <span className="text-[11px] font-medium text-slate-700 truncate group-hover:text-blue-900">
                {item.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. 남양주시 수송분담률(2025년) */}
      {/* ========================================================= */}
      <section id="sec-1" className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
              1
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">남양주시 수송분담률 (2025년)</h3>
              <p className="text-xs text-slate-500">통행량 단위: 통행/일 (총 {MODAL_SPLIT_TOTAL.toLocaleString()} 통행/일)</p>
            </div>
          </div>
          <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-100 self-start sm:self-auto">
            대중교통합계 35.61%
          </span>
        </div>

        <div className="overflow-x-auto touch-scroll mobile-table-wrap">
          <table className="w-full text-left text-xs mobile-compact-table whitespace-nowrap">
            <thead className="bg-slate-900 text-white font-medium">
              <tr>
                <th className="p-3">구 분</th>
                <th className="p-3 text-right">승용차</th>
                <th className="p-3 text-right">택시</th>
                <th className="p-3 text-right">버스</th>
                <th className="p-3 text-right">철도</th>
                <th className="p-3 text-right font-bold">합계</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-sans font-bold text-slate-900">통행/일</td>
                <td className="p-3 text-right text-slate-800 font-bold">545,128</td>
                <td className="p-3 text-right text-slate-800">39,111</td>
                <td className="p-3 text-right text-blue-700 font-bold">247,372</td>
                <td className="p-3 text-right text-purple-700 font-bold">75,771</td>
                <td className="p-3 text-right font-black text-slate-900 bg-slate-50">907,382</td>
              </tr>
              <tr className="bg-slate-50/50 font-bold">
                <td className="p-3 font-sans text-slate-900">비율(%)</td>
                <td className="p-3 text-right text-orange-600">60.08%</td>
                <td className="p-3 text-right text-amber-600">4.31%</td>
                <td className="p-3 text-right text-blue-600">27.26%</td>
                <td className="p-3 text-right text-purple-600">8.35%</td>
                <td className="p-3 text-right font-black text-slate-900 bg-slate-100">100%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-slate-50 p-4 rounded-lg border border-slate-200">
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MODAL_SPLIT_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="sharePercent"
                  nameKey="category"
                >
                  {MODAL_SPLIT_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any, name: any) => [`${value}%`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 text-xs text-slate-700">
            <p className="font-bold text-slate-900">📌 수송분담률 구조 분석:</p>
            <p>• <strong>승용차:</strong> 60.08% (54.5만 건) - 관내 이동 수단의 주축</p>
            <p>• <strong>버스:</strong> 27.26% (24.7만 건) - 대중교통의 76.5% 담당</p>
            <p>• <strong>철도:</strong> 8.35% (7.5만 건) - 경춘선·경의중앙선·진접선·8호선</p>
            <p>• <strong>택시:</strong> 4.31% (3.9만 건) - 보완적 모빌리티 수단</p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. 남양주시 버스 현황 (124개 노선 730대) */}
      {/* ========================================================= */}
      <section id="sec-2" className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
              2
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">남양주시 버스 현황 (124개 노선 730대)</h3>
              <p className="text-xs text-slate-500">실 운행 기준 / 인가대수 총 730대</p>
            </div>
          </div>
          <span className="bg-blue-100 text-blue-900 font-mono text-xs font-bold px-3 py-1 rounded-full self-start sm:self-auto">
            총 124개 노선 / 730대
          </span>
        </div>

        <div className="overflow-x-auto touch-scroll mobile-table-wrap">
          <table className="w-full text-left text-xs mobile-compact-table whitespace-nowrap">
            <thead className="bg-slate-900 text-white font-medium">
              <tr>
                <th className="p-3" colSpan={2}>구 분</th>
                <th className="p-3 text-center">노선수</th>
                <th className="p-3 text-center">인가대수</th>
                <th className="p-3">비 고</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="bg-blue-50/50 font-bold text-slate-900">
                <td className="p-3 font-sans" colSpan={2}>합계</td>
                <td className="p-3 text-center font-mono text-blue-700 font-bold">124개</td>
                <td className="p-3 text-center font-mono text-blue-700 font-bold">730대</td>
                <td className="p-3 text-slate-600">실 운행 기준</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-800 bg-slate-50" rowSpan={2}>광역버스</td>
                <td className="p-3 font-medium text-slate-800">광역급행(M버스)</td>
                <td className="p-3 text-center font-mono font-bold">5개</td>
                <td className="p-3 text-center font-mono font-bold">49대</td>
                <td className="p-3 text-slate-600">경기고속 포함 (2개 노선 23대)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-slate-800">직행좌석</td>
                <td className="p-3 text-center font-mono font-bold">23개</td>
                <td className="p-3 text-center font-mono font-bold">180대</td>
                <td className="p-3 text-slate-600">2층버스 25대 운행 중</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-800 bg-slate-50" colSpan={2}>일반시내</td>
                <td className="p-3 text-center font-mono font-bold">66개</td>
                <td className="p-3 text-center font-mono font-bold">396대</td>
                <td className="p-3 text-slate-600">땡큐·벽지·공영버스 포함</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-800 bg-slate-50" colSpan={2}>마을버스</td>
                <td className="p-3 text-center font-mono font-bold">30개</td>
                <td className="p-3 text-center font-mono font-bold">105대</td>
                <td className="p-3 text-slate-600">도시형 교통모델 포함</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. 직행좌석버스 현황 (23개 노선 180대, 2층버스 25대) */}
      {/* ========================================================= */}
      <section id="sec-3" className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">직행좌석버스 현황 (23개 노선 180대, 2층버스 25대)</h3>
              <p className="text-xs text-slate-500">권역별 운행 노선, 운행대수 및 2층버스 배정 현황</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-[11px] font-bold">
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900">■ 강변방면</span>
            <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-900">■ 잠실방면</span>
            <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-900">■ 강남방면</span>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">■ 불암산역방면</span>
          </div>
        </div>

        <div className="overflow-x-auto touch-scroll mobile-table-wrap">
          <table className="w-full text-left text-xs mobile-compact-table whitespace-nowrap">
            <thead className="bg-slate-900 text-white font-medium">
              <tr>
                <th className="p-3">권역</th>
                <th className="p-3">운행노선</th>
                <th className="p-3 text-center">노선수</th>
                <th className="p-3 text-center">운행대수</th>
                <th className="p-3 text-center">2층버스</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-sans font-bold text-slate-900 bg-slate-50">진접오남</td>
                <td className="p-3 font-bold">
                  <span className="text-blue-600">11</span>, <span className="text-blue-600">100</span>, <span className="text-emerald-600">105</span>, <span className="text-emerald-600">105-1</span>, <span className="text-purple-600">2000</span>, <span className="text-purple-600">2000-1</span>, <span className="text-purple-600">7007</span>, <span className="text-rose-600">8012</span>
                </td>
                <td className="p-3 text-center font-bold">8개</td>
                <td className="p-3 text-center font-bold">70대</td>
                <td className="p-3 text-center font-bold text-blue-700">4대</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-sans font-bold text-slate-900 bg-slate-50">별내</td>
                <td className="p-3 font-bold text-rose-600">1001</td>
                <td className="p-3 text-center font-bold">1개</td>
                <td className="p-3 text-center font-bold">13대</td>
                <td className="p-3 text-center font-bold text-blue-700">5대</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-sans font-bold text-slate-900 bg-slate-50">다산</td>
                <td className="p-3 font-bold">
                  <span className="text-rose-600">1003</span>, <span className="text-blue-600">1006</span>
                </td>
                <td className="p-3 text-center font-bold">2개</td>
                <td className="p-3 text-center font-bold">17대</td>
                <td className="p-3 text-center font-bold text-blue-700">2대</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-sans font-bold text-slate-900 bg-slate-50">호평평내</td>
                <td className="p-3 font-bold text-rose-600">1000, 1000-1</td>
                <td className="p-3 text-center font-bold">2개</td>
                <td className="p-3 text-center font-bold">8대</td>
                <td className="p-3 text-center text-slate-400">-</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-sans font-bold text-slate-900 bg-slate-50">화도</td>
                <td className="p-3 font-bold">
                  <span className="text-purple-600">1100</span>, <span className="text-rose-600">1200</span>, <span className="text-rose-600">1200-1</span>, <span className="text-purple-600">8001</span>, <span className="text-rose-600">8002</span>, <span className="text-rose-600">8002-1</span>
                </td>
                <td className="p-3 text-center font-bold">6개</td>
                <td className="p-3 text-center font-bold">44대</td>
                <td className="p-3 text-center font-bold text-blue-700">12대</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-sans font-bold text-slate-900 bg-slate-50">와부</td>
                <td className="p-3 font-bold">
                  <span className="text-blue-600">1660</span>, <span className="text-rose-600">1670</span>, <span className="text-rose-600">1670-1</span>, <span className="text-purple-600">1700</span>
                </td>
                <td className="p-3 text-center font-bold">4개</td>
                <td className="p-3 text-center font-bold">28대</td>
                <td className="p-3 text-center font-bold text-blue-700">2대</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            onClick={() => onSelectTab?.('bus')}
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <Bus className="w-4 h-4" />
            <span>버스 운행 상세보기</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. 광역버스 세부 노선 현황 (28개 노선, 229대) */}
      {/* ========================================================= */}
      <section id="sec-4" className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              4
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">광역버스 세부 노선 현황 (28개 노선, 229대)</h3>
              <p className="text-xs text-slate-500">기점, 종점, 운수업체 및 대수 상세표</p>
            </div>
          </div>
          <span className="bg-blue-50 text-blue-800 text-xs font-mono font-bold px-3 py-1 rounded-full">
            28개 노선 229대
          </span>
        </div>

        <div className="overflow-x-auto max-h-[400px] scrollbar-thin border border-slate-200 rounded-lg touch-scroll mobile-table-wrap">
          <table className="w-full text-left text-xs mobile-compact-table whitespace-nowrap">
            <thead className="bg-slate-900 text-white font-medium sticky top-0 z-10">
              <tr>
                <th className="p-2.5">권역</th>
                <th className="p-2.5">노선번호</th>
                <th className="p-2.5">운수업체</th>
                <th className="p-2.5">기점</th>
                <th className="p-2.5">종점</th>
                <th className="p-2.5 text-right">대수</th>
                <th className="p-2.5 text-center">비고</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {REGIONAL_EXPRESS_BUSES.map((bus) => (
                <tr key={bus.id} className="hover:bg-slate-50 transition">
                  <td className="p-2.5 font-bold text-slate-900">{bus.region}</td>
                  <td className="p-2.5 font-mono font-bold text-blue-700">{bus.routeNumber}</td>
                  <td className="p-2.5 text-slate-600">{bus.operator}</td>
                  <td className="p-2.5 text-slate-700">{bus.origin}</td>
                  <td className="p-2.5 text-slate-700">{bus.destination}</td>
                  <td className="p-2.5 text-right font-mono font-bold text-slate-900">{bus.busCount}대</td>
                  <td className="p-2.5 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      bus.busType === '광역급행' ? 'bg-blue-100 text-blue-900' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {bus.busType}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            onClick={() => onSelectTab?.('bus')}
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <Bus className="w-4 h-4" />
            <span>버스 운행 상세보기</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. 땡큐버스 및 트롤리버스 운행노선 현황 */}
      {/* ========================================================= */}
      <section id="sec-5" className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              5
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">땡큐버스 및 트롤리버스 운행노선 현황</h3>
              <p className="text-xs text-slate-500">땡큐버스 16개 노선 130대 / 트롤리버스 4개 노선 10대</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <span className="bg-pink-100 text-pink-900 font-bold px-2.5 py-1 rounded-md">땡큐 16개 노선 (130대)</span>
            <span className="bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-md">트롤리 4개 노선 (10대)</span>
          </div>
        </div>

        <div className="overflow-x-auto touch-scroll mobile-table-wrap">
          <table className="w-full text-left text-xs mobile-compact-table whitespace-nowrap">
            <thead className="bg-slate-900 text-white font-medium">
              <tr>
                <th className="p-2.5">권역별</th>
                <th className="p-2.5">노선번호</th>
                <th className="p-2.5">운수업체</th>
                <th className="p-2.5">기점</th>
                <th className="p-2.5">종점</th>
                <th className="p-2.5 text-right">대수</th>
                <th className="p-2.5 text-center">트롤리</th>
                <th className="p-2.5 text-center">개통시기</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {THANK_YOU_BUSES.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition">
                  <td className="p-2.5 font-bold text-slate-900">{row.region}</td>
                  <td className="p-2.5 font-mono font-bold text-pink-700">{row.routeNumber}</td>
                  <td className="p-2.5 text-slate-600">{row.operator}</td>
                  <td className="p-2.5 text-slate-700">{row.origin}</td>
                  <td className="p-2.5 text-slate-700">{row.destination}</td>
                  <td className="p-2.5 text-right font-mono font-bold text-slate-900">{row.busCount}대</td>
                  <td className="p-2.5 text-center font-mono font-bold">
                    {row.trolleyCount > 0 ? (
                      <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">{row.trolleyCount}대</span>
                    ) : (
                      <span className="text-slate-300">-</span>
                    )}
                  </td>
                  <td className="p-2.5 text-center font-mono text-slate-500">{row.openedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            onClick={() => onSelectTab?.('bus', 'thankyou')}
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <Bus className="w-4 h-4" />
            <span>버스 운행 상세보기</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. 광역급행버스(M버스) 운행노선 현황 (총 5개 노선 49대) */}
      {/* ========================================================= */}
      <section id="sec-6" className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              6
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">광역급행버스(M버스) 운행노선 현황 (총 5개 노선 49대)</h3>
              <p className="text-xs text-slate-500">대광위 준공영제 전환 노선 및 잠실광역환승센터 직통 운행</p>
            </div>
          </div>
          <span className="bg-blue-100 text-blue-900 font-mono text-xs font-bold px-3 py-1 rounded-full">
            총 5개 노선 / 49대
          </span>
        </div>

        <div className="overflow-x-auto touch-scroll mobile-table-wrap">
          <table className="w-full text-left text-xs mobile-compact-table whitespace-nowrap">
            <thead className="bg-slate-900 text-white font-medium">
              <tr>
                <th className="p-3">노선번호</th>
                <th className="p-3">운수업체</th>
                <th className="p-3">기점</th>
                <th className="p-3">종점</th>
                <th className="p-3 text-right">대수</th>
                <th className="p-3 text-center">개통시기</th>
                <th className="p-3">비고 (준공영제)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {M_BUSES.map((m) => (
                <tr key={m.routeNumber} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-blue-700 text-sm">{m.routeNumber}</td>
                  <td className="p-3 font-medium text-slate-800">{m.operator}</td>
                  <td className="p-3 text-slate-700">{m.origin}</td>
                  <td className="p-3 text-slate-700">{m.destination}</td>
                  <td className="p-3 text-right font-mono font-bold text-slate-900">{m.busCount}대</td>
                  <td className="p-3 text-center font-mono text-slate-500">{m.openedDate}</td>
                  <td className="p-3 text-xs text-blue-800 font-semibold">{m.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-slate-500 font-mono">※ M2344번 (별내동~잠실광역환승센터) 폐선 : 2025. 2. 17.</p>
      </section>

      {/* ========================================================= */}
      {/* 7. 2층버스 운행현황 (총 7개 노선 / 도입 40대 / 운행 29대) */}
      {/* ========================================================= */}
      <section id="sec-7" className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              7
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">2층버스 운행현황 (총 7개 노선 / 도입 40대 / 운행 29대)</h3>
              <p className="text-xs text-slate-500">연도별 도입 현황 (디젤 36대, 전기 4대) 및 권역별 운행 배정 현황</p>
            </div>
          </div>
          <span className="bg-slate-100 text-slate-800 font-mono text-xs font-bold px-3 py-1 rounded-full">
            운행 29대 (디젤25 / 전기4)
          </span>
        </div>

        <div className="overflow-x-auto touch-scroll mobile-table-wrap">
          <table className="w-full text-center text-xs mobile-compact-table whitespace-nowrap">
            <thead className="bg-slate-900 text-white font-medium">
              <tr>
                <th className="p-2.5">연도별 도입</th>
                <th className="p-2.5">계</th>
                <th className="p-2.5">화도 (8002)</th>
                <th className="p-2.5">진접 (8012)</th>
                <th className="p-2.5">호평평내 (M2323,M2352)</th>
                <th className="p-2.5">와부 (1670)</th>
                <th className="p-2.5">별내 (1001)</th>
                <th className="p-2.5">다산 (1003)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {DOUBLE_DECKER_STATS.map((row) => (
                <tr key={row.year} className="hover:bg-slate-50">
                  <td className="p-2.5 font-bold font-sans text-slate-900 text-left">{row.year}년 ({row.electric > 0 ? '전기' : '디젤'})</td>
                  <td className="p-2.5 font-bold text-slate-900">{row.total}대</td>
                  <td className="p-2.5 text-slate-700">{row.hwado || '-'}</td>
                  <td className="p-2.5 text-slate-700">{row.jinjeop || '-'}</td>
                  <td className="p-2.5 text-slate-700">{row.hopyeong || '-'}</td>
                  <td className="p-2.5 text-slate-700">{row.wabu || '-'}</td>
                  <td className="p-2.5 text-slate-700">{row.byeolnae || '-'}</td>
                  <td className="p-2.5 text-slate-700">{row.dasan || '-'}</td>
                </tr>
              ))}
              <tr className="bg-blue-50 font-bold text-blue-900">
                <td className="p-2.5 text-left font-sans">운행현황 (디젤25/전기4)</td>
                <td className="p-2.5">29대</td>
                <td className="p-2.5">12대</td>
                <td className="p-2.5">4대</td>
                <td className="p-2.5">4대 (전기2층)</td>
                <td className="p-2.5">2대</td>
                <td className="p-2.5">5대</td>
                <td className="p-2.5">2대</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. 남양주시 버스 1일 이용객 현황 */}
      {/* ========================================================= */}
      <section id="sec-8" className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              8
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">남양주시 버스 1일 이용객 현황 (2026. 6. 기준)</h3>
              <p className="text-xs text-slate-500">1일 평균 이용량 (승차기준) 총계 182,019 명</p>
            </div>
          </div>
          <span className="bg-blue-100 text-blue-900 font-mono text-xs font-bold px-3 py-1 rounded-full">
            총계 182,019 명/일
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DAILY_PASSENGER_STATS} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="type" tick={{ fill: '#475569', fontSize: 12 }} />
                <YAxis tick={{ fill: '#475569', fontSize: 11 }} />
                <Tooltip formatter={(val: any) => [`${Number(val).toLocaleString()} 명`, '1일 평균 승차']} />
                <Bar dataKey="averageDaily" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3 font-mono">
            {DAILY_PASSENGER_STATS.map((s) => (
              <div key={s.type} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-sans font-bold text-slate-900 text-xs">{s.type}</span>
                <div className="text-right">
                  <span className="text-base font-bold text-blue-700">{s.averageDaily.toLocaleString()} 명</span>
                  <span className="text-xs text-slate-400 block">({s.share}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. 남양주시 운행 공항버스 현황 */}
      {/* ========================================================= */}
      <section id="sec-9" className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              9
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">남양주시 운행 공항버스 현황</h3>
              <p className="text-xs text-slate-500">인천공항 직행 시외공항버스 3개 노선 현황</p>
            </div>
          </div>
          <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full">
            3개 노선 정상 운행중
          </span>
        </div>

        <div className="overflow-x-auto touch-scroll mobile-table-wrap">
          <table className="w-full text-left text-xs mobile-compact-table whitespace-nowrap">
            <thead className="bg-slate-900 text-white font-medium">
              <tr>
                <th className="p-3">운수업체</th>
                <th className="p-3">노선번호</th>
                <th className="p-3">기점</th>
                <th className="p-3">경유지</th>
                <th className="p-3">종점</th>
                <th className="p-3 text-right">거리(km)</th>
                <th className="p-3 text-center">운행횟수</th>
                <th className="p-3 text-center">비고</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {AIRPORT_BUSES.map((ap) => (
                <tr key={ap.routeNumber} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">{ap.operator}</td>
                  <td className="p-3 font-mono font-bold text-blue-700 text-sm">{ap.routeNumber}</td>
                  <td className="p-3 font-medium text-slate-800">{ap.origin}</td>
                  <td className="p-3 text-slate-600 max-w-xs">{ap.via}</td>
                  <td className="p-3 font-medium text-slate-800">{ap.destination}</td>
                  <td className="p-3 text-right font-mono font-bold text-slate-900">{ap.distanceKm} km</td>
                  <td className="p-3 text-center font-mono font-bold text-blue-900">{ap.dailyTrips}</td>
                  <td className="p-3 text-center">
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px] font-bold">
                      {ap.note}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-slate-500 font-mono">※ 여객자동차 운수사업법 상 시외(공항)버스 면허·인가는 경기도 버스정책과 소관</p>
      </section>

      {/* ========================================================= */}
      {/* 10. 남양주시 저상버스 현황 (총 52개 노선 212대, 26. 6. 기준) */}
      {/* ========================================================= */}
      <section id="sec-10" className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              10
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">남양주시 저상버스 현황 (총 52개 노선 212대, 26. 6. 기준)</h3>
              <p className="text-xs text-slate-500">일반시내버스 33개 노선 158대 / 마을버스 19개 노선 54대 (전기저상 196대, CNG저상 16대)</p>
            </div>
          </div>
          <span className="bg-blue-100 text-blue-900 font-mono text-xs font-bold px-3 py-1 rounded-full">
            전기저상 196대 (92.5%)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => {
              if (showLowFloorDetails && lowFloorFilter === '전체') {
                setShowLowFloorDetails(false);
              } else {
                setShowLowFloorDetails(true);
                setLowFloorFilter('전체');
              }
            }}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer space-y-1.5 relative group ${
              showLowFloorDetails && lowFloorFilter === '전체'
                ? 'bg-blue-50/80 border-blue-500 shadow-sm ring-2 ring-blue-500/20'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/80'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">전체 저상버스</span>
              <span className="text-[11px] text-blue-600 font-bold flex items-center space-x-0.5 bg-blue-100/60 px-2 py-0.5 rounded-md">
                <span>목록 {showLowFloorDetails && lowFloorFilter === '전체' ? '접기' : '펼치기'}</span>
                {showLowFloorDetails && lowFloorFilter === '전체' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </span>
            </div>
            <span className="text-2xl font-black text-slate-900 font-mono block">52개 노선 / 212대</span>
            <span className="text-[11px] text-blue-700 block font-medium">전기저상 196대, CNG 16대</span>
          </button>

          <button
            type="button"
            id="btn-lowfloor-citybus"
            onClick={() => {
              if (showLowFloorDetails && lowFloorFilter === '일반시내') {
                setShowLowFloorDetails(false);
              } else {
                setShowLowFloorDetails(true);
                setLowFloorFilter('일반시내');
              }
            }}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer space-y-1.5 relative group ${
              showLowFloorDetails && lowFloorFilter === '일반시내'
                ? 'bg-blue-50/80 border-blue-500 shadow-sm ring-2 ring-blue-500/20'
                : 'bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-blue-50/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-900 font-bold">일반시내버스 저상</span>
              <span className="text-[11px] text-blue-700 font-bold flex items-center space-x-0.5 bg-blue-100 px-2 py-0.5 rounded-md">
                <span>목록 {showLowFloorDetails && lowFloorFilter === '일반시내' ? '접기' : '펼치기'}</span>
                {showLowFloorDetails && lowFloorFilter === '일반시내' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </span>
            </div>
            <span className="text-2xl font-black text-blue-900 font-mono block">33개 노선 / 158대</span>
            <span className="text-[11px] text-slate-600 block font-medium">전기저상 142대, CNG 16대</span>
          </button>

          <button
            type="button"
            id="btn-lowfloor-villagebus"
            onClick={() => {
              if (showLowFloorDetails && lowFloorFilter === '마을버스') {
                setShowLowFloorDetails(false);
              } else {
                setShowLowFloorDetails(true);
                setLowFloorFilter('마을버스');
              }
            }}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer space-y-1.5 relative group ${
              showLowFloorDetails && lowFloorFilter === '마을버스'
                ? 'bg-teal-50/80 border-teal-500 shadow-sm ring-2 ring-teal-500/20'
                : 'bg-slate-50 border-slate-200 hover:border-teal-300 hover:bg-teal-50/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-teal-900 font-bold">마을버스 저상</span>
              <span className="text-[11px] text-teal-700 font-bold flex items-center space-x-0.5 bg-teal-100 px-2 py-0.5 rounded-md">
                <span>목록 {showLowFloorDetails && lowFloorFilter === '마을버스' ? '접기' : '펼치기'}</span>
                {showLowFloorDetails && lowFloorFilter === '마을버스' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </span>
            </div>
            <span className="text-2xl font-black text-teal-900 font-mono block">19개 노선 / 54대</span>
            <span className="text-[11px] text-teal-700 block font-medium">100% 전기 저상버스 (54대)</span>
          </button>
        </div>

        {/* Collapsible Expanded Route List */}
        {showLowFloorDetails && (
          <div className="space-y-3 pt-3 border-t border-slate-200 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-900 text-sm">
                  {lowFloorFilter === '전체' ? '전체 저상버스' : lowFloorFilter === '일반시내' ? '일반시내버스 저상' : '마을버스 저상'} 세부 운행 노선 목록
                </span>
                <span className="text-slate-500 text-xs">(2026. 6. 기준)</span>
              </div>
              <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg text-xs w-full sm:w-auto justify-center">
                {(['전체', '일반시내', '마을버스'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setLowFloorFilter(cat)}
                    className={`px-3 py-1.5 rounded-md font-bold transition cursor-pointer ${
                      lowFloorFilter === cat
                        ? 'bg-white text-blue-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {cat} {cat === '전체' ? '(52)' : cat === '일반시내' ? '(33)' : '(19)'}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto max-h-[500px] scrollbar-thin border border-slate-200 rounded-lg shadow-inner touch-scroll mobile-table-wrap">
              <table className="w-full text-left text-xs mobile-compact-table whitespace-nowrap">
                <thead className="bg-slate-900 text-white font-medium sticky top-0 z-10">
                  <tr>
                    <th className="p-2.5">구분</th>
                    <th className="p-2.5">운수업체</th>
                    <th className="p-2.5">노선번호</th>
                    <th className="p-2.5">운행구간 (기점 - 종점)</th>
                    <th className="p-2.5 text-right">저상 총대수</th>
                    <th className="p-2.5 text-right">전기 저상</th>
                    <th className="p-2.5 text-right">CNG 저상</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredLowFloorRoutes.map((route, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/40 transition">
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          route.busType === '일반시내' ? 'bg-blue-100 text-blue-900' : 'bg-teal-100 text-teal-900'
                        }`}>
                          {route.busType}
                        </span>
                      </td>
                      <td className="p-2.5 font-medium text-slate-800">{route.operator}</td>
                      <td className="p-2.5 font-mono font-bold text-blue-700">{route.routeNumber}</td>
                      <td className="p-2.5 text-slate-700">{route.origin} - {route.destination}</td>
                      <td className="p-2.5 text-right font-mono font-bold text-slate-900">{route.totalCount}대</td>
                      <td className="p-2.5 text-right font-mono font-bold text-blue-700">
                        {route.electricCount > 0 ? `${route.electricCount}대` : '-'}
                      </td>
                      <td className="p-2.5 text-right font-mono font-bold text-amber-700">
                        {route.cngCount > 0 ? `${route.cngCount}대` : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-100 text-slate-900 font-bold sticky bottom-0 z-10 border-t border-slate-300">
                  <tr>
                    <td colSpan={4} className="p-2.5 text-center">
                      합계 ({lowFloorFilter === '전체' ? '총 52개 노선' : lowFloorFilter === '일반시내' ? '일반시내 33개 노선' : '마을버스 19개 노선'})
                    </td>
                    <td className="p-2.5 text-right font-mono text-blue-900 font-extrabold text-sm">
                      {filteredLowFloorRoutes.reduce((acc, r) => acc + r.totalCount, 0)}대
                    </td>
                    <td className="p-2.5 text-right font-mono text-blue-700 font-bold">
                      {filteredLowFloorRoutes.reduce((acc, r) => acc + r.electricCount, 0)}대
                    </td>
                    <td className="p-2.5 text-right font-mono text-amber-700 font-bold">
                      {filteredLowFloorRoutes.reduce((acc, r) => acc + r.cngCount, 0)}대
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 11. 택시 현황 */}
      {/* ========================================================= */}
      <section id="sec-11" className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              11
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">택시 현황</h3>
              <p className="text-xs text-slate-500">일반·개인택시, 모범운전자회(단체) 및 남부·북부 택시쉼터(시설) 현황</p>
            </div>
          </div>
          <span className="bg-amber-100 text-amber-900 text-xs font-bold font-mono px-3 py-1 rounded-full">
            면허대수 1,291대
          </span>
        </div>

        {/* 1. 택시(면허) 현황 테이블 */}
        <div className="space-y-1.5">
          <h4 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
            <span className="w-1.5 h-3.5 bg-blue-600 rounded-full inline-block"></span>
            <span>택시 면허 및 종사자 현황</span>
          </h4>
          <div className="overflow-x-auto border border-slate-200 rounded-lg touch-scroll mobile-table-wrap">
            <table className="w-full text-left text-xs border-collapse mobile-compact-table whitespace-nowrap">
              <thead className="bg-slate-900 text-white font-medium">
                <tr>
                  <th className="p-2.5 text-center w-32 border-r border-slate-800">구분</th>
                  <th className="p-2.5 text-right border-r border-slate-800">택시(면허)대수</th>
                  <th className="p-2.5 text-right border-r border-slate-800">업체수</th>
                  <th className="p-2.5 text-right border-r border-slate-800">운수종사자수</th>
                  <th className="p-2.5">비고</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono text-slate-900">
                <tr className="bg-amber-50/80 font-bold border-b border-amber-200">
                  <td className="p-2.5 text-center font-sans font-extrabold border-r border-amber-200 text-amber-950">합계</td>
                  <td className="p-2.5 text-right font-black text-slate-900">1,291대</td>
                  <td className="p-2.5 text-right">7개</td>
                  <td className="p-2.5 text-right text-amber-800 font-black">1,514명</td>
                  <td className="p-2.5 font-sans text-slate-500 font-normal">-</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-2.5 text-center font-sans font-medium border-r border-slate-200">일반택시</td>
                  <td className="p-2.5 text-right font-bold text-slate-900">342대</td>
                  <td className="p-2.5 text-right">6개</td>
                  <td className="p-2.5 text-right font-bold text-amber-700">565명</td>
                  <td className="p-2.5 font-sans text-slate-500">-</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-2.5 text-center font-sans font-medium border-r border-slate-200">개인택시</td>
                  <td className="p-2.5 text-right font-bold text-slate-900">949대</td>
                  <td className="p-2.5 text-right font-medium">1 (조합)</td>
                  <td className="p-2.5 text-right font-bold text-amber-700">949명</td>
                  <td className="p-2.5 font-sans text-slate-500">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. 단체 및 시설 현황 테이블 */}
        <div className="space-y-1.5 pt-1">
          <h4 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
            <span className="w-1.5 h-3.5 bg-emerald-600 rounded-full inline-block"></span>
            <span>단체 및 시설(택시쉼터) 현황</span>
          </h4>

          <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-xs touch-scroll mobile-table-wrap">
            <table className="w-full text-left text-xs border-collapse mobile-compact-table whitespace-nowrap">
              <thead className="bg-emerald-50 text-emerald-950 font-bold border-b border-emerald-200">
                <tr>
                  <th className="p-2.5 text-center border-r border-emerald-200 w-20">구분</th>
                  <th className="p-2.5 text-center border-r border-emerald-200 w-32">구분 / 명칭</th>
                  <th className="p-2.5 text-center border-r border-emerald-200 w-20">인원</th>
                  <th className="p-2.5 border-r border-emerald-200 min-w-[180px]">사무소 / 위치</th>
                  <th className="p-2.5 border-r border-emerald-200">활동내역 / 상세 내용</th>
                  <th className="p-2.5 text-center w-24">활동지역</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white text-slate-800">
                {/* 단체 - 남부 모범운전자회 */}
                <tr className="hover:bg-slate-50">
                  <td rowSpan={2} className="p-3 text-center font-bold bg-slate-50 border-r border-slate-200 text-slate-900 align-middle">
                    단체
                  </td>
                  <td className="p-2.5 font-bold border-r border-slate-200 text-slate-900">남부 모범운전자회</td>
                  <td className="p-2.5 text-center font-bold border-r border-slate-200 text-blue-700 font-mono">94명</td>
                  <td className="p-2.5 border-r border-slate-200 text-slate-700">늘을1로 39-36 (호평동)</td>
                  <td className="p-2.5 border-r border-slate-200 text-slate-700">교통질서계도</td>
                  <td className="p-2.5 text-center font-medium text-slate-800">남부권역</td>
                </tr>
                {/* 단체 - 북부 모범운전자회 */}
                <tr className="hover:bg-slate-50">
                  <td className="p-2.5 font-bold border-r border-slate-200 text-slate-900">북부 모범운전자회</td>
                  <td className="p-2.5 text-center font-bold border-r border-slate-200 text-blue-700 font-mono">66명</td>
                  <td className="p-2.5 border-r border-slate-200 text-slate-700">경복대로 120-9 (오남읍)</td>
                  <td className="p-2.5 border-r border-slate-200 text-slate-700">교통질서계도</td>
                  <td className="p-2.5 text-center font-medium text-slate-800">북부권역</td>
                </tr>

                {/* 시설 - 택시쉼터 (남부) */}
                <tr className="border-t-2 border-slate-300 hover:bg-slate-50/70">
                  <td rowSpan={2} className="p-3 text-center font-bold bg-slate-50 border-r border-slate-200 text-slate-900 align-middle">
                    시설
                  </td>
                  <td rowSpan={2} className="p-3 text-center font-bold bg-slate-50/60 border-r border-slate-200 text-slate-900 align-middle">
                    택시쉼터
                  </td>
                  <td className="p-2.5 text-center font-bold border-r border-slate-200 bg-emerald-50/60 text-emerald-900 align-middle">
                    남부
                  </td>
                  <td colSpan={3} className="p-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-xs">
                      <div><span className="font-bold text-slate-900">∙ 위 치 :</span> <span className="text-slate-700">늘을1로 39-36(호평동)</span></div>
                      <div><span className="font-bold text-slate-900">∙ 규 모 :</span> <span className="text-slate-700">건축 연면적 446㎡, 2층 / 부지 2,165㎡</span></div>
                      <div><span className="font-bold text-slate-900">∙ 운영방식 :</span> <span className="text-slate-700">민간위탁(개인택시조합)</span></div>
                      <div><span className="font-bold text-slate-900">∙ 운영시간 :</span> <span className="text-slate-700">평일 09:00 ~ 18:00 (토·일 공휴일 안함)</span></div>
                      <div><span className="font-bold text-slate-900">∙ 주요시설 :</span> <span className="text-slate-700">사무실, 휴게실, 체력 단련실, 샤워실 등</span></div>
                      <div><span className="font-bold text-slate-900">∙ 이용현황 :</span> <span className="font-bold text-blue-700 font-mono">30인/일</span> <span className="text-slate-500">(개인 25인/일, 법인 5인/일)</span></div>
                    </div>
                  </td>
                </tr>

                {/* 시설 - 택시쉼터 (북부) */}
                <tr className="hover:bg-slate-50/70">
                  <td className="p-2.5 text-center font-bold border-r border-slate-200 bg-emerald-50/60 text-emerald-900 align-middle">
                    북부
                  </td>
                  <td colSpan={3} className="p-3 border-t border-slate-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-xs">
                      <div><span className="font-bold text-slate-900">∙ 위 치 :</span> <span className="text-slate-700">경복대로 120-9</span></div>
                      <div><span className="font-bold text-slate-900">∙ 규 모 :</span> <span className="text-slate-700">건축 연면적 340.85㎡, 2층 / 부지 1,182㎡</span></div>
                      <div><span className="font-bold text-slate-900">∙ 운영방식 :</span> <span className="text-slate-700">민간위탁(법인택시노조연합회)</span></div>
                      <div><span className="font-bold text-slate-900">∙ 운영시간 :</span> <span className="text-slate-700">평일 09:00 ~ 18:00 (토·일 공휴일 안함)</span></div>
                      <div><span className="font-bold text-slate-900">∙ 주요시설 :</span> <span className="text-slate-700">사무실, 휴게실, 체력 단련실, 샤워실 등</span></div>
                      <div><span className="font-bold text-slate-900">∙ 이용현황 :</span> <span className="font-bold text-blue-700 font-mono">20인/일</span> <span className="text-slate-500">(개인 5인/일, 법인 15인/일)</span></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 12. 고요한택시 운행 현황 (2026. 7. 기준) */}
      {/* ========================================================= */}
      <section id="sec-12" className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              12
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">고요한택시 운행 현황 (2026. 7. 기준)</h3>
              <p className="text-xs text-slate-500">청각장애인 택시기사 고용 사회적 일자리 창출 보조금 사업 (1인당 120천원/월 지원)</p>
            </div>
          </div>
          <span className="bg-purple-100 text-purple-900 font-mono text-xs font-bold px-3 py-1 rounded-full">
            총 3대 운행중
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs text-center">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 block">금성운수(합)</span>
            <span className="text-2xl font-black text-slate-900">1 대</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 block">신안운수(주)</span>
            <span className="text-2xl font-black text-slate-900">2 대</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 block">영훈운수(주)</span>
            <span className="text-2xl font-black text-slate-400">-</span>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 13. 택시승차대 현황 (53개소) */}
      {/* ========================================================= */}
      <section id="sec-13" className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              13
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">택시승차대 현황 (총 53개소)</h3>
              <p className="text-xs text-slate-500">포스트형 23개소, 쉘터형 30개소, 태양광 조명 설치 7개소</p>
            </div>
          </div>
          <span className="bg-amber-100 text-amber-900 text-xs font-bold font-mono px-3 py-1 rounded-full">
            총 53개소 구축
          </span>
        </div>

        {/* 4 Interactive Category Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left font-sans">
          <button
            type="button"
            onClick={() => {
              if (showTaxiStandDetails && taxiStandFilter === '전체') {
                setShowTaxiStandDetails(false);
              } else {
                setShowTaxiStandDetails(true);
                setTaxiStandFilter('전체');
              }
            }}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1 relative group ${
              showTaxiStandDetails && taxiStandFilter === '전체'
                ? 'bg-blue-50/90 border-blue-500 shadow-xs ring-2 ring-blue-500/20'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600 font-bold">전체 승차대</span>
              <span className="text-[10px] text-blue-700 font-bold flex items-center space-x-0.5 bg-blue-100/70 px-1.5 py-0.5 rounded">
                <span>{showTaxiStandDetails && taxiStandFilter === '전체' ? '접기' : '목록'}</span>
                {showTaxiStandDetails && taxiStandFilter === '전체' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </span>
            </div>
            <span className="text-2xl font-black text-slate-900 font-mono block">53 개소</span>
            <span className="text-[11px] text-slate-500 block">포스트 23 / 쉘터 30</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (showTaxiStandDetails && taxiStandFilter === '포스트형') {
                setShowTaxiStandDetails(false);
              } else {
                setShowTaxiStandDetails(true);
                setTaxiStandFilter('포스트형');
              }
            }}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1 relative group ${
              showTaxiStandDetails && taxiStandFilter === '포스트형'
                ? 'bg-blue-50/90 border-blue-500 shadow-xs ring-2 ring-blue-500/20'
                : 'bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-blue-50/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-900 font-bold">포스트형</span>
              <span className="text-[10px] text-blue-700 font-bold flex items-center space-x-0.5 bg-blue-100/70 px-1.5 py-0.5 rounded">
                <span>{showTaxiStandDetails && taxiStandFilter === '포스트형' ? '접기' : '목록'}</span>
                {showTaxiStandDetails && taxiStandFilter === '포스트형' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </span>
            </div>
            <span className="text-2xl font-black text-blue-900 font-mono block">23 개소</span>
            <span className="text-[11px] text-blue-700 block">설치연도: 2007~2025</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (showTaxiStandDetails && taxiStandFilter === '쉘터형') {
                setShowTaxiStandDetails(false);
              } else {
                setShowTaxiStandDetails(true);
                setTaxiStandFilter('쉘터형');
              }
            }}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1 relative group ${
              showTaxiStandDetails && taxiStandFilter === '쉘터형'
                ? 'bg-emerald-50/90 border-emerald-500 shadow-xs ring-2 ring-emerald-500/20'
                : 'bg-slate-50 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-emerald-950 font-bold">쉘터형</span>
              <span className="text-[10px] text-emerald-800 font-bold flex items-center space-x-0.5 bg-emerald-100/70 px-1.5 py-0.5 rounded">
                <span>{showTaxiStandDetails && taxiStandFilter === '쉘터형' ? '접기' : '목록'}</span>
                {showTaxiStandDetails && taxiStandFilter === '쉘터형' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </span>
            </div>
            <span className="text-2xl font-black text-emerald-950 font-mono block">30 개소</span>
            <span className="text-[11px] text-emerald-800 block">설치연도: 2008~2024</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (showTaxiStandDetails && taxiStandFilter === '태양광') {
                setShowTaxiStandDetails(false);
              } else {
                setShowTaxiStandDetails(true);
                setTaxiStandFilter('태양광');
              }
            }}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1 relative group ${
              showTaxiStandDetails && taxiStandFilter === '태양광'
                ? 'bg-amber-50/90 border-amber-500 shadow-xs ring-2 ring-amber-500/20'
                : 'bg-amber-50/50 border-amber-200 hover:border-amber-300 hover:bg-amber-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-amber-950 font-bold">태양광 조명</span>
              <span className="text-[10px] text-amber-800 font-bold flex items-center space-x-0.5 bg-amber-100 px-1.5 py-0.5 rounded">
                <span>{showTaxiStandDetails && taxiStandFilter === '태양광' ? '접기' : '목록'}</span>
                {showTaxiStandDetails && taxiStandFilter === '태양광' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </span>
            </div>
            <span className="text-2xl font-black text-amber-950 font-mono block">7 개소</span>
            <span className="text-[11px] text-amber-800 block font-medium">친환경 조명 탑재</span>
          </button>
        </div>

        {/* Collapsible Expanded Taxi Stand Table */}
        {showTaxiStandDetails && (
          <div className="space-y-3 pt-3 border-t border-slate-200 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-900 text-sm">
                  {taxiStandFilter === '전체' ? '전체 승차대' : taxiStandFilter === '포스트형' ? '포스트형 승차대' : taxiStandFilter === '쉘터형' ? '쉘터형 승차대' : '태양광 조명 승차대'} 세부 목록
                </span>
                <span className="text-slate-500 text-xs">({filteredTaxiStands.length}개소)</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg text-xs justify-center">
                  {(['전체', '포스트형', '쉘터형', '태양광'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setTaxiStandFilter(cat)}
                      className={`px-2.5 py-1 rounded-md font-bold transition cursor-pointer ${
                        taxiStandFilter === cat
                          ? 'bg-white text-blue-700 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {cat} {cat === '전체' ? '(53)' : cat === '포스트형' ? '(23)' : cat === '쉘터형' ? '(30)' : '(7)'}
                    </button>
                  ))}
                </div>

                <div className="relative flex-1 sm:w-48">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400" />
                  <input
                    type="text"
                    value={taxiStandSearch}
                    onChange={(e) => setTaxiStandSearch(e.target.value)}
                    placeholder="위치/연번 검색..."
                    className="pl-8 pr-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto max-h-[550px] scrollbar-thin border border-slate-300 rounded-lg shadow-inner touch-scroll mobile-table-wrap">
              <table className="w-full text-left text-xs border-collapse mobile-compact-table whitespace-nowrap">
                <thead className="bg-slate-900 text-white font-medium sticky top-0 z-10">
                  <tr>
                    <th rowSpan={2} className="p-2.5 text-center border-r border-slate-700 w-12 bg-slate-900">연번</th>
                    <th rowSpan={2} className="p-2.5 border-r border-slate-700 bg-slate-900">위 치</th>
                    <th colSpan={3} className="p-2 text-center border-r border-slate-700 bg-slate-800">형 식</th>
                    <th rowSpan={2} className="p-2.5 text-center w-28 bg-slate-900">설치(교체) 연도</th>
                  </tr>
                  <tr className="bg-slate-800 text-slate-200 text-[11px]">
                    <th className="p-1.5 text-center border-r border-slate-700 w-20">포스트형</th>
                    <th className="p-1.5 text-center border-r border-slate-700 w-20">쉘터형</th>
                    <th className="p-1.5 text-center border-r border-slate-700 w-24">태양광 조명</th>
                  </tr>
                  <tr className="bg-amber-100/90 text-amber-950 font-bold border-b border-amber-300">
                    <td colSpan={2} className="p-2 text-center font-extrabold border-r border-amber-200">
                      계 ({taxiStandFilter === '전체' ? '총 53개소' : taxiStandFilter})
                    </td>
                    <td className="p-2 text-center font-mono font-black text-blue-900 border-r border-amber-200">
                      23
                    </td>
                    <td className="p-2 text-center font-mono font-black text-emerald-950 border-r border-amber-200">
                      30
                    </td>
                    <td className="p-2 text-center font-mono font-black text-amber-950 border-r border-amber-200">
                      7
                    </td>
                    <td className="p-2 text-center text-slate-600 font-normal">-</td>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {filteredTaxiStands.map((stand) => (
                    <tr key={stand.id} className="hover:bg-blue-50/40 transition">
                      <td className="p-2 text-center font-mono font-bold text-slate-600 border-r border-slate-100">
                        {stand.id}
                      </td>
                      <td className="p-2 font-medium text-slate-900 border-r border-slate-100">
                        {stand.location}
                      </td>
                      <td className="p-2 text-center border-r border-slate-100">
                        {stand.type === '포스트형' ? (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-900 font-bold text-xs">○</span>
                        ) : null}
                      </td>
                      <td className="p-2 text-center border-r border-slate-100">
                        {stand.type === '쉘터형' ? (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs">○</span>
                        ) : null}
                      </td>
                      <td className="p-2 text-center border-r border-slate-100">
                        {stand.solarLighting ? (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-bold text-xs">○</span>
                        ) : null}
                      </td>
                      <td className="p-2 text-center font-mono font-bold text-slate-700">
                        {stand.installedYear}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-100 text-slate-900 font-bold sticky bottom-0 z-10 border-t border-slate-300">
                  <tr>
                    <td colSpan={2} className="p-2 text-center font-extrabold">
                      현재 조건 조회 ({filteredTaxiStands.length}개소)
                    </td>
                    <td className="p-2 text-center font-mono font-bold text-blue-900">
                      {filteredTaxiStands.filter(s => s.type === '포스트형').length}
                    </td>
                    <td className="p-2 text-center font-mono font-bold text-emerald-950">
                      {filteredTaxiStands.filter(s => s.type === '쉘터형').length}
                    </td>
                    <td className="p-2 text-center font-mono font-bold text-amber-950">
                      {filteredTaxiStands.filter(s => s.solarLighting).length}
                    </td>
                    <td className="p-2 text-center text-slate-500 font-normal">-</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 14. 대중교통과 운수업체 현황 자료 (2026. 7. 기준) */}
      {/* ========================================================= */}
      <section id="sec-14" className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              14
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">대중교통과 관할 운수업체 현황 자료 (2026. 7. 기준)</h3>
              <p className="text-xs text-slate-500">일반택시, 개인택시, 시내버스(관내), 마을버스 운수업체 및 노선별 현황</p>
            </div>
          </div>
          <span className="bg-blue-100 text-blue-900 font-mono text-xs font-bold px-3 py-1 rounded-full self-start sm:self-auto">
            4대 운수분야 통합
          </span>
        </div>

        {/* 4 Interactive Category Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={() => setOperatorCategory('일반택시')}
            className={`p-3.5 rounded-xl border text-left transition cursor-pointer space-y-1 ${
              operatorCategory === '일반택시'
                ? 'bg-blue-50/90 border-blue-500 shadow-xs ring-2 ring-blue-500/20'
                : 'bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-blue-50/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-950">1) 일반택시</span>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-100/80 px-1.5 py-0.5 rounded">6개 업체</span>
            </div>
            <span className="text-xl font-black text-slate-900 font-mono block">342 대</span>
            <span className="text-[11px] text-slate-500 block">영훈, 신안, 광일, 성구, 새한, 금성</span>
          </button>

          <button
            type="button"
            onClick={() => setOperatorCategory('개인택시')}
            className={`p-3.5 rounded-xl border text-left transition cursor-pointer space-y-1 ${
              operatorCategory === '개인택시'
                ? 'bg-emerald-50/90 border-emerald-500 shadow-xs ring-2 ring-emerald-500/20'
                : 'bg-slate-50 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-950">2) 개인택시</span>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-1.5 py-0.5 rounded">1개 조합</span>
            </div>
            <span className="text-xl font-black text-slate-900 font-mono block">949 대</span>
            <span className="text-[11px] text-slate-500 block">모범운전자회 & 쉼터 2개소</span>
          </button>

          <button
            type="button"
            onClick={() => setOperatorCategory('시내버스')}
            className={`p-3.5 rounded-xl border text-left transition cursor-pointer space-y-1 ${
              operatorCategory === '시내버스'
                ? 'bg-indigo-50/90 border-indigo-500 shadow-xs ring-2 ring-indigo-500/20'
                : 'bg-slate-50 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-950">3) 시내버스(관내)</span>
              <span className="text-[10px] font-bold text-indigo-800 bg-indigo-100/80 px-1.5 py-0.5 rounded">3개 업체</span>
            </div>
            <span className="text-xl font-black text-slate-900 font-mono block">605 대</span>
            <span className="text-[11px] text-slate-500 block">경기운수, 경기버스, 대원운수</span>
          </button>

          <button
            type="button"
            onClick={() => setOperatorCategory('마을버스')}
            className={`p-3.5 rounded-xl border text-left transition cursor-pointer space-y-1 ${
              operatorCategory === '마을버스'
                ? 'bg-amber-50/90 border-amber-500 shadow-xs ring-2 ring-amber-500/20'
                : 'bg-slate-50 border-slate-200 hover:border-amber-300 hover:bg-amber-50/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-950">4) 마을버스</span>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100/80 px-1.5 py-0.5 rounded">6업체 30노선</span>
            </div>
            <span className="text-xl font-black text-slate-900 font-mono block">101 대</span>
            <span className="text-[11px] text-slate-500 block">총 운행거리 388.3 km</span>
          </button>
        </div>

        {/* Content Panel Based on Active Category */}
        <div className="pt-2">
          {/* ==================================== */}
          {/* 1) 일반택시 Content */}
          {/* ==================================== */}
          {operatorCategory === '일반택시' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between bg-blue-50 p-2.5 rounded-lg border border-blue-200 text-xs">
                <span className="font-bold text-blue-950">1) 일반택시 현황 (6개 업체, 총 342대)</span>
                <span className="font-mono text-blue-800 font-bold">합계: 342면허</span>
              </div>

              <div className="overflow-x-auto border border-slate-300 rounded-lg shadow-inner touch-scroll mobile-table-wrap">
                <table className="w-full text-left text-xs border-collapse mobile-compact-table whitespace-nowrap">
                  <thead className="bg-slate-900 text-white font-medium">
                    <tr>
                      <th className="p-2.5 border-r border-slate-700">업 체 명</th>
                      <th className="p-2.5 text-center border-r border-slate-700 w-28">대 표 자</th>
                      <th className="p-2.5 border-r border-slate-700">주 사무 소</th>
                      <th className="p-2.5 text-center border-r border-slate-700 w-20">면허대수</th>
                      <th className="p-2.5 text-center border-r border-slate-700 w-28">전화번호</th>
                      <th className="p-2.5 text-center w-28">FAX</th>
                    </tr>
                    <tr className="bg-amber-100 text-amber-950 font-bold border-b border-amber-300">
                      <td className="p-2 font-black border-r border-amber-200">계</td>
                      <td className="p-2 text-center text-slate-500 border-r border-amber-200">-</td>
                      <td className="p-2 font-bold border-r border-amber-200">6개 업체</td>
                      <td className="p-2 text-center font-mono font-black text-blue-900 border-r border-amber-200">342</td>
                      <td className="p-2 text-center text-slate-500 border-r border-amber-200">-</td>
                      <td className="p-2 text-center text-slate-500">-</td>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {GENERAL_TAXI_OPERATORS.map((item, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/40 transition">
                        <td className="p-2.5 font-bold text-slate-900 border-r border-slate-100">{item.name}</td>
                        <td className="p-2.5 text-center font-medium text-slate-800 border-r border-slate-100">{item.representative}</td>
                        <td className="p-2.5 text-slate-700 border-r border-slate-100">{item.address}</td>
                        <td className="p-2.5 text-center font-mono font-black text-blue-800 border-r border-slate-100">{item.licenses}</td>
                        <td className="p-2.5 text-center font-mono text-slate-800 border-r border-slate-100">{item.phone}</td>
                        <td className="p-2.5 text-center font-mono text-slate-600">{item.fax}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================================== */}
          {/* 2) 개인택시 Content */}
          {/* ==================================== */}
          {operatorCategory === '개인택시' && (
            <div className="space-y-5 animate-fadeIn">
              {/* 개인택시 기본 현황 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 text-xs">
                  <span className="font-bold text-emerald-950">2) 개인택시 현황 (면허대수 949대)</span>
                  <span className="font-mono text-emerald-800 font-bold">조합장: 장재식</span>
                </div>

                <div className="overflow-x-auto border border-slate-300 rounded-lg shadow-inner touch-scroll mobile-table-wrap">
                  <table className="w-full text-left text-xs border-collapse mobile-compact-table whitespace-nowrap">
                    <thead className="bg-slate-900 text-white font-medium">
                      <tr>
                        <th className="p-2.5 text-center border-r border-slate-700 w-24">구 분</th>
                        <th className="p-2.5 text-center border-r border-slate-700 w-24">면허대수</th>
                        <th className="p-2.5 border-r border-slate-700">주 사무 소</th>
                        <th className="p-2.5 text-center border-r border-slate-700 w-24">조합장</th>
                        <th className="p-2.5 text-center border-r border-slate-700 w-28">전화번호</th>
                        <th className="p-2.5 text-center w-28">FAX</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr className="hover:bg-emerald-50/40">
                        <td className="p-2.5 text-center font-bold text-slate-900 border-r border-slate-100">개인택시</td>
                        <td className="p-2.5 text-center font-mono font-black text-emerald-800 border-r border-slate-100">{PRIVATE_TAXI_UNION_INFO.licenses}</td>
                        <td className="p-2.5 text-slate-800 border-r border-slate-100">{PRIVATE_TAXI_UNION_INFO.address}</td>
                        <td className="p-2.5 text-center font-bold text-slate-900 border-r border-slate-100">{PRIVATE_TAXI_UNION_INFO.head}</td>
                        <td className="p-2.5 text-center font-mono text-slate-800 border-r border-slate-100">{PRIVATE_TAXI_UNION_INFO.phone}</td>
                        <td className="p-2.5 text-center font-mono text-slate-600">{PRIVATE_TAXI_UNION_INFO.fax}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 택시관련 단체 및 시설 현황 */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <span className="font-bold text-slate-900 block text-sm border-b border-slate-200 pb-1.5">
                  ※ 택시관련 단체 현황 (모범운전자회)
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                  {MODEL_DRIVER_ASSOCIATIONS.map((assoc, i) => (
                    <div key={i} className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1">
                      <div className="flex justify-between items-center font-bold text-slate-900">
                        <span>{assoc.name}</span>
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px]">회원수 {assoc.members}명</span>
                      </div>
                      <p className="text-slate-600">회장 {assoc.head} ({assoc.address})</p>
                      <p className="font-mono text-blue-700 font-bold">☎ {assoc.phone}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 택시쉼터 현황 */}
              <div className="space-y-2">
                <span className="font-bold text-slate-900 text-xs block">※ 택시쉼터 시설 비교 (남부 & 북부)</span>
                <div className="overflow-x-auto border border-slate-300 rounded-lg shadow-inner touch-scroll mobile-table-wrap">
                  <table className="w-full text-left text-xs border-collapse mobile-compact-table whitespace-nowrap">
                    <thead className="bg-slate-900 text-white font-medium">
                      <tr>
                        <th className="p-2.5 text-center border-r border-slate-700 w-24">구 분</th>
                        <th className="p-2.5 text-center border-r border-slate-700 bg-blue-900">남부택시쉼터 (19년 12월 운영개시)</th>
                        <th className="p-2.5 text-center bg-teal-900">북부택시쉼터 (25년 4월 운영개시)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      <tr>
                        <td className="p-2.5 font-bold bg-slate-100 text-slate-900 border-r border-slate-200 text-center">위 치</td>
                        <td className="p-2.5 text-slate-800 border-r border-slate-100">{TAXI_SHELTERS_COMPARISON[0].location}</td>
                        <td className="p-2.5 text-slate-800">{TAXI_SHELTERS_COMPARISON[1].location}</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold bg-slate-100 text-slate-900 border-r border-slate-200 text-center">규 모</td>
                        <td className="p-2.5 text-slate-800 border-r border-slate-100">{TAXI_SHELTERS_COMPARISON[0].scale}</td>
                        <td className="p-2.5 text-slate-800">{TAXI_SHELTERS_COMPARISON[1].scale}</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold bg-slate-100 text-slate-900 border-r border-slate-200 text-center">운영방식</td>
                        <td className="p-2.5 text-slate-800 border-r border-slate-100">{TAXI_SHELTERS_COMPARISON[0].operationMode}</td>
                        <td className="p-2.5 text-slate-800">{TAXI_SHELTERS_COMPARISON[1].operationMode}</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold bg-slate-100 text-slate-900 border-r border-slate-200 text-center">운영시간</td>
                        <td className="p-2.5 text-slate-800 border-r border-slate-100">{TAXI_SHELTERS_COMPARISON[0].hours}</td>
                        <td className="p-2.5 text-slate-800">{TAXI_SHELTERS_COMPARISON[1].hours}</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold bg-slate-100 text-slate-900 border-r border-slate-200 text-center">주요시설</td>
                        <td className="p-2.5 text-slate-800 border-r border-slate-100">{TAXI_SHELTERS_COMPARISON[0].facilities}</td>
                        <td className="p-2.5 text-slate-800">{TAXI_SHELTERS_COMPARISON[1].facilities}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================================== */}
          {/* 3) 시내버스(관내) Content */}
          {/* ==================================== */}
          {operatorCategory === '시내버스' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between bg-indigo-50 p-2.5 rounded-lg border border-indigo-200 text-xs">
                <span className="font-bold text-indigo-950">3) 시내버스(관내) 현황 (3개 업체, 총 605대)</span>
                <span className="font-mono text-indigo-800 font-bold">합계: 605대</span>
              </div>

              <div className="overflow-x-auto border border-slate-300 rounded-lg shadow-inner touch-scroll mobile-table-wrap">
                <table className="w-full text-left text-xs border-collapse mobile-compact-table whitespace-nowrap">
                  <thead className="bg-slate-900 text-white font-medium">
                    <tr>
                      <th className="p-2.5 border-r border-slate-700">업 체 명</th>
                      <th className="p-2.5 text-center border-r border-slate-700 w-24">대 표 자</th>
                      <th className="p-2.5 border-r border-slate-700">주 사 무 소</th>
                      <th className="p-2.5 text-center border-r border-slate-700 w-24">면허일자</th>
                      <th className="p-2.5 text-center border-r border-slate-700 w-24">차량대수</th>
                      <th className="p-2.5 text-center w-28">전화번호</th>
                    </tr>
                    <tr className="bg-amber-100 text-amber-950 font-bold border-b border-amber-300">
                      <td className="p-2 font-black border-r border-amber-200">계</td>
                      <td className="p-2 text-center text-slate-500 border-r border-amber-200">-</td>
                      <td className="p-2 font-bold border-r border-amber-200">3개 업체</td>
                      <td className="p-2 text-center text-slate-500 border-r border-amber-200">-</td>
                      <td className="p-2 text-center font-mono font-black text-indigo-900 border-r border-amber-200">605</td>
                      <td className="p-2 text-center text-slate-500">-</td>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {CITY_BUS_OPERATORS.map((item, idx) => (
                      <tr key={idx} className="hover:bg-indigo-50/40 transition">
                        <td className="p-2.5 font-bold text-slate-900 border-r border-slate-100">{item.name}</td>
                        <td className="p-2.5 text-center font-medium text-slate-800 border-r border-slate-100">{item.representative}</td>
                        <td className="p-2.5 text-slate-700 border-r border-slate-100">{item.address}</td>
                        <td className="p-2.5 text-center font-mono text-slate-700 border-r border-slate-100">{item.licenseDate}</td>
                        <td className="p-2.5 text-center font-mono font-black text-indigo-800 border-r border-slate-100">{item.vehicles}</td>
                        <td className="p-2.5 text-center font-mono text-slate-800">{item.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================================== */}
          {/* 4) 마을버스 Content */}
          {/* ==================================== */}
          {operatorCategory === '마을버스' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-xs gap-1">
                <span className="font-bold text-amber-950">4) 마을버스 세부 현황 (6개 업체, 30개 노선, 총 101대, 388.3km)</span>
                <span className="font-mono text-amber-900 font-bold">전체 노선 목록</span>
              </div>

              <div className="overflow-x-auto max-h-[600px] scrollbar-thin border border-slate-300 rounded-lg shadow-inner touch-scroll mobile-table-wrap">
                <table className="w-full text-left text-xs border-collapse mobile-compact-table whitespace-nowrap">
                  <thead className="bg-slate-900 text-white font-medium sticky top-0 z-10">
                    <tr>
                      <th className="p-2.5 border-r border-slate-700 w-28 bg-slate-900">업체명</th>
                      <th className="p-2.5 text-center border-r border-slate-700 w-20 bg-slate-900">대표자</th>
                      <th className="p-2.5 text-center border-r border-slate-700 w-24 bg-slate-900">노선번호</th>
                      <th className="p-2.5 text-center border-r border-slate-700 w-24 bg-slate-900">기점</th>
                      <th className="p-2.5 text-center border-r border-slate-700 w-28 bg-slate-900">종점</th>
                      <th className="p-2.5 text-center border-r border-slate-700 w-16 bg-slate-900">대수</th>
                      <th className="p-2.5 text-center border-r border-slate-700 w-20 bg-slate-900">거리(km)</th>
                      <th className="p-2.5 text-center border-r border-slate-700 w-28 bg-slate-900">전화번호</th>
                      <th className="p-2.5 border-r border-slate-700 bg-slate-900">비고</th>
                    </tr>
                    <tr className="bg-amber-100 text-amber-950 font-bold border-b border-amber-300">
                      <td className="p-2 font-black border-r border-amber-200">계</td>
                      <td className="p-2 text-center text-slate-500 border-r border-amber-200">-</td>
                      <td colSpan={3} className="p-2 text-center font-bold border-r border-amber-200">6개 업체, 30개 노선</td>
                      <td className="p-2 text-center font-mono font-black text-amber-950 border-r border-amber-200">101</td>
                      <td className="p-2 text-center font-mono font-black text-amber-950 border-r border-amber-200">388.3</td>
                      <td className="p-2 text-center text-slate-500 border-r border-amber-200">-</td>
                      <td className="p-2 text-slate-500">-</td>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {TOWN_BUS_DETAILED_ROWS.map((row, idx) => (
                      <tr key={idx} className="hover:bg-amber-50/40 transition">
                        {row.isFirstInCompany ? (
                          <>
                            <td rowSpan={row.rowSpan} className="p-2.5 font-bold text-slate-900 border-r border-slate-200 bg-slate-50/70 vertical-top">
                              {row.company}
                            </td>
                            <td rowSpan={row.rowSpan} className="p-2.5 text-center text-slate-800 border-r border-slate-200 bg-slate-50/70 vertical-top">
                              {row.representative}
                            </td>
                          </>
                        ) : null}
                        <td className="p-2 text-center font-mono font-bold text-blue-900 border-r border-slate-100">
                          {row.routeNumber}
                        </td>
                        <td className="p-2 text-center text-slate-800 border-r border-slate-100">{row.origin}</td>
                        <td className="p-2 text-center text-slate-800 border-r border-slate-100">{row.destination}</td>
                        <td className="p-2 text-center font-mono font-black text-slate-900 border-r border-slate-100">
                          {row.busCount}
                        </td>
                        <td className="p-2 text-center font-mono text-slate-700 border-r border-slate-100">
                          {row.distanceKm}
                        </td>
                        {row.isFirstInCompany ? (
                          <td rowSpan={row.rowSpan} className="p-2.5 text-center font-mono text-slate-800 border-r border-slate-200 bg-slate-50/70 vertical-top">
                            {row.phone}
                          </td>
                        ) : null}
                        <td className="p-2 text-slate-600 text-[11px]">
                          {row.note || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-100 text-slate-900 font-bold sticky bottom-0 z-10 border-t border-slate-300">
                    <tr>
                      <td colSpan={5} className="p-2 text-center font-extrabold">
                        마을버스 전체 합계 (30개 노선)
                      </td>
                      <td className="p-2 text-center font-mono font-black text-amber-950">101</td>
                      <td className="p-2 text-center font-mono font-black text-amber-950">388.3</td>
                      <td colSpan={2} className="p-2 text-slate-500 text-center font-normal">-</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 15. 택시유종별 현황 (2026. 7. 기준) */}
      {/* ========================================================= */}
      <section id="sec-15" className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              15
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">택시유종별 현황 (2026. 7. 기준)</h3>
              <p className="text-xs text-slate-500">LPG 1,119대, 전기 168대, 하이브리드 4대 (총 1,291대)</p>
            </div>
          </div>
          <span className="bg-emerald-100 text-emerald-900 font-mono text-xs font-bold px-3 py-1 rounded-full">
            전기택시 168대 보급
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-300 rounded-lg shadow-xs touch-scroll mobile-table-wrap">
          <table className="w-full text-center text-xs border-collapse mobile-compact-table whitespace-nowrap">
            <thead className="bg-slate-900 text-white font-medium">
              <tr>
                <th colSpan={2} className="p-2.5 border-r border-slate-700 w-52">택시 구분</th>
                <th className="p-2.5 border-r border-slate-700 w-32">등록대수</th>
                <th className="p-2.5 border-r border-slate-700 w-32">LPG</th>
                <th className="p-2.5 border-r border-slate-700 w-32">전기</th>
                <th className="p-2.5 w-32">하이브리드</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {/* 소계 */}
              <tr className="bg-amber-100 text-amber-950 font-extrabold border-b border-amber-300">
                <td colSpan={2} className="p-2.5 text-center font-black border-r border-amber-200">소 계</td>
                <td className="p-2.5 font-mono font-black text-slate-900 border-r border-amber-200">{DETAILED_TAXI_FUEL_DATA.total.registered.toLocaleString()}</td>
                <td className="p-2.5 font-mono font-black text-slate-900 border-r border-amber-200">{DETAILED_TAXI_FUEL_DATA.total.lpg.toLocaleString()}</td>
                <td className="p-2.5 font-mono font-black text-emerald-900 border-r border-amber-200">{DETAILED_TAXI_FUEL_DATA.total.electric}</td>
                <td className="p-2.5 font-mono font-black text-slate-900">{DETAILED_TAXI_FUEL_DATA.total.hybrid}</td>
              </tr>

              {/* 일반택시 (RowSpan = 7) */}
              <tr>
                <td rowSpan={7} className="p-2.5 font-bold text-slate-900 border-r border-slate-200 bg-slate-50 align-middle">
                  일반<br />택시
                </td>
                <td className="p-2 font-bold text-slate-900 border-r border-slate-100 bg-slate-50/60">계</td>
                <td className="p-2 font-mono font-bold text-slate-900 border-r border-slate-100">{DETAILED_TAXI_FUEL_DATA.generalTotal.registered}</td>
                <td className="p-2 font-mono font-bold text-slate-900 border-r border-slate-100">{DETAILED_TAXI_FUEL_DATA.generalTotal.lpg}</td>
                <td className="p-2 border-r border-slate-100 text-slate-300">-</td>
                <td className="p-2 text-slate-300">-</td>
              </tr>
              {DETAILED_TAXI_FUEL_DATA.generalOperators.map((op, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition">
                  <td className="p-2 text-slate-800 border-r border-slate-100">{op.name}</td>
                  <td className="p-2 font-mono text-slate-900 border-r border-slate-100">{op.registered}</td>
                  <td className="p-2 font-mono text-slate-900 border-r border-slate-100">{op.lpg}</td>
                  <td className="p-2 border-r border-slate-100 text-slate-300"></td>
                  <td className="p-2 text-slate-300"></td>
                </tr>
              ))}

              {/* 개인택시 */}
              <tr className="hover:bg-emerald-50/40 transition">
                <td colSpan={2} className="p-2.5 font-bold text-slate-900 border-r border-slate-200 bg-slate-50">개인 택시</td>
                <td className="p-2.5 font-mono font-black text-slate-900 border-r border-slate-100">{DETAILED_TAXI_FUEL_DATA.privateTaxi.registered}</td>
                <td className="p-2.5 font-mono font-black text-slate-900 border-r border-slate-100">{DETAILED_TAXI_FUEL_DATA.privateTaxi.lpg}</td>
                <td className="p-2.5 font-mono font-black text-emerald-800 border-r border-slate-100">{DETAILED_TAXI_FUEL_DATA.privateTaxi.electric}</td>
                <td className="p-2.5 font-mono font-black text-slate-900">{DETAILED_TAXI_FUEL_DATA.privateTaxi.hybrid}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 16. 버스정류장(승강장) 현황 및 관내 스마트 승강장 현황 */}
      {/* ========================================================= */}
      <section id="sec-16" className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              16
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">버스정류장(승강장) 현황 및 관내 스마트 승강장 현황</h3>
              <p className="text-xs text-slate-500">총 1,913개소 (쉘터형 1,053, 표지판 521, 독립안내기 39, 무표지 257, 스마트 승강장 43)</p>
            </div>
          </div>
          <span className="bg-teal-100 text-teal-900 font-mono text-xs font-bold px-3 py-1 rounded-full">
            스마트 승강장 43개소
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center font-mono text-xs">
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-500 block text-[10px]">총 승강장</span>
            <span className="text-base font-bold text-slate-900">1,913</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-500 block text-[10px]">쉘터형</span>
            <span className="text-base font-bold text-slate-800">1,053</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-500 block text-[10px]">독립안내기</span>
            <span className="text-base font-bold text-slate-800">39</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-500 block text-[10px]">표지판</span>
            <span className="text-base font-bold text-slate-800">521</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-500 block text-[10px]">무표지형</span>
            <span className="text-base font-bold text-slate-800">257</span>
          </div>
          <div className="p-2.5 bg-teal-50 rounded-lg border border-teal-200">
            <span className="text-teal-800 font-medium block text-[10px]">스마트승강장</span>
            <span className="text-base font-bold text-teal-900">43</span>
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={() => onSelectTab?.('stops')}
            className="inline-flex items-center space-x-1.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all duration-150 cursor-pointer active:scale-95"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>승강장 현황 상세보기</span>
            <ChevronRight className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 17. 대중교통비 지원 (어르신 교통비, K패스, 어린이·청소년) 및 사업별 예산현황 */}
      {/* ========================================================= */}
      <section id="sec-17" className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              17
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">대중교통비 지원 및 사업별 예산현황 (2026년 237.6억원)</h3>
              <p className="text-xs text-slate-500">K-패스, 어르신 교통비, 경기도 어린이·청소년 교통비 3대 정책 세부사항 및 예산소요액</p>
            </div>
          </div>
          <span className="bg-blue-100 text-blue-900 font-mono text-xs font-bold px-3 py-1 rounded-full">
            2026 예산 23,760백만원
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TRANSIT_SUBSIDIES.map((sub) => (
            <div key={sub.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
              <span className="font-bold text-slate-900 text-sm block">{sub.title}</span>
              <p className="text-slate-600">🎯 대상: {sub.targetGroup} ({sub.targetCount})</p>
              <p className="text-slate-600">💳 한도: {sub.limit}</p>
              <p className="text-blue-800 font-mono font-bold">💰 2026 예산: {(sub.budget2026Total / 1000).toFixed(1)} 억원</p>
            </div>
          ))}
        </div>

        {/* 사업별 예산 분석표 */}
        <div className="pt-2">
          <span className="text-xs font-bold text-slate-900 block mb-2">사업별 연도별 예산/집행/소요/부족액 분석표 (단위: 백만원)</span>
          <div className="overflow-x-auto touch-scroll mobile-table-wrap">
            <table className="w-full text-left text-xs font-mono mobile-compact-table whitespace-nowrap">
              <thead className="bg-slate-900 text-white font-sans font-medium">
                <tr>
                  <th className="p-2.5">사업 구분</th>
                  <th className="p-2.5 text-right">2024 예산</th>
                  <th className="p-2.5 text-right">2025 예산</th>
                  <th className="p-2.5 text-right">2026 예산</th>
                  <th className="p-2.5 text-right text-amber-300">2026 필요액</th>
                  <th className="p-2.5 text-right text-rose-300">2026 부족액</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {BUDGET_YEAR_ANALYTICS.map((b) => (
                  <tr key={b.category} className={b.category === '합 계' ? 'font-bold bg-slate-100 text-slate-900' : 'hover:bg-slate-50'}>
                    <td className="p-2.5 font-sans font-medium">{b.category}</td>
                    <td className="p-2.5 text-right">{b.y2024Budget.toLocaleString()}</td>
                    <td className="p-2.5 text-right">{b.y2025Budget.toLocaleString()}</td>
                    <td className="p-2.5 text-right font-bold text-blue-700">{b.y2026Budget.toLocaleString()}</td>
                    <td className="p-2.5 text-right font-bold text-amber-800">{b.y2026Required.toLocaleString()}</td>
                    <td className="p-2.5 text-right font-bold text-rose-700">{b.y2026Shortage.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={() => onSelectTab?.('policy')}
            className="inline-flex items-center space-x-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all duration-150 cursor-pointer active:scale-95"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>대중교통비 지원현황 상세보기</span>
            <ChevronRight className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
