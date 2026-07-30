import React from 'react';
import { GtxOperationItem } from '../types';
import { Zap, Calendar, ArrowRight, Gauge, MapPin, Sparkles } from 'lucide-react';

interface Props {
  items: GtxOperationItem[];
  onSelectItem?: (item: GtxOperationItem) => void;
}

export const GtxAndOperationSection: React.FC<Props> = ({ items, onSelectItem }) => {
  return (
    <section className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm mb-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-5 border-b border-slate-200 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-sm flex items-center justify-center">
              2
            </span>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              GTX-B 노선 및 철도운영 개선 조속 추진
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 pl-9">
            수도권광역급행철도 GTX-B 착공, 경춘선 증편, 덕소역 KTX(강릉선·중앙선) 정차 확대
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-200">
          <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
          <span>마석 ↔ 서울역 25분 / 마석 ↔ 청량리 19분</span>
        </div>
      </div>

      {/* Grid of Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((item) => {
          const isGtx = item.type === 'GTX';
          const isKtx = item.type === 'KTX';

          return (
            <div
              key={item.id}
              onClick={() => onSelectItem && onSelectItem(item)}
              className={`rounded-xl p-5 border transition-all duration-200 cursor-pointer space-y-4 hover:shadow-md ${
                isGtx
                  ? 'bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-950 text-white border-indigo-700/60'
                  : 'bg-slate-50/90 text-slate-900 border-slate-200/90 hover:border-indigo-300 hover:bg-indigo-50/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-md tracking-wider uppercase ${
                    isGtx
                      ? 'bg-amber-400 text-slate-950'
                      : isKtx
                      ? 'bg-blue-600 text-white'
                      : 'bg-teal-600 text-white'
                  }`}
                >
                  {item.type}
                </span>
                {item.budget && (
                  <span
                    className={`text-xs font-bold ${
                      isGtx ? 'text-indigo-200' : 'text-indigo-600'
                    }`}
                  >
                    사업비: {item.budget}
                  </span>
                )}
              </div>

              <div>
                <h3
                  className={`text-lg font-extrabold ${
                    isGtx ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {item.name}
                </h3>
                <p
                  className={`text-xs mt-1 flex items-center gap-1.5 font-medium ${
                    isGtx ? 'text-indigo-200' : 'text-slate-600'
                  }`}
                >
                  <MapPin className={`w-3.5 h-3.5 ${isGtx ? 'text-cyan-400' : 'text-red-500'}`} />
                  {item.route}
                </p>
              </div>

              {item.details && (
                <div
                  className={`text-xs p-2.5 rounded-lg font-medium ${
                    isGtx
                      ? 'bg-indigo-950/80 border border-indigo-800 text-indigo-100'
                      : 'bg-white border border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="font-bold opacity-80 block mb-0.5">사업/운행 내용:</span>
                  {item.details}
                </div>
              )}

              <div
                className={`text-xs p-3 rounded-lg ${
                  isGtx
                    ? 'bg-blue-600/20 border border-blue-400/30 text-cyan-200'
                    : 'bg-indigo-50 border border-indigo-200 text-indigo-950'
                }`}
              >
                <div className="flex items-center gap-1 font-bold mb-1">
                  <Gauge className="w-3.5 h-3.5 text-amber-400" />
                  <span>기대효과 & 이동시간 혁신</span>
                </div>
                <p className="leading-relaxed">{item.impact}</p>
              </div>

              <div
                className={`text-xs p-3 rounded-lg border ${
                  isGtx
                    ? 'bg-slate-900/90 border-slate-800 text-slate-300'
                    : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 font-semibold mb-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                  <span>추진 및 개통/정차 현황:</span>
                </div>
                <p className="leading-normal font-medium">{item.progress}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
