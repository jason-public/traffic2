import React, { useState } from 'react';
import { TRANSIT_SUBSIDIES, BUDGET_YEAR_ANALYTICS } from '../data/transitData';
import {
  CreditCard,
  Calculator,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Info,
  DollarSign
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const PolicySection: React.FC = () => {
  // Calculator state
  const [userAge, setUserAge] = useState<number>(28);
  const [monthlyTrips, setMonthlyTrips] = useState<number>(22);
  const [monthlySpend, setMonthlySpend] = useState<number>(75000);
  const [isLowIncome, setIsLowIncome] = useState<boolean>(false);

  // Subsidy Calculation Logic
  const calculateEligibility = () => {
    let recommendedPolicy = '';
    let refundRatePercent = 0;
    let estimatedMonthlyRefund = 0;
    let estimatedAnnualRefund = 0;
    let applicationGuide = '';

    if (userAge >= 65) {
      recommendedPolicy = '어르신 교통비 지원사업';
      estimatedAnnualRefund = 120000;
      estimatedMonthlyRefund = 10000;
      applicationGuide = '관내 농협(농협은행 및 축협 등) 방문 신청 후 어르신 교통카드 발급 (연 최대 12만원 분기별 지급)';
    } else if (userAge >= 6 && userAge <= 18) {
      recommendedPolicy = '경기도 어린이·청소년 교통비 지원사업';
      estimatedAnnualRefund = Math.min(240000, monthlySpend * 12);
      estimatedMonthlyRefund = Math.round(estimatedAnnualRefund / 12);
      applicationGuide = '경기도 어린이청소년 교통비 지원 포털에서 온라인 신청 (연 최대 24만원 남양주사랑상품권 지급)';
    } else if (userAge >= 19) {
      recommendedPolicy = 'K-패스 (국도비/K-PASS)';
      if (monthlyTrips < 15) {
        refundRatePercent = 0;
        estimatedMonthlyRefund = 0;
        applicationGuide = 'K-패스는 월 15회 이상 이용 시 환급 대상이 됩니다. 이용 횟수를 늘려보세요.';
      } else {
        if (isLowIncome) {
          refundRatePercent = 53;
        } else if (userAge <= 39) {
          refundRatePercent = 30; // 청년 기준 만19~39세
        } else {
          refundRatePercent = 20; // 일반
        }
        estimatedMonthlyRefund = Math.round((monthlySpend * refundRatePercent) / 100);
        estimatedAnnualRefund = estimatedMonthlyRefund * 12;
        applicationGuide = '취급 카드사(신한, KB, 삼성, 현대, 하나, NH농협 등) 앱 또는 홈페이지에서 K-패스 카드 신청';
      }
    } else {
      recommendedPolicy = '만 6세 미만은 무임승차 대상입니다.';
      applicationGuide = '보호자 동반 시 기본 무임 적용';
    }

    return {
      recommendedPolicy,
      refundRatePercent,
      estimatedMonthlyRefund,
      estimatedAnnualRefund,
      applicationGuide
    };
  };

  const calcResult = calculateEligibility();

  return (
    <div className="space-y-6 pb-12">
      {/* Policy Header Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-xl shadow-sm border border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-500/30 font-semibold">
              <CreditCard className="w-3.5 h-3.5" />
              <span>시민 교통비 부담 경감 3대 핵심 정책</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              대중교통비 지원 정책 (K-패스 · 어르신 · 청소년)
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
              남양주 시민의 이동권 보장과 생활비 절감을 위하여 K-패스(만19세+), 어르신 교통비(만65세+, 연 12만원), 어린이·청소년 교통비(만6~18세, 연 24만원) 환급 제도를 운영하고 있습니다.
            </p>
          </div>

          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 text-center font-mono shrink-0 min-w-[200px]">
            <span className="text-xs text-blue-300 block font-medium">2026년 교통비 지원 총 예산</span>
            <span className="text-3xl font-black text-blue-400">23,760</span>
            <span className="text-xs text-slate-400 block mt-0.5">백만원 (약 237.6 억원)</span>
          </div>
        </div>
      </div>

      {/* Interactive Subsidy Calculator */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">나의 맞춤형 교통비 환급액 시뮬레이터</h3>
              <p className="text-xs text-slate-500">나이, 이용횟수, 교통비를 입력하면 가장 유리한 지원 정책과 예상 환급액을 계산해 드립니다.</p>
            </div>
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-bold self-start sm:self-auto">
            실시간 자동 계산기
          </span>
        </div>

        {/* Inputs & Result Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Inputs Column */}
          <div className="lg:col-span-5 bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 space-y-4">
            <h4 className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2">사용자 조건 입력</h4>

            {/* Age Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex justify-between">
                <span>만 나이</span>
                <span className="text-blue-700 font-mono font-black">{userAge} 세</span>
              </label>
              <input
                type="range"
                min={6}
                max={85}
                value={userAge}
                onChange={(e) => setUserAge(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>만 6세</span>
                <span>만 19세(청년)</span>
                <span>만 65세(어르신)</span>
                <span>85세</span>
              </div>
            </div>

            {/* Monthly Trips Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex justify-between">
                <span>월 대중교통 이용 횟수</span>
                <span className="text-blue-700 font-mono font-black">{monthlyTrips} 회</span>
              </label>
              <input
                type="range"
                min={1}
                max={60}
                value={monthlyTrips}
                onChange={(e) => setMonthlyTrips(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            {/* Monthly Spend Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex justify-between">
                <span>월 평균 교통비 (원)</span>
                <span className="text-blue-700 font-mono font-black">{monthlySpend.toLocaleString()} 원</span>
              </label>
              <input
                type="number"
                step={5000}
                min={10000}
                max={300000}
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Low Income Toggle */}
            {userAge >= 19 && userAge < 65 && (
              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="lowIncome"
                  checked={isLowIncome}
                  onChange={(e) => setIsLowIncome(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="lowIncome" className="text-xs text-slate-700 font-medium cursor-pointer">
                  저소득층 (기초생활수급자/차상위계층) - K-패스 53% 환급 적용
                </label>
              </div>
            )}
          </div>

          {/* Results Column */}
          <div className="lg:col-span-7 bg-slate-900 text-white p-4 sm:p-6 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
            <div>
              <span className="text-xs text-blue-300 font-bold block mb-1">추천 지원 정책</span>
              <h4 className="text-lg sm:text-2xl font-black text-emerald-400 flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 shrink-0" />
                <span>{calcResult.recommendedPolicy}</span>
              </h4>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mt-4 pt-4 border-t border-slate-800">
                <div className="bg-slate-800 p-2.5 sm:p-3 rounded-lg border border-slate-700">
                  <span className="text-[10px] sm:text-[11px] text-slate-400 block">예상 월 환급/지원액</span>
                  <span className="text-lg sm:text-2xl font-black text-amber-300 font-mono">
                    {calcResult.estimatedMonthlyRefund.toLocaleString()} 원
                  </span>
                  {calcResult.refundRatePercent > 0 && (
                    <span className="text-[10px] text-emerald-400 block font-mono">({calcResult.refundRatePercent}% 환급율 적용)</span>
                  )}
                </div>

                <div className="bg-slate-800 p-2.5 sm:p-3 rounded-lg border border-slate-700">
                  <span className="text-[10px] sm:text-[11px] text-slate-400 block">예상 연간 혜택 총액</span>
                  <span className="text-lg sm:text-2xl font-black text-emerald-400 font-mono">
                    {calcResult.estimatedAnnualRefund.toLocaleString()} 원
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">/ 년</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 text-xs space-y-1">
              <span className="font-bold text-blue-300 block">📌 신청 및 이용 가이드:</span>
              <p className="text-slate-200 leading-relaxed">{calcResult.applicationGuide}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3대 정책 비교 테이블 (Section 17) */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-900 text-base sm:text-lg">대중교통비 지원 3대 사업 비교 (2026년 기준)</h3>
          <p className="text-xs text-slate-500">K-패스, 어르신 교통비, 경기도 어린이·청소년 교통비 세부 사업 세부사항</p>
        </div>

        {/* Mobile scroll hint */}
        <div className="sm:hidden text-[10px] text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-200 text-center font-medium">
          ← 표를 좌우로 스크롤하여 전체 정보 확인 →
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-lg touch-scroll mobile-table-wrap">
          <table className="w-full text-left text-xs mobile-compact-table whitespace-nowrap">
            <thead className="bg-slate-800 text-white font-medium">
              <tr>
                <th className="p-2.5 sm:p-3">구분</th>
                <th className="p-2.5 sm:p-3">K-패스 (국도비/K-PASS)</th>
                <th className="p-2.5 sm:p-3">어르신 교통비 지원사업</th>
                <th className="p-2.5 sm:p-3">어린이·청소년 교통비</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-2.5 sm:p-3 font-bold bg-slate-50 text-slate-900">2026년 예산</td>
                <td className="p-2.5 sm:p-3 font-mono font-bold text-blue-700">17,835,600 천원 (시비 6,218,800천원)</td>
                <td className="p-2.5 sm:p-3 font-mono font-bold text-emerald-700">5,120,396 천원 (시비 100%)</td>
                <td className="p-2.5 sm:p-3 font-mono font-bold text-blue-700">804,064 천원 (도비50%, 시비50%)</td>
              </tr>
              <tr>
                <td className="p-2.5 sm:p-3 font-bold bg-slate-50 text-slate-900">시행시기 / 주체</td>
                <td className="p-2.5 sm:p-3">2024. 5. ~ (한국교통안전공단)</td>
                <td className="p-2.5 sm:p-3">2022. 7. ~ (남양주시)</td>
                <td className="p-2.5 sm:p-3">2020. 7. ~ (경기교통공사)</td>
              </tr>
              <tr>
                <td className="p-2.5 sm:p-3 font-bold bg-slate-50 text-slate-900">지원 대상</td>
                <td className="p-2.5 sm:p-3 font-semibold text-slate-800">만 19세 이상 (612,037명 대상)</td>
                <td className="p-2.5 sm:p-3 font-semibold text-slate-800">만 65세 이상 (142,550명 대상)</td>
                <td className="p-2.5 sm:p-3 font-semibold text-slate-800">만 6세 ~ 18세 (92,548명 대상)</td>
              </tr>
              <tr>
                <td className="p-2.5 sm:p-3 font-bold bg-slate-50 text-slate-900">가입자 수 (2026.7)</td>
                <td className="p-2.5 sm:p-3 font-mono">107,876 명 (환급자 66,926명)</td>
                <td className="p-2.5 sm:p-3 font-mono text-emerald-800 font-bold">134,612 명 (가입율 94.4%)</td>
                <td className="p-2.5 sm:p-3 font-mono">29,774 명</td>
              </tr>
              <tr>
                <td className="p-2.5 sm:p-3 font-bold bg-slate-50 text-slate-900">신청 방법</td>
                <td className="p-2.5 sm:p-3">카드사 앱 또는 홈페이지 신청</td>
                <td className="p-2.5 sm:p-3">관내 농협 방문 신청</td>
                <td className="p-2.5 sm:p-3">지원플랫폼 온라인 신청</td>
              </tr>
              <tr>
                <td className="p-3 font-bold bg-slate-50 text-slate-900">지원 한도</td>
                <td className="p-3 font-bold text-blue-900">무제한 (20%~53% 환급)</td>
                <td className="p-3 font-bold text-emerald-900">연 최대 12만원 (분기당 3만원)</td>
                <td className="p-3 font-bold text-blue-900">연 최대 24만원 (분기당 6만원)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold bg-slate-50 text-slate-900">지급 형태</td>
                <td className="p-3">계좌 환급 (매월)</td>
                <td className="p-3">현금 환급 (분기별)</td>
                <td className="p-3">지역화폐 (남양주사랑상품권)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 사업별 예산 및 부족액 분석 (PDF Page 15 data) */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">사업별 예산 집행 및 2026년 소요/부족액 현황</h3>
            <p className="text-xs text-slate-500">2024년~2026년 연도별 집행액, 필요액 및 부족 예산 분석 (단위: 백만원)</p>
          </div>
          <span className="bg-rose-100 text-rose-800 text-xs px-3 py-1 rounded-full font-bold flex items-center space-x-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>2026년 부족액 총 113.04 억원</span>
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-lg touch-scroll mobile-table-wrap">
          <table className="w-full text-left text-xs mobile-compact-table whitespace-nowrap">
            <thead className="bg-slate-800 text-white font-medium">
              <tr>
                <th className="p-2.5 sm:p-3">구분</th>
                <th className="p-2.5 sm:p-3 text-right">2024 예산</th>
                <th className="p-2.5 sm:p-3 text-right">2024 집행</th>
                <th className="p-2.5 sm:p-3 text-right">2025 예산</th>
                <th className="p-2.5 sm:p-3 text-right">2025 집행</th>
                <th className="p-2.5 sm:p-3 text-right">2026 예산</th>
                <th className="p-2.5 sm:p-3 text-right">2026 집행</th>
                <th className="p-2.5 sm:p-3 text-right text-amber-300 font-bold">2026 필요액</th>
                <th className="p-2.5 sm:p-3 text-right text-rose-300 font-bold">2026 부족액</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {BUDGET_YEAR_ANALYTICS.map((row) => (
                <tr
                  key={row.category}
                  className={row.category === '합 계' ? 'font-black bg-rose-50/80 text-slate-900 border-t-2 border-rose-300' : 'hover:bg-slate-50'}
                >
                  <td className="p-3 font-sans font-bold">{row.category}</td>
                  <td className="p-3 text-right">{row.y2024Budget.toLocaleString()}</td>
                  <td className="p-3 text-right">{row.y2024Spent.toLocaleString()}</td>
                  <td className="p-3 text-right">{row.y2025Budget.toLocaleString()}</td>
                  <td className="p-3 text-right">{row.y2025Spent.toLocaleString()}</td>
                  <td className="p-3 text-right font-bold">{row.y2026Budget.toLocaleString()}</td>
                  <td className="p-3 text-right">{row.y2026Spent.toLocaleString()}</td>
                  <td className="p-3 text-right font-bold text-amber-800">{row.y2026Required.toLocaleString()}</td>
                  <td className="p-3 text-right font-bold text-rose-700">{row.y2026Shortage.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-rose-50 p-3.5 rounded-lg border border-rose-200 text-xs text-rose-950 space-y-1">
          <p className="font-bold flex items-center space-x-1">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>2026년 예산 부족 증감 사유:</span>
          </p>
          <ul className="list-disc pl-5 space-y-0.5 text-rose-900">
            <li><strong>어르신·청소년 교통비:</strong> 분기별 신규 신청자 및 사용자 증가, 대중교통 이용량 증가로 14억원 부족 추정</li>
            <li><strong>K-패스:</strong> 사용자 급증 및 고유가 대응 K패스 확대 지원(4~9월)으로 94.49억원 예산 부족 예상</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
