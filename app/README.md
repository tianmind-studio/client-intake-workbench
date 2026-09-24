# 客户需求工作台 (Client Intake Workbench)

轻量级客户线索录入与需求梳理工具，适用于小团队和个人开发者的服务交付场景。

## 功能特性

- **线索录入表单**：支持项目类型、已有材料、预算范围、风险等级等多维度信息录入
- **需求优先级看板**：拖拽式看板，按状态（新线索→评估中→已确认→已拒绝→已完成）管理线索
- **月费试点范围勾选**：支持标记月费试点客户并选择服务范围
- **导出功能**：支持导出为 Markdown 或 JSON 格式（下载或复制到剪贴板）
- **本地存储**：数据保存在浏览器 localStorage，无需后端服务

## 本地启动

### 环境要求

- Node.js 18+
- npm 或 pnpm

### 安装与运行

```bash
# 进入应用目录
cd app

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000 即可使用。

### 构建生产版本

```bash
npm run build
npm run start
```

## 演示路径

1. **创建线索**：点击右上角「新建线索」按钮
2. **填写信息**：
   - 基本信息（客户名称、联系方式、来源渠道、截止时间）
   - 项目类型（网站/小程序/App/数据分析等）
   - 已有材料（源代码/截图/数据库等）
   - 需求摘要
   - 预算与风险评估
   - 缺失信息（需要向客户追问的内容）
   - 月费试点（可选，勾选后选择服务范围）
   - 确认话术
3. **管理线索**：在看板中拖拽线索卡片调整状态
4. **导出数据**：点击「导出」按钮，选择 JSON 或 Markdown 格式

## 数据结构

每条线索包含以下字段：

| 字段 | 说明 |
|------|------|
| clientName | 客户名称/项目代号 |
| contact | 联系方式（脱敏后） |
| source | 来源渠道 |
| projectTypes | 项目类型（多选） |
| existingMaterials | 已有材料（多选） |
| requestSummary | 需求摘要 |
| deadline | 截止时间 |
| budgetRange | 预算范围 |
| riskLevel | 风险等级 |
| missingInfo | 缺失信息列表 |
| status | 状态（new/evaluating/confirmed/rejected/completed） |
| priority | 优先级（urgent/high/normal/low） |
| isRetainerPilot | 是否月费试点 |
| retainerScopes | 月费服务范围（多选） |
| confirmationMessage | 确认话术 |

## 技术栈

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- @dnd-kit (拖拽交互)
- Zustand (状态管理)

## 注意事项

- 数据存储在浏览器本地，清除浏览器数据会丢失线索记录
- 建议定期导出数据备份
- 不要在公开系统中存储真实客户隐私信息，请先脱敏处理

## License

MIT
