# Rana Nidhi: Personal Portfolio Website

> *Building at the intersection of software, data, and AI.*

**Course project:** IT4048 – Version Control with Git and GitHub
**Student:** Rana Nidhi  |  **Enrollment No.:** 202603103520016

| | |
|---|---|
| **Repository URL** | `PASTE YOUR REPOSITORY URL HERE` |
| **Live website URL** | `PASTE YOUR GITHUB PAGES URL HERE (after publishing)` |

---

## 1. Project Overview and Objective

A responsive, accessible personal portfolio for Rana Nidhi, a Computer Science Engineering student specializing in AI/ML. The objective is to build a real, useful website while practising the complete Git and GitHub workflow: initialise a repository, make meaningful commits, push to GitHub, and deploy with GitHub Pages.

The site presents only verified information: skills, education, a four-month Python internship at Comnet Development India (Posture & Health Monitoring System with Python), and three projects. Anything not yet confirmed is shown as a clearly marked placeholder.

## 2. Technologies Used

- **HTML5**: semantic structure, native `<dialog>` for project details
- **CSS3**: custom properties (design tokens), grid, flexbox, responsive breakpoints, reduced-motion support
- **Vanilla JavaScript**: mobile menu, dialogs, scroll reveal, active-link highlighting, dynamic footer year
- **Git & GitHub**: version control and project hosting
- **GitHub Pages**: static hosting
- **Python + ReportLab** (optional, in `tools/`): regenerates `resume.pdf`
- **Node + docx** (optional, in `tools/`): regenerates the Word report

No frameworks, no external fonts, no CDN dependencies.

## 3. Features

- Dark violet/lavender design with grid texture and ambient lighting
- Real portrait in the hero, cropped with `object-fit: cover`
- Sticky navigation with responsive mobile menu and résumé download
- Skills in six categories (no invented percentages)
- Internship experience card with verified certificate highlights
- Three project cards with working details dialogs
- Education, contact (placeholders), and footer with dynamic year
- Skip link, focus styles, ARIA labels, `prefers-reduced-motion` support

## 4. File Structure

```
Nidhi_Portfolio_Website/
├── index.html                  # page markup
├── style.css                   # design tokens + styles
├── script.js                   # interactions
├── resume.pdf                  # one-page résumé
├── README.md
├── .gitignore
├── assets/
│   ├── nidhi-profile.jpg       # portrait (884 px)
│   └── nidhi-profile-480.jpg   # smaller version for srcset
├── docs/
│   ├── Project_Report_Rana_Nidhi.docx   # editable academic report
│   ├── Viva_Preparation_Guide.md
│   ├── Personal_Details_Checklist.md
│   └── Testing_Notes.md
└── tools/
    ├── build_resume.py         # regenerates resume.pdf
    └── build_report.js         # regenerates the report
```

## 5. Run Locally

No build step is needed.

```bash
# Option A: just open index.html in your browser

# Option B: a local server (needed to test the résumé download filename)
python -m http.server 8000
# then visit http://localhost:8000
```

To regenerate the résumé after editing `tools/build_resume.py`:

```bash
pip install reportlab
python tools/build_resume.py
```

## 6. Git Setup: Initialise, Commit, Push

First create an **empty public repository** named `Nidhi_Portfolio_Website` on GitHub (no README, no .gitignore, as they already exist locally).

```bash
cd Nidhi_Portfolio_Website

git init
git config user.name  "Rana Nidhi"            # once, if not already set
git config user.email "YOUR-EMAIL"

git add README.md .gitignore
git commit -m "Initial commit: project README"

git add index.html
git commit -m "Add semantic HTML structure and sections"

git add style.css
git commit -m "Add stylesheet with design tokens and responsive layout"

git add script.js
git commit -m "Add JavaScript for menu, dialogs and scroll effects"

git add assets resume.pdf tools
git commit -m "Add portrait, resume and build tools"

git add docs
git commit -m "Add project report, viva guide and checklist"

git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/Nidhi_Portfolio_Website.git
git push -u origin main
```

After later edits: `git add .` → `git commit -m "Describe the change"` → `git push`.
Check your history anytime with `git log --oneline`.

## 7. Deploy with GitHub Pages

1. Open the repository on GitHub → **Settings**
2. Choose **Pages** in the sidebar
3. **Build and deployment → Source:** *Deploy from a branch*
4. **Branch:** `main`, folder **`/ (root)`** → **Save**
5. Wait 1–2 minutes and refresh the Pages screen; the live URL appears at the top.
   It normally looks like `https://<username>.github.io/Nidhi_Portfolio_Website/`
6. Paste the real URLs into the table at the top of this README, the report, and your résumé.

## 8. Before You Publish

Replace the placeholders (details in `docs/Personal_Details_Checklist.md`):

- Email, GitHub and LinkedIn in `index.html` (search for `your.email@example.com`, `YOUR-GITHUB-USERNAME`, `YOUR-LINKEDIN-ID`)
- Same values in `tools/build_resume.py`, then rebuild `resume.pdf`
- Remove the `is-placeholder` class from each link you replace, so it navigates normally

## 9. Notes on Accuracy

- Internship details come from the official completion certificate (Python Intern, four months, performance *Very Good*, attendance *above 86%*, dated 15 April 2026). Company phone numbers, addresses, signatures and stamps are intentionally not published.
- The posture/health project is described as a monitoring and wellness-support project, **not** a medical diagnostic system.
- Repository links for individual projects show "Repository link coming soon" until real repositories exist.

## 10. Testing

See `docs/Testing_Notes.md` for what was tested and what could not be.
