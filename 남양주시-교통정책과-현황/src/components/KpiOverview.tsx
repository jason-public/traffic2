import React from 'react';
import { Train, ShieldCheck, Camera, Users, Landmark, AlertTriangle } from 'lucide-react';
import { SAFETY_FACILITY_SUMMARY, URBAN_METROS } from '../data/trafficData';

export const KpiOverview: React.FC = () => {
  // Calculate total daily ridership across urban metros
  const totalDailyPassengers = URBAN_METROS.reduce(
    (acc, cur) => acc + cur.dailyRidership.totalAvg,
    0
  );

  const kpis = [
    {
      title: '주요 철도사업 추진',
      value: '10.5조원 +',
      subtitle: 'GTX-B(7.06조) + 9호선(2.82조) + 별내선(4,196억)',
      icon: Landmark,
      color: 'from-blue-600 to-indigo-700',
      textColor: 'text-blue-600',
      badge: '대형 국책사업',
    },
    {
      title: '도시철도 일평균 이용객',
      value: `${totalDailyPassengers.toLocaleString()} 명`,
      subtitle: `별내선 37,075명 + 진접선 33,557명 (2026.7 기준)`,
      icon: Users,
      color: 'from-emerald-600 to-teal-700',
      textColor: 'text-emerald-600',
      badge: '실제 이용수요',
    },
    {
      title: '바닥형 보행신호등',
      value: `${SAFETY_FACILITY_SUMMARY.floorPedestrianSignals.total} 개소`,
      subtitle: `남부 114개소 / 북부 107개소 (어린이 110, 노인 4)`,
      icon: ShieldCheck,
      color: 'from-cyan-600 to-blue-700',
      textColor: 'text-cyan-600',
      badge: '스마트 보행안전',
    },
    {
      title: '어린이보호구역',
      value: `${SAFETY_FACILITY_SUMMARY.protectionZones.children.total} 개소`,
      subtitle: `초교 69 / 유치원 34 / 보육시설 22 / 특수 1`,
      icon: AlertTriangle,
      color: 'from-amber-600 to-orange-700',
      textColor: 'text-amber-600',
      badge: '안전 통학로',
    },
    {
      title: '단속카메라 (무인)',
      value: `${SAFETY_FACILITY_SUMMARY.speedCameras.total} 대`,
      subtitle: `과속 51대(후면 5) / 다기능 278대(후면 20) / 양방향 5대`,
      icon: Camera,
      color: 'from-indigo-600 to-purple-700',
      textColor: 'text-purple-600',
      badge: '교통단속 장비',
    },
    {
      title: '특별교통수단 (바우처/복지)',
      value: `${SAFETY_FACILITY_SUMMARY.specialTransport.total} 대`,
      subtitle: `법정대수 56대 대비 ${SAFETY_FACILITY_SUMMARY.specialTransport.complianceRatio} 달성`,
      icon: Train,
      color: 'from-rose-600 to-pink-700',
      textColor: 'text-rose-600',
      badge: '교통약자 이동권',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      {kpis.map((kpi, idx) => {
        const IconComponent = kpi.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Top accent bar */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${kpi.color}`} />

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                  {kpi.badge}
                </span>
                <div className={`p-2 rounded-xl bg-slate-50 ${kpi.textColor}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-xs font-medium text-slate-500">{kpi.title}</h3>
              <p className="text-xl font-black text-slate-900 mt-1 tracking-tight">{kpi.value}</p>
            </div>

            <p className="text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-100 line-clamp-2">
              {kpi.subtitle}
            </p>
          </div>
        );
      })}
    </div>
  );
};
