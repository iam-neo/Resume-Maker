'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ResumeProvider, useResume } from '@/context/ResumeContext';
import PersonalInfoForm from '@/components/editor/PersonalInfoForm';
import ExperienceForm from '@/components/editor/ExperienceForm';
import EducationForm from '@/components/editor/EducationForm';
import ProjectsForm from '@/components/editor/ProjectsForm';
import SkillsForm from '@/components/editor/SkillsForm';
import ResumePreview from '@/components/preview/ResumePreview';
import {
  FileText,
  Sparkles,
  Download,
  Upload,
  RefreshCw,
  Trash2,
  ChevronDown,
  ChevronUp,
  User,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Wrench,
  Palette,
  ArrowLeft,
} from 'lucide-react';

const COLORS = [
  { name: 'Blue', value: '#2563eb' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Rose', value: '#f43f5e' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Slate', value: '#475569' },
  { name: 'Teal', value: '#0d9488' },
];

const FONTS = [
  'Inter',
  'Outfit',
  'Plus Jakarta Sans',
  'Lora',
  'Playfair Display',
  'Merriweather',
  'Roboto Mono',
];

function BuilderWorkspace() {
  const {
    resumeData,
    setTemplate,
    setThemeColor,
    setFontFamily,
    setSpacing,
    loadSampleData,
    resetData,
    exportJSON,
    importJSON,
  } = useResume();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Accordion state
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    styling: true,
    personal: true,
    experience: false,
    education: false,
    projects: false,
    skills: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importJSON(file);
    }
  };

  const triggerPrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col text-text-primary">
      {/* Header Toolbar */}
      <header className="h-16 border-b border-border bg-surface-light fixed top-0 left-0 right-0 z-40 px-6 flex items-center justify-between no-print glass">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
            title="Back to Landing Page"
            aria-label="Back to landing page"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <FileText className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-bold tracking-tight hidden sm:inline">
              Resume<span className="text-primary-light">Workspace</span>
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={loadSampleData}
            className="btn btn-ghost text-xs px-3 py-2 flex items-center gap-1.5"
            title="Load template placeholder data to see how it works"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
            <span className="hidden md:inline">Demo Data</span>
          </button>
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn btn-ghost text-xs px-3 py-2 flex items-center gap-1.5"
            title="Import from JSON file"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Import JSON</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />

          <button
            onClick={exportJSON}
            className="btn btn-ghost text-xs px-3 py-2 flex items-center gap-1.5"
            title="Export as backup JSON file"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Backup JSON</span>
          </button>

          <button
            onClick={resetData}
            className="btn btn-danger text-xs px-3 py-2 flex items-center gap-1.5"
            title="Reset/Clear form data"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Clear All</span>
          </button>

          <button
            onClick={triggerPrint}
            className="btn btn-primary text-xs px-4 py-2 flex items-center gap-1.5"
            title="Print or Save as PDF"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 pt-16 flex flex-col lg:flex-row min-h-screen">
        {/* Left Panel: Form Editors */}
        <div className="w-full lg:w-[45%] border-r border-border bg-surface-light/40 overflow-y-auto p-6 space-y-4 no-print editor-panel">
          
          {/* Section 1: Styling & Template Controls */}
          <div className="editor-section">
            <div
              onClick={() => toggleSection('styling')}
              className="editor-section-header"
            >
              <div className="flex items-center gap-2.5 font-bold text-sm text-text-primary">
                <Palette className="w-4 h-4 text-primary-light" />
                <span>1. Customize Design & Layout</span>
              </div>
              {openSections.styling ? <ChevronUp className="w-4 h-4 text-text-muted" /> : <ChevronDown className="w-4 h-4 text-text-muted" />}
            </div>

            {openSections.styling && (
              <div className="editor-section-content space-y-4 border-t border-border/40 pt-4">
                {/* Templates Selection */}
                <div>
                  <label className="input-label">Select Layout Design</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['modern', 'executive', 'minimalist'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTemplate(t)}
                        className={`py-2 px-3 rounded-lg border text-xs font-semibold uppercase tracking-wide transition-all ${
                          resumeData.template === t
                            ? 'bg-primary/10 border-primary text-primary-light'
                            : 'bg-surface border-border text-text-secondary hover:border-border-light'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primary Colors */}
                <div>
                  <label className="input-label">Accent Color Theme</label>
                  <div className="flex flex-wrap gap-2.5">
                    {COLORS.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => setThemeColor(c.value)}
                        className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                          resumeData.themeColor === c.value ? 'border-white scale-110' : 'border-transparent hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.value }}
                        title={c.name}
                        aria-label={`Select ${c.name} accent`}
                      />
                    ))}
                    {/* Custom Hex Color Picker */}
                    <div className="relative w-7 h-7 rounded-full overflow-hidden border border-border">
                      <input
                        type="color"
                        value={resumeData.themeColor}
                        onChange={(e) => setThemeColor(e.target.value)}
                        className="absolute inset-0 cursor-pointer w-full h-full scale-150"
                        title="Custom Color"
                      />
                    </div>
                  </div>
                </div>

                {/* Fonts & Spacing */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">Typography Style</label>
                    <select
                      value={resumeData.fontFamily}
                      onChange={(e) => setFontFamily(e.target.value)}
                      className="input-field"
                    >
                      {FONTS.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="input-label">Line & Item Spacing</label>
                    <select
                      value={resumeData.spacing}
                      onChange={(e) => setSpacing(e.target.value as any)}
                      className="input-field"
                    >
                      <option value="compact">Compact</option>
                      <option value="normal">Normal</option>
                      <option value="spacious">Spacious</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Personal Information */}
          <div className="editor-section">
            <div
              onClick={() => toggleSection('personal')}
              className="editor-section-header"
            >
              <div className="flex items-center gap-2.5 font-bold text-sm text-text-primary">
                <User className="w-4 h-4 text-primary-light" />
                <span>2. Personal Info & Summary</span>
              </div>
              {openSections.personal ? <ChevronUp className="w-4 h-4 text-text-muted" /> : <ChevronDown className="w-4 h-4 text-text-muted" />}
            </div>

            {openSections.personal && (
              <div className="editor-section-content border-t border-border/40 pt-4">
                <PersonalInfoForm />
              </div>
            )}
          </div>

          {/* Section 3: Work Experience */}
          <div className="editor-section">
            <div
              onClick={() => toggleSection('experience')}
              className="editor-section-header"
            >
              <div className="flex items-center gap-2.5 font-bold text-sm text-text-primary">
                <Briefcase className="w-4 h-4 text-primary-light" />
                <span>3. Work Experience ({resumeData.workExperience.length})</span>
              </div>
              {openSections.experience ? <ChevronUp className="w-4 h-4 text-text-muted" /> : <ChevronDown className="w-4 h-4 text-text-muted" />}
            </div>

            {openSections.experience && (
              <div className="editor-section-content border-t border-border/40 pt-4">
                <ExperienceForm />
              </div>
            )}
          </div>

          {/* Section 4: Projects */}
          <div className="editor-section">
            <div
              onClick={() => toggleSection('projects')}
              className="editor-section-header"
            >
              <div className="flex items-center gap-2.5 font-bold text-sm text-text-primary">
                <FolderGit2 className="w-4 h-4 text-primary-light" />
                <span>4. Projects ({resumeData.projects.length})</span>
              </div>
              {openSections.projects ? <ChevronUp className="w-4 h-4 text-text-muted" /> : <ChevronDown className="w-4 h-4 text-text-muted" />}
            </div>

            {openSections.projects && (
              <div className="editor-section-content border-t border-border/40 pt-4">
                <ProjectsForm />
              </div>
            )}
          </div>

          {/* Section 5: Education */}
          <div className="editor-section">
            <div
              onClick={() => toggleSection('education')}
              className="editor-section-header"
            >
              <div className="flex items-center gap-2.5 font-bold text-sm text-text-primary">
                <GraduationCap className="w-4 h-4 text-primary-light" />
                <span>5. Education ({resumeData.education.length})</span>
              </div>
              {openSections.education ? <ChevronUp className="w-4 h-4 text-text-muted" /> : <ChevronDown className="w-4 h-4 text-text-muted" />}
            </div>

            {openSections.education && (
              <div className="editor-section-content border-t border-border/40 pt-4">
                <EducationForm />
              </div>
            )}
          </div>

          {/* Section 6: Skills & Tags */}
          <div className="editor-section">
            <div
              onClick={() => toggleSection('skills')}
              className="editor-section-header"
            >
              <div className="flex items-center gap-2.5 font-bold text-sm text-text-primary">
                <Wrench className="w-4 h-4 text-primary-light" />
                <span>6. Skills, Languages & Certifications</span>
              </div>
              {openSections.skills ? <ChevronUp className="w-4 h-4 text-text-muted" /> : <ChevronDown className="w-4 h-4 text-text-muted" />}
            </div>

            {openSections.skills && (
              <div className="editor-section-content border-t border-border/40 pt-4">
                <SkillsForm />
              </div>
            )}
          </div>

        </div>

        {/* Right Panel: Live PDF Preview */}
        <div className="w-full lg:w-[55%] flex flex-col bg-surface overflow-hidden">
          <ResumePreview />
        </div>
      </div>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <ResumeProvider>
      <BuilderWorkspace />
    </ResumeProvider>
  );
}
