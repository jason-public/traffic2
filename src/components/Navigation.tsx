import React, { useRef, useEffect, useState } from 'react';
import { TabType } from '../types';
import { BarChart3, Bus, MapPin, Car, Building2, CreditCard, Bot, Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const tabs: { id: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: '종합 현황', icon: <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> },
    { id: 'bus', label: '버스 운행 현황', icon: <Bus className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> },
    { id: 'stops', label: '정류장 & 스마트승강장', icon: <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> },
    { id: 'taxi', label: '택시 & 승차대 현황', icon: <Car className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> },
    { id: 'operators', label: '운수업체 현황', icon: <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> },
    { id: 'policy', label: '대중교통비 지원정책', icon: <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> },
    { id: 'ai', label: 'AI 정책 도우미', icon: <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 shrink-0" /> },
    { id: 'search', label: '통합 검색', icon: <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" /> },
  ];

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
    checkScroll();
  }, [activeTab]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -180 : 180;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-md text-white">
      <div className="max-w-7xl mx-auto px-1 sm:px-6 relative flex items-center">
        {/* Left Scroll Button / Fade Gradient */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent pr-4 pl-1">
            <button
              onClick={() => scroll('left')}
              aria-label="이전 탭"
              className="w-6 h-6 rounded-full bg-slate-800/90 text-slate-200 border border-slate-700 flex items-center justify-center shadow-md active:scale-95"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Scrollable Tab List */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex space-x-1 sm:space-x-1.5 overflow-x-auto py-2 px-1.5 no-scrollbar touch-scroll scroll-smooth w-full"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                ref={isActive ? activeTabRef : null}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 shrink-0 active:scale-95 min-h-[36px] ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs font-bold ring-1 ring-blue-400/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80 active:bg-slate-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-blue-900/60 text-blue-100' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Scroll Button / Fade Gradient */}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 z-10 flex items-center bg-gradient-to-l from-slate-900 via-slate-900/90 to-transparent pl-4 pr-1">
            <button
              onClick={() => scroll('right')}
              aria-label="다음 탭"
              className="w-6 h-6 rounded-full bg-slate-800/90 text-slate-200 border border-slate-700 flex items-center justify-center shadow-md active:scale-95"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
