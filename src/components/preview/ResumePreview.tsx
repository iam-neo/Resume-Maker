'use client';

import React, { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import ModernTemplate from '../templates/ModernTemplate';
import ExecutiveTemplate from '../templates/ExecutiveTemplate';
import MinimalistTemplate from '../templates/MinimalistTemplate';
import { ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';

const fontMap: Record<string, string> = {
  'Inter': 'font-sans',
  'Outfit': '"Outfit", sans-serif',
  'Plus Jakarta Sans': '"Plus Jakarta Sans", sans-serif',
  'Lora': '"Lora", serif',
  'Playfair Display': '"Playfair Display", serif',
  'Merriweather': '"Merriweather", serif',
  'Roboto Mono': '"Roboto Mono", monospace',
};

const spacingMap = {
  compact: {
    sectionGap: 'space-y-2.5',
    entryGap: 'space-y-1.5',
    itemGap: 'gap-1',
    padding: 'p-6',
    margin: 'mb-1.5',
    textBase: 'text-[11px] leading-relaxed',
    textLg: 'text-[13px] leading-snug',
    textXl: 'text-[15px] leading-tight',
    text2xl: 'text-lg',
  },
  normal: {
    sectionGap: 'space-y-4',
    entryGap: 'space-y-2.5',
    itemGap: 'gap-1.5',
    padding: 'p-8',
    margin: 'mb-3',
    textBase: 'text-[13px] leading-relaxed',
    textLg: 'text-[15px] leading-snug',
    textXl: 'text-[18px] leading-tight',
    text2xl: 'text-xl',
  },
  spacious: {
    sectionGap: 'space-y-6',
    entryGap: 'space-y-4',
    itemGap: 'gap-2.5',
    padding: 'p-10',
    margin: 'mb-4.5',
    textBase: 'text-[15px] leading-relaxed',
    textLg: 'text-[17px] leading-snug',
    textXl: 'text-[20px] leading-tight',
    text2xl: 'text-2xl',
  },
};

export default function ResumePreview() {
  const { resumeData } = useResume();
  const [zoom, setZoom] = useState(0.85);

  const { template, fontFamily, spacing } = resumeData;

  const activeSpacing = spacingMap[spacing] || spacingMap.normal;
  const activeFont = fontMap[fontFamily] || '"Inter", sans-serif';

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.05, 1.3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.05, 0.5));
  const handleZoomReset = () => setZoom(0.85);

  // Render the selected template
  const renderTemplate = () => {
    switch (template) {
      case 'executive':
        return <ExecutiveTemplate data={resumeData} s={activeSpacing} />;
      case 'minimalist':
        return <MinimalistTemplate data={resumeData} s={activeSpacing} />;
      case 'modern':
      default:
        return <ModernTemplate data={resumeData} s={activeSpacing} />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Zoom Controls Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surface-light no-print">
        <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          Live PDF Preview ({Math.round(zoom * 100)}%)
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-border-light transition-colors"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomReset}
            className="p-1.5 rounded bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-border-light transition-colors"
            title="Reset Zoom"
            aria-label="Reset Zoom"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-border-light transition-colors"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Preview Sheet Container */}
      <div className="flex-1 overflow-auto bg-surface/50 p-6 flex justify-center items-start">
        <div
          className="resume-sheet"
          style={{
            fontFamily: activeFont,
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            marginBottom: `calc((297mm * ${zoom}) - 297mm)`,
            transition: 'transform 0.15s ease-out',
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}
