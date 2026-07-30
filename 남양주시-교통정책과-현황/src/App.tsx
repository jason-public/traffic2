/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { KpiOverview } from './components/KpiOverview';
import { RailwayMasterPlanSection } from './components/RailwayMasterPlanSection';
import { GtxAndOperationSection } from './components/GtxAndOperationSection';
import { GtxPhase2Section } from './components/GtxPhase2Section';
import { UrbanMetroSection } from './components/UrbanMetroSection';
import { TransitHubSection } from './components/TransitHubSection';
import { TrafficSafetySection } from './components/TrafficSafetySection';
import { NeighborhoodSimulator } from './components/NeighborhoodSimulator';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ReportPrintModal } from './components/ReportPrintModal';

import {
  RAILWAY_PLANS,
  GTX_OPERATIONS,
  GTX_PHASE2,
  URBAN_METROS,
  TRANSIT_HUBS,
  SAFETY_FACILITY_SUMMARY,
  DISTRICT_FLOOR_SIGNALS,
  ALL_NEIGHBORHOODS,
} from './data/trafficData';
import { RailwayPlan, GtxOperationItem } from './types';
import { Navigation, Train, ShieldCheck, Bus, MapPin, Search } from 'lucide-react';

export default function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('전체 (모든 지역)');
  const [activeSection, setActiveSection] = useState<string>('all');

  const [selectedDetailItem, setSelectedDetailItem] = useState<RailwayPlan | GtxOperationItem | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  // Filter Railway Plans based on Search & Neighborhood
  const filteredRailwayPlans = useMemo(() => {
    return RAILWAY_PLANS.filter((plan) => {
      const matchesSearch =
        searchTerm === '' ||
        plan.lineName.includes(searchTerm) ||
        plan.route.includes(searchTerm) ||
        plan.expectedImpact.includes(searchTerm) ||
        plan.progress.includes(searchTerm);

      const matchesNeighborhood =
        selectedNeighborhood === '전체 (모든 지역)' ||
        plan.affectedNeighborhoods.some((n) =>
          selectedNeighborhood.includes(n) || n.includes(selectedNeighborhood.replace(/\(.*\)/, ''))
        );

      return matchesSearch && matchesNeighborhood;
    });
  }, [searchTerm, selectedNeighborhood]);

  // Filter GTX Operations
  const filteredGtxOps = useMemo(() => {
    return GTX_OPERATIONS.filter((item) => {
      const matchesSearch =
        searchTerm === '' ||
        item.name.includes(searchTerm) ||
        item.route.includes(searchTerm) ||
        item.impact.includes(searchTerm) ||
        item.progress.includes(searchTerm);

      const matchesNeighborhood =
        selectedNeighborhood === '전체 (모든 지역)' ||
        item.affectedNeighborhoods.some((n) =>
          selectedNeighborhood.includes(n) || n.includes(selectedNeighborhood.replace(/\(.*\)/, ''))
        );

      return matchesSearch && matchesNeighborhood;
    });
  }, [searchTerm, selectedNeighborhood]);

  // Filter GTX Phase 2
  const filteredGtxPhase2 = useMemo(() => {
    return GTX_PHASE2.filter((item) => {
      const matchesSearch =
        searchTerm === '' ||
        item.line.includes(searchTerm) ||
        item.route.includes(searchTerm) ||
        item.impact.includes(searchTerm);

      const matchesNeighborhood =
        selectedNeighborhood === '전체 (모든 지역)' ||
        item.affectedNeighborhoods.some((n) =>
          selectedNeighborhood.includes(n) || n.includes(selectedNeighborhood.replace(/\(.*\)/, ''))
        );

      return matchesSearch && matchesNeighborhood;
    });
  }, [searchTerm, selectedNeighborhood]);

  // Filter Transit Hubs
  const filteredTransitHubs = useMemo(() => {
    return TRANSIT_HUBS.filter((item) => {
      const matchesSearch =
        searchTerm === '' ||
        item.projectName.includes(searchTerm) ||
        item.category.includes(searchTerm) ||
        item.implementingEntity.includes(searchTerm);

      const matchesNeighborhood =
        selectedNeighborhood === '전체 (모든 지역)' ||
        item.affectedNeighborhoods.some((n) =>
          selectedNeighborhood.includes(n) || n.includes(selectedNeighborhood.replace(/\(.*\)/, ''))
        );

      return matchesSearch && matchesNeighborhood;
    });
  }, [searchTerm, selectedNeighborhood]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans selection:bg-blue-500 selection:text-white pb-16">
      {/* Sticky Header */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedNeighborhood={selectedNeighborhood}
        setSelectedNeighborhood={setSelectedNeighborhood}
        neighborhoodList={ALL_NEIGHBORHOODS}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenReportPrint={() => setIsReportModalOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* KPI Overview Grid - Only shown on '전체현황' tab */}
        {activeSection === 'all' && <KpiOverview />}

        {/* Neighborhood Custom Report Banner if filter applied */}
        <NeighborhoodSimulator
          selectedNeighborhood={selectedNeighborhood}
          onResetNeighborhood={() => setSelectedNeighborhood('전체 (모든 지역)')}
        />

        {/* Search Active Notification Bar */}
        {searchTerm && (
          <div className="mb-6 bg-blue-50 text-blue-900 p-3.5 rounded-xl border border-blue-200 text-xs sm:text-sm flex items-center justify-between">
            <div className="flex items-center gap-2 font-medium">
              <Search className="w-4 h-4 text-blue-600" />
              <span>
                '<strong>{searchTerm}</strong>' 검색 결과: 철도계획 {filteredRailwayPlans.length}건, GTX{' '}
                {filteredGtxOps.length + filteredGtxPhase2.length}건, 환승시설 {filteredTransitHubs.length}건
              </span>
            </div>
            <button
              onClick={() => setSearchTerm('')}
              className="text-blue-700 underline font-bold hover:text-blue-900"
            >
              검색 초기화
            </button>
          </div>
        )}

        {/* Section 1: 철도사업 상위계획 */}
        {(activeSection === 'all' || activeSection === 'masterplan') && (
          <RailwayMasterPlanSection
            plans={filteredRailwayPlans}
            onSelectPlan={(plan) => setSelectedDetailItem(plan)}
          />
        )}

        {/* Section 2: GTX-B & 철도운영 개선 */}
        {(activeSection === 'all' || activeSection === 'gtx-op') && (
          <GtxAndOperationSection
            items={filteredGtxOps}
            onSelectItem={(item) => setSelectedDetailItem(item)}
          />
        )}

        {/* Section 3: 신규 2기 GTX */}
        {(activeSection === 'all' || activeSection === 'gtx-2nd') && (
          <GtxPhase2Section lines={filteredGtxPhase2} />
        )}

        {/* Section 4: 도시철도 (진접선, 별내선) */}
        {(activeSection === 'all' || activeSection === 'urban-metro') && (
          <UrbanMetroSection metros={URBAN_METROS} />
        )}

        {/* Section 5: 철도 환승 및 대중교통 */}
        {(activeSection === 'all' || activeSection === 'transit-hub') && (
          <TransitHubSection hubs={filteredTransitHubs} />
        )}

        {/* Section 6: 어린이보호구역 및 교통안전 시설 */}
        {(activeSection === 'all' || activeSection === 'traffic-safety') && (
          <TrafficSafetySection
            summary={SAFETY_FACILITY_SUMMARY}
            floorSignals={DISTRICT_FLOOR_SIGNALS}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
              남
            </div>
            <div>
              <p className="font-bold text-slate-800">남양주시 교통국 교통정책과 대시보드</p>
              <p className="text-[11px] text-slate-500">
                4차 국가철도망 구축계획 · 4차 대도시권 광역교통시행계획 · 2기 GTX · 교통안전시설
              </p>
            </div>
          </div>

          <div className="text-center md:text-right text-[11px] text-slate-400 space-y-0.5">
            <p>기준일: 2026년 7월 현황 | 남양주시청 교통정책과</p>
            <p>© Namyangju City Department of Transportation. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProjectDetailModal
        selectedItem={selectedDetailItem}
        onClose={() => setSelectedDetailItem(null)}
      />

      <ReportPrintModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
}
