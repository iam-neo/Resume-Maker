# 📄 Resume Maker

A state-of-the-art, fully interactive **CV/Resume Builder** built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**. Design professional, ATS-optimized resumes in minutes with a live split-screen preview, premium layout templates, and instant PDF export — all running 100% client-side with zero data leaving your browser.

> **Free · No Sign-up · 100% Private**

---

## ✨ Features

### 🖊️ Interactive Editor
- **Accordion-based form sections** — Personal Info, Summary, Work Experience, Education, Projects, Skills, Languages & Certifications
- **Dynamic list management** — Add, edit, remove, and reorder entries with inline bullet-point editors
- **Tag-based inputs** — Type and press Enter to add skills, technologies, languages, and certifications as tags

### 🎨 Design Customization
- **3 Premium Templates**
  - **Modern** — Two-column sidebar layout with structured skills panel and accent color bar
  - **Executive** — Classic centered typography with serif-friendly formatting and horizontal dividers
  - **Minimalist** — Clean grid alignment with section titles in a narrow left column for maximum white space
- **8 Curated Accent Colors** + custom HEX color picker
- **7 Font Families** — Inter, Outfit, Plus Jakarta Sans, Lora, Playfair Display, Merriweather, Roboto Mono
- **3 Spacing Modes** — Compact, Normal, and Spacious

### 📄 PDF Export
- **Browser-native vector printing** via `@media print` — produces crisp, high-resolution PDFs
- **ATS-friendly output** — fully selectable text, no images or canvas rendering
- **A4-optimized layout** with proper page break handling

### 💾 Data Persistence
- **Auto-save** to `localStorage` — your progress is never lost
- **JSON export/import** — download your resume data as a `.json` backup and restore it anytime
- **Load sample data** — one-click demo population to preview templates instantly

### 🔍 Preview Controls
- **Live split-screen preview** — see changes reflected in real-time as you type
- **Zoom controls** — Zoom In, Zoom Out, and Reset for comfortable viewing on any screen size

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.2.7 | React framework with App Router |
| **React** | 19.2.4 | UI component library |
| **TypeScript** | 5.x | Type-safe development |
| **Tailwind CSS** | 4.x | Utility-first styling |
| **Lucide React** | 1.17.0 | Icon library |
| **Google Fonts** | — | Web typography (7 font families) |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── builder/
│   │   └── page.tsx          # Main builder workspace (editor + preview)
│   ├── globals.css           # Design tokens, utilities, print styles
│   ├── layout.tsx            # Root layout with font & metadata
│   └── page.tsx              # Landing page
├── components/
│   ├── editor/
│   │   ├── PersonalInfoForm.tsx
│   │   ├── ExperienceForm.tsx
│   │   ├── EducationForm.tsx
│   │   ├── ProjectsForm.tsx
│   │   └── SkillsForm.tsx
│   ├── icons/
│   │   └── BrandIcons.tsx    # Custom LinkedIn & GitHub SVG icons
│   ├── preview/
│   │   └── ResumePreview.tsx # Live preview with zoom & template switching
│   └── templates/
│       ├── ModernTemplate.tsx
│       ├── ExecutiveTemplate.tsx
│       └── MinimalistTemplate.tsx
├── context/
│   └── ResumeContext.tsx     # Global state, auto-save, JSON import/export
└── types/
    └── resume.ts             # TypeScript interfaces & sample data
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or later
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/iam-neo/Resume-Maker.git
   cd Resume-Maker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in your browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm start
```

---

## 📖 How to Use

1. **Visit the landing page** at `http://localhost:3000`
2. **Click "Create Your Resume"** to open the builder workspace
3. **Fill in your details** using the accordion form sections on the left panel
4. **Customize the design** — select a template, pick an accent color, choose a font, and adjust spacing
5. **Preview in real-time** — the right panel updates instantly as you type
6. **Export as PDF** — click the "Export PDF" button to open your browser's print dialog and save as PDF

> 💡 **Tip:** Click **"Demo Data"** in the toolbar to instantly populate the form with sample data and see how the templates look.

---

## 🖨️ PDF Export Guide

This project uses browser-native print styling for PDF generation, ensuring vector-quality text output:

1. Click the **"Export PDF"** button in the builder toolbar
2. In the print dialog:
   - Set **Destination** to "Save as PDF"
   - Set **Paper size** to "A4"
   - Set **Margins** to "None"
   - Enable **"Background graphics"** for colored elements
3. Click **Save**

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [Lucide Icons](https://lucide.dev/) — Beautiful open-source icon library
- [Google Fonts](https://fonts.google.com/) — Free web typography
- [Next.js](https://nextjs.org/) — The React framework for the web
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework

---

<div align="center">

**Built with ❤️ using Next.js**

[Report Bug](https://github.com/iam-neo/Resume-Maker/issues) · [Request Feature](https://github.com/iam-neo/Resume-Maker/issues)

</div>
