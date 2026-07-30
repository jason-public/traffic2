import React, { useState } from 'react';
import { TabType } from './types';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { OverviewSection } from './components/OverviewSection';
import { BusSection } from './components/BusSection';
import { StopSection } from './components/StopSection';
import { TaxiSection } from './components/TaxiSection';
import { OperatorSection } from './components/OperatorSection';
import { PolicySection } from './components/PolicySection';
import { SearchSection } from './components/SearchSection';
import { AiAssistant } from './components/AiAssistant';
import { ScrollToTopButton } from './components/ScrollToTopButton';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [busSubTab, setBusSubTab] = useState<'express' | 'thankyou' | 'mbus' | 'double' | 'airport' | 'lowfloor'>('express');

  const handleTabChange = (
    tab: TabType,
    subTab?: 'express' | 'thankyou' | 'mbus' | 'double' | 'airport' | 'lowfloor'
  ) => {
    setActiveTab(tab);
    if (subTab) {
      setBusSubTab(subTab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col selection:bg-emerald-200 selection:text-slate-900">
      {/* Top Sticky Header */}
      <Header activeTab={activeTab} setActiveTab={handleTabChange} onPrint={handlePrint} />

      {/* Main Tab Bar */}
      <Navigation activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Main Container Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-12 sm:pb-16">
        {activeTab === 'overview' && <OverviewSection onSelectTab={handleTabChange} />}
        {activeTab === 'bus' && <BusSection initialSubTab={busSubTab} />}
        {activeTab === 'stops' && <StopSection />}
        {activeTab === 'taxi' && <TaxiSection />}
        {activeTab === 'operators' && <OperatorSection />}
        {activeTab === 'policy' && <PolicySection />}
        {activeTab === 'search' && <SearchSection />}
        {activeTab === 'ai' && <AiAssistant />}
      </main>

      {/* Official Municipal Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-6 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
            <p>© 2026 Namyangju City Public Transit Department. All Rights Reserved.</p>
            <div className="flex items-center space-x-4">
              <span className="hover:text-white cursor-pointer transition">개인정보 처리방침</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer transition">저작권 보호정책</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer transition">대중교통 민원안내</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Scroll To Top Button */}
      <ScrollToTopButton />
    </div>
  );
}
