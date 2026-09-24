'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import type { Lead, ProjectType, MaterialType, Priority, RiskLevel, RetainerScope } from '@/types';
import {
  PROJECT_TYPE_LABELS,
  MATERIAL_TYPE_LABELS,
  PRIORITY_LABELS,
  RISK_LEVEL_LABELS,
  RETAINER_SCOPE_LABELS,
} from '@/types';
import { useLeadStore } from '@/store/useLeadStore';

interface LeadFormProps {
  onClose: () => void;
  editingLead?: Lead;
}

export function LeadForm({ onClose, editingLead }: LeadFormProps) {
  const addLead = useLeadStore((state) => state.addLead);
  const updateLead = useLeadStore((state) => state.updateLead);

  const [formData, setFormData] = useState<Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>>({
    clientName: editingLead?.clientName ?? '',
    contact: editingLead?.contact ?? '',
    source: editingLead?.source ?? '',
    projectTypes: editingLead?.projectTypes ?? [],
    existingMaterials: editingLead?.existingMaterials ?? [],
    requestSummary: editingLead?.requestSummary ?? '',
    deadline: editingLead?.deadline ?? '',
    budgetRange: editingLead?.budgetRange ?? '',
    riskLevel: editingLead?.riskLevel ?? 'medium',
    missingInfo: editingLead?.missingInfo ?? [],
    status: editingLead?.status ?? 'new',
    priority: editingLead?.priority ?? 'normal',
    retainerScopes: editingLead?.retainerScopes ?? [],
    isRetainerPilot: editingLead?.isRetainerPilot ?? false,
    confirmationMessage: editingLead?.confirmationMessage ?? '',
  });

  const [missingInfoInput, setMissingInfoInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date().toISOString();

    if (editingLead) {
      updateLead(editingLead.id, formData);
    } else {
      const newLead: Lead = {
        ...formData,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
      };
      addLead(newLead);
    }
    onClose();
  };

  const toggleArrayItem = <T,>(array: T[], item: T): T[] => {
    return array.includes(item)
      ? array.filter((i) => i !== item)
      : [...array, item];
  };

  const addMissingInfo = () => {
    if (missingInfoInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        missingInfo: [...prev.missingInfo, missingInfoInput.trim()],
      }));
      setMissingInfoInput('');
    }
  };

  const removeMissingInfo = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      missingInfo: prev.missingInfo.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-thin">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800">
            {editingLead ? '编辑线索' : '新建线索'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* 基本信息 */}
          <section>
            <h3 className="text-sm font-medium text-slate-700 mb-3">基本信息</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-600 mb-1">客户名称 *</label>
                <input
                  type="text"
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, clientName: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="客户/项目代号"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">联系方式</label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) => setFormData((prev) => ({ ...prev, contact: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="邮箱/电话（脱敏后）"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">来源渠道</label>
                <input
                  type="text"
                  value={formData.source}
                  onChange={(e) => setFormData((prev) => ({ ...prev, source: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="微信/邮件/推荐"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">截止时间</label>
                <input
                  type="text"
                  value={formData.deadline}
                  onChange={(e) => setFormData((prev) => ({ ...prev, deadline: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="下周五/具体日期"
                />
              </div>
            </div>
          </section>

          {/* 项目类型 */}
          <section>
            <h3 className="text-sm font-medium text-slate-700 mb-3">项目类型</h3>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(PROJECT_TYPE_LABELS) as ProjectType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      projectTypes: toggleArrayItem(prev.projectTypes, type),
                    }))
                  }
                  className={clsx(
                    'px-3 py-1.5 rounded-full text-sm transition-colors',
                    formData.projectTypes.includes(type)
                      ? 'bg-blue-100 text-blue-700 border-blue-200 border'
                      : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                  )}
                >
                  {PROJECT_TYPE_LABELS[type]}
                </button>
              ))}
            </div>
          </section>

          {/* 已有材料 */}
          <section>
            <h3 className="text-sm font-medium text-slate-700 mb-3">已有材料</h3>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(MATERIAL_TYPE_LABELS) as MaterialType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      existingMaterials: toggleArrayItem(prev.existingMaterials, type),
                    }))
                  }
                  className={clsx(
                    'px-3 py-1.5 rounded-full text-sm transition-colors',
                    formData.existingMaterials.includes(type)
                      ? 'bg-green-100 text-green-700 border-green-200 border'
                      : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                  )}
                >
                  {MATERIAL_TYPE_LABELS[type]}
                </button>
              ))}
            </div>
          </section>

          {/* 需求摘要 */}
          <section>
            <h3 className="text-sm font-medium text-slate-700 mb-3">需求摘要</h3>
            <textarea
              value={formData.requestSummary}
              onChange={(e) => setFormData((prev) => ({ ...prev, requestSummary: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              placeholder="客户需求的简要描述（已脱敏）"
            />
          </section>

          {/* 预算与风险 */}
          <section>
            <h3 className="text-sm font-medium text-slate-700 mb-3">预算与风险评估</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-slate-600 mb-1">预算范围</label>
                <input
                  type="text"
                  value={formData.budgetRange}
                  onChange={(e) => setFormData((prev) => ({ ...prev, budgetRange: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="待确认/区间"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">优先级</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData((prev) => ({ ...prev, priority: e.target.value as Priority }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  {(Object.keys(PRIORITY_LABELS) as Priority[]).map((p) => (
                    <option key={p} value={p}>{PRIORITY_LABELS[p]}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">风险等级</label>
                <select
                  value={formData.riskLevel}
                  onChange={(e) => setFormData((prev) => ({ ...prev, riskLevel: e.target.value as RiskLevel }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  {(Object.keys(RISK_LEVEL_LABELS) as RiskLevel[]).map((r) => (
                    <option key={r} value={r}>{RISK_LEVEL_LABELS[r]}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* 缺失信息 */}
          <section>
            <h3 className="text-sm font-medium text-slate-700 mb-3">缺失信息</h3>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={missingInfoInput}
                onChange={(e) => setMissingInfoInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addMissingInfo())}
                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="需要向客户追问的信息"
              />
              <button
                type="button"
                onClick={addMissingInfo}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
              >
                添加
              </button>
            </div>
            {formData.missingInfo.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.missingInfo.map((info, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded text-sm"
                  >
                    {info}
                    <button
                      type="button"
                      onClick={() => removeMissingInfo(index)}
                      className="hover:text-amber-900"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </section>

          {/* 月费试点 */}
          <section>
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-sm font-medium text-slate-700">月费试点</h3>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isRetainerPilot}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, isRetainerPilot: e.target.checked }))
                  }
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ml-2 text-sm text-slate-600">
                  {formData.isRetainerPilot ? '是' : '否'}
                </span>
              </label>
            </div>
            {formData.isRetainerPilot && (
              <div className="flex flex-wrap gap-2">
                {(Object.keys(RETAINER_SCOPE_LABELS) as RetainerScope[]).map((scope) => (
                  <button
                    key={scope}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        retainerScopes: toggleArrayItem(prev.retainerScopes, scope),
                      }))
                    }
                    className={clsx(
                      'px-3 py-1.5 rounded-full text-sm transition-colors',
                      formData.retainerScopes.includes(scope)
                        ? 'bg-purple-100 text-purple-700 border-purple-200 border'
                        : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                    )}
                  >
                    {RETAINER_SCOPE_LABELS[scope]}
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* 确认话术 */}
          <section>
            <h3 className="text-sm font-medium text-slate-700 mb-3">确认话术</h3>
            <textarea
              value={formData.confirmationMessage}
              onChange={(e) => setFormData((prev) => ({ ...prev, confirmationMessage: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              placeholder="发给客户确认范围的回复模板"
            />
          </section>

          {/* 提交按钮 */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {editingLead ? '保存更改' : '创建线索'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
