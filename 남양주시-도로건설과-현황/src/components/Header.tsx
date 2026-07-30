import React from 'react';
import { Landmark, Printer, PlusCircle, Search, RefreshCw, ShieldAlert, FileText } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onOpenAddModal: () => void;
  onResetData: () => void;
  onPrint: () => void;
  totalProjectsCount: number;
  totalBudgetBillion: string;
}

export const Header: React.FC<HeaderProps> = ({
  searchTerm,
  onSearchChange,
  onOpenAddModal,
  onResetData,
  onPrint,
  totalProjectsCount,
  totalBudgetBillion,
}) => {
  return (
    <header className="bg-[#0f172a] text-slate-200 border-b border-slate-800 sticky top-0 z-30 shadow-md print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-900/30 shrink-0 border border-blue-400/20">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-slate-800 text-blue-400 text-[15px] font-semibold px-2 py-0.5 rounded-md border border-slate-700/60 tracking-wider">
                  도로건설과
                </span>
                <a
                  href="https://traffic-2026-7.vercel.app/"
                  className="bg-blue-600 hover:bg-blue-500 text-white text-[15px] font-semibold px-2 py-0.5 rounded-md border border-blue-500 tracking-wider transition-colors cursor-pointer"
                >
                  교통국 현황
                </a>
              </div>
            </div>
          </div>

          {/* Quick Actions & Search */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            
            {/* Buttons */}
            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-md shadow-blue-900/20 transition-all cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>신규 등록</span>
            </button>

            <button
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg border border-slate-700 transition-colors cursor-pointer"
              title="인쇄 및 PDF 저장"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">인쇄</span>
            </button>

            <button
              onClick={onResetData}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs rounded-lg border border-slate-700 transition-colors cursor-pointer"
              title="초기 데이터 원본 복원"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
