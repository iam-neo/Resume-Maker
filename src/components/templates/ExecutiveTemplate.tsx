'use client';

import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { Linkedin, Github } from '@/components/icons/BrandIcons';


interface TemplateProps {
  data: ResumeData;
  s: any; // Spacing settings
}

export default function ExecutiveTemplate({ data, s }: TemplateProps) {
  const { personalInfo, summary, workExperience, education, projects, skills, languages, certifications, themeColor } = data;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr + '-02');
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  // Helper for contact details line
  const contactItems = [
    personalInfo.email && { label: personalInfo.email, icon: Mail },
    personalInfo.phone && { label: personalInfo.phone, icon: Phone },
    personalInfo.location && { label: personalInfo.location, icon: MapPin },
    personalInfo.website && { label: personalInfo.website, icon: Globe },
    personalInfo.linkedin && { label: personalInfo.linkedin, icon: Linkedin },
    personalInfo.github && { label: personalInfo.github, icon: Github },
  ].filter(Boolean) as { label: string; icon: any }[];

  return (
    <div className="p-10 text-slate-800 flex flex-col h-full bg-white">
      {/* Centered Header */}
      <div className="text-center mb-6">
        <h1 
          className="font-bold tracking-tight uppercase mb-2"
          style={{ 
            color: '#1e293b',
            fontSize: s.text2xl === 'text-lg' ? '1.75rem' : s.text2xl === 'text-xl' ? '2.25rem' : '2.75rem',
            fontFamily: 'inherit'
          }}
        >
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p 
          className="font-semibold uppercase tracking-wider mb-3"
          style={{ color: themeColor, fontSize: s.textLg }}
        >
          {personalInfo.jobTitle || 'Your Job Title'}
        </p>
        
        {/* Contact info list with bullet separators */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-slate-500 font-medium max-w-2xl mx-auto" style={{ fontSize: s.textBase }}>
          {contactItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <item.icon className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>{item.label}</span>
              {idx < contactItems.length - 1 && (
                <span className="text-slate-300 ml-2 select-none">&bull;</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Accordion Sections in Full Width */}
      <div className="flex flex-col gap-6">
        
        {/* Summary */}
        {summary && (
          <div className="resume-section">
            <h3 
              className="font-bold uppercase tracking-wider mb-1.5 border-b-2 pb-0.5" 
              style={{ color: themeColor, borderBottomColor: themeColor, fontSize: s.textBase }}
            >
              Professional Summary
            </h3>
            <p className="text-slate-600 leading-relaxed text-justify" style={{ fontSize: s.textBase }}>
              {summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {workExperience && workExperience.length > 0 && (
          <div className="resume-section">
            <h3 
              className="font-bold uppercase tracking-wider mb-3 border-b-2 pb-0.5" 
              style={{ color: themeColor, borderBottomColor: themeColor, fontSize: s.textBase }}
            >
              Professional Experience
            </h3>
            <div className={s.entryGap}>
              {workExperience.map((exp) => (
                <div key={exp.id} className="resume-entry">
                  <div className="flex items-baseline justify-between mb-1">
                    <div>
                      <span className="font-bold text-slate-800" style={{ fontSize: s.textLg }}>
                        {exp.company}
                      </span>
                      <span className="text-slate-500 italic ml-2" style={{ fontSize: s.textBase }}>
                        &ndash; {exp.location}
                      </span>
                    </div>
                    <span className="font-semibold text-slate-600 shrink-0" style={{ fontSize: s.textBase }}>
                      {formatDate(exp.startDate)} &ndash; {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <div className="font-semibold text-slate-700 italic mb-1.5" style={{ fontSize: s.textBase }}>
                    {exp.position}
                  </div>
                  {exp.description && exp.description.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-1.5 text-slate-600" style={{ fontSize: s.textBase }}>
                      {exp.description.map((bullet, idx) => (
                        bullet.trim() && <li key={idx} className="leading-relaxed">{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div className="resume-section">
            <h3 
              className="font-bold uppercase tracking-wider mb-3 border-b-2 pb-0.5" 
              style={{ color: themeColor, borderBottomColor: themeColor, fontSize: s.textBase }}
            >
              Key Projects
            </h3>
            <div className={s.entryGap}>
              {projects.map((proj) => (
                <div key={proj.id} className="resume-entry">
                  <div className="flex items-baseline justify-between mb-1">
                    <div>
                      <span className="font-bold text-slate-800" style={{ fontSize: s.textLg }}>
                        {proj.name}
                      </span>
                      {proj.link && (
                        <span className="text-xs text-slate-400 ml-2 lowercase italic">
                          ({proj.link})
                        </span>
                      )}
                    </div>
                    <span className="font-semibold text-slate-600 shrink-0" style={{ fontSize: s.textBase }}>
                      {proj.role}
                    </span>
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-1.5">
                      <span className="font-medium text-slate-500 text-xs uppercase tracking-wide">Technologies:</span>
                      {proj.technologies.map((tech, tIdx) => (
                        <span key={tIdx} className="font-semibold text-slate-700 text-xs">
                          {tech}{tIdx < proj.technologies.length - 1 ? ',' : ''}
                        </span>
                      ))}
                    </div>
                  )}
                  {proj.description && proj.description.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-1 text-slate-600" style={{ fontSize: s.textBase }}>
                      {proj.description.map((bullet, idx) => (
                        bullet.trim() && <li key={idx} className="leading-relaxed">{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div className="resume-section">
            <h3 
              className="font-bold uppercase tracking-wider mb-3 border-b-2 pb-0.5" 
              style={{ color: themeColor, borderBottomColor: themeColor, fontSize: s.textBase }}
            >
              Education
            </h3>
            <div className={s.entryGap}>
              {education.map((edu) => (
                <div key={edu.id} className="resume-entry">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="font-bold text-slate-800" style={{ fontSize: s.textLg }}>
                        {edu.school}
                      </span>
                      <span className="text-slate-500 italic ml-2" style={{ fontSize: s.textBase }}>
                        &ndash; {edu.location}
                      </span>
                    </div>
                    <span className="font-semibold text-slate-600 shrink-0" style={{ fontSize: s.textBase }}>
                      {formatDate(edu.startDate)} &ndash; {edu.current ? 'Present' : formatDate(edu.endDate)}
                    </span>
                  </div>
                  <div className="text-slate-700 font-medium mt-0.5" style={{ fontSize: s.textBase }}>
                    {edu.degree} {edu.gpa && `\u00A0\u2022\u00A0 GPA: ${edu.gpa}`}
                  </div>
                  {edu.description && (
                    <p className="text-slate-500 mt-1 italic text-xs">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills, Languages & Certifications Grid */}
        {(skills.length > 0 || languages.length > 0 || certifications.length > 0) && (
          <div className="resume-section">
            <h3 
              className="font-bold uppercase tracking-wider mb-3 border-b-2 pb-0.5" 
              style={{ color: themeColor, borderBottomColor: themeColor, fontSize: s.textBase }}
            >
              Skills, Languages & Certifications
            </h3>
            <div className="grid grid-cols-1 gap-2 text-slate-600" style={{ fontSize: s.textBase }}>
              {skills.length > 0 && (
                <div className="flex gap-2">
                  <span className="font-bold text-slate-700 min-w-[120px]">Expertise:</span>
                  <span>{skills.join(', ')}</span>
                </div>
              )}
              {languages.length > 0 && (
                <div className="flex gap-2">
                  <span className="font-bold text-slate-700 min-w-[120px]">Languages:</span>
                  <span>{languages.join(', ')}</span>
                </div>
              )}
              {certifications.length > 0 && (
                <div className="flex gap-2">
                  <span className="font-bold text-slate-700 min-w-[120px]">Certifications:</span>
                  <span>{certifications.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
