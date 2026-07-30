import React from 'react';
import { SectionType } from '../types';
import { LayoutDashboard, Compass, Construction, PieChart, Search } from 'lucide-react';

interface NavigationTabsProps {
  activeSection: SectionType;
  onSelectSection: (section: SectionType) => void;
  section1Count: number;
  section2Count: number;
  searchResultCount?: number;
  isSearching: boolean;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeSection,
  onSelectSection,
  section1Count,
  section2Count,
  searchResultCount,
  isSearching,
}) => {
  const tabs = [
    {
      id: 'dashboard' as SectionType,
      label: '종합 현황',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'section1' as SectionType,
      label: '1. 국도·국지도·지방도',
      sub: '순환 도로망 확충',
      icon: Compass,
      badge: `${section1Count}건`,
    },
    {
      id: 'section2' as SectionType,
      label: '2. 시군도·도시계획도로',
      sub: '도로 이용 편의 제공',
      icon: Construction,
      badge: `${section2Count}건`,
    },
    {
      id: 'section3' as SectionType,
      label: '3. 도로 일반 현황',
      sub: '도로망 및 농어촌 도로 통계',
      icon: PieChart,
      badge: '통계표',
    },
  ];

  return (
    <div className="bg-[#1e293b] border-b border-slate-800 shadow-sm print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2.5 scrollbar-none" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onSelectSection(tab.id)}
                className={`flex items-center space-x-2.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <div className="text-left">
                  <div className="leading-tight">{tab.label}</div>
                  {tab.sub && (
                    <div className={`text-[10px] font-normal ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                      {tab.sub}
                    </div>
                  )}
                </div>
                {tab.badge && (
                  <span
                    className={`ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive
                        ? 'bg-blue-700 text-white'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Search Result Tab if actively searching */}
          {isSearching && (
            <button
              onClick={() => onSelectSection('search')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeSection === 'search'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-amber-950/40 text-amber-300 border border-amber-800/60 hover:bg-amber-900/40'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>검색 결과</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-800 text-amber-100 text-[10px]">
                {searchResultCount}건
              </span>
            </button>
          )}
        </nav>
      </div>
    </div>
  );
};
