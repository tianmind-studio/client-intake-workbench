'use client';

import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { clsx } from 'clsx';
import type { Lead, IntakeStatus } from '@/types';
import { INTAKE_STATUS_LABELS, PRIORITY_LABELS, PROJECT_TYPE_LABELS } from '@/types';
import { useLeadStore } from '@/store/useLeadStore';
import { KanbanColumn } from './KanbanColumn';
import { LeadCard } from './LeadCard';
import { EmptyState, ClipboardIcon } from './EmptyState';

const COLUMNS: IntakeStatus[] = ['new', 'evaluating', 'confirmed', 'rejected', 'completed'];

const COLUMN_COLORS: Record<IntakeStatus, string> = {
  new: 'bg-slate-100 border-slate-300',
  evaluating: 'bg-blue-50 border-blue-200',
  confirmed: 'bg-green-50 border-green-200',
  rejected: 'bg-red-50 border-red-200',
  completed: 'bg-purple-50 border-purple-200',
};

const COLUMN_HEADER_COLORS: Record<IntakeStatus, string> = {
  new: 'text-slate-700',
  evaluating: 'text-blue-700',
  confirmed: 'text-green-700',
  rejected: 'text-red-700',
  completed: 'text-purple-700',
};

interface KanbanBoardProps {
  onEditLead: (lead: Lead) => void;
}

export function KanbanBoard({ onEditLead }: KanbanBoardProps) {
  const leads = useLeadStore((state) => state.leads);
  const updateLeadStatus = useLeadStore((state) => state.updateLeadStatus);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getLeadsByStatus = (status: IntakeStatus) => {
    return leads.filter((lead) => lead.status === status);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeLeadId = active.id as string;
    const overId = over.id as string;

    if (COLUMNS.includes(overId as IntakeStatus)) {
      updateLeadStatus(activeLeadId, overId as IntakeStatus);
    } else {
      const overLead = leads.find((l) => l.id === overId);
      if (overLead) {
        updateLeadStatus(activeLeadId, overLead.status);
      }
    }
  };

  const activeLead = activeId ? leads.find((l) => l.id === activeId) : null;

  if (leads.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <EmptyState
          icon={<ClipboardIcon className="w-16 h-16" />}
          title="还没有任何线索"
          description="点击右上角「新建线索」开始记录第一条客户需求。录入后可在看板中拖拽调整状态。"
        />
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex-1 overflow-x-auto scrollbar-thin">
        <div className="flex gap-4 p-4 min-w-max h-full">
          {COLUMNS.map((status) => {
            const columnLeads = getLeadsByStatus(status);
            return (
              <KanbanColumn
                key={status}
                id={status}
                title={INTAKE_STATUS_LABELS[status]}
                count={columnLeads.length}
                colorClass={COLUMN_COLORS[status]}
                headerColorClass={COLUMN_HEADER_COLORS[status]}
              >
                <SortableContext
                  items={columnLeads.map((l) => l.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {columnLeads.length === 0 ? (
                    <div className="text-sm text-slate-400 text-center py-8">
                      拖拽线索到此处
                    </div>
                  ) : (
                    columnLeads.map((lead) => (
                      <LeadCard
                        key={lead.id}
                        lead={lead}
                        onEdit={() => onEditLead(lead)}
                      />
                    ))
                  )}
                </SortableContext>
              </KanbanColumn>
            );
          })}
        </div>
      </div>

      <DragOverlay>
        {activeLead ? (
          <div className="opacity-80">
            <LeadCard lead={activeLead} isDragging />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
