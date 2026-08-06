import React from 'react';
import { UrbanMetroData } from '../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Train, Calendar, TrendingUp, AlertTriangle, Coins, Clock } from 'lucide-react';

interface Props {
  metros: UrbanMetroData[];
}

export const UrbanMetroSection: React.FC<Props> = ({ metros }) => {
  // Chart Data Preparation for Ridership
  const chartDataRidership = [
    {
      name: '일 평균 이용객',
      진접선: metros[0]?.dailyRidership?.totalAvg ?? 0,
      별내선: metros[1]?.dailyRidership?.totalAvg ?? 0,
    },
    {
      name: '평일 이용객',
      진접선: metros[0]?.dailyRidership?.weekday ?? 0,
      별내선: metros[1]?.dailyRidership?.weekday ?? 0,
    },
    {
      name: '휴일 이용객',
      진접선: metros[0]?.dailyRidership?.holiday ?? 0,
      별내선: metros[1]?.dailyRidership?.holiday ?? 0,
    },
  ];

  return (
    <section className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm mb-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-5 border-b border-slate-200 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold text-sm flex items-center justify-center">
              4
            </span>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              도시철도(진접선, 별내선) 운행 현황
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 pl-9">
            4호선 연장(진접선) 및 8호선 연장(별내선) 운행 실적, 이용수요 및 시비 부담 현황
          </p>
        </div>

        <div className="bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span>합계 일평균 70,632명 수송</span>
        </div>
      </div>

      {/* Recharts Analytics Row */}
      <div className="mb-8 bg-slate-50 p-5 rounded-xl border border-slate-200">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <BarChart className="w-4 h-4 text-blue-600" />
          진접선 vs 별내선 이용수요(승객 수) 비교 차트
        </h3>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartDataRidership} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#475569' }} />
              <YAxis tick={{ fontSize: 12, fill: '#475569' }} />
              <Tooltip
                formatter={(value: number) => [`${value.toLocaleString()} 명`, '']}
                contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '8px' }}
              />
              <Legend
                content={() => (
                  <div className="flex items-center justify-center gap-6 pt-3 text-xs font-medium text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-[#38BDF8] inline-block rounded-xs"></span>
                      <span>진접선 (4호선)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-[#EC4899] inline-block rounded-xs"></span>
                      <span>별내선 (8호선)</span>
                    </div>
                  </div>
                )}
              />
              <Bar dataKey="진접선" fill="#38BDF8" radius={[4, 4, 0, 0]} name="진접선 (4호선)" />
              <Bar dataKey="별내선" fill="#EC4899" radius={[4, 4, 0, 0]} name="별내선 (8호선)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Side-by-Side Detailed Metro Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metros.map((metro) => {
          const isByeolnae = metro.id === 'byeolnae-line';

          return (
            <div
              key={metro.id}
              className={`rounded-2xl p-6 border transition-all space-y-5 ${
                isByeolnae
                  ? 'bg-gradient-to-b from-pink-50/80 via-white to-slate-50/50 border-pink-300'
                  : 'bg-gradient-to-b from-sky-50/80 via-white to-slate-50/50 border-sky-300'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      isByeolnae
                        ? 'bg-pink-600 text-white'
                        : 'bg-sky-500 text-white'
                    }`}
                  >
                    {isByeolnae ? '8호선 연장' : '4호선 연장'}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">{metro.name}</h3>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-slate-500 block">개통일</span>
                  <span className="text-xs font-bold text-slate-800 bg-white px-2 py-1 rounded border border-slate-200">
                    {metro.openingDate}
                  </span>
                </div>
              </div>

              {/* Section Details */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                <span className="text-slate-500 font-semibold block">운행 구간</span>
                <p className="font-bold text-slate-900 text-sm">{metro.section}</p>
              </div>

              {/* Trip Frequencies */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-1 text-slate-500 font-medium mb-1">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    <span>평일 운행 횟수</span>
                  </div>
                  <p className="font-bold text-slate-900 text-sm">{metro.weekdayTrips}</p>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-1 text-slate-500 font-medium mb-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-500" />
                    <span>휴일 운행 횟수</span>
                  </div>
                  <p className="font-bold text-slate-900 text-sm">{metro.holidayTrips}</p>
                </div>
              </div>

              {/* Daily Ridership Breakdown */}
              <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs text-slate-400 font-semibold">
                    이용수요 현황 ('26. 7. 기준)
                  </span>
                  <span className="text-xs font-bold text-cyan-400">
                    {metro.stationsCount}개 역사 관리
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="bg-slate-800/80 p-2 rounded">
                    <span className="text-[10px] text-slate-400 block">일 평균</span>
                    <span className="text-sm font-extrabold text-cyan-300">
                      {metro.dailyRidership.totalAvg.toLocaleString()}명
                    </span>
                  </div>
                  <div className="bg-slate-800/80 p-2 rounded">
                    <span className="text-[10px] text-slate-400 block">평 일</span>
                    <span className="text-sm font-bold text-white">
                      {metro.dailyRidership.weekday.toLocaleString()}명
                    </span>
                  </div>
                  <div className="bg-slate-800/80 p-2 rounded">
                    <span className="text-[10px] text-slate-400 block">휴 일</span>
                    <span className="text-sm font-bold text-slate-300">
                      {metro.dailyRidership.holiday.toLocaleString()}명
                    </span>
                  </div>
                </div>
              </div>

              {/* Operating Finances & Deficit */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                  <span className="text-amber-800 font-medium block">연간 운영비</span>
                  <span className="text-base font-extrabold text-amber-900">
                    {metro.annualOperatingCost}
                  </span>
                </div>

                <div className="bg-rose-50 p-3 rounded-xl border border-rose-200">
                  <span className="text-rose-800 font-medium block">연간 이용수지</span>
                  <span className="text-base font-extrabold text-rose-900">
                    {metro.annualBalance}
                  </span>
                  <span className="text-[10px] text-rose-600 block mt-0.5">
                    ({metro.fundingNotes})
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
