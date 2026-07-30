import React, { useMemo } from 'react';
import { ProjectItem, SectionType } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Building2, 
  Coins, 
  Milestone, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  AlertCircle, 
  MapPin, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface DashboardOverviewProps {
  allProjects: ProjectItem[];
  onNavigateToSection: (section: SectionType) => void;
  onSelectProject: (project: ProjectItem) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  allProjects,
  onNavigateToSection,
  onSelectProject,
}) => {
  // Aggregate KPIs
  const totalCount = allProjects.length;

  const totalBudgetBillion = useMemo(() => {
    const sum = allProjects.reduce((acc, curr) => acc + (curr.costTotal || 0), 0);
    // Return formatted as 조 / 억
    const trillion = Math.floor(sum / 1000000);
    const billion = Math.round((sum % 1000000) / 100);
    return `${trillion ? `${trillion}조 ` : ''}${billion.toLocaleString()}억 원 (${sum.toLocaleString()} 백만원)`;
  }, [allProjects]);

  const inConstructionProjects = useMemo(() => {
    return allProjects.filter((p) => p.statusCategory === '공사중');
  }, [allProjects]);

  const avgConstructionProgress = useMemo(() => {
    const withProgress = inConstructionProjects.filter((p) => p.progressPercent !== undefined);
    if (withProgress.length === 0) return 0;
    const sum = withProgress.reduce((acc, p) => acc + (p.progressPercent || 0), 0);
    return (sum / withProgress.length).toFixed(1);
  }, [inConstructionProjects]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {
      공사중: 0,
      실시설계중: 0,
      보상협의중: 0,
      행정절차중: 0,
      발주준비중: 0,
      공사준공: 0,
      계획기타: 0,
    };

    allProjects.forEach((p) => {
      switch (p.statusCategory) {
        case '공사중':
          counts.공사중++;
          break;
        case '실시설계중':
          counts.실시설계중++;
          break;
        case '보상협의중':
          counts.보상협의중++;
          break;
        case '행정절차중':
          counts.행정절차중++;
          break;
        case '발주준비중':
          counts.발주준비중++;
          break;
        case '공사준공':
          counts.공사준공++;
          break;
        default:
          counts.계획기타++;
          break;
      }
    });

    return counts;
  }, [allProjects]);

  // Chart 1: Status distribution data
  const statusChartData = [
    { name: '공사중', value: statusCounts.공사중, color: '#f59e0b' },
    { name: '실시설계', value: statusCounts.실시설계중, color: '#2563eb' },
    { name: '보상협의', value: statusCounts.보상협의중, color: '#8b5cf6' },
    { name: '행정절차', value: statusCounts.행정절차중, color: '#f97316' },
    { name: '발주준비', value: statusCounts.발주준비중, color: '#6366f1' },
    { name: '준공완료', value: statusCounts.공사준공, color: '#10b981' },
  ];

  // Chart 2: Top 5 budget mega projects
  const topBudgetProjects = useMemo(() => {
    return [...allProjects]
      .sort((a, b) => b.costTotal - a.costTotal)
      .slice(0, 5)
      .map((p) => ({
        name: p.name.length > 15 ? p.name.substring(0, 15) + '...' : p.name,
        fullName: p.name,
        사업비: Math.round(p.costTotal / 100), // convert to 억 원
        original: p,
      }));
  }, [allProjects]);

  // Regional distribution
  const regionalData = useMemo(() => {
    const map: Record<string, { count: number; cost: number }> = {};
    
    allProjects.forEach((p) => {
      let reg = p.region || '기타';
      if (reg.includes('/')) reg = reg.split('/')[0].trim();
      if (!map[reg]) map[reg] = { count: 0, cost: 0 };
      map[reg].count++;
      map[reg].cost += p.costTotal || 0;
    });

    return Object.entries(map)
      .map(([region, data]) => ({
        region,
        사업수: data.count,
        사업비억: Math.round(data.cost / 100),
      }))
      .sort((a, b) => b.사업수 - a.사업수)
      .slice(0, 8);
  }, [allProjects]);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Welcome & Overview Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-800 relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 opacity-10 pointer-events-none">
          <Milestone className="w-80 h-80 text-white" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>도로건설과 핵심 시정현황 종합 요약</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            남양주시 도로망 확충 및 시군도·도시계획도로 현황
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            국도·국지도·지방도 순환 도로망 12개 주요 노선과 시군도·도시계획도로 47개 사업의 추진 현황, 예산 집행, 진행 단계를 한눈에 확인하고 통합 관리하는 종합 대시보드입니다.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateToSection('section1')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg shadow transition-all cursor-pointer"
            >
              <span>1. 국도·국지도·지방도 (12개)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateToSection('section2')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-lg border border-slate-700 transition-all cursor-pointer"
            >
              <span>2. 시군도·도시계획도로 (47개)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Top 4 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 shrink-0">
        
        {/* Total Projects */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-34 text-center">
          <h3 className="text-slate-500 text-sm font-medium">전체 진행 사업</h3>
          <p className="text-3xl font-bold text-slate-900">{totalCount}<span className="text-sm font-normal text-slate-400 ml-1">건</span></p>
          <div className="text-xs text-blue-600 font-semibold">국·도비 12건 / 시군도 47건</div>
        </div>

        {/* Total Budget */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-34 text-center">
          <h3 className="text-slate-500 text-sm font-medium">총 투입 예산 (조/억)</h3>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900">{totalBudgetBillion.split('(')[0]}</p>
          <div className="text-xs text-emerald-600 font-semibold truncate">{totalBudgetBillion}</div>
        </div>

        {/* In Construction */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-34 text-center">
          <h3 className="text-slate-500 text-sm font-medium">현재 공사 진행 중</h3>
          <p className="text-3xl font-bold text-amber-500">{inConstructionProjects.length}<span className="text-sm font-normal text-slate-400 ml-1">건</span></p>
          <div className="text-xs text-amber-600 font-semibold">평균 공정률 {avgConstructionProgress}%</div>
        </div>

        {/* Completed */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-34 text-center">
          <h3 className="text-slate-500 text-sm font-medium">준공 및 완료</h3>
          <p className="text-3xl font-bold text-slate-900">{statusCounts.공사준공}<span className="text-sm font-normal text-slate-400 ml-1">건</span></p>
          <div className="text-xs text-emerald-600 font-semibold">국지도98호선, 조안IC 등 완료</div>
        </div>

      </div>


      {/* Charts Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Status Distribution Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>단계별 사업 추진 현황 분포</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">총 {totalCount}건</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={statusChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {statusChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: any) => [`${val}건`, '사업 수']} />
                </RePieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2">
              {statusChartData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="font-semibold text-slate-700">{item.name}</span>
                  </div>
                  <div className="font-bold text-slate-900">
                    {item.value}건 <span className="text-slate-400 font-normal">({Math.round((item.value / totalCount) * 100)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* Top 5 Mega Projects */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Coins className="w-4 h-4 text-emerald-600" />
              <span>최대 사업비 TOP 5 도로 사업 (단위: 억 원)</span>
            </h3>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topBudgetProjects} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" unit="억" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(val: any) => [`${val.toLocaleString()}억 원`, '사업비']} />
                <Bar dataKey="사업비" fill="#2563eb" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>


      {/* In Progress Projects Table Quick View */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base">현재 공사 진행 중 주요 사업 ({inConstructionProjects.length}건)</h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">* 높은 공정률 순</span>
        </div>

        <div className="divide-y divide-slate-200">
          {inConstructionProjects
            .sort((a, b) => (b.progressPercent || 0) - (a.progressPercent || 0))
            .map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectProject(item)}
                className="p-4 hover:bg-slate-50 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {item.categoryName}
                    </span>
                    {item.region && (
                      <span className="text-slate-500 text-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {item.region}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm hover:text-blue-600">
                    {item.name}
                  </h4>
                  <p className="text-slate-600 text-xs">
                    {item.statusText} | 향후계획: {item.futurePlan}
                  </p>
                </div>

                <div className="shrink-0 text-right space-y-1">
                  <div className="font-extrabold text-amber-600 text-base">
                    공정률 {item.progressPercent}%
                  </div>
                  <div className="w-32 bg-slate-200 h-2 rounded-full overflow-hidden ml-auto">
                    <div
                      className="bg-amber-500 h-2 rounded-full"
                      style={{ width: `${item.progressPercent}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    사업비: {item.costTotal.toLocaleString()} 백만원
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

    </div>
  );
};
