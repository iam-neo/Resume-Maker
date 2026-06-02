'use client';

import { useResume } from '@/context/ResumeContext';
import { X, Wrench, Languages, Award } from 'lucide-react';
import { useState } from 'react';

function TagList({
  label,
  icon: Icon,
  items,
  onUpdate,
  placeholder,
}: {
  label: string;
  icon: React.ElementType;
  items: string[];
  onUpdate: (items: string[]) => void;
  placeholder: string;
}) {
  const [inputValue, setInputValue] = useState('');

  const addItem = () => {
    if (inputValue.trim() && !items.includes(inputValue.trim())) {
      onUpdate([...items, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeItem = (idx: number) => {
    onUpdate(items.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-text-secondary font-medium">
        <Icon className="w-4 h-4" />
        {label}
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <span key={idx} className="tag">
            {item}
            <button
              onClick={() => removeItem(idx)}
              className="hover:text-white transition-colors"
              aria-label={`Remove ${item}`}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        {items.length === 0 && (
          <span className="text-xs text-text-muted italic">No items added yet</span>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="input-field flex-1"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addItem();
            }
          }}
        />
        <button onClick={addItem} className="btn btn-ghost text-xs px-3">
          Add
        </button>
      </div>
    </div>
  );
}

export default function SkillsForm() {
  const { resumeData, updateSkills, updateLanguages, updateCertifications } = useResume();

  return (
    <div className="space-y-6">
      <TagList
        label="Technical Skills"
        icon={Wrench}
        items={resumeData.skills}
        onUpdate={updateSkills}
        placeholder="e.g. React, Python, AWS..."
      />

      <div className="border-t border-border" />

      <TagList
        label="Languages"
        icon={Languages}
        items={resumeData.languages}
        onUpdate={updateLanguages}
        placeholder="e.g. English (Native), Spanish (Fluent)..."
      />

      <div className="border-t border-border" />

      <TagList
        label="Certifications"
        icon={Award}
        items={resumeData.certifications}
        onUpdate={updateCertifications}
        placeholder="e.g. AWS Solutions Architect, PMP..."
      />
    </div>
  );
}
