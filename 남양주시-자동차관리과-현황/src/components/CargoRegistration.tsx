import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { cargoRegistrationByType, cargoRegistrationByYear } from '../data';
import { Table, Calendar, Truck, FileText, CheckCircle2 } from 'lucide-react';

const COLORS = ['#f59e0b', '#3b82f6', '#8b5cf6', '#10b981'];

export default function CargoRegistration() {
  const totalCargo = cargoRegistrationByType.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      
      {/* Header KPI */}
      <div className="col-span-1 lg:col-span-2 bg-white p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-slate-200 flex items-center justify-between">
        <div>
          <h2 className="text-[13px] font-semibold text-slate-500 mb-1 uppercase tracking-wider">화물자동차 등록 현황 (2026. 7. 1. 기준)</h2>
          <div className="text-2xl font-bold text-slate-900">{totalCargo.toLocaleString()} <span className="text-base font-normal text-slate-500">대</span></div>
        </div>
        <div className="flex gap-6 text-right">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase block mb-0.5">개인화물</span>
            <span className="text-lg font-bold text-slate-800">6,348대 <span className="text-xs text-blue-600 font-medium">(85.1%)</span></span>
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase block mb-0.5">일반화물</span>
            <span className="text-lg font-bold text-slate-800">1,110대 <span className="text-xs text-emerald-600 font-medium">(14.9%)</span></span>
          </div>
        </div>
      </div>
        
      {/* Yearly Trend Chart */}
      <div className="bg-white p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-slate-200">
        <h3 className="text-[13px] font-semibold text-slate-500 mb-4 uppercase tracking-wider">연도별 등록 현황 및 증감추이</h3>
        <div className="w-full h-[280px]">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={cargoRegistrationByYear} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
              <YAxis 
                yAxisId="left" 
                domain={['dataMin - 500', 'dataMax + 500']} 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b' }} 
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#f59e0b' }}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
                labelStyle={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '4px' }}
              />
              <Legend verticalAlign="top" height={36}/>
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="count" 
                name="등록대수" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                dot={{ r: 4, strokeWidth: 2 }} 
                activeDot={{ r: 6 }} 
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="increment" 
                name="전년대비 증감" 
                stroke="#f59e0b" 
                strokeWidth={2} 
                strokeDasharray="5 5"
                dot={{ r: 3 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Type Chart */}
      <div className="bg-white p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-slate-200">
        <h3 className="text-[13px] font-semibold text-slate-500 mb-4 uppercase tracking-wider">차종별 세부 현황</h3>
        <div className="w-full h-[280px]">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={cargoRegistrationByType} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                formatter={(value: number) => [`${value.toLocaleString()}대`, '등록대수']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={48}>
                {cargoRegistrationByType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table 1: 1) 화물자동차 차종별 등록 현황 */}
      <div className="col-span-1 lg:col-span-2 bg-white p-6 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Table className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-800">1) 화물자동차 차종별 등록 현황</h3>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            2026. 7. 1. 기준
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-center text-xs sm:text-sm border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <th rowSpan={3} className="px-4 py-3 border-r border-slate-200 bg-slate-100/70 min-w-[80px]">합계</th>
                <th colSpan={5} className="px-4 py-2 border-r border-b border-slate-200 bg-amber-50/50 text-amber-900">개인화물</th>
                <th rowSpan={3} className="px-4 py-3 border-r border-slate-200 bg-slate-100/70 min-w-[90px]">일반화물</th>
                <th rowSpan={3} className="px-4 py-3 bg-slate-100/70 min-w-[100px]">비고</th>
              </tr>
              <tr className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <th rowSpan={2} className="px-4 py-2 border-r border-slate-200 bg-slate-50">소계</th>
                <th colSpan={3} className="px-4 py-1.5 border-r border-b border-slate-200 bg-slate-50">개인소형</th>
                <th rowSpan={2} className="px-4 py-2 border-r border-slate-200 bg-slate-50">개별화물</th>
              </tr>
              <tr className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <th className="px-3 py-1.5 border-r border-slate-200">계</th>
                <th className="px-3 py-1.5 border-r border-slate-200">소형</th>
                <th className="px-3 py-1.5 border-r border-slate-200">택배</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="px-4 py-3.5 font-bold text-slate-900 border-r border-slate-200 bg-slate-50/30 text-base">7,458</td>
                <td className="px-4 py-3.5 font-bold text-slate-900 border-r border-slate-200">6,348</td>
                <td className="px-3 py-3.5 border-r border-slate-200 text-blue-700 font-semibold">4,841</td>
                <td className="px-3 py-3.5 border-r border-slate-200">2,830</td>
                <td className="px-3 py-3.5 border-r border-slate-200 text-amber-700">2,011</td>
                <td className="px-4 py-3.5 border-r border-slate-200">1,507</td>
                <td className="px-4 py-3.5 border-r border-slate-200 font-bold text-slate-900">1,110</td>
                <td className="px-4 py-3.5 text-xs text-slate-500 whitespace-nowrap">2026. 7. 1. 기준</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Table 2: 2) 화물자동차 연도별 등록 현황 */}
      <div className="col-span-1 lg:col-span-2 bg-white p-6 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-500" />
            <h3 className="text-sm font-bold text-slate-800">2) 화물자동차 연도별 등록 현황</h3>
          </div>
          <span className="text-xs text-slate-400">단위: 대</span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-center text-xs sm:text-sm border-collapse min-w-[500px]">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <th className="px-4 py-3 border-r border-slate-200 bg-slate-100/70 min-w-[100px]">구 분</th>
                <th className="px-4 py-3 border-r border-slate-200">2022</th>
                <th className="px-4 py-3 border-r border-slate-200">2023</th>
                <th className="px-4 py-3 border-r border-slate-200">2024</th>
                <th className="px-4 py-3 border-r border-slate-200">2025</th>
                <th className="px-4 py-3 bg-blue-50/70 text-blue-900 font-bold">2026. 7</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800 font-medium">
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="px-4 py-3 font-semibold text-slate-700 border-r border-slate-200 bg-slate-50/50">등록대수</td>
                <td className="px-4 py-3 border-r border-slate-200">6,483</td>
                <td className="px-4 py-3 border-r border-slate-200">6,897</td>
                <td className="px-4 py-3 border-r border-slate-200">7,010</td>
                <td className="px-4 py-3 border-r border-slate-200">7,250</td>
                <td className="px-4 py-3 font-bold text-blue-600 bg-blue-50/20">7,458</td>
              </tr>
              <tr className="hover:bg-slate-50/80 transition-colors bg-amber-50/10">
                <td className="px-4 py-3 font-semibold text-amber-800 border-r border-slate-200 bg-amber-50/30">증감 (전년대비)</td>
                <td className="px-4 py-3 border-r border-slate-200 text-amber-700 font-semibold">+602</td>
                <td className="px-4 py-3 border-r border-slate-200 text-amber-700 font-semibold">+414</td>
                <td className="px-4 py-3 border-r border-slate-200 text-amber-700 font-semibold">+113</td>
                <td className="px-4 py-3 border-r border-slate-200 text-amber-700 font-semibold">+240</td>
                <td className="px-4 py-3 font-bold text-amber-600 bg-amber-50/30">+208</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

