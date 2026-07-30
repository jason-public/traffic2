import React, { useState, useMemo } from 'react';
import { Construction, Calendar, Banknote, Layers, CheckCircle, Clock, AlertCircle, ChevronDown, ChevronUp, Layers2 } from 'lucide-react';
import { constructionProjectData } from '../data/parkingData';
import { ConstructionProject, ProjectStage } from '../types';

interface ProjectsStatusTabProps {
  searchTerm: string;
}

export const ProjectsStatusTab: React.FC<ProjectsStatusTabProps> = ({ searchTerm }) => {
  const [stageFilter, setStageFilter] = useState<'전체' | ProjectStage>('전체');
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return constructionProjectData.filter((p) => {
      const matchesSearch = p.name.includes(searchTerm) || p.structure.includes(searchTerm) || p.statusText.includes(searchTerm);
      const matchesStage = stageFilter === '전체' || p.stage === stageFilter;
      return matchesSearch && matchesStage;
    });
  }, [searchTerm, stageFilter]);

  // Aggregate stats
  const totalBudget = constructionProjectData.reduce((acc, p) => acc + p.totalBudgetMillionWon, 0);
  const totalSecured = constructionProjectData.reduce((acc, p) => acc + (p.securedBudgetMillionWon || 0), 0);
  const totalUnsecured = totalBudget - totalSecured;
  const totalCapacity = constructionProjectData.reduce((acc, p) => acc + p.capacity, 0);
  const securedPercentage = ((totalSecured / totalBudget) * 100).toFixed(1);

  const toggleExpand = (id: string) => {
    setExpandedProjectId(expandedProjectId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2.5 py-0.5 rounded-md border border-purple-200">
              3. 공영주차장 조성 추진 현황
            </span>
            <span className="text-slate-500 text-xs">남양주시 주요 7개 사업</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">공영주차장 신규 조성 추진 현황</h2>
          <p className="text-slate-600 text-sm mt-1">
            다산·퇴계원·와부·평내·진건 지구 주차수요 해소를 위한 총 1,558대 규모 주차장 건립 사업
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-purple-900 text-white p-3.5 rounded-xl shadow-xs text-right">
            <div className="text-xs text-purple-300">신규 공급 주차대수</div>
            <div className="text-2xl font-black text-white">+{totalCapacity.toLocaleString()} 대</div>
          </div>
          <div className="bg-slate-100 border border-slate-200 p-3.5 rounded-xl text-right">
            <div className="text-xs text-slate-500">총 예산 확보율</div>
            <div className="text-2xl font-black text-purple-900">{securedPercentage}%</div>
          </div>
        </div>
      </div>

      {/* Budget Summary Progress Box */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white p-6 rounded-2xl shadow-sm border border-slate-800">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
          <div>
            <span className="text-xs text-purple-300 font-semibold uppercase tracking-wider">사업비 집행 및 예산 확보 현황</span>
            <h3 className="text-xl font-bold text-white mt-0.5">총 사업비 1,597억 4,400만원 (159,744 백만원)</h3>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span>확보액: <strong className="text-emerald-400 font-mono">{(totalSecured / 100).toFixed(1)}억원</strong> ({securedPercentage}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span>미확보액: <strong className="text-rose-400 font-mono">{(totalUnsecured / 100).toFixed(1)}억원</strong></span>
            </div>
          </div>
        </div>

        {/* Visual Budget Bar */}
        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5 border border-slate-700/60">
          <div
            className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${securedPercentage}%` }}
          />
        </div>
      </div>

      {/* Stage Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/80">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 px-2">진행 단계:</span>
          {(['전체', '공사중', '설계중', '기획중'] as const).map((stage) => {
            const count =
              stage === '전체'
                ? constructionProjectData.length
                : constructionProjectData.filter((p) => p.stage === stage).length;
            return (
              <button
                key={stage}
                onClick={() => setStageFilter(stage)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  stageFilter === stage
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{stage}</span>
                <span
                  className={`px-1.5 py-0.2 text-[10px] rounded-full ${
                    stageFilter === stage ? 'bg-purple-800 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="text-xs text-slate-500 px-2">
          표시 중인 사업: <strong className="text-slate-900">{filteredProjects.length}개</strong>
        </div>
      </div>

      {/* Project Cards List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredProjects.map((project) => {
          const isExpanded = expandedProjectId === project.id;
          const securedRate = project.securedBudgetMillionWon
            ? ((project.securedBudgetMillionWon / project.totalBudgetMillionWon) * 100).toFixed(0)
            : '0';

          return (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-purple-300 transition overflow-hidden flex flex-col justify-between"
            >
              <div className="p-5">
                {/* Top Badge & Progress */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                      project.stage === '공사중'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : project.stage === '설계중'
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'bg-purple-100 text-purple-800 border border-purple-200'
                    }`}
                  >
                    {project.stage}
                  </span>

                  <span className="text-xs font-extrabold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
                    공정률 {project.progressPercent}%
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug">{project.name}</h3>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      project.stage === '공사중'
                        ? 'bg-amber-500'
                        : project.stage === '설계중'
                        ? 'bg-blue-500'
                        : 'bg-purple-500'
                    }`}
                    style={{ width: `${project.progressPercent}%` }}
                  />
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-100 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl">
                    <span className="text-slate-500 block mb-0.5">사업비(백만원)</span>
                    <span className="font-extrabold text-slate-900 text-sm">
                      {project.totalBudgetMillionWon.toLocaleString()} 백만원
                    </span>
                    <div className="text-[11px] text-slate-500 mt-1">
                      (확보 {project.securedBudgetMillionWon ? project.securedBudgetMillionWon.toLocaleString() : '0'} / 미확보{' '}
                      {project.unsecuredBudgetMillionWon ? project.unsecuredBudgetMillionWon.toLocaleString() : '-'})
                    </div>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl">
                    <span className="text-slate-500 block mb-0.5">사업량 (주차대수 및 규모)</span>
                    <span className="font-extrabold text-purple-700 text-sm">{project.capacity}대</span>
                    <div className="text-[11px] text-slate-600 mt-1 font-medium">{project.structure}</div>
                  </div>
                </div>

                {/* Current Status */}
                <div className="mt-3 bg-purple-50/60 p-2.5 rounded-xl border border-purple-100 text-xs text-purple-950 flex items-center justify-between">
                  <span className="font-semibold">추진현황:</span>
                  <span className="font-bold">{project.statusText}</span>
                </div>

                {/* Timeline Accordion Content */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 animate-fadeIn">
                    <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-purple-600" />
                      향후계획 및 로드맵
                    </h4>
                    <div className="space-y-1.5 pl-2">
                      {project.futureSchedule.map((sched, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <span className="w-2 h-2 rounded-full bg-purple-500" />
                          <span className="font-mono text-purple-900 font-bold w-20">{sched.date}</span>
                          <span className="text-slate-700 font-medium">{sched.task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Toggle */}
              <button
                onClick={() => toggleExpand(project.id)}
                className="w-full bg-slate-50 hover:bg-slate-100 py-2.5 px-4 border-t border-slate-100 text-xs text-slate-600 font-semibold flex items-center justify-center gap-1 transition"
              >
                <span>{isExpanded ? '향후계획 접기' : '향후계획 상세보기'}</span>
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          );
        })}
      </div>

      {/* Official Master Table (Matching Page 26 exactly) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden mt-8">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-base font-bold text-slate-900">3. 공영주차장 조성 추진 현황 마스터 종합표</h3>
          <p className="text-xs text-slate-500 mt-0.5">공식 보고서 (Page 26 원본) 규격 데이터</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-700 border-collapse">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
              <tr>
                <th className="px-4 py-3 border-r border-slate-200">사업명</th>
                <th className="px-4 py-3 border-r border-slate-200 text-right">사업비(백만원)<br />(확보액 / 미확보액)</th>
                <th className="px-4 py-3 border-r border-slate-200">사업량</th>
                <th className="px-4 py-3 border-r border-slate-200">추진현황</th>
                <th className="px-4 py-3 border-r border-slate-200">향후계획</th>
                <th className="px-4 py-3">비 고</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {constructionProjectData.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3 font-bold text-slate-900 border-r border-slate-200 whitespace-nowrap">
                    {p.name}
                  </td>
                  <td className="px-4 py-3 text-right font-mono border-r border-slate-200 whitespace-nowrap">
                    <div className="font-bold text-slate-900">{p.totalBudgetMillionWon.toLocaleString()}</div>
                    <div className="text-[11px] text-slate-500">
                      ({p.securedBudgetMillionWon ? p.securedBudgetMillionWon.toLocaleString() : '-'}/
                      {p.unsecuredBudgetMillionWon ? p.unsecuredBudgetMillionWon.toLocaleString() : '-'})
                    </div>
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200">
                    <div>- 주차대수 {p.capacity}대</div>
                    <div className="text-slate-500">- {p.structure}</div>
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 whitespace-nowrap font-medium text-purple-900">
                    {p.statusText}
                  </td>
                  <td className="px-4 py-3 border-r border-slate-200 space-y-0.5">
                    {p.futureSchedule.map((s, idx) => (
                      <div key={idx} className="whitespace-nowrap">
                        <span className="font-mono text-slate-600 mr-1">{s.date} :</span>
                        <span>{s.task}</span>
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-center">-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
