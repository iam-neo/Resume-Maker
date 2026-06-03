'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  ResumeData,
  DEFAULT_RESUME_DATA,
  SAMPLE_RESUME_DATA,
  WorkExperience,
  Education,
  Project,
  TemplateName,
  SpacingOption,
} from '@/types/resume';

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  updatePersonalInfo: (field: string, value: string) => void;
  updateProfileImage: (file: File) => void;
  removeProfileImage: () => void;
  updateSummary: (value: string) => void;

  addWorkExperience: () => void;
  updateWorkExperience: (id: string, field: string, value: string | boolean | string[]) => void;
  removeWorkExperience: (id: string) => void;
  moveWorkExperience: (id: string, direction: 'up' | 'down') => void;

  addEducation: () => void;
  updateEducation: (id: string, field: string, value: string | boolean) => void;
  removeEducation: (id: string) => void;

  addProject: () => void;
  updateProject: (id: string, field: string, value: string | string[]) => void;
  removeProject: (id: string) => void;

  updateSkills: (skills: string[]) => void;
  updateLanguages: (languages: string[]) => void;
  updateCertifications: (certifications: string[]) => void;

  setTemplate: (template: TemplateName) => void;
  setThemeColor: (color: string) => void;
  setFontFamily: (font: string) => void;
  setSpacing: (spacing: SpacingOption) => void;

  loadSampleData: () => void;
  resetData: () => void;
  exportJSON: () => void;
  importJSON: (file: File) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'resume_maker_data';

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(DEFAULT_RESUME_DATA);
  const initialLoadDone = useRef(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setResumeData(parsed);
      }
    } catch {
      // ignore parse errors
    }
    initialLoadDone.current = true;
  }, []);

  // Auto-save to localStorage on every change
  useEffect(() => {
    if (!initialLoadDone.current) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resumeData));
    } catch {
      // ignore quota errors
    }
  }, [resumeData]);

  const generateId = () => `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  const updatePersonalInfo = useCallback((field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  }, []);

  const updateProfileImage = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const MAX_SIZE = 300;
        let w = img.width;
        let h = img.height;
        if (w > MAX_SIZE || h > MAX_SIZE) {
          const ratio = Math.min(MAX_SIZE / w, MAX_SIZE / h);
          w = Math.round(w * ratio);
          h = Math.round(h * ratio);
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setResumeData((prev) => ({
          ...prev,
          personalInfo: { ...prev.personalInfo, profileImage: dataUrl },
        }));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const removeProfileImage = useCallback(() => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, profileImage: undefined },
    }));
  }, []);

  const updateSummary = useCallback((value: string) => {
    setResumeData((prev) => ({ ...prev, summary: value }));
  }, []);

  // --- Work Experience ---
  const addWorkExperience = useCallback(() => {
    const newExp: WorkExperience = {
      id: generateId(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: [''],
    };
    setResumeData((prev) => ({
      ...prev,
      workExperience: [...prev.workExperience, newExp],
    }));
  }, []);

  const updateWorkExperience = useCallback(
    (id: string, field: string, value: string | boolean | string[]) => {
      setResumeData((prev) => ({
        ...prev,
        workExperience: prev.workExperience.map((exp) =>
          exp.id === id ? { ...exp, [field]: value } : exp
        ),
      }));
    },
    []
  );

  const removeWorkExperience = useCallback((id: string) => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((exp) => exp.id !== id),
    }));
  }, []);

  const moveWorkExperience = useCallback((id: string, direction: 'up' | 'down') => {
    setResumeData((prev) => {
      const idx = prev.workExperience.findIndex((e) => e.id === id);
      if (idx === -1) return prev;
      const newArr = [...prev.workExperience];
      const swap = direction === 'up' ? idx - 1 : idx + 1;
      if (swap < 0 || swap >= newArr.length) return prev;
      [newArr[idx], newArr[swap]] = [newArr[swap], newArr[idx]];
      return { ...prev, workExperience: newArr };
    });
  }, []);

  // --- Education ---
  const addEducation = useCallback(() => {
    const newEdu: Education = {
      id: generateId(),
      school: '',
      degree: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      description: '',
    };
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
  }, []);

  const updateEducation = useCallback(
    (id: string, field: string, value: string | boolean) => {
      setResumeData((prev) => ({
        ...prev,
        education: prev.education.map((edu) =>
          edu.id === id ? { ...edu, [field]: value } : edu
        ),
      }));
    },
    []
  );

  const removeEducation = useCallback((id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  }, []);

  // --- Projects ---
  const addProject = useCallback(() => {
    const newProj: Project = {
      id: generateId(),
      name: '',
      role: '',
      technologies: [],
      link: '',
      description: [''],
    };
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProj],
    }));
  }, []);

  const updateProject = useCallback(
    (id: string, field: string, value: string | string[]) => {
      setResumeData((prev) => ({
        ...prev,
        projects: prev.projects.map((proj) =>
          proj.id === id ? { ...proj, [field]: value } : proj
        ),
      }));
    },
    []
  );

  const removeProject = useCallback((id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }));
  }, []);

  // --- Skills, Languages, Certifications ---
  const updateSkills = useCallback((skills: string[]) => {
    setResumeData((prev) => ({ ...prev, skills }));
  }, []);

  const updateLanguages = useCallback((languages: string[]) => {
    setResumeData((prev) => ({ ...prev, languages }));
  }, []);

  const updateCertifications = useCallback((certifications: string[]) => {
    setResumeData((prev) => ({ ...prev, certifications }));
  }, []);

  // --- Theme ---
  const setTemplate = useCallback((template: TemplateName) => {
    setResumeData((prev) => ({ ...prev, template }));
  }, []);

  const setThemeColor = useCallback((color: string) => {
    setResumeData((prev) => ({ ...prev, themeColor: color }));
  }, []);

  const setFontFamily = useCallback((font: string) => {
    setResumeData((prev) => ({ ...prev, fontFamily: font }));
  }, []);

  const setSpacing = useCallback((spacing: SpacingOption) => {
    setResumeData((prev) => ({ ...prev, spacing }));
  }, []);

  // --- Data operations ---
  const loadSampleData = useCallback(() => {
    setResumeData(SAMPLE_RESUME_DATA);
  }, []);

  const resetData = useCallback(() => {
    setResumeData(DEFAULT_RESUME_DATA);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }, []);

  const exportJSON = useCallback(() => {
    const blob = new Blob([JSON.stringify(resumeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume_${resumeData.personalInfo.fullName.replace(/\s+/g, '_') || 'data'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [resumeData]);

  const importJSON = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        setResumeData(parsed);
      } catch {
        alert('Invalid JSON file. Please select a valid resume data file.');
      }
    };
    reader.readAsText(file);
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        updatePersonalInfo,
        updateProfileImage,
        removeProfileImage,
        updateSummary,
        addWorkExperience,
        updateWorkExperience,
        removeWorkExperience,
        moveWorkExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addProject,
        updateProject,
        removeProject,
        updateSkills,
        updateLanguages,
        updateCertifications,
        setTemplate,
        setThemeColor,
        setFontFamily,
        setSpacing,
        loadSampleData,
        resetData,
        exportJSON,
        importJSON,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
