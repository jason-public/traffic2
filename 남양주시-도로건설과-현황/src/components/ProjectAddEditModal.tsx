import React, { useState, useEffect } from 'react';
import { ProjectItem, StatusCategory } from '../types';
import { X, Save, PlusCircle } from 'lucide-react';

interface ProjectAddEditModalProps {
  isOpen: boolean;
  editingProject: ProjectItem | null;
  onClose: () => void;
  onSave: (project: ProjectItem) => void;
}

export const ProjectAddEditModal: React.FC<ProjectAddEditModalProps> = ({
  isOpen,
  editingProject,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<ProjectItem>>({
    section: 'section2',
    categoryName: '2. 시군도·도시계획도로',
    name: '',
    agency: '남양주시 도로건설과',
    workload: '',
    costTotal: 0,
    costSecured: 0,
    costUnsecured: 0,
    statusText: '',
    statusCategory: '실시설계중',
    progressPercent: undefined,
    futurePlan: '',
    notes: '',
    region: '',
  });

  useEffect(() => {
    if (editingProject) {
      setFormData(editingProject);
    } else {
      setFormData({
        section: 'section2',
        categoryName: '2. 시군도·도시계획도로',
        name: '',
        agency: '남양주시 도로건설과',
        workload: 'L=1.0km, B=10m',
        costTotal: 1000,
        costSecured: 100,
        costUnsecured: 900,
        statusText: '실시설계용역 중',
        statusCategory: '실시설계중',
        progressPercent: undefined,
        futurePlan: '2027. 상반기 : 보상협의',
        notes: '',
        region: '남양주시 관내',
      });
    }
  }, [editingProject, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) return;

    const newItem: ProjectItem = {
      id: formData.id || `custom-${Date.now()}`,
      section: formData.section || 'section2',
      categoryName:
        formData.section === 'section1' ? '1. 국도·국지도·지방도' : '2. 시군도·도시계획도로',
      name: formData.name.trim(),
      agency: formData.agency || '남양주시 도로건설과',
      workload: formData.workload || '-',
      costTotal: Number(formData.costTotal) || 0,
      costSecured: formData.costSecured !== undefined ? Number(formData.costSecured) : undefined,
      costUnsecured: formData.costUnsecured !== undefined ? Number(formData.costUnsecured) : undefined,
      statusText: formData.statusText || '-',
      statusCategory: (formData.statusCategory as StatusCategory) || '계획/기타',
      progressPercent: formData.progressPercent !== undefined ? Number(formData.progressPercent) : undefined,
      futurePlan: formData.futurePlan || '-',
      notes: formData.notes || '',
      region: formData.region || '',
    };

    onSave(newItem);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 print:hidden">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 animate-fade-in my-8">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2 font-bold text-base sm:text-lg">
            <PlusCircle className="w-5 h-5 text-blue-400" />
            <span>{editingProject ? '사업 정보 수정' : '신규 도로 건설 사업 등록'}</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto text-xs sm:text-sm text-slate-800">
          
          {/* Section Selection */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">사업 구분</label>
              <select
                value={formData.section}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    section: e.target.value as 'section1' | 'section2',
                    categoryName: e.target.value === 'section1' ? '1. 국도·국지도·지방도' : '2. 시군도·도시계획도로',
                  })
                }
                className="w-full border border-slate-300 rounded-md p-2 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="section1">1. 국도·국지도·지방도</option>
                <option value="section2">2. 시군도·도시계획도로</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">추진 상태 분류</label>
              <select
                value={formData.statusCategory}
                onChange={(e) => setFormData({ ...formData, statusCategory: e.target.value as StatusCategory })}
                className="w-full border border-slate-300 rounded-md p-2 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="공사중">공사중</option>
                <option value="실시설계중">실시설계중</option>
                <option value="보상협의중">보상협의중</option>
                <option value="행정절차중">행정절차중</option>
                <option value="발주준비중">발주준비중</option>
                <option value="공사준공">공사준공</option>
                <option value="계획/기타">계획/기타</option>
              </select>
            </div>
          </div>

          {/* Project Name */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1">사업명 *</label>
            <input
              type="text"
              required
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="예: 시도10호선 (진접~오남) 도로개설공사"
              className="w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Agency & Region */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">시행 주체</label>
              <input
                type="text"
                value={formData.agency || ''}
                onChange={(e) => setFormData({ ...formData, agency: e.target.value })}
                placeholder="예: 남양주시 도로건설과"
                className="w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">관할 지역/읍면동</label>
              <input
                type="text"
                value={formData.region || ''}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                placeholder="예: 진접읍 / 화도읍"
                className="w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Workload (Length & Width) */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1">사업량 (연장 L, 폭 B)</label>
            <input
              type="text"
              value={formData.workload || ''}
              onChange={(e) => setFormData({ ...formData, workload: e.target.value })}
              placeholder="예: L=2.5km, B=15m"
              className="w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Budget Numbers (백만원) */}
          <div className="grid grid-cols-3 gap-3 bg-blue-50/50 p-3 rounded-lg border border-blue-100">
            <div>
              <label className="block text-blue-900 font-semibold mb-1">총 사업비(백만원)</label>
              <input
                type="number"
                value={formData.costTotal || ''}
                onChange={(e) => setFormData({ ...formData, costTotal: Number(e.target.value) })}
                className="w-full border border-blue-200 rounded-md p-2 bg-white"
              />
            </div>

            <div>
              <label className="block text-blue-900 font-semibold mb-1">확보액(백만원)</label>
              <input
                type="number"
                value={formData.costSecured ?? ''}
                onChange={(e) => setFormData({ ...formData, costSecured: e.target.value !== '' ? Number(e.target.value) : undefined })}
                className="w-full border border-blue-200 rounded-md p-2 bg-white"
              />
            </div>

            <div>
              <label className="block text-blue-900 font-semibold mb-1">미확보액(백만원)</label>
              <input
                type="number"
                value={formData.costUnsecured ?? ''}
                onChange={(e) => setFormData({ ...formData, costUnsecured: e.target.value !== '' ? Number(e.target.value) : undefined })}
                className="w-full border border-blue-200 rounded-md p-2 bg-white"
              />
            </div>
          </div>

          {/* Progress Percent */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1">진행률 % (공정률 또는 보상률)</label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={formData.progressPercent ?? ''}
              onChange={(e) => setFormData({ ...formData, progressPercent: e.target.value !== '' ? Number(e.target.value) : undefined })}
              placeholder="숫자만 입력 (예: 45)"
              className="w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Text & Future Plan */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1">추진 현황 설명</label>
            <input
              type="text"
              value={formData.statusText || ''}
              onChange={(e) => setFormData({ ...formData, statusText: e.target.value })}
              placeholder="예: 공사 중 (공정률 45%)"
              className="w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">향후 계획</label>
            <textarea
              rows={2}
              value={formData.futurePlan || ''}
              onChange={(e) => setFormData({ ...formData, futurePlan: e.target.value })}
              placeholder="예: 2026. 12. : 1구간 준공 / 2027. 3. : 2구간 착공"
              className="w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1">비고 (참고사항)</label>
            <input
              type="text"
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="예: 부족 예산 추가 확보 추진 필요"
              className="w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Form Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-100 cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>저장하기</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
