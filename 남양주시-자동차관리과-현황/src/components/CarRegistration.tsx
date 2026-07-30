import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { carRegistrationByType, carRegistrationByEco, carRegistrationByUse } from '../data';
import { Car, Leaf, Briefcase, CheckCircle2, ChevronRight } from 'lucide-react';
import { cn } from '../App';

const COLORS_TYPE = ['#3b82f6', '#f43f5e', '#8b5cf6', '#f59e0b'];
const COLORS_ECO = ['#10b981', '#06b6d4', '#84cc16'];
const COLORS_USE = ['#6366f1', '#ec4899', '#64748b'];

interface CarRegistrationProps {
  activeSubTab?: string;
  onSubTabChange?: (subTab: string) => void;
}

export default function CarRegistration({ activeSubTab, onSubTabChange }: CarRegistrationProps) {
  const [selectedTab, setSelectedTab] = useState<'type' | 'eco' | 'use'>(
    (activeSubTab as 'type' | 'eco' | 'use') || 'type'
  );

  const currentTab = activeSubTab ? (activeSubTab as 'type' | 'eco' | 'use') : selectedTab;

  const handleTabClick = (tab: 'type' | 'eco' | 'use') => {
    setSelectedTab(tab);
    if (onSubTabChange) {
      onSubTabChange(tab);
    }
  };

  const totalCars = carRegistrationByType.reduce((acc, curr) => acc + curr.value, 0);
  const totalEco = carRegistrationByEco.reduce((acc, curr) => acc + curr.value, 0);

  // Get active detail data based on current selected category
  const getDetailData = () => {
    if (currentTab === 'type') {
      return {
        title: '1) 차종별 등록 현황 상세',
        total: totalCars,
        items: carRegistrationByType.map((item, idx) => ({
          name: item.name,
          value: item.value,
          percentage: ((item.value / totalCars) * 100).toFixed(1),
          color: COLORS_TYPE[idx % COLORS_TYPE.length]
        }))
      };
    } else if (currentTab === 'eco') {
      return {
        title: '2) 친환경 자동차 등록 현황 상세',
        total: totalEco,
        items: carRegistrationByEco.map((item, idx) => ({
          name: item.name,
          value: item.value,
          percentage: ((item.value / totalEco) * 100).toFixed(1),
          color: COLORS_ECO[idx % COLORS_ECO.length]
        }))
      };
    } else {
      return {
        title: '3) 용도별 등록 현황 상세',
        total: totalCars,
        items: carRegistrationByUse.map((item, idx) => ({
          name: item.name,
          value: item.value,
          percentage: ((item.value / totalCars) * 100).toFixed(1),
          color: COLORS_USE[idx % COLORS_USE.length]
        }))
      };
    }
  };

  const detailInfo = getDetailData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      
      {/* Header KPI */}
      <div className="col-span-1 md:col-span-2 xl:col-span-3 bg-white p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-[13px] font-semibold text-slate-500 mb-1 uppercase tracking-wider">총 자동차 등록 현황</h2>
          <div className="text-2xl font-bold text-slate-900">{totalCars.toLocaleString()} <span className="text-base font-normal text-slate-500">대</span></div>
        </div>
        <div className="flex gap-8">
           <div className="text-right">
             <div className="text-[13px] font-semibold text-slate-500 mb-1 uppercase tracking-wider">친환경차 비율</div>
             <div className="text-2xl font-bold text-emerald-600">
               {((totalEco / totalCars) * 100).toFixed(1)}%
             </div>
           </div>
           <div className="text-right">
             <div className="text-[13px] font-semibold text-slate-500 mb-1 uppercase tracking-wider">자가용 비율</div>
             <div className="text-2xl font-bold text-blue-600">
               {((carRegistrationByUse.find(u => u.name === '자가용')?.value || 0) / totalCars * 100).toFixed(1)}%
             </div>
           </div>
        </div>
      </div>

      {/* Type Chart Card */}
      <div 
        onClick={() => handleTabClick('type')}
        className={cn(
          "col-span-1 bg-white p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] border transition-all cursor-pointer hover:shadow-md",
          currentTab === 'type' ? "border-blue-500 ring-2 ring-blue-500/20" : "border-slate-200"
        )}
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-[13px] font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Car className="w-4 h-4 text-blue-500" />
            1) 차종별 등록현황
          </h3>
          <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", currentTab === 'type' ? "bg-blue-100 text-blue-700" : "text-slate-400 bg-slate-100")}>
            클릭하여 세부보기
          </span>
        </div>
        <div className="w-full h-[220px]">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={carRegistrationByType}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={2}
                dataKey="value"
              >
                {carRegistrationByType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS_TYPE[index % COLORS_TYPE.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value.toLocaleString()}대`, '등록대수']} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}/>
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Eco Chart Card */}
      <div 
        onClick={() => handleTabClick('eco')}
        className={cn(
          "col-span-1 bg-white p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] border transition-all cursor-pointer hover:shadow-md",
          currentTab === 'eco' ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-slate-200"
        )}
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-[13px] font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Leaf className="w-4 h-4 text-emerald-500" />
            2) 친환경 자동차 등록현황
          </h3>
          <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", currentTab === 'eco' ? "bg-emerald-100 text-emerald-700" : "text-slate-400 bg-slate-100")}>
            클릭하여 세부보기
          </span>
        </div>
        <div className="w-full h-[220px]">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={carRegistrationByEco} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0"/>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 12}} width={70} />
              <Tooltip formatter={(value: number) => [`${value.toLocaleString()}대`, '등록대수']} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}/>
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={26}>
                {carRegistrationByEco.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS_ECO[index % COLORS_ECO.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Use Chart Card */}
      <div 
        onClick={() => handleTabClick('use')}
        className={cn(
          "col-span-1 bg-white p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] border transition-all cursor-pointer hover:shadow-md",
          currentTab === 'use' ? "border-indigo-500 ring-2 ring-indigo-500/20" : "border-slate-200"
        )}
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-[13px] font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-indigo-500" />
            3) 용도별 등록현황
          </h3>
          <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", currentTab === 'use' ? "bg-indigo-100 text-indigo-700" : "text-slate-400 bg-slate-100")}>
            클릭하여 세부보기
          </span>
        </div>
        <div className="w-full h-[220px]">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={carRegistrationByUse}
                cx="50%"
                cy="50%"
                outerRadius={75}
                dataKey="value"
              >
                {carRegistrationByUse.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS_USE[index % COLORS_USE.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value.toLocaleString()}대`, '등록대수']} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}/>
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Clicked Detail Breakdown View */}
      <div className="col-span-1 md:col-span-2 xl:col-span-3 bg-white p-6 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-slate-200 mt-2">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-800">{detailInfo.title}</h3>
          </div>
          <span className="text-sm font-medium text-slate-500">
            총 합계: <span className="font-bold text-slate-900">{detailInfo.total.toLocaleString()}</span>대
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Detailed Table */}
          <div className="overflow-x-auto border border-slate-100 rounded-xl">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3 font-medium">구분</th>
                  <th className="px-4 py-3 font-medium text-right">등록대수(대)</th>
                  <th className="px-4 py-3 font-medium text-right">비율(%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                {detailInfo.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-medium flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      {item.name}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-slate-900">{item.value.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{item.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Visual Progress Bar Breakdown */}
          <div className="space-y-4 flex flex-col justify-center">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">점유율 시각화</h4>
            {detailInfo.items.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700">{item.name}</span>
                  <span className="text-slate-500">{item.value.toLocaleString()}대 ({item.percentage}%)</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

