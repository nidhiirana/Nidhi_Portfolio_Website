# Remaining Personal Details Checklist

Tick each item before you publish or submit.

## Must replace (placeholders currently in the files)

- [ ] **Email address**: `your.email@example.com` in `index.html` (contact card + footer) and `tools/build_resume.py`
- [ ] **GitHub profile URL**: `YOUR-GITHUB-USERNAME` in `index.html` (contact card + footer), `tools/build_resume.py`, and the README clone command
- [ ] **LinkedIn URL**: `YOUR-LINKEDIN-ID` in `index.html` (contact card + footer) and `tools/build_resume.py`
- [ ] For each link you replace, **delete `is-placeholder`** from its class list and the `data-placeholder="..."` attribute, and delete the "Placeholder, to be replaced" flag line
- [ ] Rebuild the résumé: `python tools/build_resume.py`
- [ ] **Repository URL** in README.md and the report (Section 10)
- [ ] **Live website URL** in README.md, the report (Section 11), and the résumé (Personal Portfolio Website bullet)
- [ ] **Submission date** and **faculty name** on the report cover page

## Confirm for accuracy

- [ ] **Medical Store Management System**: decide which features are actually implemented vs planned, then update the card text and details dialog in `index.html`; add the technology stack
- [ ] **Posture & Health Monitoring System**: add libraries/tools/functionality only if you can confirm them (otherwise leave as is)
- [ ] **Name spelling**: the internship certificate reads "Nidhi T. Rana", while this project uses "Rana Nidhi" as you instructed. Be ready to explain this if asked.
- [ ] Confirm the college name spelling: *Asha M. Tarsadia Institute of Computer Science and Technology, Uka Tarsadia University*
- [ ] Optional: expected graduation year, if you choose to add it (not included, since none was provided)

## Create after publishing

- [ ] Real GitHub repository named `Nidhi_Portfolio_Website` (public)
- [ ] Real project repositories (if any), then replace "Repository link coming soon" with links
- [ ] Screenshots for the report (6 spaces, Section 9), taken from the **live** site
- [ ] Paste `git log --oneline` output into the report (Section 6)
- [ ] Open the report in Word, right-click the Table of Contents → **Update Field**, then export to PDF

## Final checks

- [ ] Open the live site on your phone: menu, project dialogs, résumé download
- [ ] Click every link on the live site
- [ ] Open `resume.pdf` and check no pink `[placeholder]` text remains
- [ ] Make sure no private details (phone numbers, addresses, certificate scan) are in the repository
