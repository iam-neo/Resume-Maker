'use client';

import { useResume } from '@/context/ResumeContext';
import { useRef, useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Camera,
  X,
  ImagePlus,
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
  const { resumeData, updatePersonalInfo, updateProfileImage, removeProfileImage, updateSummary } = useResume();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    updateProfileImage(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const profileImage = resumeData.personalInfo.profileImage;

  return (
    <div className="space-y-4">
      {/* Profile Photo Upload */}
      <div className="flex items-center gap-5 p-4 rounded-xl bg-surface-light/50 border border-border">
        {profileImage ? (
          <div className="relative group shrink-0">
            <img
              src={profileImage}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-border"
            />
            <div
              className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="w-4 h-4 text-white" />
            </div>
            <button
              type="button"
              onClick={removeProfileImage}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              title="Remove photo"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div
            className={`w-20 h-20 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer transition-all shrink-0 ${
              isDragging
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-primary/50 hover:bg-surface-light'
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <ImagePlus className="w-6 h-6 text-text-muted" />
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-text-primary">Profile Photo</p>
          <p className="text-xs text-text-muted mt-0.5">
            Optional · Click or drag to upload · JPG, PNG
          </p>
          {!profileImage && (
            <button
              type="button"
              className="text-xs text-primary-light hover:underline mt-1"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload photo
            </button>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileSelect(file);
            e.target.value = '';
          }}
        />
      </div>

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

