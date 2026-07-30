import React from 'react';
import { Bus, Search } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  onPrint?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 shadow-sm">
      {/* Top Banner Bar */}
      <div className="bg-slate-950/80 text-xs px-3 sm:px-8 py-1.5 flex flex-wrap justify-between items-center text-slate-300 border-b border-slate-800/60 font-medium">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <span className="bg-blue-600/30 text-blue-300 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wider border border-blue-500/30">
            남양주시 대중교통과
          </span>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-900/40 shrink-0 font-bold">
            <Bus className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white truncate">
                남양주시 대중교통 현황
              </h1>
              <span className="bg-blue-500/20 text-blue-300 text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-0.5 rounded-full border border-blue-500/30 font-semibold whitespace-nowrap">
                기준일자: 2026년 7월 현황
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center space-x-2 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('search')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${
              activeTab === 'search'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>통합 검색</span>
          </button>
        </div>
      </div>

    </header>
  );
};
