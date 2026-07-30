import React from 'react';
import { RailwayPlan, GtxOperationItem } from '../types';
import { X, Train, MapPin, Calendar, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface Props {
  selectedItem: RailwayPlan | GtxOperationItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<Props> = ({ selectedItem, onClose }) => {
  if (!selectedItem) return null;

  const isRailwayPlan = 'lineName' in selectedItem;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 text-slate-900 relative space-y-5 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-md">
              <Train className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 uppercase tracking-wider">
                {isRailwayPlan ? selectedItem.category : selectedItem.type}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                {isRailwayPlan ? selectedItem.lineName : selectedItem.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-4 text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
            <span className="text-slate-500 font-semibold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              노선 및 운행 구간
            </span>
            <p className="font-bold text-slate-900 text-sm">{selectedItem.route}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[11px]">사업/운행 규모</span>
              <span className="font-bold text-slate-900 text-xs">
                {isRailwayPlan ? selectedItem.distance : selectedItem.details}
              </span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[11px]">사업비</span>
              <span className="font-bold text-blue-700 text-xs">{selectedItem.budget || '협의/추산 중'}</span>
            </div>
          </div>

          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-950 space-y-1">
            <span className="font-bold block text-amber-900">핵심 기대효과</span>
            <p className="leading-relaxed">
              {isRailwayPlan ? selectedItem.expectedImpact : selectedItem.impact}
            </p>
          </div>

          <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-800 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              진행 및 추진 현황
            </span>
            <p className="text-slate-700 leading-normal font-medium">{selectedItem.progress}</p>
          </div>

          <div>
            <span className="font-bold text-slate-700 block mb-1.5">수혜 지역 (남양주시 읍면동)</span>
            <div className="flex flex-wrap gap-1.5">
              {selectedItem.affectedNeighborhoods.map((nh) => (
                <span
                  key={nh}
                  className="bg-blue-50 text-blue-800 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-blue-200"
                >
                  📍 {nh}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
