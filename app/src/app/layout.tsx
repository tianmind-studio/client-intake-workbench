import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '客户需求工作台',
  description: '轻量级客户线索录入与需求梳理工具',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
