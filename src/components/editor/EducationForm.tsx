'use client';

import { useResume } from '@/context/ResumeContext';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

export default function EducationForm() {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();

  return (
    <div className="space-y-4">
      {resumeData.education.map((edu, idx) => (
        <div
          key={edu.id}
          className="p-4 rounded-lg bg-surface/60 border border-border space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <GraduationCap className="w-4 h-4" />
              <span className="font-medium">
                {edu.school || `Education ${idx + 1}`}
              </span>
            </div>
            <button
              onClick={() => removeEducation(edu.id)}
              className="p-1 rounded text-danger hover:bg-danger/10 transition-colors"
              aria-label="Remove education"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="input-label">School / University</label>
              <input
                type="text"
                className="input-field"
                placeholder="Stanford University"
                value={edu.school}
                onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
              />
            </div>
            <div>
              <label className="input-label">Degree</label>
              <input
                type="text"
                className="input-field"
                placeholder="Bachelor of Science in Computer Science"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
              />
            </div>
            <div>
              <label className="input-label">Location</label>
              <input
                type="text"
                className="input-field"
                placeholder="Stanford, CA"
                value={edu.location}
                onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
              />
            </div>
            <div>
              <label className="input-label">GPA (optional)</label>
              <input
                type="text"
                className="input-field"
                placeholder="3.9 / 4.0"
                value={edu.gpa}
                onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="input-label">Start Date</label>
                <input
                  type="month"
                  className="input-field"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                />
              </div>
              <div>
                <label className="input-label">End Date</label>
                <input
                  type="month"
                  className="input-field"
                  value={edu.endDate}
                  disabled={edu.current}
                  onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer pb-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border accent-primary"
                  checked={edu.current}
                  onChange={(e) => updateEducation(edu.id, 'current', e.target.checked)}
                />
                Currently studying
              </label>
            </div>
          </div>

          <div>
            <label className="input-label">Activities / Notes (optional)</label>
            <input
              type="text"
              className="input-field"
              placeholder="Dean's List, Club President, Honors Program..."
              value={edu.description}
              onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
            />
          </div>
        </div>
      ))}

      <button onClick={addEducation} className="btn btn-ghost w-full">
        <Plus className="w-4 h-4" />
        Add Education
      </button>
    </div>
  );
}
