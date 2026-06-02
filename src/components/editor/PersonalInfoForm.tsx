'use client';

import { useResume } from '@/context/ResumeContext';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
} from 'lucide-react';
import { Linkedin, Github } from '@/components/icons/BrandIcons';


const fields = [
  { key: 'fullName', label: 'Full Name', placeholder: 'John Doe', icon: User },
  { key: 'jobTitle', label: 'Job Title', placeholder: 'Senior Software Engineer', icon: User },
  { key: 'email', label: 'Email', placeholder: 'john@example.com', icon: Mail },
  { key: 'phone', label: 'Phone', placeholder: '+1 (555) 123-4567', icon: Phone },
  { key: 'location', label: 'Location', placeholder: 'San Francisco, CA', icon: MapPin },
  { key: 'website', label: 'Website', placeholder: 'johndoe.com', icon: Globe },
  { key: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/johndoe', icon: Linkedin },
  { key: 'github', label: 'GitHub', placeholder: 'github.com/johndoe', icon: Github },
];

export default function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo, updateSummary } = useResume();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(({ key, label, placeholder, icon: Icon }) => (
          <div key={key}>
            <label htmlFor={`personal-${key}`} className="input-label">
              {label}
            </label>
            <div className="relative">
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                id={`personal-${key}`}
                type="text"
                className="input-field pl-10"
                placeholder={placeholder}
                value={resumeData.personalInfo[key as keyof typeof resumeData.personalInfo] || ''}
                onChange={(e) => updatePersonalInfo(key, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div>
        <label htmlFor="summary" className="input-label">
          Professional Summary
        </label>
        <textarea
          id="summary"
          className="input-field min-h-[100px] resize-y"
          placeholder="Briefly describe your professional background, key achievements, and career goals..."
          value={resumeData.summary}
          onChange={(e) => updateSummary(e.target.value)}
        />
      </div>
    </div>
  );
}
