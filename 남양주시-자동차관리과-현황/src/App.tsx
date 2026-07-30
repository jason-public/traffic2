import { useState } from 'react';
import { LayoutDashboard, CarFront, Bike, Car, Truck, Warehouse, Menu, X, Search, ChevronDown, ChevronRight } from 'lucide-react';
import AutoManagement from './components/AutoManagement';
import Scooters from './components/Scooters';
import CarRegistration from './components/CarRegistration';
import CargoRegistration from './components/CargoRegistration';
import Logistics from './components/Logistics';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SubItem {
  id: string;
  title: string;
}

interface Category {
  id: string;
  title: string;
  icon: any;
  component: any;
  subItems?: SubItem[];
}

const CATEGORIES: Category[] = [
  { 
    id: '1', 
    title: '1. 자동차 관리사업 현황', 
    icon: CarFront, 
    component: AutoManagement,
    subItems: [
      { id: 'comprehensive', title: '1) 자동차정비업(종합)' },
      { id: 'small', title: '2) 자동차정비업(소형)' },
      { id: 'sales', title: '3) 자동차매매업' },
      { id: 'dismantle', title: '4) 자동차해체재활용업' },
    ]
  },
  { 
    id: '2', 
    title: '2. 전동킥보드 업체현황', 
    icon: Bike, 
    component: Scooters 
  },
  { 
    id: '3', 
    title: '3. 자동차 등록 현황', 
    icon: Car, 
    component: CarRegistration,
    subItems: [
      { id: 'type', title: '1) 차종별 등록현황' },
      { id: 'eco', title: '2) 친환경 자동차 등록현황' },
      { id: 'use', title: '3) 용도별 등록현황' },
    ]
  },
  { 
    id: '4', 
    title: '4. 화물자동차 등록 현황', 
    icon: Truck, 
    component: CargoRegistration 
  },
  { 
    id: '5', 
    title: '5. 물류창고업 등록 현황', 
    icon: Warehouse, 
    component: Logistics 
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0].id);
  const [activeSubTab, setActiveSubTab] = useState<string>('comprehensive');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const activeCategoryObj = CATEGORIES.find(c => c.id === activeTab) || CATEGORIES[0];
  const ActiveComponent = activeCategoryObj.component;

  const handleCategorySelect = (categoryId: string, defaultSubTab?: string) => {
    setActiveTab(categoryId);
    const cat = CATEGORIES.find(c => c.id === categoryId);
    if (defaultSubTab) {
      setActiveSubTab(defaultSubTab);
    } else if (cat?.subItems && cat.subItems.length > 0) {
      setActiveSubTab(cat.subItems[0].id);
    } else {
      setActiveSubTab('');
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 text-slate-900 overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-[280px] bg-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex-shrink-0 flex flex-col",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 pb-4">
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center justify-between">
            자동차관리과
            <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">2026.7월 기준</p>
        </div>
        
        <nav className="mt-2 flex-1 overflow-y-auto px-3">
          <div className="space-y-1">
            {CATEGORIES.map((category) => {
              const isActive = activeTab === category.id;
              
              return (
                <div key={category.id} className="space-y-0.5">
                  <button
                    onClick={() => {
                      handleCategorySelect(category.id);
                      if (!category.subItems) {
                        setIsSidebarOpen(false);
                      }
                    }}
                    className={cn(
                      "w-full flex items-center justify-between px-3.5 py-2.5 text-sm rounded-lg text-left transition-all duration-200",
                      isActive 
                        ? "bg-blue-600/20 text-blue-400 font-semibold" 
                        : "text-slate-300 hover:bg-slate-800 hover:text-white font-medium"
                    )}
                  >
                    <span className="truncate">{category.title}</span>
                    {category.subItems && (
                      isActive ? <ChevronDown className="w-4 h-4 shrink-0 text-blue-400" /> : <ChevronRight className="w-4 h-4 shrink-0 text-slate-500" />
                    )}
                  </button>

                  {/* Render SubItems if expanded */}
                  {category.subItems && isActive && (
                    <div className="pl-4 pr-1 py-1 space-y-1 border-l-2 border-blue-500/30 ml-3">
                      {category.subItems.map((sub) => {
                        const isSubActive = activeSubTab === sub.id;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => {
                              handleCategorySelect(category.id, sub.id);
                              setIsSidebarOpen(false);
                            }}
                            className={cn(
                              "w-full flex items-center text-xs py-1.5 px-3 rounded-md text-left transition-colors",
                              isSubActive 
                                ? "bg-blue-600 text-white font-semibold shadow-sm" 
                                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                            )}
                          >
                            {sub.title}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        <div className="mt-auto p-5 bg-slate-950">
          <div className="text-[11px] font-semibold text-slate-500 uppercase mb-1.5">System Status</div>
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Database Synced
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        <header className="flex justify-between items-center px-3.5 sm:px-6 py-3 sm:py-4 shrink-0 bg-white border-b border-slate-200">
          <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
            <button 
              className="lg:hidden p-2 -ml-1 text-slate-600 hover:bg-slate-100 active:bg-slate-200 rounded-lg shrink-0"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="메뉴 열기"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div className="flex items-center gap-2 min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-slate-800 truncate">{activeCategoryObj.title}</h2>
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="text-right hidden sm:block">
              <p className="text-[11px] text-slate-400 uppercase tracking-wider">Last Updated</p>
              <p className="text-xs font-semibold text-slate-700">2026.07.28 14:30</p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-3 sm:p-6 bg-slate-50/80">
          <div className="max-w-7xl mx-auto space-y-3 sm:space-y-4">
            <ActiveComponent 
              activeSubTab={activeSubTab} 
              onSubTabChange={(sub: string) => setActiveSubTab(sub)} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}

