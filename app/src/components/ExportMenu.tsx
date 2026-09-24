'use client';

import { useState, useRef, useEffect } from 'react';
import { useLeadStore } from '@/store/useLeadStore';
import { exportToJSON, exportToMarkdown, downloadFile } from '@/lib/export';

export function ExportMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const leads = useLeadStore((state) => state.leads);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExportJSON = () => {
    const content = exportToJSON(leads);
    const filename = `leads-${new Date().toISOString().split('T')[0]}.json`;
    downloadFile(content, filename, 'application/json');
    setIsOpen(false);
  };

  const handleExportMarkdown = () => {
    const content = exportToMarkdown(leads);
    const filename = `leads-${new Date().toISOString().split('T')[0]}.md`;
    downloadFile(content, filename, 'text/markdown');
    setIsOpen(false);
  };

  const handleCopyJSON = async () => {
    const content = exportToJSON(leads);
    await navigator.clipboard.writeText(content);
    setIsOpen(false);
    alert('JSON 已复制到剪贴板');
  };

  const handleCopyMarkdown = async () => {
    const content = exportToMarkdown(leads);
    await navigator.clipboard.writeText(content);
    setIsOpen(false);
    alert('Markdown 已复制到剪贴板');
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={leads.length === 0}
        className="flex items-center gap-2 px-4 py-2 text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        导出
      </button>

      {isOpen && leads.length > 0 && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
          <button
            onClick={handleExportJSON}
            className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
          >
            <span className="text-blue-500">{ '{}'}</span>
            下载 JSON
          </button>
          <button
            onClick={handleExportMarkdown}
            className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
          >
            <span className="text-purple-500">#</span>
            下载 Markdown
          </button>
          <hr className="my-1 border-slate-100" />
          <button
            onClick={handleCopyJSON}
            className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
          >
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            复制 JSON
          </button>
          <button
            onClick={handleCopyMarkdown}
            className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
          >
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            复制 Markdown
          </button>
        </div>
      )}
    </div>
  );
}
