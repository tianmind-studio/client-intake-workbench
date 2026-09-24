export type ProjectType =
  | 'website'
  | 'miniprogram'
  | 'app'
  | 'python_data'
  | 'java_php_node'
  | 'deployment'
  | 'document'
  | 'bugfix'
  | 'other';

export type MaterialType =
  | 'source_code'
  | 'run_instructions'
  | 'database'
  | 'screenshots'
  | 'account_access'
  | 'domain_server'
  | 'platform_requirements'
  | 'reference_case';

export type IntakeStatus = 'new' | 'evaluating' | 'confirmed' | 'rejected' | 'completed';

export type Priority = 'urgent' | 'high' | 'normal' | 'low';

export type RiskLevel = 'high' | 'medium' | 'low';

export type RetainerScope =
  | 'monthly_support'
  | 'weekly_checkin'
  | 'bug_fixes'
  | 'feature_iterations'
  | 'consultation'
  | 'documentation'
  | 'deployment_maintenance'
  | 'data_analysis';

export interface Lead {
  id: string;
  clientName: string;
  contact: string;
  source: string;
  projectTypes: ProjectType[];
  existingMaterials: MaterialType[];
  requestSummary: string;
  deadline: string;
  budgetRange: string;
  riskLevel: RiskLevel;
  missingInfo: string[];
  status: IntakeStatus;
  priority: Priority;
  retainerScopes: RetainerScope[];
  isRetainerPilot: boolean;
  confirmationMessage: string;
  createdAt: string;
  updatedAt: string;
}

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  website: '网站/后台',
  miniprogram: '小程序',
  app: 'App',
  python_data: 'Python/数据/可视化',
  java_php_node: 'Java/PHP/Node',
  deployment: '部署上线',
  document: '文档/交付包',
  bugfix: 'Bug修复',
  other: '其他',
};

export const MATERIAL_TYPE_LABELS: Record<MaterialType, string> = {
  source_code: '源代码',
  run_instructions: '运行说明',
  database: '数据库',
  screenshots: '截图',
  account_access: '账号权限',
  domain_server: '域名/服务器',
  platform_requirements: '平台/学校要求',
  reference_case: '参考案例',
};

export const INTAKE_STATUS_LABELS: Record<IntakeStatus, string> = {
  new: '新线索',
  evaluating: '评估中',
  confirmed: '已确认',
  rejected: '已拒绝',
  completed: '已完成',
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  urgent: '紧急',
  high: '高',
  normal: '普通',
  low: '低',
};

export const RISK_LEVEL_LABELS: Record<RiskLevel, string> = {
  high: '高风险',
  medium: '中风险',
  low: '低风险',
};

export const RETAINER_SCOPE_LABELS: Record<RetainerScope, string> = {
  monthly_support: '月度技术支持',
  weekly_checkin: '每周沟通跟进',
  bug_fixes: 'Bug修复服务',
  feature_iterations: '功能迭代',
  consultation: '技术咨询',
  documentation: '文档整理',
  deployment_maintenance: '部署维护',
  data_analysis: '数据分析',
};
