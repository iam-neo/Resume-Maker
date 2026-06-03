'use client';

import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Calendar, Briefcase, GraduationCap, FolderGit2 } from 'lucide-react';
import { Linkedin, Github } from '@/components/icons/BrandIcons';


interface TemplateProps {
  data: ResumeData;
  s: any; // Spacing settings
}

export default function ModernTemplate({ data, s }: TemplateProps) {
  const { personalInfo, summary, workExperience, education, projects, skills, languages, certifications, themeColor } = data;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr + '-02'); // Add day to prevent local timezone shifting
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="flex flex-col h-full text-slate-800">
      {/* Header section with top accent bar */}
      <div 
        className="h-2 w-full" 
        style={{ backgroundColor: themeColor }}
      />
      
      {/* Name and Job Title */}
      <div className={`px-8 pt-8 pb-4 border-b border-slate-100`}>
        <div className="flex items-center gap-5">
          {personalInfo.profileImage && (
            <img
              src={personalInfo.profileImage}
              alt={personalInfo.fullName || 'Profile'}
              className="w-16 h-16 rounded-full object-cover border-2 border-slate-200 shrink-0 print:w-16 print:h-16"
            />
          )}
          <div>
            <h1 
              className="font-bold tracking-tight leading-none"
              style={{ 
                color: '#1e293b',
                fontSize: s.text2xl === 'text-lg' ? '1.5rem' : s.text2xl === 'text-xl' ? '2rem' : '2.5rem'
              }}
            >
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p 
              className="font-medium mt-1.5"
              style={{ color: themeColor, fontSize: s.textLg }}
            >
              {personalInfo.jobTitle || 'Your Job Title'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Two-Column Content Area */}
      <div className="flex flex-1">
        {/* Left Column - Sidebar (Grey background for visual separation) */}
        <div className="w-[33%] bg-slate-50/70 p-6 border-r border-slate-100 flex flex-col gap-6">
          
          {/* Contact Details */}
          <div>
            <h3 className="font-semibold uppercase tracking-wider text-slate-600 mb-3 border-b border-slate-200 pb-1" style={{ fontSize: s.textBase }}>
              Contact
            </h3>
            <ul className="space-y-2 text-slate-600" style={{ fontSize: s.textBase }}>
              {personalInfo.email && (
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span className="truncate">{personalInfo.email}</span>
                </li>
              )}
              {personalInfo.phone && (
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span>{personalInfo.phone}</span>
                </li>
              )}
              {personalInfo.location && (
                <li className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span>{personalInfo.location}</span>
                </li>
              )}
              {personalInfo.website && (
                <li className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span className="truncate">{personalInfo.website}</span>
                </li>
              )}
              {personalInfo.linkedin && (
                <li className="flex items-center gap-2">
                  <Linkedin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span className="truncate">{personalInfo.linkedin}</span>
                </li>
              )}
              {personalInfo.github && (
                <li className="flex items-center gap-2">
                  <Github className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span className="truncate">{personalInfo.github}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Dynamic Sidebar Sections */}
          {(() => {
            const sidebarSectionIds = ['skills', 'languages', 'certifications'];
            const order = data.sectionOrder || ['summary', 'experience', 'projects', 'education', 'skills', 'languages', 'certifications'];
            const orderedSidebar = sidebarSectionIds
              .filter(id => order.includes(id as any))
              .sort((a, b) => order.indexOf(a as any) - order.indexOf(b as any));

            return orderedSidebar.map(id => {
              switch (id) {
                case 'skills':
                  if (!skills || skills.length === 0) return null;
                  return (
                    <div key="skills">
                      <h3 className="font-semibold uppercase tracking-wider text-slate-600 mb-3 border-b border-slate-200 pb-1" style={{ fontSize: s.textBase }}>
                        Skills
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {skills.map((skill, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-0.5 rounded text-slate-700 bg-slate-200/60 font-medium"
                            style={{ fontSize: '0.7rem' }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                case 'languages':
                  if (!languages || languages.length === 0) return null;
                  return (
                    <div key="languages">
                      <h3 className="font-semibold uppercase tracking-wider text-slate-600 mb-3 border-b border-slate-200 pb-1" style={{ fontSize: s.textBase }}>
                        Languages
                      </h3>
                      <ul className="space-y-1 text-slate-600" style={{ fontSize: s.textBase }}>
                        {languages.map((lang, index) => (
                          <li key={index} className="bullet-item">{lang}</li>
                        ))}
                      </ul>
                    </div>
                  );
                case 'certifications':
                  if (!certifications || certifications.length === 0) return null;
                  return (
                    <div key="certifications">
                      <h3 className="font-semibold uppercase tracking-wider text-slate-600 mb-3 border-b border-slate-200 pb-1" style={{ fontSize: s.textBase }}>
                        Certifications
                      </h3>
                      <ul className="space-y-2 text-slate-600" style={{ fontSize: s.textBase }}>
                        {certifications.map((cert, index) => (
                          <li key={index} className="leading-snug">
                            {cert}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                default:
                  return null;
              }
            });
          })()}
        </div>

        {/* Right Column - Main Content */}
        <div className="w-[67%] p-6 flex flex-col gap-6">
          {(() => {
            const mainSectionIds = ['summary', 'experience', 'projects', 'education'];
            const order = data.sectionOrder || ['summary', 'experience', 'projects', 'education', 'skills', 'languages', 'certifications'];
            const orderedMain = mainSectionIds
              .filter(id => order.includes(id as any))
              .sort((a, b) => order.indexOf(a as any) - order.indexOf(b as any));

            return orderedMain.map(id => {
              switch (id) {
                case 'summary':
                  if (!summary) return null;
                  return (
                    <div key="summary">
                      <h3 
                        className="font-bold uppercase tracking-wider mb-2 pb-1 border-b border-slate-100" 
                        style={{ color: themeColor, fontSize: s.textBase }}
                      >
                        Summary
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-justify" style={{ fontSize: s.textBase }}>
                        {summary}
                      </p>
                    </div>
                  );
                case 'experience':
                  if (!workExperience || workExperience.length === 0) return null;
                  return (
                    <div key="experience">
                      <h3 
                        className="font-bold uppercase tracking-wider mb-3 pb-1 border-b border-slate-100" 
                        style={{ color: themeColor, fontSize: s.textBase }}
                      >
                        Experience
                      </h3>
                      <div className={s.entryGap}>
                        {workExperience.map((exp) => (
                          <div key={exp.id} className="resume-entry">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-bold text-slate-800" style={{ fontSize: s.textLg }}>
                                  {exp.position}
                                </h4>
                                <span className="font-semibold text-slate-600" style={{ fontSize: s.textBase }}>
                                  {exp.company}
                                </span>
                              </div>
                              <div className="text-right text-slate-500" style={{ fontSize: s.textBase }}>
                                <div className="flex items-center gap-1 justify-end font-medium">
                                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                  <span>
                                    {formatDate(exp.startDate)} &ndash; {exp.current ? 'Present' : formatDate(exp.endDate)}
                                  </span>
                                </div>
                                <span className="text-xs">{exp.location}</span>
                              </div>
                            </div>
                            {exp.description && exp.description.length > 0 && (
                              <ul className="list-disc list-outside ml-4 mt-2 space-y-1 text-slate-600" style={{ fontSize: s.textBase }}>
                                {exp.description.map((bullet, idx) => (
                                  bullet.trim() && <li key={idx}>{bullet}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                case 'projects':
                  if (!projects || projects.length === 0) return null;
                  return (
                    <div key="projects">
                      <h3 
                        className="font-bold uppercase tracking-wider mb-3 pb-1 border-b border-slate-100" 
                        style={{ color: themeColor, fontSize: s.textBase }}
                      >
                        Projects
                      </h3>
                      <div className={s.entryGap}>
                        {projects.map((proj) => (
                          <div key={proj.id} className="resume-entry">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-bold text-slate-800 flex items-center gap-1.5" style={{ fontSize: s.textLg }}>
                                  {proj.name}
                                  {proj.link && (
                                    <span className="text-xs font-normal text-slate-400 lowercase">
                                      ({proj.link})
                                    </span>
                                  )}
                                </h4>
                                <span className="text-slate-600 font-medium" style={{ fontSize: s.textBase }}>
                                  {proj.role}
                                </span>
                              </div>
                              {proj.technologies && proj.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-1 max-w-[200px] justify-end">
                                  {proj.technologies.map((tech, tIdx) => (
                                    <span 
                                      key={tIdx} 
                                      className="px-1.5 py-0.5 rounded text-slate-600 bg-slate-100 font-medium"
                                      style={{ fontSize: '0.65rem' }}
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            {proj.description && proj.description.length > 0 && (
                              <ul className="list-disc list-outside ml-4 mt-2 space-y-1 text-slate-600" style={{ fontSize: s.textBase }}>
                                    {proj.description.map((bullet, idx) => (
                                      bullet.trim() && <li key={idx}>{bullet}</li>
                                    ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                case 'education':
                  if (!education || education.length === 0) return null;
                  return (
                    <div key="education">
                      <h3 
                        className="font-bold uppercase tracking-wider mb-3 pb-1 border-b border-slate-100" 
                        style={{ color: themeColor, fontSize: s.textBase }}
                      >
                        Education
                      </h3>
                      <div className={s.entryGap}>
                        {education.map((edu) => (
                          <div key={edu.id} className="resume-entry">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-bold text-slate-800" style={{ fontSize: s.textLg }}>
                                  {edu.degree}
                                </h4>
                                <span className="font-semibold text-slate-600" style={{ fontSize: s.textBase }}>
                                  {edu.school} {edu.gpa && `(GPA: ${edu.gpa})`}
                                </span>
                              </div>
                              <div className="text-right text-slate-500" style={{ fontSize: s.textBase }}>
                                <div className="flex items-center gap-1 justify-end font-medium">
                                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                  <span>
                                    {formatDate(edu.startDate)} &ndash; {edu.current ? 'Present' : formatDate(edu.endDate)}
                                  </span>
                                </div>
                                <span className="text-xs">{edu.location}</span>
                              </div>
                            </div>
                            {edu.description && (
                              <p className="text-slate-600 mt-1.5 text-sm" style={{ fontSize: s.textBase }}>
                                {edu.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                default:
                  return null;
              }
            });
          })()}
        </div>
      </div>
    </div>
  );
}
