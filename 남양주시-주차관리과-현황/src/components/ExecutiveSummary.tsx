import React from 'react';
import { ShieldAlert, Car, Construction, Banknote, ArrowRight, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from 'recharts';
import { constructionProjectData, enforcementZoneData, parkingOperationData } from '../data/parkingData';

interface ExecutiveSummaryProps {
  onNavigateTab: (tab: string) => void;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ onNavigateTab }) => {
  // Budget stats
  const totalBudget = constructionProjectData.reduce((acc, p) => acc + p.totalBudgetMillionWon, 0);
  const totalSecured = constructionProjectData.reduce(
    (acc, p) => acc + (p.securedBudgetMillionWon || 0),
    0
  );
  const totalCapacity = constructionProjectData.reduce((acc, p) => acc + p.capacity, 0);
  const securedRate = ((totalSecured / totalBudget) * 100).toFixed(1);

  // Operation totals
  const totalOperation = parkingOperationData.find((p) => p.type === '합계')!;

  // Top enforcement regions
  const topEnforcement = [...enforcementZoneData]
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Parking type distribution for pie chart
  const parkingTypeData = [
    { name: '노외 유료', value: 3211, color: '#2563eb' },
    { name: '노상 유료', value: 229, color: '#3b82f6' },
    { name: '노상 무료', value: 602, color: '#10b981' },
    { name: '노외 무료', value: 395, color: '#34d399' },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Title Banner */}
      <div className="bg-[#0F172A] text-white p-5 sm:p-6 rounded-xl border border-slate-800 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              주차관리과 주요 현황 대시보드
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl">
              주정차금지구역 637개소 (411.23km) · 공영주차장 84개소 (4,437면) · 신규 조성사업 7개소 (1,558대 / 1,597억원)
            </p>
          </div>
          <div className="flex items-center gap-3 bg-slate-900/90 p-3 rounded-lg border border-slate-700/80 shrink-0">
            <div className="text-right">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">신규 주차공급 목표</div>
              <div className="text-xl font-mono font-black text-blue-400">+{totalCapacity.toLocaleString()} 면</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Major KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div
          onClick={() => onNavigateTab('general')}
          className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-sm transition cursor-pointer group"
        >
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">주정차금지구역</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg group-hover:bg-amber-100 transition">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-mono font-black text-slate-900">637 <span className="text-sm font-sans font-normal text-slate-500">개소</span></div>
            <div className="text-xs text-slate-500 mt-1 flex items-center justify-between font-medium">
              <span>총 관리거리</span>
              <span className="font-mono font-bold text-slate-800">411.23 km</span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 text-xs text-blue-600 font-semibold flex items-center justify-between">
            <span>15개 읍·면·동 관리</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </div>
        </div>

        {/* KPI 2 */}
        <div
          onClick={() => onNavigateTab('operation')}
          className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-sm transition cursor-pointer group"
        >
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">운영 공영주차장</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition">
              <Car className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-mono font-black text-slate-900">84 <span className="text-sm font-sans font-normal text-slate-500">개소</span></div>
            <div className="text-xs text-slate-500 mt-1 flex items-center justify-between font-medium">
              <span>총 주차면수</span>
              <span className="font-mono font-bold text-blue-600">4,437 면</span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 text-xs text-slate-600 font-semibold flex items-center justify-between">
            <span className="text-emerald-700">유료 46 / 무료 38</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition text-blue-600" />
          </div>
        </div>

        {/* KPI 3 */}
        <div
          onClick={() => onNavigateTab('projects')}
          className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-sm transition cursor-pointer group"
        >
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">조성 추진 사업</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-100 transition">
              <Construction className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-mono font-black text-slate-900">7 <span className="text-sm font-sans font-normal text-slate-500">개 사업</span></div>
            <div className="text-xs text-slate-500 mt-1 flex items-center justify-between font-medium">
              <span>신규 공급 예정</span>
              <span className="font-mono font-bold text-purple-600">1,558 대</span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 text-xs text-slate-600 font-semibold flex items-center justify-between">
            <span className="text-purple-700">공사 3 / 설계 3 / 기획 1</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition text-blue-600" />
          </div>
        </div>

        {/* KPI 4 */}
        <div
          onClick={() => onNavigateTab('projects')}
          className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-sm transition cursor-pointer group"
        >
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">조성 총 사업비</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-100 transition">
              <Banknote className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-mono font-black text-slate-900">1,597 <span className="text-sm font-sans font-normal text-slate-500">억원</span></div>
            <div className="text-xs text-slate-500 mt-1 flex items-center justify-between font-medium">
              <span>예산 확보율</span>
              <span className="font-mono font-bold text-emerald-600">{securedRate}%</span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 text-xs text-slate-600 font-semibold flex items-center justify-between">
            <span>확보 682억 / 미확보 915억</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition text-blue-600" />
          </div>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top 5 No Parking Zone Locations */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                지역별 주정차금지구역 지정개소 최다 지역 (Top 5)
              </h3>
              <p className="text-xs text-slate-500">진접읍(102개소)과 화도읍(79개소)이 최다 지정을 차지함</p>
            </div>
            <button
              onClick={() => onNavigateTab('general')}
              className="text-xs text-blue-600 hover:underline font-medium flex items-center gap-1"
            >
              전체 15개 지역 보기
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topEnforcement} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="region" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip
                  formatter={(val: any) => [`${val} 개소`, '지정개소']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {topEnforcement.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#3b82f6' : '#60a5fa'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Parking Lot Spaces Breakdown Pie Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Car className="w-4 h-4 text-blue-600" />
              공영주차장 주차면수 구성비
            </h3>
            <p className="text-xs text-slate-500">총 4,437면 (유료 3,440면 / 무료 997면)</p>
          </div>

          <div className="h-48 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={parkingTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {parkingTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`${val} 면`, '주차면수']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-100 pt-3">
            {parkingTypeData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600">{item.name}:</span>
                <span className="font-bold text-slate-800">{item.value}면</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Construction Projects Progress Quick Summary */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Construction className="w-5 h-5 text-purple-600" />
              공영주차장 조성 사업 추진현황 (7개 사업)
            </h3>
            <p className="text-xs text-slate-500">
              다산, 퇴계원, 와부, 평내, 진건 지역 내 주차환경 개선을 위한 신규 조성 진행률
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('projects')}
            className="text-xs text-purple-600 hover:underline font-medium flex items-center gap-1"
          >
            상세 사업 목록 및 향후계획 보기 &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {constructionProjectData.slice(0, 6).map((project) => (
            <div
              key={project.id}
              onClick={() => onNavigateTab('projects')}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-100/80 transition cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                    project.stage === '공사중'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : project.stage === '설계중'
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'bg-purple-100 text-purple-800 border border-purple-200'
                  }`}
                >
                  {project.stage}
                </span>
                <span className="text-xs font-bold text-slate-700">{project.progressPercent}% 진행</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 truncate">{project.name}</h4>
              <p className="text-xs text-slate-500 mt-1">
                주차대수: <span className="font-semibold text-slate-700">{project.capacity}대</span> ({project.structure})
              </p>

              {/* Progress bar */}
              <div className="w-full bg-slate-200 rounded-full h-2 mt-3 overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    project.stage === '공사중'
                      ? 'bg-amber-500'
                      : project.stage === '설계중'
                      ? 'bg-blue-500'
                      : 'bg-purple-500'
                  }`}
                  style={{ width: `${project.progressPercent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
