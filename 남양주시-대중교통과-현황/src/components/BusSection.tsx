import React, { useState } from 'react';
import {
  REGIONAL_EXPRESS_BUSES,
  THANK_YOU_BUSES,
  M_BUSES,
  DOUBLE_DECKER_STATS,
  AIRPORT_BUSES,
  LOW_FLOOR_BUS_SUMMARY,
  LOW_FLOOR_BUS_ROUTES
} from '../data/transitData';
import { Bus, Filter, ArrowRight, Shield, Zap, Sparkles, AlertCircle, Compass } from 'lucide-react';

interface BusSectionProps {
  initialSubTab?: 'express' | 'thankyou' | 'mbus' | 'double' | 'airport' | 'lowfloor';
}

export const BusSection: React.FC<BusSectionProps> = ({ initialSubTab }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('전체');
  const [selectedDirection, setSelectedDirection] = useState<string>('전체');
  const [activeBusTab, setActiveBusTab] = useState<'express' | 'thankyou' | 'mbus' | 'double' | 'airport' | 'lowfloor'>(
    initialSubTab || 'express'
  );

  React.useEffect(() => {
    if (initialSubTab) {
      setActiveBusTab(initialSubTab);
    }
  }, [initialSubTab]);

  // Filter regional express buses
  const filteredExpressBuses = REGIONAL_EXPRESS_BUSES.filter((bus) => {
    const regionMatch = selectedRegion === '전체' || bus.region === selectedRegion;
    const directionMatch = selectedDirection === '전체' || bus.direction === selectedDirection;
    return regionMatch && directionMatch;
  });

  const getDirectionBadgeClass = (direction: string) => {
    switch (direction) {
      case '강변방면':
        return 'bg-blue-600 text-white';
      case '잠실방면':
        return 'bg-rose-600 text-white';
      case '강남방면':
        return 'bg-purple-600 text-white';
      case '불암산역방면':
        return 'bg-emerald-600 text-white';
      default:
        return 'bg-slate-700 text-white';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Sub Navigation Bar for Bus Types */}
      <div className="bg-white p-1.5 sm:p-2 rounded-xl border border-slate-200 shadow-xs flex overflow-x-auto gap-1.5 no-scrollbar touch-scroll whitespace-nowrap">
        <button
          onClick={() => setActiveBusTab('express')}
          className={`flex items-center space-x-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs font-bold transition shrink-0 active:scale-95 ${
            activeBusTab === 'express' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Bus className="w-4 h-4 shrink-0" />
          <span>광역·직행좌석버스 (28개 노선 229대)</span>
        </button>

        <button
          onClick={() => setActiveBusTab('thankyou')}
          className={`flex items-center space-x-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs font-bold transition shrink-0 active:scale-95 ${
            activeBusTab === 'thankyou' ? 'bg-pink-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>땡큐 & 트롤리버스 (16개 노선 130대)</span>
        </button>

        <button
          onClick={() => setActiveBusTab('mbus')}
          className={`flex items-center space-x-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs font-bold transition shrink-0 active:scale-95 ${
            activeBusTab === 'mbus' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Shield className="w-4 h-4 shrink-0" />
          <span>광역급행 M버스 (5개 노선 49대)</span>
        </button>

        <button
          onClick={() => setActiveBusTab('double')}
          className={`flex items-center space-x-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs font-bold transition shrink-0 active:scale-95 ${
            activeBusTab === 'double' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Bus className="w-4 h-4 shrink-0" />
          <span>2층버스 (도입 40대 / 운행 29대)</span>
        </button>

        <button
          onClick={() => setActiveBusTab('airport')}
          className={`flex items-center space-x-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs font-bold transition shrink-0 active:scale-95 ${
            activeBusTab === 'airport' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Compass className="w-4 h-4 shrink-0" />
          <span>공항버스 (3개 노선)</span>
        </button>

        <button
          onClick={() => setActiveBusTab('lowfloor')}
          className={`flex items-center space-x-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs font-bold transition shrink-0 active:scale-95 ${
            activeBusTab === 'lowfloor' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Zap className="w-4 h-4 shrink-0" />
          <span>저상버스 (212대)</span>
        </button>
      </div>

      {/* 1. 광역버스 및 직행좌석버스 View */}
      {activeBusTab === 'express' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-lg flex items-center space-x-2">
                  <span>광역버스 세부 노선 현황</span>
                  <span className="text-xs bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full font-mono">
                    총 28개 노선 / 229대
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  권역별(진접, 별내, 다산, 호평평내, 화도, 와부) 및 주요 방면별(강변, 잠실, 강남, 불암산역) 버스 노선 검색
                </p>
              </div>

              {/* Color direction legend */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-500 text-[11px] font-medium">방면별 색상:</span>
                <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-[11px] font-medium">■ 강변방면</span>
                <span className="bg-rose-600 text-white px-2 py-0.5 rounded text-[11px] font-medium">■ 잠실방면</span>
                <span className="bg-purple-600 text-white px-2 py-0.5 rounded text-[11px] font-medium">■ 강남방면</span>
                <span className="bg-emerald-600 text-white px-2 py-0.5 rounded text-[11px] font-medium">■ 불암산역방면</span>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-slate-700 flex items-center space-x-1">
                  <Filter className="w-3.5 h-3.5 text-slate-500" />
                  <span>권역 선택:</span>
                </span>
                {['전체', '진접', '별내', '다산', '호평평내', '화도', '와부'].map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-2.5 py-1 rounded-md transition font-medium ${
                      selectedRegion === region
                        ? 'bg-slate-900 text-white font-bold'
                        : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-slate-700">방면 선택:</span>
                {['전체', '강변방면', '잠실방면', '강남방면', '불암산역방면'].map((dir) => (
                  <button
                    key={dir}
                    onClick={() => setSelectedDirection(dir)}
                    className={`px-2.5 py-1 rounded-md transition font-medium ${
                      selectedDirection === dir
                        ? 'bg-indigo-700 text-white font-bold'
                        : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {dir}
                  </button>
                ))}
              </div>
            </div>

            {/* Bus Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredExpressBuses.map((bus) => (
                <div
                  key={bus.id}
                  className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-rose-300 transition-all space-y-3 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-black text-rose-700 font-mono tracking-tight">
                        {bus.routeNumber}
                      </span>
                      <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                        {bus.busType}
                      </span>
                    </div>
                    <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ${getDirectionBadgeClass(bus.direction)}`}>
                      {bus.direction}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>권역 / 운수업체</span>
                      <span className="font-semibold text-slate-900">{bus.region} / {bus.operator}</span>
                    </div>

                    <div className="flex items-center justify-between bg-slate-50 p-2 rounded text-slate-800">
                      <span className="font-medium text-slate-600">{bus.origin}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-bold text-slate-900">{bus.destination}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-slate-500">운행대수</span>
                      <div className="flex items-center space-x-2 font-mono">
                        <span className="font-bold text-slate-900">{bus.busCount}대</span>
                        {bus.doubleDeckerCount && (
                          <span className="bg-amber-100 text-amber-900 text-[10px] px-1.5 py-0.2 rounded font-semibold">
                            2층 {bus.doubleDeckerCount}대
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredExpressBuses.length === 0 && (
              <div className="text-center py-10 bg-slate-50 rounded-xl text-slate-500 text-sm">
                해당 조건에 일치하는 광역버스 노선이 없습니다.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. 땡큐버스 및 트롤리버스 View */}
      {activeBusTab === 'thankyou' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-pink-950 via-slate-900 to-purple-950 text-white rounded-xl p-5 shadow-sm border border-pink-900/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="bg-pink-500/20 text-pink-300 text-xs px-2.5 py-0.5 rounded-full border border-pink-500/30 font-semibold">
                  남양주 특화 순환 대중교통
                </span>
                <h3 className="text-2xl font-black mt-1">땡큐버스 & 트롤리버스 운행 현황</h3>
                <p className="text-xs text-pink-200 mt-1">
                  남양주시 전역을 입체적으로 연결하는 땡큐버스 16개 노선 130대, 유럽풍 테마 트롤리버스 4개 노선 10대 운영
                </p>
              </div>
              <div className="flex items-center space-x-3 bg-slate-900/80 p-3 rounded-lg border border-pink-800/40 text-center">
                <div>
                  <span className="text-[10px] text-pink-300 block">땡큐버스</span>
                  <span className="text-xl font-bold font-mono text-white">16개 노선 130대</span>
                </div>
                <div className="border-l border-pink-800/40 pl-3">
                  <span className="text-[10px] text-amber-300 block">트롤리버스</span>
                  <span className="text-xl font-bold font-mono text-amber-300">4개 노선 10대</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-800 text-white font-medium">
                  <tr>
                    <th className="p-3">권역별</th>
                    <th className="p-3">노선번호</th>
                    <th className="p-3">운수업체</th>
                    <th className="p-3">기점 ↔ 종점</th>
                    <th className="p-3 text-center">대수</th>
                    <th className="p-3 text-center">트롤리버스</th>
                    <th className="p-3 text-center">개통시기</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {THANK_YOU_BUSES.map((bus, idx) => (
                    <tr key={idx} className="hover:bg-pink-50/40 transition">
                      <td className="p-3 font-semibold text-slate-700">{bus.region}</td>
                      <td className="p-3 font-bold text-pink-700 font-mono text-sm">{bus.routeNumber}</td>
                      <td className="p-3 text-slate-600">{bus.operator}</td>
                      <td className="p-3 text-slate-800 font-medium">{bus.origin} ↔ {bus.destination}</td>
                      <td className="p-3 text-center font-bold font-mono">{bus.busCount}대</td>
                      <td className="p-3 text-center">
                        {bus.trolleyCount > 0 ? (
                          <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full text-[11px]">
                            {bus.trolleyCount}대 운행
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                      <td className="p-3 text-center text-slate-500 font-mono">{bus.openedDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. M버스 View */}
      {activeBusTab === 'mbus' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <span>광역급행버스 (M버스) 운행 현황</span>
                <span className="bg-indigo-100 text-indigo-800 text-xs px-2.5 py-0.5 rounded-full font-mono font-bold">
                  총 5개 노선 49대
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                대도시권광역교통위원회(대광위) 준공영제 적용 광역급행 버스 (전 노선 잠실광역환승센터 직결)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {M_BUSES.map((mbus) => (
                <div key={mbus.routeNumber} className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-200 space-y-2.5">
                  <div className="flex items-center justify-between border-b border-indigo-200 pb-2">
                    <span className="text-lg font-black text-indigo-900 font-mono">{mbus.routeNumber}</span>
                    <span className="bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded font-bold">
                      {mbus.operator}
                    </span>
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between text-slate-600">
                      <span>기점 ↔ 종점</span>
                      <span className="font-bold text-slate-900">{mbus.origin} ↔ {mbus.destination}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>운행대수 / 개통</span>
                      <span className="font-mono font-bold text-indigo-900">{mbus.busCount}대 / {mbus.openedDate}</span>
                    </div>
                    <div className="bg-white p-2 rounded text-[11px] text-indigo-900 border border-indigo-100 font-medium">
                      💡 {mbus.note}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. 2층버스 View */}
      {activeBusTab === 'double' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-900">2층버스 운행 현황</h3>
                <p className="text-xs text-slate-500">총 7개 노선 / 도입 40대 (디젤 36대, 전기 4대) / 실 운행 29대</p>
              </div>
              <span className="bg-amber-100 text-amber-900 text-xs px-3 py-1 rounded-full font-bold">
                전기 2층버스 4대 포함
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-800 text-white">
                  <tr>
                    <th className="p-3">연도별 도입</th>
                    <th className="p-3 text-center">계</th>
                    <th className="p-3 text-center">화도 (8002)</th>
                    <th className="p-3 text-center">진접 (8012)</th>
                    <th className="p-3 text-center">호평평내 (M2323, M2352)</th>
                    <th className="p-3 text-center">와부 (1670)</th>
                    <th className="p-3 text-center">별내 (1001)</th>
                    <th className="p-3 text-center">다산 (1003)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {DOUBLE_DECKER_STATS.map((stat) => (
                    <tr key={stat.year} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-800">{stat.year}년 {stat.electric > 0 ? `(전기 ${stat.electric}대)` : ''}</td>
                      <td className="p-3 text-center font-bold text-indigo-700">{stat.total}대</td>
                      <td className="p-3 text-center">{stat.hwado || '-'}</td>
                      <td className="p-3 text-center">{stat.jinjeop || '-'}</td>
                      <td className="p-3 text-center">{stat.hopyeong || '-'}</td>
                      <td className="p-3 text-center">{stat.wabu || '-'}</td>
                      <td className="p-3 text-center">{stat.byeolnae || '-'}</td>
                      <td className="p-3 text-center">{stat.dasan || '-'}</td>
                    </tr>
                  ))}
                  <tr className="bg-amber-50/70 font-bold text-slate-900 border-t-2 border-amber-200">
                    <td className="p-3">운행 현황 (총 29대)</td>
                    <td className="p-3 text-center text-amber-900 font-black">29대</td>
                    <td className="p-3 text-center">12대</td>
                    <td className="p-3 text-center">4대</td>
                    <td className="p-3 text-center">4대 (전기)</td>
                    <td className="p-3 text-center">2대</td>
                    <td className="p-3 text-center">5대</td>
                    <td className="p-3 text-center">2대</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 5. 공항버스 View */}
      {activeBusTab === 'airport' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">남양주시 운행 공항버스 현황</h3>
              <p className="text-xs text-slate-500">인천국제공항 직통 시외(공항)버스 노선 3개 노선</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {AIRPORT_BUSES.map((bus) => (
                <div key={bus.routeNumber} className="bg-teal-50/50 p-4 rounded-xl border border-teal-200 space-y-2">
                  <div className="flex justify-between items-center border-b border-teal-200 pb-2">
                    <span className="text-xl font-black text-teal-900 font-mono">{bus.routeNumber}번</span>
                    <span className="bg-teal-700 text-white text-[10px] px-2 py-0.5 rounded font-bold">
                      {bus.operator}
                    </span>
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="text-slate-700">
                      <span className="font-bold text-slate-900">{bus.origin}</span> → 인천공항
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      경유지: {bus.via}
                    </div>
                    <div className="flex justify-between text-teal-900 font-mono font-bold pt-2 border-t border-teal-100">
                      <span>운행거리 {bus.distanceKm}km</span>
                      <span>{bus.dailyTrips}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. 저상버스 View */}
      {activeBusTab === 'lowfloor' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3 flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900">저상버스 보급 현황 (총 52개 노선 212대)</h3>
                <p className="text-xs text-slate-500">2026. 6. 기준 (친환경 전기 저상버스 196대 포함)</p>
              </div>
              <span className="bg-emerald-100 text-emerald-900 font-mono text-xs font-bold px-3 py-1 rounded-full self-start md:self-auto">
                전기저상 196대 (92.5%)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 space-y-2">
                <h4 className="font-bold text-emerald-900 text-sm">일반시내버스 저상 (33개 노선 158대)</h4>
                <p className="text-xs text-emerald-800">
                  대원운수, 경기버스, 경기운수 운행. 전기저상 142대, CNG저상 16대 배치
                </p>
                <div className="bg-white p-2.5 rounded border border-emerald-200 text-xs font-mono">
                  주요 노선: 1번, 1-4번, 168번, 55번, 65번, 97번, 112-1번, 23번, 707번, 155번, 9번 등
                </div>
              </div>

              <div className="bg-teal-50 p-4 rounded-xl border border-teal-200 space-y-2">
                <h4 className="font-bold text-teal-900 text-sm">마을버스 저상 (19개 노선 54대)</h4>
                <p className="text-xs text-teal-800">
                  태산운수, 풍양운수, 와부버스, 덕소교통 등. 100% 전기 저상버스(54대) 도입
                </p>
                <div className="bg-white p-2.5 rounded border border-teal-200 text-xs font-mono">
                  주요 노선: 80번(10대), 82A/82B(12대), 풍양운수2번(9대), 48-1번 등
                </div>
              </div>
            </div>

            {/* Detailed Table */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-emerald-600" />
                  <span>남양주시 저상버스 52개 노선 전체 목록</span>
                </h4>
                <span className="text-xs text-slate-500 font-mono">총 212대</span>
              </div>

              <div className="overflow-x-auto max-h-[500px] scrollbar-thin border border-slate-200 rounded-lg">
                <table className="w-full text-left text-xs">
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
                  <tbody className="divide-y divide-slate-100">
                    {LOW_FLOOR_BUS_ROUTES.map((route, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition">
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
                      <td colSpan={4} className="p-2.5 text-center">총계 (52개 노선)</td>
                      <td className="p-2.5 text-right font-mono text-blue-900 font-extrabold">212대</td>
                      <td className="p-2.5 text-right font-mono text-blue-700 font-bold">196대</td>
                      <td className="p-2.5 text-right font-mono text-amber-700 font-bold">16대</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
