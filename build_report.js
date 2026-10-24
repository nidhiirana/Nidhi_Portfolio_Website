// Builds docs/Project_Report_Rana_Nidhi.docx (editable Word report, ready for PDF export).
// Run:  npm install docx   (once)   then   node tools/build_report.js
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell,
  WidthType, BorderStyle, ShadingType, LevelFormat, Footer, Header, PageNumber, PageBreak,
  TableOfContents, VerticalAlign,
} = require("docx");

const VIOLET = "5B35C8", INK = "1B1733", MUTED = "5B5775", PINK = "B01FC2", LAV = "ECE6FF";
const FONT = "Calibri", HFONT = "Cambria";
const CONTENT_W = 9026; // A4 with 1" margins, in DXA

const p = (text, opts = {}) =>
  new Paragraph({
    spacing: { after: 120, line: 300 },
    ...opts,
    children: Array.isArray(text) ? text : [new TextRun({ text, font: FONT, size: 22, color: INK })],
  });
const run = (text, o = {}) => new TextRun({ text, font: FONT, size: 22, color: INK, ...o });
const placeholder = (text) => new TextRun({ text: `[${text}]`, font: FONT, size: 22, color: PINK, bold: true });
const h1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: t })], pageBreakBefore: false });
const h2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: t })] });
const bullet = (children) =>
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 60, line: 290 }, children: Array.isArray(children) ? children : [run(children)] });

const border = { style: BorderStyle.SINGLE, size: 4, color: "C9BCF5" };
const borders = { top: border, bottom: border, left: border, right: border };

function table(colWidths, rows, headerRow = true) {
  return new Table({
    width: { size: colWidths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    columnWidths: colWidths,
    rows: rows.map((r, ri) =>
      new TableRow({
        tableHeader: headerRow && ri === 0,
        children: r.map((cell, ci) =>
          new TableCell({
            width: { size: colWidths[ci], type: WidthType.DXA },
            borders,
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            shading: headerRow && ri === 0 ? { type: ShadingType.CLEAR, fill: LAV, color: "auto" } : undefined,
            children: [new Paragraph({ spacing: { after: 0 }, children: [typeof cell === "string"
              ? new TextRun({ text: cell, font: FONT, size: 21, color: INK, bold: headerRow && ri === 0 })
              : cell] })],
          })),
      })),
  });
}

// Boxed area for a screenshot / URL to be filled in later.
function slot(label, caption, height = 3200) {
  return [
    new Table({
      width: { size: CONTENT_W, type: WidthType.DXA },
      columnWidths: [CONTENT_W],
      rows: [new TableRow({
        height: { value: height, rule: "atLeast" },
        children: [new TableCell({
          width: { size: CONTENT_W, type: WidthType.DXA },
          verticalAlign: VerticalAlign.CENTER,
          borders: { top: { style: BorderStyle.DASHED, size: 8, color: PINK }, bottom: { style: BorderStyle.DASHED, size: 8, color: PINK }, left: { style: BorderStyle.DASHED, size: 8, color: PINK }, right: { style: BorderStyle.DASHED, size: 8, color: PINK } },
          children: [
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 }, children: [placeholder(`INSERT SCREENSHOT: ${label}`)] }),
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 0 }, children: [new TextRun({ text: "Capture this from the published GitHub Pages site, then paste it here and delete this box.", font: FONT, size: 18, color: MUTED, italics: true })] }),
          ],
        })],
      })],
    }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80, after: 240 }, children: [new TextRun({ text: caption, font: FONT, size: 19, italics: true, color: MUTED })] }),
  ];
}

const children = [];

// ---------------- Cover page ----------------
children.push(
  new Paragraph({ spacing: { before: 1200, after: 0 }, children: [new TextRun({ text: "IT4048", font: FONT, size: 24, bold: true, color: VIOLET, characterSpacing: 60 })] }),
  new Paragraph({ spacing: { after: 600 }, border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: VIOLET, space: 8 } }, children: [new TextRun({ text: "Version Control with Git and GitHub", font: FONT, size: 28, color: MUTED })] }),
  new Paragraph({ spacing: { before: 1000, after: 120 }, children: [new TextRun({ text: "MINI-PROJECT REPORT", font: FONT, size: 22, bold: true, color: PINK, characterSpacing: 80 })] }),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "Personal Portfolio Website", font: HFONT, size: 80, bold: true, color: INK })] }),
  new Paragraph({ spacing: { after: 1400 }, children: [new TextRun({ text: "Building at the intersection of software, data, and AI.", font: HFONT, size: 28, italics: true, color: VIOLET })] }),
  table([2800, 6226], [
    ["Student name", "Rana Nidhi"],
    ["Enrollment number", "202603103520016"],
    ["Subject code", "IT4048"],
    ["Subject title", "Version Control with Git and GitHub"],
    ["Project title", "Personal Portfolio Website"],
    ["Programme", "Computer Science Engineering (AI/ML specialization)"],
    ["Institution", "Asha M. Tarsadia Institute of Computer Science and Technology, Uka Tarsadia University"],
    ["Submission date", "[ADD SUBMISSION DATE]"],
    ["Faculty / guide", "[ADD FACULTY NAME]"],
  ], false),
  new Paragraph({ children: [new PageBreak()] }),
  new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Table of Contents")] }),
  new TableOfContents("Table of Contents", { hyperlink: true, headingStyleRange: "1-2" }),
  p([new TextRun({ text: "In Word: right-click the table above and choose Update Field to build page numbers.", font: FONT, size: 18, italics: true, color: MUTED })]),
  new Paragraph({ children: [new PageBreak()] }),
);

