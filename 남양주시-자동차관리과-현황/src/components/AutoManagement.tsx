import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { autoManagementSummary, autoRepairComprehensive, autoRepairSmall, autoSales, autoDismantle } from '../data';
import { DataTable } from './DataTable';
import { cn } from '../App';
import { Wrench, CarFront, Recycle, Settings, CheckCircle2, MapPin } from 'lucide-react';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b', '#3b82f6'];

const TABS = [
  { id: 'comprehensive', label: '1) 자동차정비업(종합)', shortName: '정비업(종합)', data: autoRepairComprehensive, icon: Wrench },
  { id: 'small', label: '2) 자동차정비업(소형)', shortName: '정비업(소형)', data: autoRepairSmall, icon: Settings },
  { id: 'sales', label: '3) 자동차매매업', shortName: '매매업', data: autoSales, icon: CarFront },
  { id: 'dismantle', label: '4) 자동차해체재활용업', shortName: '해체재활용업', data: autoDismantle, icon: Recycle },
];

const COLUMNS = [
  { key: 'name' as const, header: '업체명' },
  { key: 'owner' as const, header: '대표자' },
  { key: 'address' as const, header: '소재지' },
  { key: 'phone' as const, header: '전화번호' },
  { key: 'date' as const, header: '등록일자' },
];

interface AutoManagementProps {
  activeSubTab?: string;
  onSubTabChange?: (subTab: string) => void;
}

export default function AutoManagement({ activeSubTab, onSubTabChange }: AutoManagementProps) {
  const [selectedTab, setSelectedTab] = useState(activeSubTab || TABS[0].id);
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string | null>(null);

  useEffect(() => {
    if (activeSubTab) {
      setSelectedTab(activeSubTab);
    }
  }, [activeSubTab]);

  useEffect(() => {
    // Reset region filter when tab changes
    setSelectedRegionFilter(null);
  }, [selectedTab]);

  const handleTabSelect = (tabId: string) => {
    setSelectedTab(tabId);
    if (onSubTabChange) {
      onSubTabChange(tabId);
    }
  };

  const activeTabObj = TABS.find(t => t.id === selectedTab) || TABS[0];

  const getDisplayRegion = (address: string) => {
    const rawRegion = address.split(' ')[0];
    if (rawRegion === '금곡로' || rawRegion === '홍유릉로' || rawRegion === '홍유릉로325번길') return '금곡동';
    if (rawRegion === '경춘로') return '평내동';
    if (rawRegion === '늘을1로') return '호평동';
    return rawRegion;
  };

  // Extract unique regions from the active tab's data
  const regionMap = new Map<string, number>();
  activeTabObj.data.forEach(item => {
    // Extract the first word (e.g., 진건읍, 화도읍)
    const region = getDisplayRegion(item.address);
    if (region) {
      regionMap.set(region, (regionMap.get(region) || 0) + 1);
    }
  });

  const regionData = Array.from(regionMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const filteredData = selectedRegionFilter 
    ? activeTabObj.data.filter(item => getDisplayRegion(item.address) === selectedRegionFilter)
    : activeTabObj.data;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      
      {/* Summary Chart */}
      <section className="col-span-1 lg:col-span-4 bg-white p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-slate-200">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="text-[13px] font-semibold text-slate-500 mb-1 uppercase tracking-wider">자동차 관리사업 총괄 현황</h2>
            <p className="text-2xl font-bold text-slate-900">총 438<span className="text-base font-normal text-slate-500 ml-1">개소</span></p>
          </div>
          <span className="text-xs text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
            차트 막대를 클릭하면 해당 업종 세부목록이 표시됩니다
          </span>
        </div>
        <div className="w-full h-[280px] mt-2">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={autoManagementSummary}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip 
                cursor={{ fill: '#f1f5f9' }}
                formatter={(val: number) => [`${val}개소`, '업체수']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
              />
              <Bar 
                dataKey="value" 
                radius={[4, 4, 0, 0]} 
                className="cursor-pointer"
                onClick={(entry) => {
                  const matched = TABS.find(t => t.shortName === entry.name || entry.name.includes(t.shortName.replace('업', '')));
                  if (matched) {
                    handleTabSelect(matched.id);
                  }
                }}
              >
                {autoManagementSummary.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Detailed Data */}
      <section className="col-span-1 lg:col-span-4 bg-white p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-slate-200 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <h2 className="text-[13px] font-semibold text-slate-700 uppercase tracking-wider">
              {activeTabObj.label} 세부 현황 목록
            </h2>
          </div>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
            {selectedRegionFilter ? `${selectedRegionFilter} ` : '총 '}
            {filteredData.length}개 업체
          </span>
        </div>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = selectedTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabSelect(tab.id)}
                className={cn(
                  "flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-blue-600 text-white shadow-sm" 
                    : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
                )}
              >
                <Icon className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0", isActive ? "text-white" : "text-slate-400")} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Region Filter Chips */}
        {regionData.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2 shrink-0">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">지역별 필터:</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setSelectedRegionFilter(null)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all duration-150 flex items-center gap-1",
                  selectedRegionFilter === null
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                )}
              >
                전체 ({activeTabObj.data.length})
              </button>
              {regionData.map((reg) => {
                const isSelected = selectedRegionFilter === reg.name;
                return (
                  <button
                    key={reg.name}
                    onClick={() => setSelectedRegionFilter(isSelected ? null : reg.name)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all duration-150 flex items-center gap-1",
                      isSelected
                        ? "bg-emerald-600 text-white font-bold shadow-sm ring-2 ring-emerald-300"
                        : "bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200"
                    )}
                  >
                    <span>{reg.name}</span>
                    <span className={cn(
                      "text-[10px] px-1.5 py-0.2 rounded-full font-bold",
                      isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                    )}>
                      {reg.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="h-[500px] mt-1">
          <DataTable 
            data={filteredData} 
            columns={COLUMNS}
            searchKey="name"
            searchPlaceholder={`${activeTabObj.label} 업체명으로 검색...`}
          />
        </div>
      </section>
    </div>
  );
}

