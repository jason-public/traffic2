import React from 'react';
import { X, Printer, Download } from 'lucide-react';
import { constructionProjectData, enforcementZoneData, enforcementZoneTotal, parkingOperationData } from '../data/parkingData';

interface OfficialDocumentViewProps {
  onClose: () => void;
}

export const OfficialDocumentView: React.FC<OfficialDocumentViewProps> = ({ onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const onStreetRow = parkingOperationData.find((d) => d.type === '노상주차장')!;
  const offStreetRow = parkingOperationData.find((d) => d.type === '노외주차장')!;
  const totalRow = parkingOperationData.find((d) => d.type === '합계')!;

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs z-50 overflow-y-auto p-4 sm:p-6 flex justify-center items-start">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Top Control Bar */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800 sticky top-0 z-20 print:hidden">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-xs px-2.5 py-1 rounded font-bold">공식 보고서 원본 규격</span>
            <span className="text-sm font-semibold">주차관리과 현황 (Page 25 - 26)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-4 h-4" />
              인쇄하기
            </button>
            <button
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Paper Document Container */}
        <div className="p-8 sm:p-12 text-slate-900 font-serif leading-relaxed space-y-12 bg-white print:p-0">
          {/* PAGE 1 (Page 25) */}
          <div className="space-y-6">
            {/* Main Header */}
            <div className="border-b-4 border-slate-900 pb-3">
              <h1 className="text-3xl font-black tracking-wider text-slate-900 font-sans">주 차 관 리 과</h1>
            </div>

            {/* Section 1 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-lime-500 text-white text-sm font-bold w-6 h-6 flex items-center justify-center rounded-xs font-sans">
                  1
                </span>
                <h2 className="text-xl font-bold font-sans text-slate-900">주차관리과 일반 현황 자료</h2>
              </div>

              {/* Subsection 1) */}
              <div className="pl-2 space-y-3">
                <h3 className="text-base font-bold font-sans text-slate-900">1) 주정차금지구역현황</h3>

                <table className="w-full text-sm border-collapse border border-slate-800 text-center font-sans">
                  <thead>
                    <tr className="bg-slate-100 font-bold border-b border-slate-800">
                      <th className="border border-slate-800 py-2 w-1/3">지역별</th>
                      <th className="border border-slate-800 py-2 w-1/3">지정개소</th>
                      <th className="border border-slate-800 py-2 w-1/3">거리(㎞)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="font-bold bg-slate-50 border-b border-slate-800">
                      <td className="border border-slate-800 py-1.5">계</td>
                      <td className="border border-slate-800 py-1.5">{enforcementZoneTotal.count}</td>
                      <td className="border border-slate-800 py-1.5">{enforcementZoneTotal.distanceKm}</td>
                    </tr>
                    {enforcementZoneData.map((row) => (
                      <tr key={row.id}>
                        <td className="border border-slate-800 py-1">{row.region}</td>
                        <td className="border border-slate-800 py-1">{row.count}</td>
                        <td className="border border-slate-800 py-1">{row.distanceKm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Subsection 2) */}
              <div className="pl-2 space-y-3 pt-4">
                <h3 className="text-base font-bold font-sans text-slate-900">2) 공영 주차장 관리</h3>

                <table className="w-full text-sm border-collapse border border-slate-800 text-center font-sans">
                  <thead>
                    <tr className="bg-slate-100 font-bold border-b border-slate-800">
                      <th className="border border-slate-800 py-2 w-1/5">구 분</th>
                      <th className="border border-slate-800 py-2 w-1/5">계</th>
                      <th className="border border-slate-800 py-2 w-1/5">유 료</th>
                      <th className="border border-slate-800 py-2 w-1/5">무 료</th>
                      <th className="border border-slate-800 py-2 w-1/5">비고</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-800 py-1.5 font-bold">개소수</td>
                      <td className="border border-slate-800 py-1.5">84</td>
                      <td className="border border-slate-800 py-1.5">46</td>
                      <td className="border border-slate-800 py-1.5">38</td>
                      <td className="border border-slate-800 py-1.5"></td>
                    </tr>
                    <tr>
                      <td className="border border-slate-800 py-1.5 font-bold">면 수</td>
                      <td className="border border-slate-800 py-1.5">4,437</td>
                      <td className="border border-slate-800 py-1.5">3,440</td>
                      <td className="border border-slate-800 py-1.5">997</td>
                      <td className="border border-slate-800 py-1.5"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 2 */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2">
                <span className="bg-lime-500 text-white text-sm font-bold w-6 h-6 flex items-center justify-center rounded-xs font-sans">
                  2
                </span>
                <h2 className="text-xl font-bold font-sans text-slate-900">공영주차장 운영 현황</h2>
              </div>

              <table className="w-full text-sm border-collapse border border-slate-800 text-center font-sans">
                <thead>
                  <tr className="bg-slate-100 font-bold border-b border-slate-800">
                    <th rowSpan={2} colSpan={2} className="border border-slate-800 py-2">
                      구분
                    </th>
                    <th colSpan={2} className="border border-slate-800 py-1">
                      합계
                    </th>
                    <th colSpan={2} className="border border-slate-800 py-1">
                      유료
                    </th>
                    <th colSpan={2} className="border border-slate-800 py-1">
                      무료
                    </th>
                  </tr>
                  <tr className="bg-slate-100 font-bold border-b border-slate-800">
                    <th className="border border-slate-800 py-1">주차장수</th>
                    <th className="border border-slate-800 py-1">주차면수</th>
                    <th className="border border-slate-800 py-1">주차장수</th>
                    <th className="border border-slate-800 py-1">주차면수</th>
                    <th className="border border-slate-800 py-1">주차장수</th>
                    <th className="border border-slate-800 py-1">주차면수</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowSpan={2} className="border border-slate-800 py-2 font-bold w-24">
                      공영주차장
                    </td>
                    <td className="border border-slate-800 py-2 font-bold">노상주차장</td>
                    <td className="border border-slate-800 py-2">35</td>
                    <td className="border border-slate-800 py-2">831</td>
                    <td className="border border-slate-800 py-2">5</td>
                    <td className="border border-slate-800 py-2">229</td>
                    <td className="border border-slate-800 py-2">30</td>
                    <td className="border border-slate-800 py-2">602</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-800 py-2 font-bold">노외주차장</td>
                    <td className="border border-slate-800 py-2">49</td>
                    <td className="border border-slate-800 py-2">3,606</td>
                    <td className="border border-slate-800 py-2">41</td>
                    <td className="border border-slate-800 py-2">3,211</td>
                    <td className="border border-slate-800 py-2">8</td>
                    <td className="border border-slate-800 py-2">395</td>
                  </tr>
                  <tr className="font-bold bg-slate-50">
                    <td colSpan={2} className="border border-slate-800 py-2">
                      합계
                    </td>
                    <td className="border border-slate-800 py-2">84</td>
                    <td className="border border-slate-800 py-2">4,437</td>
                    <td className="border border-slate-800 py-2">46</td>
                    <td className="border border-slate-800 py-2">3,440</td>
                    <td className="border border-slate-800 py-2">38</td>
                    <td className="border border-slate-800 py-2">997</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Page Number */}
            <div className="text-center text-sm font-sans font-semibold pt-8 text-slate-700">
              - 25 -
            </div>
          </div>

          <hr className="border-slate-300 my-12 print:page-break-before" />

          {/* PAGE 2 (Page 26) */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="bg-lime-500 text-white text-sm font-bold w-6 h-6 flex items-center justify-center rounded-xs font-sans">
                3
              </span>
              <h2 className="text-xl font-bold font-sans text-slate-900">공영주차장 조성 추진 현황</h2>
            </div>

            <table className="w-full text-xs border-collapse border border-slate-800 text-left font-sans">
              <thead>
                <tr className="bg-slate-100 font-bold border-b border-slate-800 text-center">
                  <th className="border border-slate-800 p-2 w-1/5">사업명</th>
                  <th className="border border-slate-800 p-2 w-1/6">
                    사업비(백만원)
                    <br />
                    <span className="font-normal text-[10px]">(확보액 / 미확보액)</span>
                  </th>
                  <th className="border border-slate-800 p-2 w-1/5">사업량</th>
                  <th className="border border-slate-800 p-2 w-1/6">추진현황</th>
                  <th className="border border-slate-800 p-2 w-1/4">향후계획</th>
                  <th className="border border-slate-800 p-2 w-12">비 고</th>
                </tr>
              </thead>
              <tbody>
                {constructionProjectData.map((proj) => (
                  <tr key={proj.id} className="align-top">
                    <td className="border border-slate-800 p-2 font-bold leading-tight">{proj.name}</td>
                    <td className="border border-slate-800 p-2 text-center font-mono">
                      <div>{proj.totalBudgetMillionWon.toLocaleString()}</div>
                      <div className="text-[10px] text-slate-600">
                        ({proj.securedBudgetMillionWon ? proj.securedBudgetMillionWon.toLocaleString() : '-'}/
                        {proj.unsecuredBudgetMillionWon ? proj.unsecuredBudgetMillionWon.toLocaleString() : '-'})
                      </div>
                    </td>
                    <td className="border border-slate-800 p-2 space-y-0.5">
                      <div>- 주차대수 {proj.capacity}대</div>
                      <div>- {proj.structure}</div>
                    </td>
                    <td className="border border-slate-800 p-2 text-center">{proj.statusText}</td>
                    <td className="border border-slate-800 p-2 space-y-0.5">
                      {proj.futureSchedule.map((s, idx) => (
                        <div key={idx}>
                          <span className="font-mono mr-1">{s.date} :</span>
                          <span>{s.task}</span>
                        </div>
                      ))}
                    </td>
                    <td className="border border-slate-800 p-2 text-center"></td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Page Number */}
            <div className="text-center text-sm font-sans font-semibold pt-12 text-slate-700">
              - 26 -
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
