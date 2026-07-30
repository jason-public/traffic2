import React from 'react';
import { RoadStatusItem, RuralRoadStatusItem } from '../types';
import { GENERAL_ROAD_STATS, RURAL_ROAD_STATS } from '../data/projectsData';
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
import { Compass, PieChart, ShieldCheck, Route, AlertTriangle, Layers } from 'lucide-react';

export const RoadGeneralStats: React.FC = () => {
  const roadStats = GENERAL_ROAD_STATS;
  const ruralStats = RURAL_ROAD_STATS;

  // Chart data preparation
  const roadChartData = roadStats
    .filter((item) => item.category !== '계')
    .map((item) => ({
      name: item.category,
      포장연장: item.pavedKm,
      비포장연장: item.unpavedKm,
      포장율: item.paveRatePercent,
      총연장: item.lengthKm,
    }));

  const ruralChartData = ruralStats
    .filter((item) => item.grade !== '계')
    .map((item) => ({
      name: item.grade,
      포장: item.pavedKm,
      비포장: item.unpavedKm,
      미개설: item.unopenedKm,
      총연장: item.lengthKm,
    }));

  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* KPI Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 shrink-0">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between text-center h-34">
          <h3 className="text-slate-500 text-sm font-medium">총 도로 연장</h3>
          <p className="text-3xl font-bold text-slate-900">424.92<span className="text-sm font-normal text-slate-400 ml-1">km</span></p>
          <div className="text-xs text-blue-600 font-semibold">총 40개 주요 노선</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between text-center h-34">
          <h3 className="text-slate-500 text-sm font-medium">전체 도로 포장율</h3>
          <p className="text-3xl font-bold text-slate-900">93.0<span className="text-sm font-normal text-slate-400 ml-1">%</span></p>
          <div className="text-xs text-emerald-600 font-semibold">포장 395.14km / 비포장 29.78km</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between text-center h-34">
          <h3 className="text-slate-500 text-sm font-medium">농어촌 도로 총연장</h3>
          <p className="text-3xl font-bold text-slate-900">149.50<span className="text-sm font-normal text-slate-400 ml-1">km</span></p>
          <div className="text-xs text-blue-600 font-semibold">총 64개 노선 (면도 7 / 리도 57)</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between text-center h-34">
          <h3 className="text-slate-500 text-sm font-medium">농어촌 도로 포장율</h3>
          <p className="text-3xl font-bold text-amber-500">81.0<span className="text-sm font-normal text-slate-400 ml-1">%</span></p>
          <div className="text-xs text-amber-600 font-semibold">미개설 27.4km 개선 추진중</div>
        </div>

      </div>

      {/* SECTION 3-1: 도로현황 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center text-xs font-bold">3</span>
            <h2 className="text-base sm:text-lg font-bold">1) 도로현황 통계표</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">(단위: km, %)</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-white text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                <th className="px-6 py-4">도로구분</th>
                <th className="px-6 py-4 text-center">노선수</th>
                <th className="px-6 py-4 text-right">연장 (km)</th>
                <th className="px-6 py-4 text-right">포장 (km)</th>
                <th className="px-6 py-4 text-right">비포장 (km)</th>
                <th className="px-6 py-4 text-right">포장율 (%)</th>
                <th className="px-6 py-4 text-right">중용구간 (km)</th>
                <th className="px-6 py-4">비고</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {roadStats.map((item) => {
                const isTotal = item.category === '계';
                return (
                  <tr 
                    key={item.id} 
                    className={isTotal ? 'bg-slate-50 font-bold text-slate-900 border-t-2 border-slate-200' : 'hover:bg-slate-50 transition-colors'}
                  >
                    <td className="px-6 py-4 font-semibold">{item.category}</td>
                    <td className="px-6 py-4 text-center font-mono">{item.routeCount}</td>
                    <td className="px-6 py-4 text-right font-mono font-bold">{item.lengthKm.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right font-mono text-emerald-600 font-semibold">{item.pavedKm.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right font-mono text-rose-500">{item.unpavedKm ? item.unpavedKm.toFixed(2) : '-'}</td>
                    <td className="px-6 py-4 text-right font-mono">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.paveRatePercent === 100 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : item.paveRatePercent < 80 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {item.paveRatePercent}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-mono">{item.sharedSectionKm || '-'}</td>
                    <td className="px-6 py-4 text-slate-400 text-xs">{item.notes || '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Visual Chart for Road Types */}
        <div className="p-5 bg-slate-50 border-t border-slate-200">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
            [시각화] 도로구분별 포장 / 비포장 연장 비교 (km)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roadChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis unit="km" tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value: any) => [`${value} km`, '']}
                  contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="포장연장" stackId="a" fill="#2563eb" radius={[0, 0, 0, 0]} />
                <Bar dataKey="비포장연장" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>


      {/* SECTION 3-2: 농어촌 도로 등급별 현황 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center text-xs font-bold">3</span>
            <h2 className="text-base sm:text-lg font-bold">2) 농어촌 도로 등급별 현황 통계표</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">(단위: km, %)</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-white text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                <th className="px-6 py-4">등 급 별</th>
                <th className="px-6 py-4 text-center">노선수</th>
                <th className="px-6 py-4 text-right">연 장 (km)</th>
                <th className="px-6 py-4 text-right">포 장 (km)</th>
                <th className="px-6 py-4 text-right">비포장 (km)</th>
                <th className="px-6 py-4 text-right">미개설 (km)</th>
                <th className="px-6 py-4 text-right">포장율 (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {ruralStats.map((item) => {
                const isTotal = item.grade === '계';
                return (
                  <tr 
                    key={item.id} 
                    className={isTotal ? 'bg-slate-50 font-bold text-slate-900 border-t-2 border-slate-200' : 'hover:bg-slate-50 transition-colors'}
                  >
                    <td className="px-6 py-4 font-semibold">{item.grade}</td>
                    <td className="px-6 py-4 text-center font-mono">{item.routeCount}</td>
                    <td className="px-6 py-4 text-right font-mono font-bold">{item.lengthKm.toFixed(1)}</td>
                    <td className="px-6 py-4 text-right font-mono text-emerald-600 font-semibold">{item.pavedKm.toFixed(1)}</td>
                    <td className="px-6 py-4 text-right font-mono text-rose-500">{item.unpavedKm ? item.unpavedKm.toFixed(1) : '-'}</td>
                    <td className="px-6 py-4 text-right font-mono text-amber-600">{item.unopenedKm ? item.unopenedKm.toFixed(1) : '-'}</td>
                    <td className="px-6 py-4 text-right font-mono">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {item.paveRatePercent}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Visual Chart for Rural Roads */}
        <div className="p-6 bg-slate-50/50 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              [시각화] 농어촌 도로 상태 구성 (포장 vs 비포장 vs 미개설)
            </h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ruralChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis unit="km" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="포장" fill="#10b981" />
                  <Bar dataKey="비포장" fill="#f59e0b" />
                  <Bar dataKey="미개설" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <h3 className="text-xs font-bold text-slate-800 mb-2">💡 도로 관리 주요 분석 메시지</h3>
            <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4 leading-relaxed">
              <li>
                <strong>고속국도 & 일반국도:</strong> 포장율 100%를 달성하여 기본 골격 도로망 형성이 완료되었습니다.
              </li>
              <li>
                <strong>지방도 & 국지도:</strong> 지방도 포장율 76%, 국지도 포장율 89.7%로 확장 및 개량 사업이 계속 진행 중입니다.
              </li>
              <li>
                <strong>농어촌 도로 (면도·리도):</strong> 면도는 포장율 91%로 안정적이나, 리도의 미개설 구간 26.0km에 대해 단계별 도로 확포장 및 정비 사업이 적극 추진되고 있습니다.
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
