import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { logisticsWarehouses } from '../data';
import { DataTable } from './DataTable';
import { Warehouse, MapPin, Building2, Filter, RefreshCw, CheckCircle2 } from 'lucide-react';
import { cn } from '../App';

const REGION_COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4', '#6366f1', '#64748b'];
const COMPANY_COLORS = ['#f97316', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4', '#eab308', '#64748b'];

const getRegion = (address: string) => {
  const match = address.match(/(진건읍|진접읍|화도읍|수동면|오남읍|와부읍|별내면|다산|호평|평내|금곡)/);
  if (match) {
    if (match[0].includes('다산')) return '다산동';
    return match[0];
  }
  return address.split(' ')[0] || '기타';
};

const getCompanyBrand = (name: string) => {
  if (name.includes('쿠팡')) return '쿠팡(CLS)';
  if (name.includes('씨제이대한통운')) return 'CJ대한통운';
  if (name.includes('오뚜기')) return '오뚜기물류';
  if (name.includes('로지스밸리')) return '로지스밸리';
  if (name.includes('컬리')) return '컬리';
  if (name.includes('롯데')) return '롯데글로벌';
  if (name.includes('두핸즈')) return '두핸즈';
  if (name.includes('판토스')) return 'LX판토스';
  return '기타 전문물류';
};

const COLUMNS = [
  { key: 'name' as const, header: '업체명' },
  { key: 'owner' as const, header: '대표자' },
  { 
    key: 'address' as const, 
    header: '소재지',
    render: (val: string) => {
      const searchQuery = val.includes('남양주') ? val : `남양주시 ${val}`;
      const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(searchQuery)}`;
      return (
        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 shrink-0">
            {getRegion(val)}
          </span>
          <a 
            href={naverMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate max-w-xs hover:text-blue-600 hover:underline flex items-center gap-1 text-slate-800 font-medium group"
            title={`${val} - 네이버 지도에서 보기`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="truncate">{val}</span>
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 group-hover:scale-110 transition-transform" />
          </a>
        </div>
      );
    }
  },
  { key: 'phone' as const, header: '전화번호' },
  { key: 'date' as const, header: '등록일자' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.1)] text-sm min-w-[160px] max-w-[220px]">
        <p className="font-bold text-slate-800 mb-1">{data.name}</p>
        <p className="text-blue-600 font-semibold mb-2 text-xs">등록 수: {data.value}개소</p>
        {data.companies && data.companies.length > 0 && (
          <div className="text-[11px] text-slate-600 flex flex-col gap-1 max-h-[120px] overflow-y-auto pr-1 custom-scrollbar">
            {data.companies.map((company: string, idx: number) => (
              <div key={idx} className="truncate" title={company}>• {company}</div>
            ))}
          </div>
        )}
      </div>
    );
  }
  return null;
};

export default function Logistics() {
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string | null>(null);
  const [selectedCompanyFilter, setSelectedCompanyFilter] = useState<string | null>(null);

  // Region breakdown calculation
  const regionData = useMemo(() => {
    const counts: Record<string, number> = {};
    const companies: Record<string, string[]> = {};
    logisticsWarehouses.forEach(w => {
      const reg = getRegion(w.address);
      counts[reg] = (counts[reg] || 0) + 1;
      if (!companies[reg]) companies[reg] = [];
      companies[reg].push(w.name);
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value, companies: companies[name] }))
      .sort((a, b) => b.value - a.value);
  }, []);

  // Company breakdown calculation
  const companyData = useMemo(() => {
    const counts: Record<string, number> = {};
    const companies: Record<string, string[]> = {};
    logisticsWarehouses.forEach(w => {
      const brand = getCompanyBrand(w.name);
      counts[brand] = (counts[brand] || 0) + 1;
      if (!companies[brand]) companies[brand] = [];
      companies[brand].push(w.name);
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value, companies: companies[name] }))
      .sort((a, b) => b.value - a.value);
  }, []);

  // Filtered dataset for DataTable
  const filteredWarehouses = useMemo(() => {
    return logisticsWarehouses.filter(w => {
      if (selectedRegionFilter && getRegion(w.address) !== selectedRegionFilter) {
        return false;
      }
      if (selectedCompanyFilter && getCompanyBrand(w.name) !== selectedCompanyFilter) {
        return false;
      }
      return true;
    });
  }, [selectedRegionFilter, selectedCompanyFilter]);

  const resetFilters = () => {
    setSelectedRegionFilter(null);
    setSelectedCompanyFilter(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      
      {/* Header KPI Summary */}
      <div className="col-span-1 lg:col-span-2 bg-white p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-[13px] font-semibold text-slate-500 mb-1 uppercase tracking-wider">물류창고업 등록 현황</h2>
          <div className="text-2xl font-bold text-slate-900">
            총 {logisticsWarehouses.length} <span className="text-base font-normal text-slate-500">개소</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 text-right">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase block mb-0.5">최다 집적 지역</span>
            <span className="text-base font-bold text-slate-800">
              화도읍 <span className="text-xs text-blue-600 font-semibold">(7개소)</span>
            </span>
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase block mb-0.5">주요 운영기업</span>
            <span className="text-base font-bold text-slate-800">
              쿠팡 <span className="text-xs text-orange-600 font-semibold">(9)</span> · CJ대한통운 <span className="text-xs text-blue-600 font-semibold">(9)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Region Dashboard Chart */}
      <div className="bg-white p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[13px] font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-blue-500" />
            1) 읍면동 지역별 물류창고 현황
          </h3>
          {selectedRegionFilter && (
            <button 
              onClick={() => setSelectedRegionFilter(null)}
              className="text-xs text-blue-600 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> 필터 해제
            </button>
          )}
        </div>
        <div className="w-full h-[260px]">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={regionData} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 12 }} allowDecimals={false} />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ fill: '#f1f5f9' }}
              />
              <Bar 
                dataKey="value" 
                radius={[4, 4, 0, 0]} 
                barSize={32}
                className="cursor-pointer"
                onClick={(entry) => setSelectedRegionFilter(selectedRegionFilter === entry.name ? null : entry.name)}
              >
                {regionData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={selectedRegionFilter === entry.name ? '#1d4ed8' : REGION_COLORS[index % REGION_COLORS.length]} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Company Dashboard Chart */}
      <div className="bg-white p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[13px] font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-orange-500" />
            2) 주요 업체별 물류창고 보유 현황
          </h3>
          {selectedCompanyFilter && (
            <button 
              onClick={() => setSelectedCompanyFilter(null)}
              className="text-xs text-orange-600 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> 필터 해제
            </button>
          )}
        </div>
        <div className="w-full h-[260px]">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={companyData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                className="cursor-pointer"
                onClick={(entry) => setSelectedCompanyFilter(selectedCompanyFilter === entry.name ? null : entry.name)}
              >
                {companyData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={selectedCompanyFilter === entry.name ? '#c2410c' : COMPANY_COLORS[index % COMPANY_COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Region Filter Chips Bar */}
      <div className="col-span-1 lg:col-span-2 bg-white p-4 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">지역별 필터:</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setSelectedRegionFilter(null)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-1",
                selectedRegionFilter === null
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              전체 ({logisticsWarehouses.length})
            </button>
            {regionData.map((reg) => {
              const isSelected = selectedRegionFilter === reg.name;
              return (
                <button
                  key={reg.name}
                  onClick={() => setSelectedRegionFilter(isSelected ? null : reg.name)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 flex items-center gap-1",
                    isSelected
                      ? "bg-blue-600 text-white font-bold shadow-sm ring-2 ring-blue-300"
                      : "bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-600 border border-slate-200"
                  )}
                >
                  <span>{reg.name}</span>
                  <span className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded-full font-bold",
                    isSelected ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                  )}>
                    {reg.value}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detailed Table Section with Filters */}
      <div className="col-span-1 lg:col-span-2 bg-white p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-slate-200 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <h3 className="text-[13px] font-semibold text-slate-700 uppercase tracking-wider">
              물류창고 등록업체 상세 목록
            </h3>
          </div>

          {/* Active Filter Indicators */}
          <div className="flex items-center gap-2 flex-wrap">
            {(selectedRegionFilter || selectedCompanyFilter) && (
              <button
                onClick={resetFilters}
                className="text-xs text-slate-500 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md transition-colors flex items-center gap-1"
              >
                <Filter className="w-3 h-3" /> 전체보기 ({logisticsWarehouses.length})
              </button>
            )}

            {selectedRegionFilter && (
              <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full border border-blue-200">
                지역: {selectedRegionFilter}
              </span>
            )}

            {selectedCompanyFilter && (
              <span className="text-xs font-semibold text-orange-700 bg-orange-100 px-2.5 py-1 rounded-full border border-orange-200">
                업체: {selectedCompanyFilter}
              </span>
            )}

            <span className="text-xs font-semibold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200">
              검색결과 {filteredWarehouses.length}건
            </span>
          </div>
        </div>

        <div className="h-[520px]">
          <DataTable 
            data={filteredWarehouses} 
            columns={COLUMNS}
            searchKey="name"
            searchPlaceholder="물류창고 업체명 검색..."
          />
        </div>
      </div>

    </div>
  );
}

