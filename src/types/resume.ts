export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  profileImage?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  role: string;
  technologies: string[];
  link: string;
  description: string[];
}

export type TemplateName = 'modern' | 'executive' | 'minimalist';
export type SpacingOption = 'compact' | 'normal' | 'spacious';
export type SectionId = 'summary' | 'experience' | 'projects' | 'education' | 'skills' | 'languages' | 'certifications';

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  projects: Project[];
  skills: string[];
  languages: string[];
  certifications: string[];
  themeColor: string;
  fontFamily: string;
  spacing: SpacingOption;
  template: TemplateName;
  sectionOrder?: SectionId[];
}

export const DEFAULT_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
  },
  summary: '',
  workExperience: [],
  education: [],
  projects: [],
  skills: [],
  languages: [],
  certifications: [],
  themeColor: '#2563eb',
  fontFamily: 'Inter',
  spacing: 'normal',
  template: 'modern',
  sectionOrder: ['summary', 'experience', 'projects', 'education', 'skills', 'languages', 'certifications'],
};

export const SAMPLE_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: 'Alex Johnson',
    jobTitle: 'Senior Full Stack Developer',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'alexjohnson.dev',
    linkedin: 'linkedin.com/in/alexjohnson',
    github: 'github.com/alexjohnson',
  },
  summary:
    'Innovative Full Stack Developer with 6+ years of experience building scalable web applications. Proficient in React, Node.js, and cloud architectures. Passionate about clean code, performance optimization, and delivering exceptional user experiences. Led cross-functional teams to ship products used by millions.',
  workExperience: [
    {
      id: 'exp-1',
      company: 'TechCorp Inc.',
      position: 'Senior Full Stack Developer',
      location: 'San Francisco, CA',
      startDate: '2022-01',
      endDate: '',
      current: true,
      description: [
        'Led a team of 5 engineers to architect and build a real-time analytics dashboard serving 2M+ daily active users, resulting in a 40% increase in user engagement.',
        'Migrated legacy monolithic application to a microservices architecture using Node.js and Kubernetes, reducing deployment time by 60%.',
        'Implemented CI/CD pipelines with GitHub Actions and Docker, achieving 99.9% uptime and cutting release cycles from 2 weeks to 2 days.',
      ],
    },
    {
      id: 'exp-2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      location: 'Remote',
      startDate: '2019-06',
      endDate: '2021-12',
      current: false,
      description: [
        'Developed and maintained a SaaS platform using React, TypeScript, and PostgreSQL, growing the user base from 10K to 500K in 18 months.',
        'Built RESTful APIs and GraphQL endpoints to power mobile and web clients, handling 10K+ requests per second.',
        'Collaborated with product and design teams to implement A/B testing, improving conversion rates by 25%.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'University of California, Berkeley',
      degree: 'Bachelor of Science in Computer Science',
      location: 'Berkeley, CA',
      startDate: '2015-08',
      endDate: '2019-05',
      current: false,
      gpa: '3.8',
      description: "Dean's List, ACM Club President, Hackathon Winner 2018",
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'OpenTracker',
      role: 'Creator & Lead Developer',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
      link: 'github.com/alexjohnson/opentracker',
      description: [
        'Built an open-source project management tool with real-time collaboration features, garnering 2.5K+ GitHub stars.',
        'Implemented WebSocket-based live editing with conflict resolution using CRDTs.',
      ],
    },
    {
      id: 'proj-2',
      name: 'AI Resume Analyzer',
      role: 'Solo Developer',
      technologies: ['Python', 'FastAPI', 'OpenAI API', 'React'],
      link: 'github.com/alexjohnson/ai-resume',
      description: [
        'Created an AI-powered resume analysis tool that provides personalized suggestions for improving resume content and formatting.',
        'Integrated NLP models for keyword extraction and job description matching with 92% accuracy.',
      ],
    },
  ],
  skills: [
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Python',
    'PostgreSQL',
    'MongoDB',
    'GraphQL',
    'Docker',
    'Kubernetes',
    'AWS',
    'Git',
  ],
  languages: ['English (Native)', 'Spanish (Conversational)', 'Japanese (Basic)'],
  certifications: [
    'AWS Certified Solutions Architect – Associate',
    'Google Cloud Professional Developer',
  ],
  themeColor: '#2563eb',
  fontFamily: 'Inter',
  spacing: 'normal',
  template: 'modern',
  sectionOrder: ['summary', 'experience', 'projects', 'education', 'skills', 'languages', 'certifications'],
};
