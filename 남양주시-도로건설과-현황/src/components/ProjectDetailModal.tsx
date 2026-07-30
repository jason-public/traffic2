import React from 'react';
import { ProjectItem } from '../types';
import { X, Calendar, MapPin, Building2, Coins, Milestone, CheckCircle2, AlertCircle, Edit3 } from 'lucide-react';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onEdit: (project: ProjectItem) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onEdit,
}) => {
  if (!project) return null;

  const formatCost = (cost?: number) => {
    if (cost === undefined || cost === null) return '-';
    return cost.toLocaleString() + ' 백만원';
  };

  const formatCostInEok = (cost?: number) => {
    if (!cost) return '';
    const eok = Math.floor(cost / 100);
    const remainder = cost % 100;
    if (eok === 0) return `(${cost}백만원)`;
    if (remainder === 0) return `(약 ${eok}억원)`;
    return `(약 ${eok}억 ${remainder}백만원)`;
  };

  const getStatusBadge = (cat: string) => {
    switch (cat) {
      case '공사준공':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case '공사중':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case '실시설계중':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case '보상협의중':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case '행정절차중':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case '발주준비중':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in print:hidden">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-start justify-between border-b border-slate-800">
          <div className="space-y-1 pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-blue-600 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded">
                {project.categoryName}
              </span>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded border ${getStatusBadge(project.statusCategory)}`}>
                {project.statusCategory}
              </span>
              {project.region && (
                <span className="text-slate-300 text-xs flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded">
                  <MapPin className="w-3 h-3 text-red-400" />
                  {project.region}
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight pt-1">
              {project.name}
            </h2>
          </div>
          
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-slate-800 text-sm">

          {/* Key Quick Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs text-slate-500 font-medium">시행주체</div>
                <div className="font-semibold text-slate-900 mt-0.5">{project.agency}</div>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 flex items-start gap-3">
              <Milestone className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs text-slate-500 font-medium">사업량 (규모)</div>
                <div className="font-semibold text-slate-900 mt-0.5">{project.workload}</div>
              </div>
            </div>

          </div>

          {/* Budget Info Panel */}
          <div className="bg-blue-50/70 rounded-xl p-4 border border-blue-100 space-y-3">
            <div className="flex items-center justify-between border-b border-blue-200/60 pb-2">
              <div className="flex items-center space-x-2 text-blue-900 font-bold text-base">
                <Coins className="w-5 h-5 text-blue-700" />
                <span>사업비 현황</span>
              </div>
              <div className="text-right font-extrabold text-blue-950 text-base">
                {formatCost(project.costTotal)}
                <span className="text-xs font-normal text-blue-700 ml-1.5">
                  {formatCostInEok(project.costTotal)}
                </span>
              </div>
            </div>

            {/* Secured / Unsecured breakdown if available */}
            {(project.costSecured !== undefined || project.costUnsecured !== undefined) ? (
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-2xs">
                  <span className="text-xs text-slate-500 font-medium">확보액</span>
                  <div className="text-sm font-bold text-emerald-600 mt-0.5">
                    {formatCost(project.costSecured)}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {project.costTotal ? `${Math.round(((project.costSecured || 0) / project.costTotal) * 100)}% 확보` : ''}
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-2xs">
                  <span className="text-xs text-slate-500 font-medium">미확보액</span>
                  <div className="text-sm font-bold text-rose-600 mt-0.5">
                    {formatCost(project.costUnsecured)}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {project.costTotal ? `${Math.round(((project.costUnsecured || 0) / project.costTotal) * 100)}% 미확보` : ''}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-600">
                * 국비/도비 및 중앙기관 통합 예산 집행 사업
              </p>
            )}
          </div>

          {/* Progress Bar if percentage available */}
          {project.progressPercent !== undefined && (
            <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-700">진행률 (공정률/보상률)</span>
                <span className="text-blue-700 font-bold">{project.progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${Math.min(100, Math.max(0, project.progressPercent))}%` }}
                />
              </div>
            </div>
          )}

          {/* Timeline of Status and Future Plans */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 border-b pb-2 flex items-center gap-2 text-base">
              <Calendar className="w-4 h-4 text-slate-600" />
              <span>추진 및 향후 일정</span>
            </h3>

            <div className="space-y-3 relative pl-6 border-l-2 border-slate-200 ml-2">
              
              {/* Current Status */}
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-blue-600 border-2 border-white ring-2 ring-blue-100 flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
                <div className="text-xs font-bold text-blue-900">현재 추진 현황</div>
                <div className="text-sm font-medium text-slate-800 mt-1 bg-slate-50 p-2.5 rounded border border-slate-200">
                  {project.statusText}
                </div>
              </div>

              {/* Future Plan */}
              <div className="relative pt-2">
                <div className="absolute -left-[31px] top-2.5 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white ring-2 ring-emerald-100 flex items-center justify-center">
                  <Milestone className="w-3 h-3 text-white" />
                </div>
                <div className="text-xs font-bold text-emerald-900">향후 계획</div>
                <div className="text-sm font-medium text-slate-800 mt-1 bg-emerald-50/60 p-2.5 rounded border border-emerald-100">
                  {project.futurePlan}
                </div>
              </div>

            </div>
          </div>

          {/* Notes if present */}
          {project.notes && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold mr-1">[비고/참고사항]:</span>
                {project.notes}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              onEdit(project);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-medium text-xs transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>정보 수정</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium text-xs transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