// ---------------- 1 Objective & intro ----------------
children.push(
  h1("1. Objective and Introduction"),
  p("The objective of this mini-project is to design, build, version-control, and publish a personal portfolio website using Git and GitHub. The project demonstrates the full workflow that the course IT4048 teaches: creating a repository, recording work as meaningful commits, pushing to a remote on GitHub, and deploying the result to the web through GitHub Pages."),
  p("The website presents Rana Nidhi, a Computer Science Engineering student specializing in Artificial Intelligence and Machine Learning, who has completed a four-month Python internship at Comnet Development India. It is built as a static site with HTML5, CSS3 and vanilla JavaScript so that it can be hosted directly on GitHub Pages without a backend."),
  h2("1.1 Goals"),
  bullet("Build a responsive, accessible and visually distinctive portfolio."),
  bullet("Present verified skills, education, internship experience and projects accurately, without exaggeration."),
  bullet("Use Git for tracked, incremental development and GitHub for hosting and publishing."),
);

// ---------------- 2 Technologies ----------------
children.push(
  h1("2. Technologies Used"),
  table([2200, 6826], [
    ["Technology", "Role in this project"],
    ["HTML5", "Semantic page structure (header, nav, main, section, article, footer) and native dialog elements for project details."],
    ["CSS3", "Design tokens with custom properties, grid and flexbox layout, responsive breakpoints, animations, reduced-motion and print rules."],
    ["JavaScript (vanilla)", "Mobile menu, project dialogs, scroll-reveal, active-link highlighting, dynamic footer year, placeholder-link notices."],
    ["Git", "Local version control: initialising the repository, staging, committing and branching."],
    ["GitHub", "Remote repository hosting and collaboration platform."],
    ["GitHub Pages", "Free static-site hosting directly from the main branch."],
    ["Visual Studio Code", "Code editor used for development."],
    ["Python (ReportLab)", "Used to generate the one-page resume PDF from an editable script."],
  ]),
);

// ---------------- 3 Design & implementation ----------------
children.push(
  h1("3. Design and Implementation Overview"),
  h2("3.1 Visual design"),
  p("The design uses a midnight navy-black background with violet and lavender gradients, restrained pink accents, a subtle grid texture and ambient lighting. Headings use a serif display stack and body text uses the system sans-serif stack, so no external fonts or libraries are loaded."),
  h2("3.2 Page structure"),
  table([2400, 6626], [
    ["Section", "Content"],
    ["Navigation", "Monogram wordmark, About / Skills / Experience / Projects / Education / Contact links, resume download, responsive mobile menu."],
    ["Hero", "Greeting, tagline, short introduction, actual portrait, and buttons for projects, contact and resume."],
    ["About", "Academic background, Python experience and interest in AI/ML."],
    ["Skills", "Six categories presented without proficiency percentages."],
    ["Experience", "Python internship at Comnet Development India with verified certificate highlights."],
    ["Projects", "Three project cards, each with a details dialog."],
    ["Education", "ICT Diploma and current CSE (AI/ML) studies."],
    ["Contact", "Email, GitHub and LinkedIn placeholders; no fake contact form."],
    ["Footer", "Shortcuts, contact links, and a dynamically generated copyright year."],
  ]),
  h2("3.3 Implementation notes"),
  bullet("Colours, spacing, radii and fonts are defined once as CSS custom properties and reused everywhere."),
  bullet("The portrait is the student's real photograph, saved as assets/nidhi-profile.jpg (plus a 480 px variant for srcset) and cropped with object-fit: cover inside a circular frame."),
  bullet("Content that is hidden until scrolled into view is revealed only when JavaScript is active, so the page stays readable without it."),
  bullet("Accessibility: skip link, visible focus outlines, ARIA labels, aria-expanded on the menu button, native dialog focus handling, and prefers-reduced-motion support."),
);

