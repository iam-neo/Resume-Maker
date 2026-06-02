'use client';

import { useResume } from '@/context/ResumeContext';
import { Plus, Trash2, FolderGit2, X } from 'lucide-react';

export default function ProjectsForm() {
  const { resumeData, addProject, updateProject, removeProject } = useResume();

  const addBullet = (projId: string) => {
    const proj = resumeData.projects.find((p) => p.id === projId);
    if (proj) {
      updateProject(projId, 'description', [...proj.description, '']);
    }
  };

  const updateBullet = (projId: string, bulletIdx: number, value: string) => {
    const proj = resumeData.projects.find((p) => p.id === projId);
    if (proj) {
      const newDesc = [...proj.description];
      newDesc[bulletIdx] = value;
      updateProject(projId, 'description', newDesc);
    }
  };

  const removeBullet = (projId: string, bulletIdx: number) => {
    const proj = resumeData.projects.find((p) => p.id === projId);
    if (proj && proj.description.length > 1) {
      const newDesc = proj.description.filter((_, i) => i !== bulletIdx);
      updateProject(projId, 'description', newDesc);
    }
  };

  const addTech = (projId: string, tech: string) => {
    const proj = resumeData.projects.find((p) => p.id === projId);
    if (proj && tech.trim()) {
      updateProject(projId, 'technologies', [...proj.technologies, tech.trim()]);
    }
  };

  const removeTech = (projId: string, techIdx: number) => {
    const proj = resumeData.projects.find((p) => p.id === projId);
    if (proj) {
      updateProject(projId, 'technologies', proj.technologies.filter((_, i) => i !== techIdx));
    }
  };

  return (
    <div className="space-y-4">
      {resumeData.projects.map((proj, idx) => (
        <div
          key={proj.id}
          className="p-4 rounded-lg bg-surface/60 border border-border space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <FolderGit2 className="w-4 h-4" />
              <span className="font-medium">{proj.name || `Project ${idx + 1}`}</span>
            </div>
            <button
              onClick={() => removeProject(proj.id)}
              className="p-1 rounded text-danger hover:bg-danger/10 transition-colors"
              aria-label="Remove project"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="input-label">Project Name</label>
              <input
                type="text"
                className="input-field"
                placeholder="My Awesome Project"
                value={proj.name}
                onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
              />
            </div>
            <div>
              <label className="input-label">Your Role</label>
              <input
                type="text"
                className="input-field"
                placeholder="Lead Developer"
                value={proj.role}
                onChange={(e) => updateProject(proj.id, 'role', e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="input-label">Project Link (optional)</label>
              <input
                type="text"
                className="input-field"
                placeholder="github.com/user/project"
                value={proj.link}
                onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
              />
            </div>
          </div>

          {/* Technologies */}
          <div>
            <label className="input-label">Technologies Used</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {proj.technologies.map((tech, tIdx) => (
                <span key={tIdx} className="tag">
                  {tech}
                  <button
                    onClick={() => removeTech(proj.id, tIdx)}
                    className="hover:text-white transition-colors"
                    aria-label={`Remove ${tech}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              className="input-field"
              placeholder="Type a technology and press Enter..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const input = e.target as HTMLInputElement;
                  addTech(proj.id, input.value);
                  input.value = '';
                }
              }}
            />
          </div>

          {/* Bullet Points */}
          <div>
            <label className="input-label">Description</label>
            <div className="space-y-2">
              {proj.description.map((bullet, bIdx) => (
                <div key={bIdx} className="flex items-start gap-2">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <textarea
                    className="input-field min-h-[40px] resize-y flex-1"
                    placeholder="Describe what you built or achieved..."
                    value={bullet}
                    rows={1}
                    onChange={(e) => updateBullet(proj.id, bIdx, e.target.value)}
                  />
                  {proj.description.length > 1 && (
                    <button
                      onClick={() => removeBullet(proj.id, bIdx)}
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
              onClick={() => addBullet(proj.id)}
              className="mt-2 text-xs text-primary-light hover:text-primary flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add bullet point
            </button>
          </div>
        </div>
      ))}

      <button onClick={addProject} className="btn btn-ghost w-full">
        <Plus className="w-4 h-4" />
        Add Project
      </button>
    </div>
  );
}
