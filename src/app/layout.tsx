import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Resume Maker — Build Professional Resumes in Minutes',
  description:
    'Create stunning, ATS-friendly professional resumes with our modern builder. Choose from premium templates, customize every detail, and export to PDF instantly.',
  keywords: ['resume builder', 'CV maker', 'professional resume', 'ATS-friendly', 'PDF export'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-surface text-text-primary antialiased">{children}</body>
    </html>
  );
}
