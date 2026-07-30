import React, { useState, useMemo } from 'react';
import { ShieldAlert, ArrowUpDown, MapPin, Ruler, FileSpreadsheet, Search } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { enforcementZoneData, enforcementZoneTotal } from '../data/parkingData';

interface GeneralStatusTabProps {
  searchTerm: string;
}

export const GeneralStatusTab: React.FC<GeneralStatusTabProps> = ({ searchTerm }) => {
  const [sortField, setSortField] = useState<'count' | 'distanceKm' | 'region'>('count');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Filter and sort
  const filteredData = useMemo(() => {
    let list = [...enforcementZoneData];
    if (searchTerm.trim()) {
      list = list.filter((item) => item.region.includes(searchTerm.trim()));
    }

    list.sort((a, b) => {
      if (sortField === 'region') {
        return sortOrder === 'asc' ? a.region.localeCompare(b.region) : b.region.localeCompare(a.region);
      }
      return sortOrder === 'asc' ? a[sortField] - b[sortField] : b[sortField] - a[sortField];
    });

    return list;
  }, [searchTerm, sortField, sortOrder]);

  const toggleSort = (field: 'count' | 'distanceKm' | 'region') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-amber-200">
              SECTION 01
            </span>
            <span className="text-slate-500 text-xs font-semibold">남양주시 관내 15개 읍·면·동</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1.5 tracking-tight">주정차금지구역 지정 현황</h2>
          <p className="text-slate-500 text-xs mt-0.5">
            불법 주정차 단속 및 도로 교통 흐름 확보를 위한 지정 구역 및 구간 거리 현황
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-50/80 border border-amber-200/80 p-3 rounded-lg text-center min-w-28">
            <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">총 지정개소</div>
            <div className="text-xl font-mono font-black text-amber-900">{enforcementZoneTotal.count} 개소</div>
          </div>
          <div className="bg-blue-50/80 border border-blue-200/80 p-3 rounded-lg text-center min-w-28">
            <div className="text-[10px] font-bold text-blue-800 uppercase tracking-wider">총 관리거리</div>
            <div className="text-xl font-mono font-black text-blue-900">{enforcementZoneTotal.distanceKm} km</div>
          </div>
        </div>
      </div>

      {/* Recharts Graphical Distribution */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              지역별 지정개소 및 거리(km) 비교 시각화
            </h3>
            <p className="text-xs text-slate-500">지정개소(개)와 총 단속거리(km) 비교 차트</p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={enforcementZoneData} margin={{ top: 10, right: 20, left: -10, bottom: 25 }}>
              <XAxis
                dataKey="region"
                tick={{ fontSize: 11, fill: '#475569' }}
                interval={0}
                angle={-30}
                textAnchor="end"
              />
              <YAxis tick={{ fontSize: 11, fill: '#475569' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
              />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="count" name="지정개소(개)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="distanceKm" name="거리(km)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Main Filterable Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-slate-600" />
            <h3 className="text-base font-bold text-slate-900">지역별 주정차금지구역 상세 내역</h3>
            <span className="text-xs text-slate-500">({filteredData.length}개 지역 표시 중)</span>
          </div>

          {/* Quick Sorting Controls */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">정렬:</span>
            <button
              onClick={() => toggleSort('count')}
              className={`px-2.5 py-1 rounded-md border text-xs font-medium transition ${
                sortField === 'count'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              개소수 {sortField === 'count' && (sortOrder === 'desc' ? '↓' : '↑')}
            </button>
            <button
              onClick={() => toggleSort('distanceKm')}
              className={`px-2.5 py-1 rounded-md border text-xs font-medium transition ${
                sortField === 'distanceKm'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              거리(km) {sortField === 'distanceKm' && (sortOrder === 'desc' ? '↓' : '↑')}
            </button>
            <button
              onClick={() => toggleSort('region')}
              className={`px-2.5 py-1 rounded-md border text-xs font-medium transition ${
                sortField === 'region'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              지역명 {sortField === 'region' && (sortOrder === 'desc' ? '↓' : '↑')}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-700">
            <thead className="bg-slate-100 text-slate-800 text-xs uppercase font-bold border-b border-slate-200">
              <tr>
                <th scope="col" className="px-6 py-3.5 w-1/4">
                  지역별
                </th>
                <th scope="col" className="px-6 py-3.5 w-1/4 text-right cursor-pointer" onClick={() => toggleSort('count')}>
                  <div className="flex items-center justify-end gap-1">
                    <span>지정개소</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3.5 w-1/4 text-right cursor-pointer" onClick={() => toggleSort('distanceKm')}>
                  <div className="flex items-center justify-end gap-1">
                    <span>거리(㎞)</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3.5 w-1/4 text-right">
                  지정 개소 비중(%)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Grand Total Row */}
              <tr className="bg-slate-900 text-white font-bold">
                <td className="px-6 py-3.5 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  계 (총합계)
                </td>
                <td className="px-6 py-3.5 text-right text-blue-300 text-base">{enforcementZoneTotal.count} 개소</td>
                <td className="px-6 py-3.5 text-right text-amber-300 text-base">{enforcementZoneTotal.distanceKm} ㎞</td>
                <td className="px-6 py-3.5 text-right">100.0%</td>
              </tr>

              {/* Data Rows */}
              {filteredData.map((row) => {
                const countRatio = ((row.count / enforcementZoneTotal.count) * 100).toFixed(1);
                return (
                  <tr key={row.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-3 font-semibold text-slate-900">{row.region}</td>
                    <td className="px-6 py-3 text-right font-medium text-slate-800">
                      <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold">
                        {row.count}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right font-medium text-slate-800">
                      {row.distanceKm.toFixed(3)}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${Math.min(Number(countRatio) * 5, 100)}%` }} />
                        </div>
                        <span className="text-xs text-slate-500 font-mono">{countRatio}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-400 text-sm">
                    검색 조건에 해당되는 지역이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
