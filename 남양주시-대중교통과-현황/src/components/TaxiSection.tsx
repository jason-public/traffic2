import React, { useState } from 'react';
import {
  TAXI_SUMMARY,
  TAXI_SHELTERS,
  QUIET_TAXI_STATS,
  FUEL_TYPE_STATS,
  TAXI_STANDS
} from '../data/transitData';
import { Car, Search, Home, HeartHandshake, Fuel, MapPin, Zap } from 'lucide-react';

export const TaxiSection: React.FC = () => {
  const [standSearch, setStandSearch] = useState('');
  const [standFilter, setStandFilter] = useState<'전체' | '포스트형' | '쉘터형' | '태양광'>('전체');

  const filteredStands = TAXI_STANDS.filter((stand) => {
    let matchesType = true;
    if (standFilter === '포스트형') matchesType = stand.type === '포스트형';
    if (standFilter === '쉘터형') matchesType = stand.type === '쉘터형';
    if (standFilter === '태양광') matchesType = stand.solarLighting === true;

    const matchesSearch = stand.location.toLowerCase().includes(standSearch.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="bg-amber-500/20 text-amber-300 text-xs px-2.5 py-0.5 rounded-full border border-amber-500/30 font-semibold">
              택시 행정 및 복지 시설
            </span>
            <h3 className="text-2xl font-bold mt-1">남양주시 택시 운행 및 승차대 현황</h3>
            <p className="text-xs text-slate-300 mt-1">
              면허대수 총 1,291대, 종사자 1,514명, 남부/북부 택시쉼터 운영, 고요한택시 지원, 택시승차대 53개소 구축
            </p>
          </div>
          <div className="flex items-center space-x-3 bg-slate-800 p-3 rounded-lg border border-slate-700 text-center font-mono shrink-0">
            <div>
              <span className="text-[10px] text-slate-400 block">총 면허대수</span>
              <span className="text-2xl font-black text-white">1,291 대</span>
            </div>
            <div className="border-l border-slate-700 pl-3">
              <span className="text-[10px] text-amber-300 block">운수종사자</span>
              <span className="text-2xl font-black text-amber-300">1,514 명</span>
            </div>
          </div>
        </div>
      </div>

      {/* 11 & 15. 택시 현황 & 유종별 현황 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 택시 면허 현황 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h4 className="font-bold text-slate-900 text-base flex items-center space-x-2">
              <Car className="w-5 h-5 text-amber-600" />
              <span>택시 면허 및 종사자 현황</span>
            </h4>
            <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded font-mono">
              2026.07 기준
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-white font-medium">
                <tr>
                  <th className="p-2.5">구분</th>
                  <th className="p-2.5 text-right">면허대수</th>
                  <th className="p-2.5 text-right">업체수</th>
                  <th className="p-2.5 text-right">운수종사자</th>
                  <th className="p-2.5">비고</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {TAXI_SUMMARY.map((row) => (
                  <tr key={row.category} className={row.category === '합계' ? 'font-bold bg-amber-50/50 text-slate-900' : 'hover:bg-slate-50'}>
                    <td className="p-2.5 font-sans font-medium">{row.category}</td>
                    <td className="p-2.5 text-right">{row.licenses.toLocaleString()}대</td>
                    <td className="p-2.5 text-right">{row.companiesCount}개</td>
                    <td className="p-2.5 text-right">{row.driversCount.toLocaleString()}명</td>
                    <td className="p-2.5 font-sans text-slate-500 text-[11px]">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 유종별 현황 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h4 className="font-bold text-slate-900 text-base flex items-center space-x-2">
              <Fuel className="w-5 h-5 text-emerald-600" />
              <span>택시 유종별 등록 현황</span>
            </h4>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded font-bold">
              전기택시 168대 (13.0%)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-white font-medium">
                <tr>
                  <th className="p-2.5">택시 구분</th>
                  <th className="p-2.5 text-right">등록대수</th>
                  <th className="p-2.5 text-right">LPG</th>
                  <th className="p-2.5 text-right">전기 (EV)</th>
                  <th className="p-2.5 text-right">하이브리드</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {FUEL_TYPE_STATS.map((row) => (
                  <tr key={row.type} className={row.type === '합계' ? 'font-bold bg-emerald-50/50 text-slate-900' : 'hover:bg-slate-50'}>
                    <td className="p-2.5 font-sans font-medium">{row.type}</td>
                    <td className="p-2.5 text-right text-slate-900 font-bold">{row.total.toLocaleString()}대</td>
                    <td className="p-2.5 text-right">{row.lpg.toLocaleString()}대</td>
                    <td className="p-2.5 text-right text-emerald-700 font-bold">{row.electric.toLocaleString()}대</td>
                    <td className="p-2.5 text-right">{row.hybrid}대</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 택시쉼터 & 고요한택시 (Section 11, 12) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 남부택시쉼터 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
            <Home className="w-5 h-5 text-amber-600" />
            <h4 className="font-bold text-slate-900 text-sm">남부택시쉼터 (호평동)</h4>
          </div>
          <div className="text-xs space-y-1.5 text-slate-700">
            <p><strong>위치:</strong> {TAXI_SHELTERS[0].location}</p>
            <p><strong>규모:</strong> {TAXI_SHELTERS[0].scale}</p>
            <p><strong>운영:</strong> {TAXI_SHELTERS[0].operationMode}</p>
            <p><strong>이용현황:</strong> {TAXI_SHELTERS[0].dailyUsers}</p>
          </div>
        </div>

        {/* 북부택시쉼터 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
            <Home className="w-5 h-5 text-blue-600" />
            <h4 className="font-bold text-slate-900 text-sm">북부택시쉼터 (오남읍)</h4>
          </div>
          <div className="text-xs space-y-1.5 text-slate-700">
            <p><strong>위치:</strong> {TAXI_SHELTERS[1].location}</p>
            <p><strong>규모:</strong> {TAXI_SHELTERS[1].scale}</p>
            <p><strong>운영:</strong> {TAXI_SHELTERS[1].operationMode}</p>
            <p><strong>이용현황:</strong> {TAXI_SHELTERS[1].dailyUsers}</p>
          </div>
        </div>

        {/* 고요한택시 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
            <HeartHandshake className="w-5 h-5 text-indigo-600" />
            <h4 className="font-bold text-slate-900 text-sm">고요한택시 운행 현황</h4>
          </div>
          <div className="text-xs space-y-2 text-slate-700">
            <p className="leading-snug">
              청각장애인 택시기사 고용으로 사회적 가치를 실현하는 취약계층 일자리 연계 프로그램 (총 3대 운행)
            </p>
            <div className="bg-slate-50 p-2 rounded border border-slate-200 font-mono text-[11px] space-y-1">
              <div>• 금성운수(합): 1대</div>
              <div>• 신안운수(주): 2대</div>
            </div>
            <p className="text-[11px] text-blue-800 font-semibold">
              ※ 청각장애인 고용시 1인당 120천원/월 보조금 지급
            </p>
          </div>
        </div>
      </div>

      {/* 13. 택시승차대 현황 (53개소) */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base">택시승차대 현황 (총 53개소)</h3>
            <p className="text-xs text-slate-500">포스트형 23개소, 쉘터형 30개소, 태양광조명 7개소 설치 완료</p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex items-center space-x-1 text-xs bg-slate-100 p-1 rounded-lg">
              {(['전체', '포스트형', '쉘터형', '태양광'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setStandFilter(type)}
                  className={`px-2.5 py-1 rounded transition font-medium ${
                    standFilter === type ? 'bg-blue-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={standSearch}
                onChange={(e) => setStandSearch(e.target.value)}
                placeholder="위치 검색 (예: 호평동, 이마트...)"
                className="pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs w-full sm:w-56 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-lg touch-scroll mobile-table-wrap">
          <table className="w-full text-left text-xs mobile-compact-table whitespace-nowrap">
            <thead className="bg-slate-900 text-white font-medium">
              <tr>
                <th className="p-2.5 text-center">연번</th>
                <th className="p-2.5">위치</th>
                <th className="p-2.5 text-center">형식</th>
                <th className="p-2.5 text-center">태양광조명</th>
                <th className="p-2.5 text-center">설치연도</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStands.map((stand) => (
                <tr key={stand.id} className="hover:bg-slate-50 transition">
                  <td className="p-2.5 text-center font-mono text-slate-500">{stand.id}</td>
                  <td className="p-2.5 font-medium text-slate-900">{stand.location}</td>
                  <td className="p-2.5 text-center font-semibold">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] ${
                        stand.type === '쉘터형' ? 'bg-blue-100 text-blue-900' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {stand.type}
                    </span>
                  </td>
                  <td className="p-2.5 text-center">
                    {stand.solarLighting ? (
                      <span className="bg-blue-600 text-white font-bold text-[10px] px-2 py-0.5 rounded">
                        태양광 설치
                      </span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                  <td className="p-2.5 text-center font-mono text-slate-600">{stand.installedYear}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