// ---------------- 4 Skills & internship ----------------
children.push(
  h1("4. Skills and Internship Experience"),
  h2("4.1 Skills"),
  table([2600, 6426], [
    ["Category", "Items"],
    ["Programming", "Python, Java, C, JavaScript"],
    ["Web development", "HTML5, CSS3, JavaScript"],
    ["Backend and databases", "Django, SQL, SQLite, REST API fundamentals"],
    ["Developer tools", "Visual Studio Code; Git and GitHub for version control and project hosting"],
    ["Areas of interest", "Artificial Intelligence and Machine Learning, Data Structures and Algorithms, Database Management Systems, Software development"],
    ["Soft skills", "Problem-solving, Adaptability, Continuous learning, Teamwork"],
  ]),
  p(""),
  h2("4.2 Internship at Comnet Development India"),
  table([2600, 6426], [
    ["Item", "Detail"],
    ["Role", "Python Intern"],
    ["Duration", "Four months (completed)"],
    ["Project", "Posture & Health Monitoring System with Python"],
    ["Certificate date", "15 April 2026"],
    ["Performance (per certificate)", "Very Good"],
    ["Attendance (per certificate)", "Above 86%"],
  ]),
  p(""),
  p("The project is described as a posture and health monitoring, wellness-support project. It is not presented as a medical diagnostic system, and no responsibilities, achievements or results beyond those stated on the certificate are claimed. The company's contact details, signatures and stamps were deliberately left off the public website."),
);

// ---------------- 5 Features ----------------
children.push(
  h1("5. Project Features"),
  bullet("Responsive layout for mobile, tablet and desktop."),
  bullet("Working mobile navigation menu that closes on link click, outside click and Escape."),
  bullet("Three project cards with accessible detail dialogs (close by button, Escape or backdrop click; focus returns to the opener)."),
  bullet("Downloadable resume (resume.pdf) linked from the navigation, hero and footer."),
  bullet("Smooth scrolling, scroll-reveal animation and active-section highlighting."),
  bullet("Reduced-motion and keyboard-friendly design."),
  bullet("Honest placeholders for email, GitHub and LinkedIn, with a notice shown if a placeholder is clicked."),
);

// ---------------- 6 Git workflow ----------------
children.push(
  h1("6. Git and GitHub Workflow"),
  p("Git records the history of the project as a series of commits; GitHub stores a copy of that repository online. The workflow followed is:"),
  table([700, 3600, 4726], [
    ["Step", "Command", "Purpose"],
    ["1", "git init", "Start tracking the project folder."],
    ["2", "git add .", "Stage files for the next commit."],
    ["3", "git commit -m \"message\"", "Save a snapshot with a descriptive message."],
    ["4", "git branch -M main", "Name the primary branch main."],
    ["5", "git remote add origin <URL>", "Connect the local repository to GitHub."],
    ["6", "git push -u origin main", "Upload commits to GitHub."],
    ["7", "git log --oneline", "Review the commit history."],
  ]),
  p(""),
  h2("6.1 Suggested commit history"),
  bullet("Initial commit: project structure and README"),
  bullet("Add HTML structure and semantic sections"),
  bullet("Add stylesheet with design tokens and responsive layout"),
  bullet("Add JavaScript for menu, dialogs and scroll effects"),
  bullet("Add portrait and resume assets"),
  bullet("Fix accessibility and mobile overflow issues"),
  bullet("Replace placeholders with real profile links"),
  p([run("Actual commit log: "), placeholder("PASTE OUTPUT OF git log --oneline HERE")]),
);

// ---------------- 7 Pages ----------------
children.push(
  h1("7. GitHub Pages Deployment"),
  p("GitHub Pages serves static files straight from a repository. Deployment steps:"),
  bullet("Open the repository on GitHub and choose Settings."),
  bullet("Select Pages in the left sidebar."),
  bullet("Under Build and deployment, set Source to Deploy from a branch."),
  bullet("Choose the main branch and the /(root) folder, then click Save."),
  bullet("Wait a minute or two, then refresh the Pages screen; GitHub displays the live URL."),
  p("Because index.html sits at the repository root and all paths are relative, no build step or configuration is needed."),
);

