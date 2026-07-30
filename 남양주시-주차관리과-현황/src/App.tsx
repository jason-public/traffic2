/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Car,
  LayoutDashboard,
  ShieldAlert,
  Construction,
  FileText,
  Search,
  Activity,
  CheckCircle2,
  Clock,
  Layers,
  Menu,
  X
} from 'lucide-react';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { GeneralStatusTab } from './components/GeneralStatusTab';
import { OperationStatusTab } from './components/OperationStatusTab';
import { ProjectsStatusTab } from './components/ProjectsStatusTab';
import { OfficialDocumentView } from './components/OfficialDocumentView';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showDocView, setShowDocView] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <div className="flex h-screen w-full bg-[#F1F5F9] text-[#1E293B] font-sans overflow-hidden">
      {/* SIDE NAVIGATION (High Density Dark Sidebar) */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-[240px] bg-[#0F172A] text-white flex flex-col transition-transform duration-200 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-blue-400 text-lg">주차관리과</span>
            </div>
            <p className="text-[12px] text-slate-400 mt-0.5 uppercase tracking-wider font-semibold">
              2026.7월 기준
            </p>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-4 space-y-1">
          <div className="px-4 mb-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            Dashboards
          </div>

          <button
            onClick={() => {
              setActiveTab('overview');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center px-5 py-2.5 text-xs font-semibold transition-colors text-left ${
              activeTab === 'overview'
                ? 'bg-blue-600/15 border-r-4 border-blue-500 text-blue-400'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 mr-3" />
            실시간 통합 현황
          </button>

          <button
            onClick={() => {
              setActiveTab('general');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center px-5 py-2.5 text-xs font-semibold transition-colors text-left ${
              activeTab === 'general'
                ? 'bg-blue-600/15 border-r-4 border-blue-500 text-blue-400'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-4 h-4 mr-3" />
            주정차금지구역 (637)
          </button>

          <button
            onClick={() => {
              setActiveTab('operation');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center px-5 py-2.5 text-xs font-semibold transition-colors text-left ${
              activeTab === 'operation'
                ? 'bg-blue-600/15 border-r-4 border-blue-500 text-blue-400'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <Car className="w-4 h-4 mr-3" />
            공영주차장 운영 (84)
          </button>

          <div className="px-4 mt-6 mb-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            Projects
          </div>

          <button
            onClick={() => {
              setActiveTab('projects');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center px-5 py-2.5 text-xs font-semibold transition-colors text-left ${
              activeTab === 'projects'
                ? 'bg-blue-600/15 border-r-4 border-blue-500 text-blue-400'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <Construction className="w-4 h-4 mr-3" />
            조성 추진 현황 (7)
          </button>

          <div className="px-4 mt-6 mb-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            Quick Tools
          </div>

          <button
            onClick={() => {
              setShowDocView(true);
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center px-5 py-2.5 text-xs font-semibold text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors text-left"
          >
            <FileText className="w-4 h-4 mr-3 text-emerald-400" />
            현황 출력하기
          </button>
        </nav>

        {/* System Status Footprint */}
        <div className="p-4 bg-slate-900/80 border-t border-slate-800">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] text-slate-400 font-semibold">시스템 상태</span>
            <span className="flex items-center text-[10px] text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1.5"></span>
              ACTIVE
            </span>
          </div>
          <div className="text-[10px] text-slate-500 font-mono">LAST SYNC: 2026-07-29</div>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-30 md:hidden"
        />
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* HEADER */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 shrink-0 z-20 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                남양주시 주차관리과
              </h1>
              <span className="hidden sm:inline-block text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200 font-mono">
                교통도로국
              </span>
            </div>
          </div>

          {/* Search & Header Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative hidden sm:block w-48 md:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="지역구, 사업명 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 text-slate-800 text-xs rounded-lg pl-8 pr-3 py-1.5 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>

            <button
              onClick={() => setShowDocView(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 shadow-xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>현황 출력하기</span>
            </button>
          </div>
        </header>

        {/* CONTENT CANVAS */}
        <main className="flex-1 bg-[#F1F5F9] overflow-y-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {activeTab === 'overview' && (
              <ExecutiveSummary onNavigateTab={(tab) => setActiveTab(tab)} />
            )}

            {activeTab === 'general' && (
              <GeneralStatusTab searchTerm={searchTerm} />
            )}

            {activeTab === 'operation' && <OperationStatusTab />}

            {activeTab === 'projects' && (
              <ProjectsStatusTab searchTerm={searchTerm} />
            )}
          </div>
        </main>

        {/* FOOTER STATUS BAR */}
        <footer className="h-10 bg-slate-100 border-t border-slate-200 flex items-center px-4 sm:px-6 justify-between text-[11px] font-bold text-slate-600 uppercase shrink-0">
          <div className="flex space-x-4 sm:space-x-6 overflow-x-auto scrollbar-none py-1">
            <div className="flex items-center whitespace-nowrap">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-1.5"></span>
              주정차 단속망 연동 정상
            </div>
            <div className="flex items-center whitespace-nowrap">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-1.5"></span>
              공영주차장 서버 84/84 가동
            </div>
            <div className="flex items-center whitespace-nowrap">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-1.5"></span>
              조성사업 7건 트랙킹
            </div>
          </div>
        </footer>
      </div>

      {/* Modals */}
      {showDocView && <OfficialDocumentView onClose={() => setShowDocView(false)} />}
    </div>
  );
}


