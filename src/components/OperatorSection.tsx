import React, { useState } from 'react';
import { TRANSPORT_OPERATORS } from '../data/transitData';
import { Building2, Phone, Printer, MapPin, Bus, Car } from 'lucide-react';

export const OperatorSection: React.FC = () => {
  const [operatorCategory, setOperatorCategory] = useState<'전체' | '시내버스' | '마을버스' | '일반택시'>('전체');

  const filteredOperators = TRANSPORT_OPERATORS.filter((op) => {
    return operatorCategory === '전체' || op.category === operatorCategory;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                14
              </span>
              <h3 className="font-bold text-slate-900 text-lg">대중교통과 관할 운수업체 현황 자료</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              시내버스 3개 업체 (605대), 마을버스 6개 업체 (101대), 일반택시 6개 업체 (342대) 주사무소 및 연락처
            </p>
          </div>

          <div className="flex items-center space-x-1.5 text-xs bg-slate-100 p-1 rounded-lg overflow-x-auto no-scrollbar touch-scroll whitespace-nowrap">
            {(['전체', '시내버스', '마을버스', '일반택시'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setOperatorCategory(cat)}
                className={`px-3 py-1.5 rounded-md font-semibold transition shrink-0 active:scale-95 ${
                  operatorCategory === cat ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Summary Counts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-blue-700 font-medium block">시내버스 운수업체</span>
              <span className="text-xl font-bold text-blue-900 font-mono">3개 업체 / 605대</span>
            </div>
            <Bus className="w-7 h-7 text-blue-400" />
          </div>

          <div className="bg-teal-50/70 p-4 rounded-xl border border-teal-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-teal-700 font-medium block">마을버스 운수업체</span>
              <span className="text-xl font-bold text-teal-900 font-mono">6개 업체 / 101대</span>
            </div>
            <Bus className="w-7 h-7 text-teal-400" />
          </div>

          <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-amber-700 font-medium block">일반택시 운수업체</span>
              <span className="text-xl font-bold text-amber-900 font-mono">6개 업체 / 342대</span>
            </div>
            <Car className="w-7 h-7 text-amber-400" />
          </div>
        </div>
      </div>

      {/* Operators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOperators.map((op, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:border-blue-300 transition-all space-y-3"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-900 text-base">{op.name}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                  op.category === '시내버스'
                    ? 'bg-blue-100 text-blue-900'
                    : op.category === '마을버스'
                    ? 'bg-teal-100 text-teal-900'
                    : 'bg-amber-100 text-amber-900'
                }`}
              >
                {op.category}
              </span>
            </div>

            <div className="text-xs space-y-1.5 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">대표자</span>
                <span className="font-semibold text-slate-900">{op.representative}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">면허 대수</span>
                <span className="font-bold text-blue-900 font-mono">{op.licenses} 대</span>
              </div>

              <div className="flex items-start space-x-1.5 pt-1 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span className="leading-tight">{op.address}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <a
                  href={`tel:${op.phone}`}
                  className="flex items-center space-x-1 text-blue-700 font-bold font-mono hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{op.phone}</span>
                </a>
                {op.fax && (
                  <span className="flex items-center space-x-1 text-slate-400 font-mono text-[11px]">
                    <Printer className="w-3 h-3" />
                    <span>FAX: {op.fax}</span>
                  </span>
                )}
              </div>

              {op.note && (
                <p className="text-[11px] text-slate-500 bg-slate-50 p-1.5 rounded font-mono">
                  {op.note}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
