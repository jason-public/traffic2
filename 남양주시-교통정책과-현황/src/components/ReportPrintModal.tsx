import React from 'react';
import {
  RAILWAY_PLANS,
  GTX_OPERATIONS,
  GTX_PHASE2,
  URBAN_METROS,
  TRANSIT_HUBS,
  SAFETY_FACILITY_SUMMARY,
  DISTRICT_FLOOR_SIGNALS,
} from '../data/trafficData';
import { Printer, X, FileText, CheckCircle, ShieldAlert } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportPrintModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 text-slate-900 relative p-6 sm:p-10 font-sans print:max-w-none print:p-0 print:shadow-none print:border-none">
        {/* Floating Actions Bar (Hidden on print) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-lg text-slate-900">
              교통정책과 현황 보고서 (공식 문서 모드)
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-lg shadow transition-all"
            >
              <Printer className="w-4 h-4" />
              인쇄하기 / PDF 저장
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official Printable Document Body */}
        <div className="space-y-8 text-sm leading-relaxed text-slate-900">
          {/* Document Header */}
          <div className="text-center border-b-2 border-slate-900 pb-6">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">
              남양주시 교통국
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              교 통 정 책 과
            </h1>
            <p className="text-sm font-semibold text-slate-600 mt-2">
              주요 철도망 확충 및 교통안전 시설 통합 현황 보고서
            </p>
            <div className="text-xs text-slate-400 mt-3">작성일자: 2026. 7. 현황 기준</div>
          </div>

          {/* 1. 철도사업 상위계획 */}
          <div className="space-y-3">
            <h2 className="text-base font-bold bg-slate-100 p-2.5 rounded text-slate-900 border-l-4 border-blue-600 flex items-center justify-between">
              <span>1. 철도사업 상위계획 확정 (4차 국가철도망, 4차 대도시권 광역교통시행계획)</span>
            </h2>

            <table className="w-full text-xs text-left border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-200 text-slate-800 font-bold border-b border-slate-300">
                  <th className="p-2 border border-slate-300">구분</th>
                  <th className="p-2 border border-slate-300">반영여부</th>
                  <th className="p-2 border border-slate-300">노선</th>
                  <th className="p-2 border border-slate-300">사업내용</th>
                  <th className="p-2 border border-slate-300">사업비</th>
                  <th className="p-2 border border-slate-300">진행사항</th>
                </tr>
              </thead>
              <tbody>
                {RAILWAY_PLANS.map((r) => (
                  <tr key={r.id} className="border-b border-slate-200">
                    <td className="p-2 font-bold border border-slate-300">{r.lineName}</td>
                    <td className="p-2 border border-slate-300">{r.status}</td>
                    <td className="p-2 border border-slate-300">{r.route}</td>
                    <td className="p-2 border border-slate-300">{r.distance}</td>
                    <td className="p-2 border border-slate-300 font-semibold">{r.budget}</td>
                    <td className="p-2 border border-slate-300">{r.progress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 2. GTX-B 노선 및 철도운영 */}
          <div className="space-y-3">
            <h2 className="text-base font-bold bg-slate-100 p-2.5 rounded text-slate-900 border-l-4 border-indigo-600">
              2. GTX-B 노선, 철도운영 개선 조속 추진
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {GTX_OPERATIONS.map((g) => (
                <div key={g.id} className="p-3 border border-slate-300 rounded space-y-1">
                  <div className="font-bold text-sm text-indigo-900">{g.name}</div>
                  <div>
                    <strong>노선:</strong> {g.route}
                  </div>
                  {g.budget && (
                    <div>
                      <strong>사업비:</strong> {g.budget}
                    </div>
                  )}
                  <div>
                    <strong>기대효과:</strong> {g.impact}
                  </div>
                  <div className="text-slate-600">
                    <strong>진행사항:</strong> {g.progress}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. 신규 2기 GTX */}
          <div className="space-y-3">
            <h2 className="text-base font-bold bg-slate-100 p-2.5 rounded text-slate-900 border-l-4 border-teal-600">
              3. 신규 2기 GTX-D, E, F, G 노선
            </h2>

            <table className="w-full text-xs text-left border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-200 text-slate-800 font-bold border-b border-slate-300">
                  <th className="p-2 border border-slate-300">구분</th>
                  <th className="p-2 border border-slate-300">노선</th>
                  <th className="p-2 border border-slate-300">사업내용</th>
                  <th className="p-2 border border-slate-300">기대효과</th>
                  <th className="p-2 border border-slate-300">비고</th>
                </tr>
              </thead>
              <tbody>
                {GTX_PHASE2.map((p) => (
                  <tr key={p.id} className="border-b border-slate-200">
                    <td className="p-2 font-bold border border-slate-300">{p.line}</td>
                    <td className="p-2 border border-slate-300">{p.route}</td>
                    <td className="p-2 border border-slate-300">{p.distance}</td>
                    <td className="p-2 border border-slate-300">{p.impact}</td>
                    <td className="p-2 border border-slate-300">{p.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 4. 도시철도 현황 */}
          <div className="space-y-3">
            <h2 className="text-base font-bold bg-slate-100 p-2.5 rounded text-slate-900 border-l-4 border-emerald-600">
              4. 도시철도(진접선, 별내선) 현황
            </h2>

            <div className="grid grid-cols-2 gap-4 text-xs">
              {URBAN_METROS.map((m) => (
                <div key={m.id} className="p-3 border border-slate-300 rounded space-y-1">
                  <div className="font-bold text-sm text-emerald-900">{m.name}</div>
                  <div>개통일: {m.openingDate}</div>
                  <div>구간: {m.section}</div>
                  <div>
                    운행횟수: 평일 {m.weekdayTrips} / 휴일 {m.holidayTrips}
                  </div>
                  <div>
                    이용수요: 일 평균 {m.dailyRidership.totalAvg.toLocaleString()}명 (평일{' '}
                    {m.dailyRidership.weekday.toLocaleString()} / 휴일{' '}
                    {m.dailyRidership.holiday.toLocaleString()})
                  </div>
                  <div>
                    운영비/수지: 연간 {m.annualOperatingCost} (이용수지 {m.annualBalance})
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. 철도 환승 및 대중교통 */}
          <div className="space-y-3">
            <h2 className="text-base font-bold bg-slate-100 p-2.5 rounded text-slate-900 border-l-4 border-amber-600">
              5. 철도(환승) 및 대중교통체계 시설 확충
            </h2>

            <table className="w-full text-xs text-left border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-200 text-slate-800 font-bold border-b border-slate-300">
                  <th className="p-2 border border-slate-300">구분</th>
                  <th className="p-2 border border-slate-300">사업비(억원)</th>
                  <th className="p-2 border border-slate-300">시행시기</th>
                  <th className="p-2 border border-slate-300">시행주체</th>
                  <th className="p-2 border border-slate-300">재원분담</th>
                  <th className="p-2 border border-slate-300">비고</th>
                </tr>
              </thead>
              <tbody>
                {TRANSIT_HUBS.map((h) => (
                  <tr key={h.id} className="border-b border-slate-200">
                    <td className="p-2 font-bold border border-slate-300">{h.projectName}</td>
                    <td className="p-2 border border-slate-300 text-right font-bold">
                      {h.budgetInHundredMillion}
                    </td>
                    <td className="p-2 border border-slate-300">{h.implementationPeriod}</td>
                    <td className="p-2 border border-slate-300">{h.implementingEntity}</td>
                    <td className="p-2 border border-slate-300">{h.fundingDivision}</td>
                    <td className="p-2 border border-slate-300">{h.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 6. 어린이보호구역 및 교통시설 */}
          <div className="space-y-3">
            <h2 className="text-base font-bold bg-slate-100 p-2.5 rounded text-slate-900 border-l-4 border-rose-600">
              6. 어린이보호구역 및 교통시설 현황
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-center font-semibold">
              <div className="p-2 bg-slate-100 border rounded">
                신호제어기: {SAFETY_FACILITY_SUMMARY.trafficControllers}대
              </div>
              <div className="p-2 bg-slate-100 border rounded">
                단속카메라: {SAFETY_FACILITY_SUMMARY.speedCameras.total}대
              </div>
              <div className="p-2 bg-slate-100 border rounded">
                횡단보도: {SAFETY_FACILITY_SUMMARY.crosswalks.total}개소
              </div>
              <div className="p-2 bg-slate-100 border rounded">
                바닥형신호등: {SAFETY_FACILITY_SUMMARY.floorPedestrianSignals.total}개소
              </div>
            </div>

            <div className="text-xs bg-slate-50 p-3 border rounded space-y-1">
              <div className="font-bold">바닥형 신호등 지역별 현황 (합계 221개소):</div>
              <div>
                • 남부 (114): 와부읍 15, 화도읍 26, 수동면 4, 호평동 14, 평내동 9, 금곡·양정동 2, 다산1·2동 44
              </div>
              <div>
                • 북부 (107): 진접읍 24, 진건읍 7, 오남읍 29, 퇴계원읍 7, 별내동·면 40
              </div>
            </div>
          </div>

          {/* Document Footer */}
          <div className="pt-6 border-t border-slate-300 text-center text-xs text-slate-500">
            남양주시 교통국 교통정책과 ｜ 본 보고서는 남양주시 교통 정책 자료에 기초하여 작성되었습니다.
          </div>
        </div>
      </div>
    </div>
  );
};
