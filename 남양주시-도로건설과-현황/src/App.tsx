import React, { useState, useEffect, useMemo } from 'react';
import { ProjectItem, SectionType } from './types';
import { INITIAL_SECTION1_PROJECTS, INITIAL_SECTION2_PROJECTS } from './data/projectsData';
import { Header } from './components/Header';
import { NavigationTabs } from './components/NavigationTabs';
import { ProjectTable } from './components/ProjectTable';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ProjectAddEditModal } from './components/ProjectAddEditModal';
import { RoadGeneralStats } from './components/RoadGeneralStats';
import { DashboardOverview } from './components/DashboardOverview';
import { Search, Info, RotateCcw, ArrowUp } from 'lucide-react';

const STORAGE_KEY = 'namyangju_road_construction_projects_v2';

export default function App() {
  const [allProjects, setAllProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load from local storage', e);
    }
    return [...INITIAL_SECTION1_PROJECTS, ...INITIAL_SECTION2_PROJECTS];
  });

  const [activeSection, setActiveSection] = useState<SectionType>('dashboard');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  
  // Modals
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState<boolean>(false);

  // Monitor scroll position to show/hide floating button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync to local storage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allProjects));
    } catch (e) {
      console.error('Failed to save to local storage', e);
    }
  }, [allProjects]);

  // Derived filtered sections
  const section1Projects = useMemo(() => {
    return allProjects.filter((p) => p.section === 'section1');
  }, [allProjects]);

  const section2Projects = useMemo(() => {
    return allProjects.filter((p) => p.section === 'section2');
  }, [allProjects]);

  // Search Results
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const lower = searchTerm.toLowerCase();
    return allProjects.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.agency.toLowerCase().includes(lower) ||
        p.workload.toLowerCase().includes(lower) ||
        p.statusText.toLowerCase().includes(lower) ||
        p.futurePlan.toLowerCase().includes(lower) ||
        (p.region && p.region.toLowerCase().includes(lower)) ||
        (p.notes && p.notes.toLowerCase().includes(lower))
    );
  }, [allProjects, searchTerm]);

  // Switch tab if search term entered
  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    if (val.trim()) {
      setActiveSection('search');
    } else if (activeSection === 'search') {
      setActiveSection('dashboard');
    }
  };

  // Add / Edit Project handler
  const handleSaveProject = (projectToSave: ProjectItem) => {
    setAllProjects((prev) => {
      const existsIndex = prev.findIndex((p) => p.id === projectToSave.id);
      if (existsIndex >= 0) {
        const updated = [...prev];
        updated[existsIndex] = projectToSave;
        return updated;
      } else {
        return [projectToSave, ...prev];
      }
    });

    setIsAddEditModalOpen(false);
    setEditingProject(null);
    if (selectedProject?.id === projectToSave.id) {
      setSelectedProject(projectToSave);
    }
  };

  // Delete Project handler
  const handleDeleteProject = (id: string) => {
    if (window.confirm('정말로 이 도로 건설 사업을 삭제하시겠습니까?')) {
      setAllProjects((prev) => prev.filter((p) => p.id !== id));
      if (selectedProject?.id === id) {
        setSelectedProject(null);
      }
    }
  };

  // Reset Data to Original Document Default
  const handleResetData = () => {
    if (window.confirm('초기 도로건설과 시정보고서 원본 데이터로 복원하시겠습니까? (수정 내역이 초기화됩니다)')) {
      const defaultData = [...INITIAL_SECTION1_PROJECTS, ...INITIAL_SECTION2_PROJECTS];
      setAllProjects(defaultData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    }
  };

  // Print Handler
  const handlePrint = () => {
    window.print();
  };

  // KPI Calculations
  const totalProjectsCount = allProjects.length;
  const totalBudgetBillion = useMemo(() => {
    const sum = allProjects.reduce((acc, curr) => acc + (curr.costTotal || 0), 0);
    const trillion = Math.floor(sum / 1000000);
    const billion = Math.round((sum % 1000000) / 100);
    return `${trillion ? `${trillion}조 ` : ''}${billion.toLocaleString()}억 원`;
  }, [allProjects]);

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col antialiased">
      
      {/* Header Bar */}
      <Header
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onOpenAddModal={() => {
          setEditingProject(null);
          setIsAddEditModalOpen(true);
        }}
        onResetData={handleResetData}
        onPrint={handlePrint}
        totalProjectsCount={totalProjectsCount}
        totalBudgetBillion={totalBudgetBillion}
      />

      {/* Navigation Tabs */}
      <NavigationTabs
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        section1Count={section1Projects.length}
        section2Count={section2Projects.length}
        searchResultCount={searchResults.length}
        isSearching={!!searchTerm.trim()}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Print Official Header (Visible only when printing) */}
        <div className="hidden print:block mb-8 pb-4 border-b-2 border-slate-900 text-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-blue-900 uppercase tracking-widest">[공식 시정보고서] 남양주시 도로건설과</span>
              <h1 className="text-2xl font-extrabold mt-1">남양주시 도로 건설 및 유지보수 현황 보고서</h1>
              <p className="text-xs text-slate-600 mt-1">
                관할 국도·국지도·지방도, 시군도·도시계획도로 및 도로 일반 현황 집계 자료
              </p>
            </div>
            <div className="text-right text-xs text-slate-700 font-mono space-y-1">
              <p><strong className="text-slate-900">보고기관:</strong> 남양주시 도로건설과</p>
              <p><strong className="text-slate-900">기준일자:</strong> 2026년 07월 현재</p>
              <p><strong className="text-slate-900">총 사업수:</strong> {totalProjectsCount}건 ({totalBudgetBillion})</p>
            </div>
          </div>
        </div>
        {/* VIEW 1: Dashboard Overview */}
        {activeSection === 'dashboard' && (
          <DashboardOverview
            allProjects={allProjects}
            onNavigateToSection={setActiveSection}
            onSelectProject={setSelectedProject}
          />
        )}

        {/* VIEW 2: Section 1 - 국도·국지도·지방도 */}
        {activeSection === 'section1' && (
          <ProjectTable
            projects={section1Projects}
            sectionNumber="1"
            title="국도·국지도·지방도와 연계된 순환 도로망 확충"
            subtitle="광역 교통망 연결 및 주요 국지도·지방도 확포장 추진 현황"
            showSecuredUnsecured={false}
            onSelectProject={setSelectedProject}
            onEditProject={(p) => {
              setEditingProject(p);
              setIsAddEditModalOpen(true);
            }}
            onDeleteProject={handleDeleteProject}
          />
        )}

        {/* VIEW 3: Section 2 - 시군도·도시계획도로 */}
        {activeSection === 'section2' && (
          <ProjectTable
            projects={section2Projects}
            sectionNumber="2"
            title="시군도·도시계획도로 확충을 통한 도로 이용 편의 제공"
            subtitle="남양주시 주요 관내 시군도, 도시계획도로, 농어촌도로 개설 및 확포장 사업"
            showSecuredUnsecured={true}
            onSelectProject={setSelectedProject}
            onEditProject={(p) => {
              setEditingProject(p);
              setIsAddEditModalOpen(true);
            }}
            onDeleteProject={handleDeleteProject}
          />
        )}

        {/* VIEW 4: Section 3 - 도로 일반 현황 */}
        {activeSection === 'section3' && <RoadGeneralStats />}

        {/* VIEW 5: Search Results View */}
        {activeSection === 'search' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-800 font-bold">
                <Search className="w-5 h-5 text-blue-600" />
                <span>'{searchTerm}' 검색 결과 ({searchResults.length}건)</span>
              </div>
              <button
                onClick={() => handleSearchChange('')}
                className="text-xs text-blue-600 hover:underline cursor-pointer"
              >
                검색 초기화
              </button>
            </div>

            <ProjectTable
              projects={searchResults}
              title={`검색 키워드: "${searchTerm}"`}
              subtitle="검색어 조건에 해당하는 전체 도로 건설 사업 현황입니다."
              showSecuredUnsecured={true}
              onSelectProject={setSelectedProject}
              onEditProject={(p) => {
                setEditingProject(p);
                setIsAddEditModalOpen(true);
              }}
              onDeleteProject={handleDeleteProject}
            />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-6 text-xs mt-12 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-semibold text-slate-300">
              남양주시 도로건설과 사업 추진 현황 통합 정보 시스템
            </p>
            <p className="text-slate-500">
              본 시스템은 도로건설과 관할 국도·국지도·지방도 및 시군도·도시계획도로, 도로 일반 현황 공시 자료를 바탕으로 제작되었습니다.
            </p>
          </div>
          <div className="flex items-center space-x-4 text-slate-500 font-mono">
            <span>기준일자: 2026.07</span>
            <span>|</span>
            <span>시스템 버전 v2.0</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onEdit={(p) => {
          setSelectedProject(null);
          setEditingProject(p);
          setIsAddEditModalOpen(true);
        }}
      />

      <ProjectAddEditModal
        isOpen={isAddEditModalOpen}
        editingProject={editingProject}
        onClose={() => {
          setIsAddEditModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSaveProject}
      />

      {/* Floating Back-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-full shadow-lg shadow-blue-900/30 border border-blue-400/30 transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer print:hidden group"
          aria-label="맨 위로 이동"
          title="맨 위로 이동"
        >
          <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
        </button>
      )}

    </div>
  );
}
