'use client';

import { useResume } from '@/context/ResumeContext';
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Briefcase,
  GripVertical,
} from 'lucide-react';

export default function ExperienceForm() {
  const {
    resumeData,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
    moveWorkExperience,
  } = useResume();

  const addBullet = (expId: string) => {
    const exp = resumeData.workExperience.find((e) => e.id === expId);
    if (exp) {
      updateWorkExperience(expId, 'description', [...exp.description, '']);
    }
  };

  const updateBullet = (expId: string, bulletIdx: number, value: string) => {
    const exp = resumeData.workExperience.find((e) => e.id === expId);
    if (exp) {
      const newDesc = [...exp.description];
      newDesc[bulletIdx] = value;
      updateWorkExperience(expId, 'description', newDesc);
    }
  };

  const removeBullet = (expId: string, bulletIdx: number) => {
    const exp = resumeData.workExperience.find((e) => e.id === expId);
    if (exp && exp.description.length > 1) {
      const newDesc = exp.description.filter((_, i) => i !== bulletIdx);
      updateWorkExperience(expId, 'description', newDesc);
    }
  };

  return (
    <div className="space-y-4">
      {resumeData.workExperience.map((exp, idx) => (
        <div
          key={exp.id}
          className="p-4 rounded-lg bg-surface/60 border border-border space-y-3"
        >
          {/* Header with controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <GripVertical className="w-4 h-4 text-text-muted" />
              <Briefcase className="w-4 h-4" />
              <span className="font-medium">
                {exp.position || exp.company || `Experience ${idx + 1}`}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => moveWorkExperience(exp.id, 'up')}
                disabled={idx === 0}
                className="p-1 rounded hover:bg-surface-lighter disabled:opacity-30 transition-colors"
                aria-label="Move up"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => moveWorkExperience(exp.id, 'down')}
                disabled={idx === resumeData.workExperience.length - 1}
                className="p-1 rounded hover:bg-surface-lighter disabled:opacity-30 transition-colors"
                aria-label="Move down"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => removeWorkExperience(exp.id)}
                className="p-1 rounded text-danger hover:bg-danger/10 transition-colors"
                aria-label="Remove experience"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="input-label">Position / Title</label>
              <input
                type="text"
                className="input-field"
                placeholder="Senior Software Engineer"
                value={exp.position}
                onChange={(e) => updateWorkExperience(exp.id, 'position', e.target.value)}
              />
            </div>
            <div>
              <label className="input-label">Company</label>
              <input
                type="text"
                className="input-field"
                placeholder="Google"
                value={exp.company}
                onChange={(e) => updateWorkExperience(exp.id, 'company', e.target.value)}
              />
            </div>
            <div>
              <label className="input-label">Location</label>
              <input
                type="text"
                className="input-field"
                placeholder="San Francisco, CA"
                value={exp.location}
                onChange={(e) => updateWorkExperience(exp.id, 'location', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="input-label">Start Date</label>
                <input
                  type="month"
                  className="input-field"
                  value={exp.startDate}
                  onChange={(e) => updateWorkExperience(exp.id, 'startDate', e.target.value)}
                />
              </div>
              <div>
                <label className="input-label">End Date</label>
                <input
                  type="month"
                  className="input-field"
                  value={exp.endDate}
                  disabled={exp.current}
                  onChange={(e) => updateWorkExperience(exp.id, 'endDate', e.target.value)}
                />
              </div>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-border accent-primary"
              checked={exp.current}
              onChange={(e) => updateWorkExperience(exp.id, 'current', e.target.checked)}
            />
            I currently work here
          </label>

          {/* Bullet Points */}
          <div>
            <label className="input-label">Key Achievements / Responsibilities</label>
            <div className="space-y-2">
              {exp.description.map((bullet, bIdx) => (
                <div key={bIdx} className="flex items-start gap-2">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <textarea
                    className="input-field min-h-[40px] resize-y flex-1"
                    placeholder="Describe a key achievement with measurable impact..."
                    value={bullet}
                    rows={1}
                    onChange={(e) => updateBullet(exp.id, bIdx, e.target.value)}
                  />
                  {exp.description.length > 1 && (
                    <button
                      onClick={() => removeBullet(exp.id, bIdx)}
                      className="mt-1.5 p-1 text-text-muted hover:text-danger transition-colors"
                      aria-label="Remove bullet"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => addBullet(exp.id)}
              className="mt-2 text-xs text-primary-light hover:text-primary flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add bullet point
            </button>
          </div>
        </div>
      ))}

      <button onClick={addWorkExperience} className="btn btn-ghost w-full">
        <Plus className="w-4 h-4" />
        Add Work Experience
      </button>
    </div>
  );
}
