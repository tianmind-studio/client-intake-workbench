import type { Lead } from '@/types';
import {
  PROJECT_TYPE_LABELS,
  MATERIAL_TYPE_LABELS,
  INTAKE_STATUS_LABELS,
  PRIORITY_LABELS,
  RISK_LEVEL_LABELS,
  RETAINER_SCOPE_LABELS,
} from '@/types';

export function exportToJSON(leads: Lead[]): string {
  return JSON.stringify(leads, null, 2);
}

export function exportSingleLeadToJSON(lead: Lead): string {
  return JSON.stringify(lead, null, 2);
}

export function exportToMarkdown(leads: Lead[]): string {
  if (leads.length === 0) {
    return '# 客户需求台账\n\n暂无线索记录。';
  }

  const lines: string[] = [
    '# 客户需求台账',
    '',
    `> 导出时间：${new Date().toLocaleString('zh-CN')}`,
    `> 共计 ${leads.length} 条线索`,
    '',
  ];

  for (const lead of leads) {
    lines.push(`## ${lead.clientName}`);
    lines.push('');
    lines.push(`- **联系方式**：${lead.contact || '未填写'}`);
    lines.push(`- **来源渠道**：${lead.source || '未填写'}`);
    lines.push(`- **状态**：${INTAKE_STATUS_LABELS[lead.status]}`);
    lines.push(`- **优先级**：${PRIORITY_LABELS[lead.priority]}`);
    lines.push(`- **风险等级**：${RISK_LEVEL_LABELS[lead.riskLevel]}`);
    lines.push(`- **截止时间**：${lead.deadline || '未确定'}`);
    lines.push(`- **预算范围**：${lead.budgetRange || '待确认'}`);
    lines.push('');

    if (lead.projectTypes.length > 0) {
      lines.push('### 项目类型');
      lines.push('');
      for (const type of lead.projectTypes) {
        lines.push(`- ${PROJECT_TYPE_LABELS[type]}`);
      }
      lines.push('');
    }

    if (lead.existingMaterials.length > 0) {
      lines.push('### 已有材料');
      lines.push('');
      for (const material of lead.existingMaterials) {
        lines.push(`- ${MATERIAL_TYPE_LABELS[material]}`);
      }
      lines.push('');
    }

    if (lead.requestSummary) {
      lines.push('### 需求摘要');
      lines.push('');
      lines.push(lead.requestSummary);
      lines.push('');
    }

    if (lead.missingInfo.length > 0) {
      lines.push('### 缺失信息');
      lines.push('');
      for (const info of lead.missingInfo) {
        lines.push(`- ${info}`);
      }
      lines.push('');
    }

    if (lead.isRetainerPilot && lead.retainerScopes.length > 0) {
      lines.push('### 月费试点范围');
      lines.push('');
      for (const scope of lead.retainerScopes) {
        lines.push(`- ${RETAINER_SCOPE_LABELS[scope]}`);
      }
      lines.push('');
    }

    if (lead.confirmationMessage) {
      lines.push('### 确认话术');
      lines.push('');
      lines.push('```');
      lines.push(lead.confirmationMessage);
      lines.push('```');
      lines.push('');
    }

    lines.push('---');
    lines.push('');
  }

  return lines.join('\n');
}

export function exportSingleLeadToMarkdown(lead: Lead): string {
  return exportToMarkdown([lead]);
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
