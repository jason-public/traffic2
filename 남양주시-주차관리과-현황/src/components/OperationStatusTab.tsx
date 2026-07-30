import React, { useState } from 'react';
import { Car, CheckCircle2, DollarSign, Layers, PieChart as PieIcon, ArrowRight, Info } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { parkingOperationData } from '../data/parkingData';

export const OperationStatusTab: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'전체' | '노상주차장' | '노외주차장'>('전체');

  const totalRow = parkingOperationData.find((d) => d.type === '합계')!;
  const onStreetRow = parkingOperationData.find((d) => d.type === '노상주차장')!;
  const offStreetRow = parkingOperationData.find((d) => d.type === '노외주차장')!;

  // Chart data comparing On-street vs Off-street spaces
  const compareSpacesData = [
    {
      type: '노상주차장',
      유료: onStreetRow.paidSpaces,
      무료: onStreetRow.freeSpaces,
    },
    {
      type: '노외주차장',
      유료: offStreetRow.paidSpaces,
      무료: offStreetRow.freeSpaces,
    },
  ];

  // Pie chart data for Sites ratio
  const sitesPieData = [
    { name: '노상 유료', value: onStreetRow.paidSites, fill: '#3b82f6' },
    { name: '노상 무료', value: onStreetRow.freeSites, fill: '#10b981' },
    { name: '노외 유료', value: offStreetRow.paidSites, fill: '#1d4ed8' },
    { name: '노외 무료', value: offStreetRow.freeSites, fill: '#059669' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-md border border-blue-200">
              2. 운영 현황 자료
            </span>
            <span className="text-slate-500 text-xs">남양주시 관내 공영주차장</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">공영주차장 운영 현황</h2>
          <p className="text-slate-600 text-sm mt-1">
            노상 및 노외 공영주차장 개소수 및 주차면수 (유료/무료) 총괄 관리 현황
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-blue-900 text-white p-3.5 rounded-xl shadow-xs text-right">
            <div className="text-xs text-blue-300">총 주차면수</div>
            <div className="text-2xl font-black text-white">{totalRow.totalSpaces.toLocaleString()} 면</div>
          </div>
          <div className="bg-slate-100 border border-slate-200 p-3.5 rounded-xl text-right">
            <div className="text-xs text-slate-500">총 개소수</div>
            <div className="text-2xl font-black text-slate-800">{totalRow.totalSites} 개소</div>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Total Summary */}
        <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950 px-2.5 py-1 rounded border border-blue-800/60">
                합계 (총괄)
              </span>
              <Car className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-extrabold">{totalRow.totalSites} 개소</div>
            <div className="text-sm text-slate-300 mt-1 font-semibold">{totalRow.totalSpaces.toLocaleString()} 주차면</div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
              <span className="text-blue-400 block font-semibold">유료 주차장</span>
              <span className="text-base font-bold text-white">{totalRow.paidSites}개소 / {totalRow.paidSpaces.toLocaleString()}면</span>
            </div>
            <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
              <span className="text-emerald-400 block font-semibold">무료 주차장</span>
              <span className="text-base font-bold text-white">{totalRow.freeSites}개소 / {totalRow.freeSpaces.toLocaleString()}면</span>
            </div>
          </div>
        </div>

        {/* On-Street Parking */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200">
                노상주차장
              </span>
              <Layers className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900">{onStreetRow.totalSites} 개소</div>
            <div className="text-sm text-slate-600 mt-1 font-semibold">{onStreetRow.totalSpaces.toLocaleString()} 주차면</div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
            <div className="bg-indigo-50/50 p-2.5 rounded-xl border border-indigo-100">
              <span className="text-indigo-700 block font-semibold">유료 (5개소)</span>
              <span className="text-base font-bold text-indigo-900">{onStreetRow.paidSpaces}면</span>
            </div>
            <div className="bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
              <span className="text-emerald-700 block font-semibold">무료 (30개소)</span>
              <span className="text-base font-bold text-emerald-900">{onStreetRow.freeSpaces}면</span>
            </div>
          </div>
        </div>

        {/* Off-Street Parking */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                노외주차장
              </span>
              <Car className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900">{offStreetRow.totalSites} 개소</div>
            <div className="text-sm text-slate-600 mt-1 font-semibold">{offStreetRow.totalSpaces.toLocaleString()} 주차면</div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
            <div className="bg-blue-50/50 p-2.5 rounded-xl border border-blue-100">
              <span className="text-blue-700 block font-semibold">유료 (41개소)</span>
              <span className="text-base font-bold text-blue-900">{offStreetRow.paidSpaces.toLocaleString()}면</span>
            </div>
            <div className="bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
              <span className="text-emerald-700 block font-semibold">무료 (8개소)</span>
              <span className="text-base font-bold text-emerald-900">{offStreetRow.freeSpaces}면</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recharts Graphical Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            구분별 유료 / 무료 주차면수 비교
          </h3>
          <p className="text-xs text-slate-500 mb-4">노외주차장은 유료 비중이, 노상주차장은 무료 비중이 높음</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={compareSpacesData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <XAxis dataKey="type" tick={{ fontSize: 12, fill: '#475569' }} />
                <YAxis tick={{ fontSize: 12, fill: '#475569' }} />
                <Tooltip
                  formatter={(val: any) => [`${val} 면`, '주차면수']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="유료" name="유료 주차면" fill="#2563eb" radius={[4, 4, 0, 0]} />
                <Bar dataKey="무료" name="무료 주차면" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sites Pie Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-emerald-600" />
              개소수(84개소) 세부 구성 비율
            </h3>
            <p className="text-xs text-slate-500">노외 유료(41개소)와 노상 무료(30개소)가 대다수 점유</p>
          </div>

          <div className="h-52 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sitesPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {sitesPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`${val} 개소`, '주차장 개소수']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-100 pt-3">
            {sitesPieData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: item.fill }} />
                <span className="text-slate-600">{item.name}:</span>
                <span className="font-bold text-slate-800">{item.value}개소</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Official Structured Table (Matching Page 25 Table 2) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-base font-bold text-slate-900">공영주차장 운영 세부 현황표</h3>
          <p className="text-xs text-slate-500 mt-0.5">공식 보고서 (Page 25 - 2. 공영주차장 운영 현황) 원본 수치</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-center text-slate-700 border-collapse">
            <thead className="bg-slate-100 text-slate-800 text-xs font-bold border-b border-slate-300">
              <tr>
                <th rowSpan={2} className="px-4 py-3 border-r border-slate-200 w-1/4">
                  구 분
                </th>
                <th colSpan={2} className="px-4 py-2 border-r border-slate-200 bg-slate-200/60">
                  합 계
                </th>
                <th colSpan={2} className="px-4 py-2 border-r border-slate-200 bg-blue-100/60 text-blue-900">
                  유 료
                </th>
                <th colSpan={2} className="px-4 py-2 bg-emerald-100/60 text-emerald-900">
                  무 료
                </th>
              </tr>
              <tr className="border-t border-slate-200 text-slate-600">
                <th className="px-3 py-2 border-r border-slate-200">주차장수(개)</th>
                <th className="px-3 py-2 border-r border-slate-200">주차면수(면)</th>
                <th className="px-3 py-2 border-r border-slate-200">주차장수(개)</th>
                <th className="px-3 py-2 border-r border-slate-200">주차면수(면)</th>
                <th className="px-3 py-2 border-r border-slate-200">주차장수(개)</th>
                <th className="px-3 py-2">주차면수(면)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-3.5 font-bold text-slate-900 border-r border-slate-200">노상주차장</td>
                <td className="px-4 py-3.5 font-semibold text-slate-800 border-r border-slate-200">{onStreetRow.totalSites}</td>
                <td className="px-4 py-3.5 font-semibold text-slate-800 border-r border-slate-200">{onStreetRow.totalSpaces}</td>
                <td className="px-4 py-3.5 font-semibold text-blue-700 border-r border-slate-200 bg-blue-50/30">{onStreetRow.paidSites}</td>
                <td className="px-4 py-3.5 font-semibold text-blue-700 border-r border-slate-200 bg-blue-50/30">{onStreetRow.paidSpaces}</td>
                <td className="px-4 py-3.5 font-semibold text-emerald-700 border-r border-slate-200 bg-emerald-50/30">{onStreetRow.freeSites}</td>
                <td className="px-4 py-3.5 font-semibold text-emerald-700 bg-emerald-50/30">{onStreetRow.freeSpaces}</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-3.5 font-bold text-slate-900 border-r border-slate-200">노외주차장</td>
                <td className="px-4 py-3.5 font-semibold text-slate-800 border-r border-slate-200">{offStreetRow.totalSites}</td>
                <td className="px-4 py-3.5 font-semibold text-slate-800 border-r border-slate-200">{offStreetRow.totalSpaces.toLocaleString()}</td>
                <td className="px-4 py-3.5 font-semibold text-blue-700 border-r border-slate-200 bg-blue-50/30">{offStreetRow.paidSites}</td>
                <td className="px-4 py-3.5 font-semibold text-blue-700 border-r border-slate-200 bg-blue-50/30">{offStreetRow.paidSpaces.toLocaleString()}</td>
                <td className="px-4 py-3.5 font-semibold text-emerald-700 border-r border-slate-200 bg-emerald-50/30">{offStreetRow.freeSites}</td>
                <td className="px-4 py-3.5 font-semibold text-emerald-700 bg-emerald-50/30">{offStreetRow.freeSpaces}</td>
              </tr>
              {/* Total Row */}
              <tr className="bg-slate-900 text-white font-bold">
                <td className="px-4 py-4 border-r border-slate-800">합 계</td>
                <td className="px-4 py-4 border-r border-slate-800 text-blue-300">{totalRow.totalSites}</td>
                <td className="px-4 py-4 border-r border-slate-800 text-blue-300">{totalRow.totalSpaces.toLocaleString()}</td>
                <td className="px-4 py-4 border-r border-slate-800 text-blue-400">{totalRow.paidSites}</td>
                <td className="px-4 py-4 border-r border-slate-800 text-blue-400">{totalRow.paidSpaces.toLocaleString()}</td>
                <td className="px-4 py-4 border-r border-slate-800 text-emerald-400">{totalRow.freeSites}</td>
                <td className="px-4 py-4 text-emerald-400">{totalRow.freeSpaces}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