// ---------------- 8 Responsive & testing ----------------
children.push(
  h1("8. Responsive Design and Testing"),
  h2("8.1 Responsive strategy"),
  p("The CSS is mobile-first. Layouts start as a single column and expand to two columns at 600 px and to full multi-column grids at 900 px. The mobile menu collapses into a dropdown below 900 px."),
  h2("8.2 Tests performed"),
  p("The following automated checks were run in headless Chromium against the local files (35 checks, all passing):"),
  table([5200, 3826], [
    ["Test", "Result"],
    ["No console or page errors; no failed requests", "Passed"],
    ["Portrait image loads", "Passed"],
    ["All in-page anchor links point to existing sections", "Passed"],
    ["All three project dialogs open and close (button, Escape, backdrop)", "Passed"],
    ["Focus returns to the opening button after closing a dialog", "Passed"],
    ["Skip link is first keyboard tab stop", "Passed"],
    ["Mobile menu opens, closes after choosing a link, and scrolls to target", "Passed"],
    ["No horizontal overflow at 390 px (mobile) and 820 px (tablet)", "Passed"],
    ["Placeholder links show a notice instead of navigating", "Passed"],
    ["Resume download works (served over HTTP)", "Passed"],
    ["Reduced-motion setting shows content without animation", "Passed"],
  ]),
  p(""),
  h2("8.3 Tests not performed"),
  bullet("Testing on real phones, Safari, Firefox, or older browsers (only Chromium was available)."),
  bullet("Screen-reader testing with NVDA, VoiceOver or TalkBack."),
  bullet("Lighthouse or other formal accessibility audits."),
  bullet("Testing on the live GitHub Pages URL (not yet published)."),
);

// ---------------- 9 Screenshots ----------------
children.push(
  h1("9. Website Screenshots"),
  p("Insert real screenshots of the published site in the spaces below."),
  ...slot("Hero section, desktop", "Figure 1: Hero section with portrait (desktop)."),
  ...slot("Skills and Experience sections", "Figure 2: Skills categories and internship experience card."),
  ...slot("Projects section and a details dialog", "Figure 3: Project cards and an open details dialog."),
  ...slot("Mobile view with menu open", "Figure 4: Responsive mobile layout with navigation menu.", 3200),
  ...slot("GitHub repository page showing commits", "Figure 5: GitHub repository with commit history."),
  ...slot("GitHub Pages settings", "Figure 6: Pages settings (main branch, /(root))."),
);

// ---------------- 10 URLs ----------------
children.push(
  h1("10. GitHub Repository URL"),
  p([placeholder("PASTE REPOSITORY URL, e.g. https://github.com/<username>/Nidhi_Portfolio_Website")]),
  h1("11. Live Website URL"),
  p([placeholder("PASTE LIVE URL AFTER PUBLISHING, e.g. https://<username>.github.io/Nidhi_Portfolio_Website/")]),
  p([new TextRun({ text: "The website is not claimed to be live until these URLs are filled in.", font: FONT, size: 20, italics: true, color: MUTED })]),
);

// ---------------- 12 Conclusion ----------------
children.push(
  h1("12. Conclusion"),
  p("This project produced a complete, responsive and accessible portfolio website and used Git and GitHub for tracked development and GitHub Pages for deployment. It also required presenting personal and professional information carefully, limiting every claim to what is verified, and marking everything else as a placeholder or planned item."),
  p("Future improvements include adding real repository links for each project, documenting the implemented features of the Medical Store Management System, and expanding the Posture & Health Monitoring section once the author confirms additional verifiable details."),
);

const doc = new Document({
  creator: "Rana Nidhi",
  title: "Personal Portfolio Website - IT4048 Project Report",
  styles: {
    default: { document: { run: { font: FONT, size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: HFONT, size: 34, bold: true, color: VIOLET },
        paragraph: { spacing: { before: 360, after: 160 }, outlineLevel: 0, keepNext: true,
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "C9BCF5", space: 4 } } } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: HFONT, size: 26, bold: true, color: INK },
        paragraph: { spacing: { before: 240, after: 100 }, outlineLevel: 1, keepNext: true } },
    ],
  },
  numbering: { config: [{ reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
    style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] }] },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, right: 1440, bottom: 1300, left: 1440 } }, titlePage: true },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "IT4048 • Personal Portfolio Website • Rana Nidhi", font: FONT, size: 17, color: MUTED })] })] }), first: new Header({ children: [new Paragraph("")] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Enrollment 202603103520016  |  Page ", font: FONT, size: 17, color: MUTED }), new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 17, color: MUTED })] })] }), first: new Footer({ children: [new Paragraph("")] }) },
    children,
  }],
});

const out = path.join(__dirname, "..", "docs", "Project_Report_Rana_Nidhi.docx");
fs.mkdirSync(path.dirname(out), { recursive: true });
Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(out, buf); console.log("written", out); });
