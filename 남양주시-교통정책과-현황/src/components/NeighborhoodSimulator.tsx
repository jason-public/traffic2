import React from 'react';
import {
  RAILWAY_PLANS,
  GTX_OPERATIONS,
  GTX_PHASE2,
  TRANSIT_HUBS,
  DISTRICT_FLOOR_SIGNALS,
} from '../data/trafficData';
import { MapPin, Train, ShieldCheck, Bus, Sparkles } from 'lucide-react';

interface Props {
  selectedNeighborhood: string;
  onResetNeighborhood: () => void;
}

export const NeighborhoodSimulator: React.FC<Props> = ({
  selectedNeighborhood,
  onResetNeighborhood,
}) => {
  if (selectedNeighborhood === '전체 (모든 지역)') return null;

  // Clean neighborhood term for matching
  const cleanTerm = selectedNeighborhood.replace(/\(.*\)/, '');

  const matchingRailway = RAILWAY_PLANS.filter((item) =>
    item.affectedNeighborhoods.some((n) => n.includes(cleanTerm) || cleanTerm.includes(n))
  );

  const matchingGtxOps = GTX_OPERATIONS.filter((item) =>
    item.affectedNeighborhoods.some((n) => n.includes(cleanTerm) || cleanTerm.includes(n))
  );

  const matchingGtxPhase2 = GTX_PHASE2.filter((item) =>
    item.affectedNeighborhoods.some((n) => n.includes(cleanTerm) || cleanTerm.includes(n))
  );

  const matchingHubs = TRANSIT_HUBS.filter((item) =>
    item.affectedNeighborhoods.some((n) => n.includes(cleanTerm) || cleanTerm.includes(n))
  );

  const matchingFloorSignal = DISTRICT_FLOOR_SIGNALS.find((s) =>
    s.district.includes(cleanTerm) || cleanTerm.includes(s.district.split('·')[0])
  );

  return (
    <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-blue-700/50 mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-blue-800/80 mb-5">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-600 rounded-xl">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest block">
              맞춤 지역 교통 리포트
            </span>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <span>{selectedNeighborhood}</span>
              <span className="text-xs font-normal text-blue-200 bg-blue-800/60 px-2.5 py-0.5 rounded-full border border-blue-700">
                지역별 주요 교통 사업
              </span>
            </h3>
          </div>
        </div>

        <button
          onClick={onResetNeighborhood}
          className="text-xs bg-slate-800/90 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors self-start sm:self-auto"
        >
          전체 보기로 복귀 ✕
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Railway & GTX Highlights */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
          <h4 className="font-bold text-cyan-300 text-sm flex items-center gap-1.5">
            <Train className="w-4 h-4 text-cyan-400" />
            연계 철도 상위계획 & GTX ({matchingRailway.length + matchingGtxOps.length + matchingGtxPhase2.length}건)
          </h4>

          {matchingRailway.length === 0 && matchingGtxOps.length === 0 && matchingGtxPhase2.length === 0 ? (
            <p className="text-xs text-slate-400 py-3">해당 지역 직접 통과 철도 사업 검색 중...</p>
          ) : (
            <div className="space-y-2 max-h-52 overflow-y-auto pr-1 no-scrollbar text-xs">
              {matchingRailway.map((r) => (
                <div key={r.id} className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                  <div className="font-bold text-white flex items-center justify-between">
                    <span>{r.lineName}</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">
                      {r.status}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-1">{r.route}</p>
                </div>
              ))}

              {matchingGtxOps.map((g) => (
                <div key={g.id} className="bg-indigo-950/80 p-2.5 rounded-lg border border-indigo-800">
                  <div className="font-bold text-amber-300 flex items-center justify-between">
                    <span>{g.name}</span>
                    <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-bold">
                      {g.type}
                    </span>
                  </div>
                  <p className="text-indigo-200 text-[11px] mt-1">{g.impact}</p>
                </div>
              ))}

              {matchingGtxPhase2.map((p) => (
                <div key={p.id} className="bg-slate-900 p-2.5 rounded-lg border border-cyan-500/30">
                  <div className="font-bold text-cyan-300 flex items-center justify-between">
                    <span>{p.line}</span>
                    <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded">
                      {p.distance}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] mt-1">{p.route}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Transit Hubs & BRT/BTX */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
          <h4 className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
            <Bus className="w-4 h-4 text-amber-400" />
            광역교통개선 시설 & BRT/BTX ({matchingHubs.length}건)
          </h4>

          {matchingHubs.length === 0 ? (
            <p className="text-xs text-slate-400 py-3">해당 지역 환승시설 사업 내역 없음</p>
          ) : (
            <div className="space-y-2 max-h-52 overflow-y-auto pr-1 no-scrollbar text-xs">
              {matchingHubs.map((h) => (
                <div key={h.id} className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <div className="font-bold text-amber-200 flex items-center justify-between">
                    <span>{h.projectName}</span>
                    <span className="text-amber-400 font-bold">{h.budgetInHundredMillion}억원</span>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-1">
                    시행시기: {h.implementationPeriod} | 재원: {h.fundingDivision}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Floor Signal Installation Status for Town */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-rose-300 text-sm flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-rose-400" />
              지역 스마트 보행안전시설
            </h4>

            {matchingFloorSignal ? (
              <div className="mt-3 bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">바닥형 보행신호등</span>
                  <span className="text-lg font-black text-rose-400">
                    {matchingFloorSignal.count} 개소
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-400 border-t border-slate-800 pt-2">
                  <span>행정구역 구분</span>
                  <span className="text-white font-semibold">
                    남양주시 {matchingFloorSignal.region}권역
                  </span>
                </div>

                {matchingFloorSignal.causesCount ? (
                  <div className="bg-amber-500/10 text-amber-300 p-2 rounded text-[11px] border border-amber-500/20">
                    원인자 부담 설치: {matchingFloorSignal.causesCount}개소 포함
                  </div>
                ) : null}
              </div>
            ) : (
              <p className="text-xs text-slate-400 py-3">
                관내 어린이보호구역 및 보행안전시설 계속 확충 추진 중
              </p>
            )}
          </div>

          <div className="text-[11px] text-blue-200 bg-blue-900/40 p-2.5 rounded-lg border border-blue-800">
            💡 남양주시는 철도망 연장과 스마트 교통안전시설 확충을 통해 시민 이동 편의성을 지속 증진하고 있습니다.
          </div>
        </div>
      </div>
    </div>
  );
};
