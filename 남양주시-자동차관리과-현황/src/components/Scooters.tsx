import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { scooterCompanies } from '../data';
import { DataTable } from './DataTable';
import { MapPin } from 'lucide-react';

const COLORS = ['#6366f1', '#f59e0b', '#ec4899', '#10b981', '#3b82f6'];

const COLUMNS = [
  { key: 'name' as const, header: '업체명' },
  { 
    key: 'region' as const, 
    header: '운영지역',
    render: (val: string) => (
      <div className="flex items-start gap-1">
        <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <span className="whitespace-normal leading-relaxed">{val}</span>
      </div>
    )
  },
  { 
    key: 'count' as const, 
    header: '운영대수(대)',
    render: (val: number) => <span className="font-semibold text-slate-700">{val.toLocaleString()}</span>
  },
];

export default function Scooters() {
  const totalScooters = scooterCompanies.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      
      {/* KPI Cards & Chart */}
      <div className="col-span-1 lg:col-span-1 space-y-4">
        <div className="bg-white p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-slate-200">
          <h3 className="text-[13px] font-semibold text-slate-500 mb-1 uppercase tracking-wider">총 운영 대수</h3>
          <div className="text-2xl font-bold text-slate-900">{totalScooters.toLocaleString()} <span className="text-base font-normal text-slate-500">대</span></div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-slate-200">
           <h3 className="text-[13px] font-semibold text-slate-500 mb-1 uppercase tracking-wider">운영 업체 수</h3>
           <div className="text-2xl font-bold text-slate-900">{scooterCompanies.length} <span className="text-base font-normal text-slate-500">개사</span></div>
        </div>
      </div>

      <div className="col-span-1 lg:col-span-3 bg-white p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-slate-200 flex flex-col justify-center">
        <h3 className="text-[13px] font-semibold text-slate-500 mb-2 uppercase tracking-wider w-full">업체별 운영 비율</h3>
        <div className="w-full h-[220px]">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={scooterCompanies}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="count"
              >
                {scooterCompanies.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value.toLocaleString()}대`, '운영대수']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
              />
              <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Data */}
      <section className="col-span-1 lg:col-span-4 bg-white p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-slate-200">
        <div className="mb-4">
          <h2 className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider">전동킥보드 업체 상세 현황</h2>
        </div>
        <div className="h-[400px]">
          <DataTable 
            data={scooterCompanies} 
            columns={COLUMNS}
            searchKey="name"
            searchPlaceholder="업체명 검색..."
          />
        </div>
      </section>

    </div>
  );
}
