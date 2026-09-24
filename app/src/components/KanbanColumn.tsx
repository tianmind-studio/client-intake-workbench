'use client';

import { useDroppable } from '@dnd-kit/core';
import { clsx } from 'clsx';

interface KanbanColumnProps {
  id: string;
  title: string;
  count: number;
  colorClass: string;
  headerColorClass: string;
  children: React.ReactNode;
}

export function KanbanColumn({
  id,
  title,
  count,
  colorClass,
  headerColorClass,
  children,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={clsx(
        'w-72 flex-shrink-0 rounded-xl border-2 flex flex-col transition-colors',
        colorClass,
        isOver && 'ring-2 ring-blue-400 ring-offset-2'
      )}
    >
      <div className="px-4 py-3 border-b border-slate-200/50">
        <div className="flex items-center justify-between">
          <h3 className={clsx('font-medium', headerColorClass)}>{title}</h3>
          <span
            className={clsx(
              'text-xs px-2 py-0.5 rounded-full bg-white/60',
              headerColorClass
            )}
          >
            {count}
          </span>
        </div>
      </div>
      <div className="flex-1 p-2 space-y-2 overflow-y-auto scrollbar-thin min-h-[200px]">
        {children}
      </div>
    </div>
  );
}
