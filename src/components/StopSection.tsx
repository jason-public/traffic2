import React, { useState } from 'react';
import { BUS_STOP_SUMMARY, SMART_SHELTERS } from '../data/transitData';
import { MapPin, Search, Sparkles, Wifi, Wind, ShieldCheck, Sun, Info } from 'lucide-react';

export const StopSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('전체');

  const regions = ['전체', '호평동', '평내동', '진접읍', '별내면', '화도읍', '진건읍', '수동면', '다산동', '금곡동'];

  const filteredSmartShelters = SMART_SHELTERS.filter((shelter) => {
    const matchesRegion = regionFilter === '전체' || shelter.region.includes(regionFilter);
    const matchesSearch =
      shelter.stopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shelter.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shelter.stopNumber.includes(searchTerm);
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Overview Stats */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                16
              </span>
              <h3 className="font-bold text-slate-900 text-lg">버스정류장(승강장) 및 스마트 승강장 현황</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              남양주시 관내 총 1,913개 버스정류장 중 고급 편의시설을 갖춘 43개 스마트 승강장 구축 및 운영
            </p>
          </div>
          <div className="bg-teal-50 border border-teal-200 p-2.5 rounded-lg text-center shrink-0">
            <span className="text-[11px] text-teal-700 block font-medium">스마트 승강장 총계</span>
            <span className="text-xl font-black text-teal-900 font-mono">43 개소</span>
          </div>
        </div>

        {/* Breakdown Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
            <span className="text-xs text-slate-500 block">총 승강장</span>
            <span className="text-lg font-bold text-slate-900 font-mono">{BUS_STOP_SUMMARY.total.toLocaleString()}</span>
          </div>
          <div className="bg-blue-50/60 p-3 rounded-lg border border-blue-100 text-center">
            <span className="text-xs text-blue-700 block">쉘터형</span>
            <span className="text-lg font-bold text-blue-900 font-mono">{BUS_STOP_SUMMARY.shelterType.toLocaleString()}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
            <span className="text-xs text-slate-500 block">독립형 안내기</span>
            <span className="text-lg font-bold text-slate-900 font-mono">{BUS_STOP_SUMMARY.independentInfo}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
            <span className="text-xs text-slate-500 block">표지판</span>
            <span className="text-lg font-bold text-slate-900 font-mono">{BUS_STOP_SUMMARY.signpost}</span>
          </div>
          <div className="bg-teal-100/70 p-3 rounded-lg border border-teal-200 text-center">
            <span className="text-xs text-teal-800 block font-bold">스마트 승강장</span>
            <span className="text-lg font-black text-teal-900 font-mono">{BUS_STOP_SUMMARY.smartShelter}</span>
          </div>
        </div>
      </div>

      {/* Smart Shelter Facilities Card */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 text-white rounded-xl p-5 shadow-sm border border-teal-800/50 space-y-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-teal-300" />
          <h4 className="font-bold text-base text-white">남양주시 스마트 승강장 주요 편의 시설</h4>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-800/80 p-3 rounded-lg border border-teal-700/40 flex items-center space-x-2">
            <Wind className="w-4 h-4 text-teal-300 shrink-0" />
            <span>냉·난방기 및 공기정화 필터</span>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-lg border border-teal-700/40 flex items-center space-x-2">
            <Wifi className="w-4 h-4 text-blue-300 shrink-0" />
            <span>초고속 공공 Wi-Fi & 충전포트</span>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-lg border border-teal-700/40 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>CCTV & 비상벨 보안시스템</span>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-lg border border-teal-700/40 flex items-center space-x-2">
            <Sun className="w-4 h-4 text-amber-300 shrink-0" />
            <span>버스도착안내기(BIT) 및 조명</span>
          </div>
        </div>
      </div>

      {/* Smart Shelters Interactive Directory */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base">관내 스마트 승강장 상세 현황</h3>
            <p className="text-xs text-slate-500">정류장명, 정류장번호, 설치주소 및 설치시기 검색</p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {/* Search input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="정류장명, 번호, 주소 검색..."
                className="pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs w-full sm:w-60 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>

        {/* Region Chips */}
        <div className="flex overflow-x-auto gap-1.5 text-xs pb-1 no-scrollbar touch-scroll whitespace-nowrap">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setRegionFilter(region)}
              className={`px-3 py-1.5 sm:py-1 rounded-full transition font-medium shrink-0 active:scale-95 ${
                regionFilter === region
                  ? 'bg-teal-700 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Mobile scroll hint */}
        <div className="sm:hidden text-[10px] text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-200 text-center font-medium">
          ← 표를 좌우로 스크롤하여 전체 정보 확인 →
        </div>

        {/* Shelters Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-lg touch-scroll mobile-table-wrap">
          <table className="w-full text-left text-xs mobile-compact-table whitespace-nowrap">
            <thead className="bg-slate-800 text-white font-medium">
              <tr>
                <th className="p-2.5 sm:p-3">연번</th>
                <th className="p-2.5 sm:p-3">지역</th>
                <th className="p-2.5 sm:p-3">정류장 번호</th>
                <th className="p-2.5 sm:p-3">정류장명</th>
                <th className="p-2.5 sm:p-3">주소</th>
                <th className="p-2.5 sm:p-3 text-center">설치시기</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSmartShelters.map((shelter) => (
                <tr key={shelter.id} className="hover:bg-teal-50/40 transition">
                  <td className="p-2.5 sm:p-3 font-mono font-bold text-teal-700">{shelter.id}</td>
                  <td className="p-2.5 sm:p-3 font-semibold text-slate-700">{shelter.region}</td>
                  <td className="p-2.5 sm:p-3 font-mono text-slate-600">{shelter.stopNumber}</td>
                  <td className="p-2.5 sm:p-3 font-bold text-slate-900">{shelter.stopName}</td>
                  <td className="p-2.5 sm:p-3 text-slate-600">{shelter.address}</td>
                  <td className="p-2.5 sm:p-3 text-center font-mono text-slate-500">{shelter.installedYearMonth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSmartShelters.length === 0 && (
          <div className="text-center py-8 text-slate-500 text-xs">
            검색 결과와 일치하는 스마트 승강장이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};
