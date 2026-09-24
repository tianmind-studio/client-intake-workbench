'use client';

import { useState } from 'react';
import { KanbanBoard } from '@/components/KanbanBoard';
import { LeadForm } from '@/components/LeadForm';
import { ExportMenu } from '@/components/ExportMenu';
import type { Lead } from '@/types';

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | undefined>();

  const handleOpenForm = () => {
    setEditingLead(undefined);
    setIsFormOpen(true);
  };

  const handleEditLead = (lead: Lead) => {
    setEditingLead(lead);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingLead(undefined);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-800">客户需求工作台</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              轻量级线索录入与需求梳理
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ExportMenu />
            <button
              onClick={handleOpenForm}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              新建线索
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-50">
        <KanbanBoard onEditLead={handleEditLead} />
      </main>

      {/* Form modal */}
      {isFormOpen && (
        <LeadForm onClose={handleCloseForm} editingLead={editingLead} />
      )}
    </div>
  );
}
