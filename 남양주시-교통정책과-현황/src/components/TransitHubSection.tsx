import React from 'react';
import { TransitHubItem } from '../types';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Bus, Landmark, Calendar, Building, DollarSign } from 'lucide-react';

interface Props {
  hubs: TransitHubItem[];
}

export const TransitHubSection: React.FC<Props> = ({ hubs }) => {
  const totalBudget = hubs.reduce((sum, h) => sum + h.budgetInHundredMillion, 0);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4'];

  const chartData = hubs.map((h) => ({
    name: h.projectName.length > 15 ? h.projectName.slice(0, 15) + '...' : h.projectName,
    fullName: h.projectName,
    value: h.budgetInHundredMillion,
  }));

  return (
    <section className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm mb-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-5 border-b border-slate-200 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-amber-600 text-white font-bold text-sm flex items-center justify-center">
              5
            </span>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              철도(환승) 및 대중교통체계 시설 확충
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 pl-9">
            왕숙지구 광역교통개선대책 역사 신설, 환승센터, BRT 및 BTX 확충 사업
          </p>
        </div>

        <div className="bg-amber-50 text-amber-900 text-xs font-semibold px-3 py-1.5 rounded-lg border border-amber-200 flex items-center gap-1.5">
          <DollarSign className="w-4 h-4 text-amber-600" />
          <span>총 사업비: {totalBudget.toLocaleString()}억원 (2,440억원)</span>
        </div>
      </div>

      {/* Chart and Summary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Pie Chart */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
          <h3 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
            <Landmark className="w-4 h-4 text-amber-600" />
            사업비 배분 현황 (억원)
          </h3>
          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="fullName"
                >
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900/95 text-white p-3 rounded-lg border border-slate-700 shadow-xl text-xs space-y-1.5 pointer-events-none">
                          <p className="font-bold text-amber-300 text-xs sm:text-sm">{data.fullName}</p>
                          <div className="flex items-center justify-between gap-4 pt-1 border-t border-slate-800 text-slate-300">
                            <span>사업비</span>
                            <span className="font-extrabold text-white">{data.value.toLocaleString()} 억원</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-slate-500 text-center">
            LH 부담금 및 국·도비 투입을 통한 신도시 광역교통 망 완성
          </p>
        </div>

        {/* Project List Highlights */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {hubs.map((hub, idx) => (
            <div
              key={hub.id}
              className="bg-slate-50/80 p-4 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/20 transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                  {hub.category}
                </span>
                <span className="text-sm font-extrabold text-amber-700">
                  {hub.budgetInHundredMillion} 억원
                </span>
              </div>

              <h4 className="font-bold text-slate-900 text-sm">{hub.projectName}</h4>

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-200/80">
                <div>
                  <span className="text-slate-400 block">시행시기</span>
                  <span className="font-semibold text-slate-800">{hub.implementationPeriod}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">재원분담</span>
                  <span className="font-bold text-blue-700">{hub.fundingDivision}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-600 bg-white p-2 rounded border border-slate-200">
                <span className="font-semibold text-slate-500">시행주체:</span>{' '}
                {hub.implementingEntity} ({hub.remarks})
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
