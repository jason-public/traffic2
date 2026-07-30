import React, { useState } from 'react';
import { SafetyFacilitySummary, DistrictFloorSignal } from '../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  ShieldAlert,
  Camera,
  Footprints,
  Baby,
  Activity,
  MapPin,
  Car,
  Sliders,
  CheckCircle,
} from 'lucide-react';

interface Props {
  summary: SafetyFacilitySummary;
  floorSignals: DistrictFloorSignal[];
}

export const TrafficSafetySection: React.FC<Props> = ({ summary, floorSignals }) => {
  const [regionFilter, setRegionFilter] = useState<'전체' | '남부' | '북부'>('전체');

  const filteredSignals = floorSignals.filter((item) => {
    if (regionFilter === '전체') return true;
    return item.region === regionFilter;
  });

  const totalFloorSignals = floorSignals.reduce((acc, curr) => acc + curr.count, 0);
  const southTotal = floorSignals
    .filter((s) => s.region === '남부')
    .reduce((acc, curr) => acc + curr.count, 0);
  const northTotal = floorSignals
    .filter((s) => s.region === '북부')
    .reduce((acc, curr) => acc + curr.count, 0);

  // Chart data for floor signals by district
  const chartDataFloor = filteredSignals.map((item) => ({
    district: item.district,
    설치개소: item.count,
    원인자설치: item.causesCount || 0,
  }));

  return (
    <section className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm mb-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-5 border-b border-slate-200 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-rose-600 text-white font-bold text-sm flex items-center justify-center">
              6
            </span>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              어린이보호구역 및 교통안전 시설 현황
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 pl-9">
            신호제어기, 바닥형 신호등, 무인단속카메라, 보호구역, 회전교차로 및 특별교통수단
          </p>
        </div>

        <div className="bg-rose-50 text-rose-900 text-xs font-semibold px-3 py-1.5 rounded-lg border border-rose-200 flex items-center gap-1.5">
          <Footprints className="w-4 h-4 text-rose-600" />
          <span>바닥형 신호등 총 {summary.floorPedestrianSignals.total}개소 설치완료</span>
        </div>
      </div>

      {/* 1. Main Facilities Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/90 space-y-1">
          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            신호제어기
          </span>
          <p className="text-xl font-black text-slate-900">{summary.trafficControllers.toLocaleString()} 대</p>
          <span className="text-[11px] text-slate-500 block">시 관내 교차로 관제</span>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/90 space-y-1">
          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
            <Camera className="w-3.5 h-3.5 text-purple-600" />
            무인 단속카메라
          </span>
          <p className="text-xl font-black text-slate-900">{summary.speedCameras.total} 대</p>
          <span className="text-[11px] text-slate-500 block">
            과속 51(후면5) / 다기능 278(후면20) / 양방향 5
          </span>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/90 space-y-1">
          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
            <Footprints className="w-3.5 h-3.5 text-emerald-600" />
            횡단보도 전체
          </span>
          <p className="text-xl font-black text-slate-900">{summary.crosswalks.total.toLocaleString()} 개소</p>
          <span className="text-[11px] text-slate-500 block">
            신호 2,032 / 비신호 750 / 대각선 54
          </span>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/90 space-y-1">
          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
            <Car className="w-3.5 h-3.5 text-amber-600" />
            특별교통수단 (복지)
          </span>
          <p className="text-xl font-black text-slate-900">{summary.specialTransport.total} 대</p>
          <span className="text-[11px] text-emerald-600 font-bold block">
            법정대수 56대 대비 {summary.specialTransport.complianceRatio} 달성
          </span>
        </div>
      </div>

      {/* 2. Protection Zones Breakdown */}
      <div className="mb-8 bg-gradient-to-r from-amber-50/80 via-orange-50/30 to-amber-50/80 p-5 rounded-xl border border-amber-200/80">
        <h3 className="text-sm font-bold text-amber-950 mb-3 flex items-center gap-2">
          <Baby className="w-4 h-4 text-amber-600" />
          보호구역 지정 현황 (어린이 · 노인 · 장애인)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-amber-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-amber-900 text-sm">어린이 보호구역</span>
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded">
                {summary.protectionZones.children.total} 개소 (60,120m)
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 pt-1">
              <div>• 초등학교: {summary.protectionZones.children.elementary}개소</div>
              <div>• 단설유치원: {summary.protectionZones.children.kindergarten}개소</div>
              <div>• 보육시설: {summary.protectionZones.children.daycare}개소</div>
              <div>• 특수학교: {summary.protectionZones.children.specialSchool}개소</div>
            </div>
            <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
              {summary.protectionZones.children.note}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-slate-900 text-sm">노인 보호구역</span>
              <span className="bg-slate-100 text-slate-800 text-xs font-bold px-2 py-0.5 rounded">
                {summary.protectionZones.elderly.total} 개소 (1,610m)
              </span>
            </div>
            <div className="text-xs text-slate-700 space-y-1 pt-1">
              <div>• 노인여가복지시설: {summary.protectionZones.elderly.leisure}개소</div>
              <div>• 노인의료복지시설: {summary.protectionZones.elderly.medical}개소</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-slate-900 text-sm">장애인 보호구역</span>
              <span className="bg-slate-100 text-slate-800 text-xs font-bold px-2 py-0.5 rounded">
                {summary.protectionZones.disabled.total} 개소 (330m)
              </span>
            </div>
            <div className="text-xs text-slate-700 space-y-1 pt-1">
              <div>• 생활시설: {summary.protectionZones.disabled.living}개소</div>
              <div>• 재활작업장: {summary.protectionZones.disabled.rehab}개소</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Traffic Improvement & Roundabouts */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-blue-600" />
            교통체계개선사업 현황
          </h4>
          <p className="text-2xl font-black text-blue-700">
            총 {summary.trafficImprovementProjects.totalCount} 개소
          </p>
          <div className="mt-3 text-xs bg-white p-3 rounded-lg border border-slate-200 space-y-1">
            <span className="font-bold text-slate-800 block">회전교차로 구축: 23개소</span>
            <div className="text-slate-600 space-y-0.5">
              • 국도비 지원: 8개소 / 시 자체: 5개소 / 기타: 10개소 (도로건설과 2, LH 2, 민간 6)
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
            <Footprints className="w-4 h-4 text-rose-600" />
            보행신호 및 기타 지원장치
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white p-2.5 rounded border border-slate-200">
              <span className="text-slate-500 block">시각장애인 음향신호기</span>
              <span className="font-bold text-slate-900 text-sm">{summary.acousticSignals} 대</span>
            </div>
            <div className="bg-white p-2.5 rounded border border-slate-200">
              <span className="text-slate-500 block">보행자 음성 대기장치</span>
              <span className="font-bold text-slate-900 text-sm">
                {summary.pedestrianVoiceWait.total} 대 (어린이 {summary.pedestrianVoiceWait.childZone})
              </span>
            </div>
            <div className="bg-white p-2.5 rounded border border-slate-200">
              <span className="text-slate-500 block">적색 잔여시간 표시기</span>
              <span className="font-bold text-slate-900 text-sm">
                {summary.redTimerDisplays.total} 대 (어린이 {summary.redTimerDisplays.childZone})
              </span>
            </div>
            <div className="bg-white p-2.5 rounded border border-slate-200">
              <span className="text-slate-500 block">바닥형 보행신호등</span>
              <span className="font-bold text-rose-600 text-sm">
                {summary.floorPedestrianSignals.total} 개소 (어린이 110, 노인 4)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Floor Signal Lights District Breakdown Chart & List */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Detailed Regional Statistics
              </span>
              <span className="bg-cyan-500/20 text-cyan-300 text-[11px] px-2 py-0.5 rounded border border-cyan-500/30">
                총 {totalFloorSignals}개소
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              바닥형 신호등 지역별 설치 현황 (남부 114개소 / 북부 107개소)
            </h3>
          </div>

          {/* Region Toggle */}
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg text-xs">
            {(['전체', '남부', '북부'] as const).map((reg) => (
              <button
                key={reg}
                onClick={() => setRegionFilter(reg)}
                className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                  regionFilter === reg
                    ? 'bg-cyan-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {reg} {reg === '남부' ? `(${southTotal})` : reg === '북부' ? `(${northTotal})` : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="w-full h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartDataFloor} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
              <XAxis dataKey="district" tick={{ fontSize: 11, fill: '#94A3B8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '8px' }}
              />
              <Bar dataKey="설치개소" fill="#06B6D4" radius={[4, 4, 0, 0]} name="설치 개소" />
              <Bar dataKey="원인자설치" fill="#F59E0B" radius={[4, 4, 0, 0]} name="원인자 부담" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {filteredSignals.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-800/90 p-3 rounded-xl border border-slate-700/80 hover:border-cyan-500/50 transition-all"
            >
              <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1 font-semibold">
                <span>{item.region}</span>
                {item.causesCount ? (
                  <span className="text-amber-400">원인자 {item.causesCount}</span>
                ) : null}
              </div>
              <p className="font-bold text-white text-sm">{item.district}</p>
              <p className="text-lg font-black text-cyan-300 mt-1">{item.count} 개소</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
