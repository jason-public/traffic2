import React, { useState } from 'react';
import { GtxPhase2Item } from '../types';
import { Network, ArrowRight, Route, HelpCircle, Layers } from 'lucide-react';

interface Props {
  lines: GtxPhase2Item[];
}

export const GtxPhase2Section: React.FC<Props> = ({ lines }) => {
  const [selectedLineId, setSelectedLineId] = useState<string>('gtx-d');

  const currentLine = lines.find((l) => l.id === selectedLineId) || lines[0];

  return (
    <section className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm mb-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-5 border-b border-slate-200 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-teal-600 text-white font-bold text-sm flex items-center justify-center">
              3
            </span>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              신규 2기 GTX-D, E, F, G 노선
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 pl-9">
            2024. 1. 25. 국토교통부 발표 및 2024. 5. 제5차 국가철도망 구축계획 건의 노선
          </p>
        </div>

        <div className="bg-teal-50 text-teal-800 text-xs font-semibold px-3 py-1.5 rounded-lg border border-teal-200 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-teal-600" />
          <span>수도권 전역 동서/순환 고속 철도망</span>
        </div>
      </div>

      {/* Schematic Interactive Map Canvas Box */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white mb-6 border border-slate-800 shadow-inner relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-1">
              Interactive Schematic Line Map
            </span>
            <h3 className="text-lg font-bold text-white">2기 GTX 수도권 광역노선망 다이어그램</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {lines.map((line) => (
              <button
                key={line.id}
                onClick={() => setSelectedLineId(line.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedLineId === line.id
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {line.line}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Schematic Diagram for GTX D, E, F, G */}
        <div className="bg-slate-950/80 rounded-xl p-5 border border-slate-800/80 flex flex-col items-center justify-center min-h-[220px]">
          {selectedLineId === 'gtx-d' && (
            <div className="w-full max-w-lg space-y-4 py-2">
              <div className="text-center font-bold text-cyan-300 text-sm mb-2">
                GTX - D 노선 (Y자 분기 구조 Diagram)
              </div>
              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex flex-col gap-2">
                  <span className="bg-blue-600/30 text-blue-300 border border-blue-500/50 px-3 py-1.5 rounded-lg">
                    김포
                  </span>
                  <span className="bg-blue-600/30 text-blue-300 border border-blue-500/50 px-3 py-1.5 rounded-lg">
                    인천
                  </span>
                </div>

                {/* Y Branch SVG Connectors */}
                <div className="flex-1 px-4 flex items-center justify-center">
                  <svg className="w-32 h-16 text-cyan-400" viewBox="0 0 120 60">
                    <path d="M 10 15 L 60 30 L 110 15" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="4 2" />
                    <path d="M 10 45 L 60 30 L 110 45" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="4 2" />
                    <circle cx="60" cy="30" r="6" fill="#06B6D4" />
                  </svg>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="bg-cyan-500 text-slate-950 px-3 py-1.5 rounded-lg font-bold shadow-md">
                    팔당 (남양주)
                  </span>
                  <span className="bg-blue-600/30 text-blue-300 border border-blue-500/50 px-3 py-1.5 rounded-lg">
                    원주
                  </span>
                </div>
              </div>
              <p className="text-center text-[11px] text-slate-400 pt-2">
                총 연장 185km | 수도권 남부 동-서 연결 및 팔당 직결
              </p>
            </div>
          )}

          {selectedLineId === 'gtx-e' && (
            <div className="w-full max-w-lg space-y-4 py-2 text-center">
              <div className="font-bold text-emerald-400 text-sm mb-2">GTX - E 노선 (수도권 북부 동-서)</div>
              <div className="flex items-center justify-center gap-2 flex-wrap text-xs font-bold">
                <span className="bg-slate-800 px-3 py-2 rounded-lg text-slate-300">인천</span>
                <span className="text-slate-500">➔</span>
                <span className="bg-slate-800 px-3 py-2 rounded-lg text-slate-300">대장</span>
                <span className="text-slate-500">➔</span>
                <span className="bg-emerald-500 text-slate-950 px-4 py-2 rounded-lg shadow-md font-extrabold">
                  덕소 (남양주)
                </span>
              </div>
              <p className="text-[11px] text-slate-400 pt-2">
                총 연장 88km | 1단계 구간 (일부 D 노선 공용)
              </p>
            </div>
          )}

          {selectedLineId === 'gtx-f' && (
            <div className="w-full max-w-lg space-y-4 py-2 text-center">
              <div className="font-bold text-amber-400 text-sm mb-2">GTX - F 노선 (거점 순환)</div>
              <div className="flex items-center justify-center gap-3 text-xs font-bold">
                <span className="bg-slate-800 px-3 py-2 rounded-lg text-slate-300">교산</span>
                <span className="text-amber-400 font-extrabold">↔ 직결 14km ↔</span>
                <span className="bg-amber-500 text-slate-950 px-4 py-2 rounded-lg shadow-md font-extrabold">
                  왕숙2 (가칭)
                </span>
              </div>
              <p className="text-[11px] text-slate-400 pt-2">
                총 연장 14km | 1단계 구간 (F - D 노선 직결)
              </p>
            </div>
          )}

          {selectedLineId === 'gtx-g' && (
            <div className="w-full max-w-lg space-y-4 py-2 text-center">
              <div className="font-bold text-purple-400 text-sm mb-2">GTX - G 노선 (동북부 - 서남부)</div>
              <div className="flex items-center justify-center gap-3 text-xs font-bold">
                <span className="bg-slate-800 px-3 py-2 rounded-lg text-slate-300">숭의</span>
                <span className="text-purple-400 font-extrabold">↔ 84.4km ↔</span>
                <span className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md font-extrabold">
                  포천 (별내/진접 연계)
                </span>
              </div>
              <p className="text-[11px] text-slate-400 pt-2">
                총 연장 84.4km | 경기도 주관 추진 노선
              </p>
            </div>
          )}
        </div>

        {/* Selected Line Card Banner */}
        {currentLine ? (
          <div className="mt-4 bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-cyan-300 text-sm block">{currentLine.line} 세부 개요</span>
              <span className="text-slate-300 mt-0.5 block">{currentLine.route}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-slate-900 px-3 py-1 rounded text-cyan-400 font-bold border border-slate-700">
                {currentLine.distance}
              </span>
              <span className="bg-amber-500/20 text-amber-300 px-3 py-1 rounded font-bold border border-amber-500/30">
                {currentLine.remarks}
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 text-center text-xs text-slate-400">
            선택된 검색 조건에 해당하는 2기 GTX 노선이 없습니다.
          </div>
        )}
      </div>

      {/* Comparison Grid Table */}
      {lines.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500">
          해당 검색 조건 또는 지역에 대한 2기 GTX 노선 내역이 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {lines.map((line) => (
            <div
              key={line.id}
              onClick={() => setSelectedLineId(line.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedLineId === line.id
                  ? 'bg-blue-50/80 border-blue-500 shadow-md ring-2 ring-blue-400/30'
                  : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-extrabold text-base text-slate-900" style={{ color: line.color }}>
                  {line.line}
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                  {line.distance}
                </span>
              </div>

              <div className="text-xs text-slate-700 font-semibold mb-3 line-clamp-2">
                {line.route}
              </div>

              <div className="text-[11px] text-slate-600 bg-white p-2 rounded border border-slate-200 mb-2">
                <span className="font-bold block text-slate-800">기대효과:</span>
                {line.impact}
              </div>

              <div className="text-[11px] text-slate-500 bg-slate-100 p-2 rounded">
                <span className="font-bold block text-slate-700">비고:</span>
                {line.remarks}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 p-3 rounded-xl bg-slate-100 text-xs text-slate-600 flex items-center gap-2 border border-slate-200">
        <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
        <span>
          <strong>추진 일정:</strong> 2024. 1. 25. 2기 신규 GTX 발표 (국토교통부) ➔ 2024. 5. 제5차 국가철도망 구축계획 건의
        </span>
      </div>
    </section>
  );
};
