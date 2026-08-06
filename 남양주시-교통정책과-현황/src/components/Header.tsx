import React from 'react';
import { Bus, Train, ShieldAlert, Navigation, Search, Printer, MapPin, SlidersHorizontal, Sparkles } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedNeighborhood: string;
  setSelectedNeighborhood: (n: string) => void;
  neighborhoodList: string[];
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenReportPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  selectedNeighborhood,
  setSelectedNeighborhood,
  neighborhoodList,
  activeSection,
  setActiveSection,
  onOpenReportPrint,
}) => {
  const sections = [
    { id: 'all', label: '전체 현황' },
    { id: 'masterplan', label: '1. 철도상위계획' },
    { id: 'gtx-op', label: '2. GTX-B·운영개선' },
    { id: 'gtx-2nd', label: '3. 신규 2기 GTX' },
    { id: 'urban-metro', label: '4. 도시철도 현황' },
    { id: 'transit-hub', label: '5. 환승·BRT 확충' },
    { id: 'traffic-safety', label: '6. 교통시설·보호구역' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800 shadow-xl">
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 py-2.5 px-4 sm:px-6 lg:px-8 border-b border-blue-800/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center space-x-2.5">
            <span className="font-medium text-blue-100 flex items-center gap-1.5">
              <Train className="w-4 h-4 text-cyan-400" />
              남양주시 교통국 교통정책과
            </span>
          </div>

          <div className="flex items-center space-x-3 text-slate-300">
            <span className="hidden sm:inline text-slate-400">기준일: 2026년 7월 현황</span>
            <button
              onClick={onOpenReportPrint}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-blue-300 hover:text-white px-3 py-1 rounded-md transition-colors text-xs font-semibold border border-slate-700"
            >
              <Printer className="w-3.5 h-3.5" />
              보고서 출력 / PDF
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center shadow-md shadow-blue-500/20 border border-blue-400/30">
              <Navigation className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
                  교통정책과 현황
                </h1>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                철도망 상위계획 · GTX 노선 · 도시철도 운행 · 교통안전시설통합
              </p>
            </div>
          </div>

          {/* Search & Neighborhood Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {/* Neighborhood Filter */}
            <div className="relative min-w-[180px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-400">
                <MapPin className="w-4 h-4" />
              </div>
              <select
                value={selectedNeighborhood}
                onChange={(e) => setSelectedNeighborhood(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-slate-800/90 text-slate-100 text-xs sm:text-sm rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer font-medium"
              >
                {neighborhoodList.map((nh) => (
                  <option key={nh} value={nh} className="bg-slate-900 text-white">
                    {nh === '전체 (모든 지역)' ? '📍 우리 동네 선택 (전체)' : `📍 ${nh}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Keyword Search Input */}
            <div className="relative flex-1 sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="노선명, 역사, 사업비, 신호기 등 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-800/90 text-slate-100 placeholder-slate-400 text-xs sm:text-sm rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar pb-1">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-1 ring-blue-400/50'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                {sec.id === 'all' && <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
                {sec.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
