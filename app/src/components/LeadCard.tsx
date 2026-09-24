'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { clsx } from 'clsx';
import type { Lead } from '@/types';
import { PRIORITY_LABELS, PROJECT_TYPE_LABELS, RETAINER_SCOPE_LABELS } from '@/types';
import { useLeadStore } from '@/store/useLeadStore';

interface LeadCardProps {
  lead: Lead;
  onEdit?: () => void;
  isDragging?: boolean;
}

const PRIORITY_COLORS = {
  urgent: 'bg-red-500',
  high: 'bg-orange-500',
  normal: 'bg-blue-500',
  low: 'bg-slate-400',
};

export function LeadCard({ lead, onEdit, isDragging }: LeadCardProps) {
  const deleteLead = useLeadStore((state) => state.deleteLead);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('确定要删除这条线索吗？')) {
      deleteLead(lead.id);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={clsx(
        'bg-white rounded-lg p-3 shadow-sm border border-slate-200 cursor-grab active:cursor-grabbing transition-shadow hover:shadow-md',
        (isDragging || isSortableDragging) && 'opacity-50 shadow-lg'
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span
            className={clsx(
              'w-2 h-2 rounded-full flex-shrink-0',
              PRIORITY_COLORS[lead.priority]
            )}
            title={PRIORITY_LABELS[lead.priority]}
          />
          <h4 className="font-medium text-slate-800 text-sm line-clamp-1">
            {lead.clientName}
          </h4>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
              title="编辑"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          )}
          <button
            onClick={handleDelete}
            className="p-1 text-slate-400 hover:text-red-600 transition-colors"
            title="删除"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {lead.source && (
        <p className="text-xs text-slate-500 mb-2">来源: {lead.source}</p>
      )}

      {lead.projectTypes.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {lead.projectTypes.slice(0, 2).map((type) => (
            <span
              key={type}
              className="text-xs px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded"
            >
              {PROJECT_TYPE_LABELS[type]}
            </span>
          ))}
          {lead.projectTypes.length > 2 && (
            <span className="text-xs px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded">
              +{lead.projectTypes.length - 2}
            </span>
          )}
        </div>
      )}

      {lead.isRetainerPilot && (
        <div className="flex items-center gap-1 mb-2">
          <span className="text-xs px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded font-medium">
            月费试点
          </span>
          {lead.retainerScopes.length > 0 && (
            <span className="text-xs text-purple-600">
              {lead.retainerScopes.length}项
            </span>
          )}
        </div>
      )}

      {lead.deadline && (
        <p className="text-xs text-slate-400">截止: {lead.deadline}</p>
      )}

      {lead.missingInfo.length > 0 && (
        <div className="mt-2 pt-2 border-t border-slate-100">
          <p className="text-xs text-amber-600">
            待确认: {lead.missingInfo.length}项
          </p>
        </div>
      )}
    </div>
  );
}
