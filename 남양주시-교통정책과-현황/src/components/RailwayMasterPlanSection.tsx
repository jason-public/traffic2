import React from 'react';
import { RailwayPlan } from '../types';
import { Train, CheckCircle2, AlertCircle, Clock, MapPin, ArrowRight } from 'lucide-react';

interface Props {
  plans: RailwayPlan[];
  onSelectPlan?: (plan: RailwayPlan) => void;
}

export const RailwayMasterPlanSection: React.FC<Props> = ({ plans, onSelectPlan }) => {
  const renderLineName = (name: string) => {
    const match = name.match(/^(.*?)\s*(\[.*\])$/);
    if (match) {
      return (
        <div className="flex flex-col">
          <span className="group-hover:text-blue-600 transition-colors font-bold text-slate-900 leading-snug">{match[1]}</span>
          <span className="text-[11px] font-normal text-slate-500 leading-tight mt-0.5 break-keep">{match[2]}</span>
        </div>
      );
    }
    return (
      <span className="group-hover:text-blue-600 transition-colors font-bold text-slate-900 leading-snug break-keep">
        {name}
      </span>
    );
  };

  const getStatusBadge = (status: RailwayPlan['status']) => {
    switch (status) {
      case '본 사업':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-300 whitespace-nowrap shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            본 사업 (확정)
          </span>
        );
      case '추가 검토사업':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-300 whitespace-nowrap shrink-0">
            <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            추가 검토사업
          </span>
        );
      case '건의 사업':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-300 whitespace-nowrap shrink-0">
            <AlertCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            시행계획 건의
          </span>
        );
    }
  };

  return (
    <section className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm mb-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-5 border-b border-slate-200 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
              1
            </span>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              철도사업 상위계획 확정
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 pl-9">
            제4차 국가철도망 구축계획 & 제4차 대도시권 광역교통시행계획
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>총 5개 주요 철도 연장 사업 관리</span>
        </div>
      </div>

      {/* Responsive Table for Desktop & Cards for Mobile */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100/80 text-slate-700 font-semibold border-y border-slate-200">
              <th className="py-3 px-4 w-36 whitespace-nowrap">구분</th>
              <th className="py-3 px-4 w-36 whitespace-nowrap">반영여부</th>
              <th className="py-3 px-4 w-56">노선 (구간)</th>
              <th className="py-3 px-4 w-28 whitespace-nowrap">사업내용</th>
              <th className="py-3 px-4 w-44 whitespace-nowrap">사업비</th>
              <th className="py-3 px-4">기대효과</th>
              <th className="py-3 px-4 w-52">진행사항</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-800">
            {plans.map((plan) => (
              <tr
                key={plan.id}
                onClick={() => onSelectPlan && onSelectPlan(plan)}
                className="hover:bg-blue-50/50 transition-colors cursor-pointer group"
              >
                <td className="py-4 px-4 font-bold text-slate-900">
                  <div className="flex items-start gap-1.5 min-w-[150px]">
                    <Train className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    {renderLineName(plan.lineName)}
                  </div>
                </td>
                <td className="py-4 px-4 whitespace-nowrap">{getStatusBadge(plan.status)}</td>
                <td className="py-4 px-4 font-medium text-slate-800">
                  <span className="bg-slate-100 px-2.5 py-1 rounded-md text-slate-700 border border-slate-200 text-xs inline-block break-keep leading-snug">
                    {plan.route}
                  </span>
                </td>
                <td className="py-4 px-4 font-semibold text-blue-700">{plan.distance}</td>
                <td className="py-4 px-4 font-bold text-slate-900">{plan.budget}</td>
                <td className="py-4 px-4 text-slate-600 leading-relaxed">{plan.expectedImpact}</td>
                <td className="py-4 px-4">
                  <p className="text-xs font-medium text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200">
                    {plan.progress}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => onSelectPlan && onSelectPlan(plan)}
            className="bg-slate-50/70 rounded-xl p-4 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-1.5">
                <Train className="w-4 h-4 text-blue-600" />
                {plan.lineName}
              </h3>
              {getStatusBadge(plan.status)}
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs space-y-1">
              <div className="text-slate-500 font-medium">구간:</div>
              <div className="font-semibold text-slate-800 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                {plan.route}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2 rounded border border-slate-200">
                <span className="text-slate-400 block text-[11px]">사업규모</span>
                <span className="font-bold text-slate-900">{plan.distance}</span>
              </div>
              <div className="bg-white p-2 rounded border border-slate-200">
                <span className="text-slate-400 block text-[11px]">사업비</span>
                <span className="font-bold text-blue-700">{plan.budget}</span>
              </div>
            </div>

            <div className="text-xs text-slate-600 bg-amber-50/80 p-2.5 rounded-lg border border-amber-200/60">
              <span className="font-semibold text-amber-900 block mb-0.5">기대효과:</span>
              {plan.expectedImpact}
            </div>

            <div className="text-xs bg-slate-100 p-2.5 rounded-lg border border-slate-200">
              <span className="font-semibold text-slate-700 block mb-0.5">진행사항:</span>
              <p className="text-slate-600">{plan.progress}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
