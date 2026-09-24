import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Lead, IntakeStatus } from '@/types';

interface LeadStore {
  leads: Lead[];
  addLead: (lead: Lead) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  updateLeadStatus: (id: string, status: IntakeStatus) => void;
  getLeadsByStatus: (status: IntakeStatus) => Lead[];
}

export const useLeadStore = create<LeadStore>()(
  persist(
    (set, get) => ({
      leads: [],
      addLead: (lead) =>
        set((state) => ({
          leads: [...state.leads, lead],
        })),
      updateLead: (id, updates) =>
        set((state) => ({
          leads: state.leads.map((lead) =>
            lead.id === id
              ? { ...lead, ...updates, updatedAt: new Date().toISOString() }
              : lead
          ),
        })),
      deleteLead: (id) =>
        set((state) => ({
          leads: state.leads.filter((lead) => lead.id !== id),
        })),
      updateLeadStatus: (id, status) =>
        set((state) => ({
          leads: state.leads.map((lead) =>
            lead.id === id
              ? { ...lead, status, updatedAt: new Date().toISOString() }
              : lead
          ),
        })),
      getLeadsByStatus: (status) => {
        return get().leads.filter((lead) => lead.status === status);
      },
    }),
    {
      name: 'client-intake-leads',
    }
  )
);
