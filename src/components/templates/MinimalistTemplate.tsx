'use client';

import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { Linkedin, Github } from '@/components/icons/BrandIcons';


interface TemplateProps {
  data: ResumeData;
  s: any; // Spacing settings
}

export default function MinimalistTemplate({ data, s }: TemplateProps) {
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

  return (
    <div className="p-8 text-slate-800 flex flex-col h-full bg-white">
      {/* Top Section: Name on Left, Contact Details on Right */}
      <div className="flex flex-col md:flex-row justify-between items-start border-b border-slate-100 pb-6 mb-6 gap-4">
        <div className="flex items-center gap-4">
          {personalInfo.profileImage && (
            <img
              src={personalInfo.profileImage}
              alt={personalInfo.fullName || 'Profile'}
              className="w-16 h-16 rounded-full object-cover border-2 border-slate-200 shrink-0 print:w-16 print:h-16"
            />
          )}
          <div>
            <h1 
              className="font-bold tracking-tight text-slate-800"
              style={{ 
                fontSize: s.text2xl === 'text-lg' ? '1.5rem' : s.text2xl === 'text-xl' ? '2.1rem' : '2.6rem'
              }}
            >
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p 
              className="font-medium text-slate-500 mt-1 uppercase tracking-wider"
              style={{ fontSize: s.textBase }}
            >
              {personalInfo.jobTitle || 'Your Job Title'}
            </p>
          </div>
        </div>

        {/* Contact panel: 2-column or list */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-slate-500 font-medium shrink-0" style={{ fontSize: s.textBase }}>
          {personalInfo.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>{personalInfo.website}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>{personalInfo.github}</span>
            </div>
          )}
        </div>
      </div>

      {/* Grid Content Areas */}
      <div className="flex flex-col gap-6">
        
        {/* Summary Row */}
        {summary && (
          <div className="grid grid-cols-[18%_1fr] gap-4 resume-section">
            <h3 className="font-bold text-slate-400 uppercase tracking-wider text-right" style={{ fontSize: s.textBase }}>
              Summary
            </h3>
            <p className="text-slate-600 leading-relaxed text-justify" style={{ fontSize: s.textBase }}>
              {summary}
            </p>
          </div>
        )}

        {/* Experience Row */}
        {workExperience && workExperience.length > 0 && (
          <div className="grid grid-cols-[18%_1fr] gap-4 resume-section">
            <h3 className="font-bold text-slate-400 uppercase tracking-wider text-right" style={{ fontSize: s.textBase }}>
              Experience
            </h3>
            <div className={s.entryGap}>
              {workExperience.map((exp) => (
                <div key={exp.id} className="resume-entry">
                  <div className="flex justify-between items-baseline mb-1">
                    <div>
                      <span className="font-bold text-slate-800" style={{ fontSize: s.textLg }}>
                        {exp.position}
                      </span>
                      <span className="text-slate-500 font-medium ml-2" style={{ fontSize: s.textBase }}>
                        | {exp.company}
                      </span>
                    </div>
                    <span className="text-slate-500 font-medium shrink-0" style={{ fontSize: s.textBase }}>
                      {formatDate(exp.startDate)} &ndash; {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && exp.description.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1.5 space-y-1 text-slate-600" style={{ fontSize: s.textBase }}>
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

        {/* Projects Row */}
        {projects && projects.length > 0 && (
          <div className="grid grid-cols-[18%_1fr] gap-4 resume-section">
            <h3 className="font-bold text-slate-400 uppercase tracking-wider text-right" style={{ fontSize: s.textBase }}>
              Projects
            </h3>
            <div className={s.entryGap}>
              {projects.map((proj) => (
                <div key={proj.id} className="resume-entry">
                  <div className="flex justify-between items-baseline mb-1">
                    <div>
                      <span className="font-bold text-slate-800" style={{ fontSize: s.textLg }}>
                        {proj.name}
                      </span>
                      {proj.link && (
                        <span className="text-xs text-slate-400 ml-2 lowercase">
                          ({proj.link})
                        </span>
                      )}
                    </div>
                    <span className="text-slate-500 font-medium shrink-0" style={{ fontSize: s.textBase }}>
                      {proj.role}
                    </span>
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-1">
                      {proj.technologies.map((tech, tIdx) => (
                        <span key={tIdx} className="text-slate-500 text-xs font-semibold mr-2">
                          #{tech}
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

        {/* Education Row */}
        {education && education.length > 0 && (
          <div className="grid grid-cols-[18%_1fr] gap-4 resume-section">
            <h3 className="font-bold text-slate-400 uppercase tracking-wider text-right" style={{ fontSize: s.textBase }}>
              Education
            </h3>
            <div className={s.entryGap}>
              {education.map((edu) => (
                <div key={edu.id} className="resume-entry">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="font-bold text-slate-800" style={{ fontSize: s.textLg }}>
                        {edu.degree}
                      </span>
                      <span className="text-slate-500 font-medium ml-2" style={{ fontSize: s.textBase }}>
                        | {edu.school} {edu.gpa && `(GPA: ${edu.gpa})`}
                      </span>
                    </div>
                    <span className="text-slate-500 font-medium shrink-0" style={{ fontSize: s.textBase }}>
                      {formatDate(edu.startDate)} &ndash; {edu.current ? 'Present' : formatDate(edu.endDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Langs Row */}
        {(skills.length > 0 || languages.length > 0 || certifications.length > 0) && (
          <div className="grid grid-cols-[18%_1fr] gap-4 resume-section">
            <h3 className="font-bold text-slate-400 uppercase tracking-wider text-right" style={{ fontSize: s.textBase }}>
              Details
            </h3>
            <div className="space-y-2 text-slate-600" style={{ fontSize: s.textBase }}>
              {skills.length > 0 && (
                <div className="grid grid-cols-[100px_1fr] gap-2">
                  <span className="font-semibold text-slate-500">Skills:</span>
                  <span>{skills.join(', ')}</span>
                </div>
              )}
              {languages.length > 0 && (
                <div className="grid grid-cols-[100px_1fr] gap-2">
                  <span className="font-semibold text-slate-500">Languages:</span>
                  <span>{languages.join(', ')}</span>
                </div>
              )}
              {certifications.length > 0 && (
                <div className="grid grid-cols-[100px_1fr] gap-2">
                  <span className="font-semibold text-slate-500">Certifications:</span>
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
