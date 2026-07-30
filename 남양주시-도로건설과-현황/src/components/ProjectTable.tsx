import React, { useState, useMemo } from 'react';
import { ProjectItem, StatusCategory } from '../types';
import { 
  Building2, 
  MapPin, 
  ChevronRight, 
  ArrowUpDown, 
  Info,
  CheckCircle2,
  Clock,
  FileText,
  FileSpreadsheet,
  Trash2,
  Edit
} from 'lucide-react';

interface ProjectTableProps {
  projects: ProjectItem[];
  title: string;
  subtitle?: string;
  sectionNumber?: string;
  showSecuredUnsecured?: boolean;
  onSelectProject: (project: ProjectItem) => void;
  onEditProject: (project: ProjectItem) => void;
  onDeleteProject: (id: string) => void;
}

export const ProjectTable: React.FC<ProjectTableProps> = ({
  projects,
  title,
  subtitle,
  sectionNumber,
  showSecuredUnsecured = true,
  onSelectProject,
  onEditProject,
  onDeleteProject,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [regionFilter, setRegionFilter] = useState<string>('ALL');
  const [sortField, setSortField] = useState<'costTotal' | 'name' | 'statusCategory'>('costTotal');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Extract unique regions for filter dropdown
  const uniqueRegions = useMemo(() => {
    const regions = new Set<string>();
    projects.forEach((p) => {
      if (p.region) {
        p.region.split('/').forEach((r) => {
          const trimmed = r.trim();
          if (trimmed) regions.add(trimmed);
        });
      }
    });
    return Array.from(regions).sort();
  }, [projects]);

  // Filter & Sort Logic
  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) => {
        if (statusFilter !== 'ALL' && p.statusCategory !== statusFilter) {
          return false;
        }
        if (regionFilter !== 'ALL') {
          if (!p.region || !p.region.includes(regionFilter)) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        let valA: any = a[sortField];
        let valB: any = b[sortField];

        if (sortField === 'costTotal') {
          valA = a.costTotal || 0;
          valB = b.costTotal || 0;
        }

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [projects, statusFilter, regionFilter, sortField, sortOrder]);

  // Total cost calculation for filtered set
  const totalCostFiltered = useMemo(() => {
    return filteredProjects.reduce((sum, p) => sum + (p.costTotal || 0), 0);
  }, [filteredProjects]);

  const toggleSort = (field: 'costTotal' | 'name' | 'statusCategory') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const formatMoney = (val?: number) => {
    if (val === undefined || val === null) return '-';
    return val.toLocaleString();
  };

  const getStatusBadgeClass = (status: StatusCategory) => {
    switch (status) {
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
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const exportCSV = () => {
    const headers = ['사업명', '시행주체', '사업량', '사업비(백만원)', '확보액', '미확보액', '추진현황', '향후계획', '비고'];
    const rows = filteredProjects.map(p => [
      `"${p.name}"`,
      `"${p.agency}"`,
      `"${p.workload}"`,
      p.costTotal,
      p.costSecured || '',
      p.costUnsecured || '',
      `"${p.statusText}"`,
      `"${p.futurePlan}"`,
      `"${p.notes || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${title.replace(/\s+/g, '_')}_사업현황.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
      
      {/* Title Header Bar */}
      <div className="bg-slate-900 text-white p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-400 font-bold text-[11px] tracking-wider uppercase mb-1">
            {sectionNumber && (
              <span className="w-5 h-5 bg-blue-600 text-white rounded-md flex items-center justify-center font-bold text-xs">
                {sectionNumber}
              </span>
            )}
            <span>남양주시 도로건설과 핵심 사업 현황</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            {title}
          </h2>
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        </div>

        {/* Quick Summary Chips */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="bg-slate-800 px-3.5 py-1.5 rounded-xl border border-slate-700/80 text-xs">
            <span className="text-slate-400 mr-1.5">총 사업수:</span>
            <span className="font-bold text-white">{filteredProjects.length}건</span>
            <span className="text-slate-400 text-[10px] ml-1">({projects.length}건 중)</span>
          </div>

          <div className="bg-slate-800 px-3.5 py-1.5 rounded-xl border border-slate-700/80 text-xs">
            <span className="text-slate-400 mr-1.5">합계 사업비:</span>
            <span className="font-bold text-emerald-400">{formatMoney(totalCostFiltered)} 백만원</span>
          </div>

          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold cursor-pointer transition-all shadow-sm print:hidden"
            title="엑셀/CSV로 다운로드"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CSV 내보내기</span>
          </button>
        </div>
      </div>

      {/* Filter and Control Toolbar */}
      <div className="p-4 bg-slate-50/80 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs print:hidden">
        
        {/* Status Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px] mr-1">상태 필터:</span>
          {[
            { id: 'ALL', label: '전체' },
            { id: '공사중', label: '공사중' },
            { id: '실시설계중', label: '실시설계' },
            { id: '보상협의중', label: '보상협의' },
            { id: '행정절차중', label: '행정절차' },
            { id: '발주준비중', label: '발주준비' },
            { id: '공사준공', label: '준공완료' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setStatusFilter(item.id)}
              className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                statusFilter === item.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Region Filter Dropdown & Sort */}
        <div className="flex items-center gap-3">
          {uniqueRegions.length > 0 && (
            <div className="flex items-center space-x-1.5">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">지역:</span>
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="bg-white border border-slate-200 text-slate-800 rounded-lg px-2.5 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="ALL">전체 지역</option>
                {uniqueRegions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-center space-x-1">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">정렬:</span>
            <button
              onClick={() => toggleSort('costTotal')}
              className={`px-2.5 py-1 rounded-lg border flex items-center gap-1 cursor-pointer transition-colors ${
                sortField === 'costTotal' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>사업비</span>
              <ArrowUpDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-white text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 sticky top-0 z-10">
              <th className="px-6 py-4 w-12 text-center">NO</th>
              <th className="px-6 py-4 min-w-[200px]">
                <button
                  onClick={() => toggleSort('name')}
                  className="flex items-center gap-1 hover:text-slate-700 font-bold uppercase tracking-wider"
                >
                  <span>사업명</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-4 min-w-[120px]">시행주체</th>
              <th className="px-6 py-4 min-w-[130px]">사업량</th>
              <th className="px-6 py-4 min-w-[140px] text-right">
                <button
                  onClick={() => toggleSort('costTotal')}
                  className="flex items-center justify-end gap-1 hover:text-slate-700 font-bold uppercase tracking-wider w-full"
                >
                  <span>사업비(백만원)</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-4 min-w-[180px]">
                <button
                  onClick={() => toggleSort('statusCategory')}
                  className="flex items-center gap-1 hover:text-slate-700 font-bold uppercase tracking-wider"
                >
                  <span>추진현황 / 공정률</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-4 min-w-[180px]">향후계획</th>
              {showSecuredUnsecured && (
                <th className="px-6 py-4 min-w-[90px]">비고</th>
              )}
              <th className="px-4 py-4 w-16 text-center print:hidden">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Info className="w-8 h-8 text-slate-300" />
                    <p className="text-sm font-medium">검색 조건에 일치하는 사업이 없습니다.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredProjects.map((item, idx) => (
                <tr
                  key={item.id}
                  onClick={() => onSelectProject(item)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  {/* Number */}
                  <td className="px-6 py-4 text-center font-mono text-slate-400">
                    {idx + 1}
                  </td>

                  {/* Name */}
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </div>
                    {item.region && (
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{item.region}</span>
                      </div>
                    )}
                  </td>

                  {/* Agency */}
                  <td className="px-6 py-4 text-slate-600 text-xs">
                    {item.agency}
                  </td>

                  {/* Workload */}
                  <td className="px-6 py-4 font-mono text-xs text-slate-700">
                    {item.workload}
                  </td>

                  {/* Cost */}
                  <td className="px-6 py-4 text-right font-mono">
                    <div className="font-bold text-slate-900">
                      {formatMoney(item.costTotal)}
                    </div>
                    {showSecuredUnsecured && (item.costSecured !== undefined || item.costUnsecured !== undefined) && (
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        <span className="text-emerald-600 font-semibold">{formatMoney(item.costSecured)}</span>
                        <span className="mx-1 text-slate-300">/</span>
                        <span className="text-rose-500">{formatMoney(item.costUnsecured)}</span>
                      </div>
                    )}
                  </td>

                  {/* Status & Progress Bar */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeClass(item.statusCategory)}`}>
                        {item.statusCategory}
                      </span>
                    </div>
                    <div className="text-xs text-slate-700 font-medium">
                      {item.statusText}
                    </div>

                    {/* Progress Bar */}
                    {item.progressPercent !== undefined && (
                      <div className="mt-2 flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(100, Math.max(0, item.progressPercent))}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-bold text-slate-700 w-8">{item.progressPercent}%</span>
                      </div>
                    )}
                  </td>

                  {/* Future Plan */}
                  <td className="px-6 py-4 text-xs text-slate-500">
                    {item.futurePlan}
                  </td>

                  {/* Notes */}
                  {showSecuredUnsecured && (
                    <td className="px-6 py-4 text-xs text-amber-800 font-medium">
                      {item.notes || '-'}
                    </td>
                  )}

                  {/* Management Actions */}
                  <td className="px-4 py-4 text-center print:hidden" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center space-x-1">
                      <button
                        onClick={() => onEditProject(item)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors"
                        title="수정"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteProject(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                        title="삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 text-slate-500 text-xs flex justify-between items-center">
        <div>
          * 사업명을 클릭하시면 상세 현황 및 추진 일정 모달을 확인하실 수 있습니다.
        </div>
        <div className="font-semibold">
          표시 중: {filteredProjects.length} / 총 {projects.length}개 사업
        </div>
      </div>

    </div>
  );
};
