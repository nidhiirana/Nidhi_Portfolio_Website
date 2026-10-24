"""Build resume.pdf for Rana Nidhi (one page).

Edit the PLACEHOLDER values and the text below, then run:
    pip install reportlab
    python tools/build_resume.py
The PDF is written to ../resume.pdf (next to index.html).
"""
from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer,
                                Table, TableStyle, HRFlowable, KeepTogether)

# ------------------------------------------------------------------ editable data
EMAIL = "your.email@example.com"                 # PLACEHOLDER
GITHUB = "github.com/YOUR-GITHUB-USERNAME"       # PLACEHOLDER
LINKEDIN = "linkedin.com/in/YOUR-LINKEDIN-ID"    # PLACEHOLDER
LOCATION = "Surat, India"

OUT = Path(__file__).resolve().parent.parent / "resume.pdf"

# ------------------------------------------------------------------ design tokens
INK = colors.HexColor("#1b1733")
MUTED = colors.HexColor("#5b5775")
VIOLET = colors.HexColor("#6d3fe0")
LAV = colors.HexColor("#ece6ff")
PINK = colors.HexColor("#c026d3")
RULE = colors.HexColor("#d8cffb")

W, H = A4
M = 16 * mm


def st(name, **kw):
    base = dict(fontName="Helvetica", fontSize=9.2, leading=12.6, textColor=INK, alignment=TA_LEFT)
    base.update(kw)
    return ParagraphStyle(name, **base)


S_NAME = st("name", fontName="Times-Bold", fontSize=27, leading=30, textColor=INK)
S_SUB = st("sub", fontName="Helvetica-Bold", fontSize=10.2, leading=14, textColor=VIOLET)
S_CONTACT = st("contact", fontSize=8.6, leading=12, textColor=MUTED)
S_H = st("h", fontName="Helvetica-Bold", fontSize=8.8, leading=11, textColor=VIOLET, spaceBefore=9, spaceAfter=2)
S_BODY = st("body")
S_ROLE = st("role", fontName="Helvetica-Bold", fontSize=10, leading=13)
S_META = st("meta", fontSize=8.6, leading=12, textColor=MUTED)
S_BUL = st("bul", leftIndent=10, bulletIndent=0, spaceAfter=1.2)
S_SK_L = st("skl", fontName="Helvetica-Bold", fontSize=8.8, leading=12, textColor=INK)
S_SK_R = st("skr", fontSize=8.8, leading=12)


def ph(text):
    """Visible placeholder marker (pink, bracketed)."""
    return f'<font color="#c026d3">[{text}]</font>'


def section(title):
    return [Paragraph(title.upper(), S_H),
            HRFlowable(width="100%", thickness=0.7, color=RULE, spaceAfter=4)]


def bullets(items):
    return [Paragraph(t, S_BUL, bulletText="•") for t in items]


story = []

# Header
story.append(Paragraph("Rana Nidhi", S_NAME))
story.append(Paragraph("Computer Science Engineering Student &nbsp;|&nbsp; AI/ML Specialization", S_SUB))
story.append(Spacer(1, 3))
story.append(Paragraph(
    f"{LOCATION} &nbsp;&bull;&nbsp; {ph(EMAIL)} &nbsp;&bull;&nbsp; {ph(GITHUB)} &nbsp;&bull;&nbsp; {ph(LINKEDIN)}",
    S_CONTACT))
story.append(Spacer(1, 2))
story.append(Paragraph('<i>Building at the intersection of software, data, and AI.</i>', S_CONTACT))

# Summary
story += section("Professional Summary")
story.append(Paragraph(
    "Computer Science Engineering student specializing in Artificial Intelligence and Machine Learning, "
    "with a four-month Python internship at Comnet Development India. Hands-on with Python, Django, SQL and "
    "front-end web development, and building a foundation in data structures, algorithms and database systems. "
    "Aspiring AI/ML Engineer and Software Developer who values clean code, version control and continuous learning.",
    S_BODY))

# Skills
story += section("Technical Skills")
skills = [
    ("Programming", "Python, Java, C, JavaScript"),
    ("Web Development", "HTML5, CSS3, JavaScript"),
    ("Backend &amp; Databases", "Django, SQL, SQLite, REST API fundamentals"),
    ("Developer Tools", "Visual Studio Code, Git and GitHub (version control and project hosting)"),
    ("Areas of Interest", "Artificial Intelligence &amp; Machine Learning, Data Structures &amp; Algorithms, "
                          "Database Management Systems, Software Development"),
    ("Soft Skills", "Problem-solving, Adaptability, Continuous learning, Teamwork"),
]
t = Table([[Paragraph(a, S_SK_L), Paragraph(b, S_SK_R)] for a, b in skills],
          colWidths=[35 * mm, W - 2 * M - 35 * mm])
t.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("TOPPADDING", (0, 0), (-1, -1), 1.6), ("BOTTOMPADDING", (0, 0), (-1, -1), 1.6),
    ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ("ROWBACKGROUNDS", (0, 0), (-1, -1), [colors.white, colors.white]),
]))
story.append(t)

# Experience
story += section("Internship Experience")
head = Table([[Paragraph("Python Intern &mdash; Comnet Development India", S_ROLE),
               Paragraph("4 months &bull; Completed", st("r", alignment=2, fontSize=8.8, textColor=MUTED))]],
             colWidths=[W - 2 * M - 42 * mm, 42 * mm])
head.setStyle(TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                          ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                          ("VALIGN", (0, 0), (-1, -1), "BOTTOM")]))
story.append(KeepTogether([
    head,
    Paragraph("Project: <b>Posture &amp; Health Monitoring System with Python</b> "
              "(internship completion certificate dated 15 April 2026)", S_META),
    Spacer(1, 2),
    *bullets([
        "Completed a four-month internship working on a Python-based posture and health monitoring project, "
        "a monitoring and wellness-support application (not a medical diagnostic system).",
        "Certificate states performance as <b>Very Good</b> and attendance as <b>above 86%</b>.",
    ]),
]))

# Projects
story += section("Projects")
story.append(Paragraph("<b>Posture &amp; Health Monitoring System with Python</b> &nbsp;<font color='#5b5775'>"
                       "&mdash; Internship project, Comnet Development India</font>", S_BODY))
story += bullets(["Posture and health monitoring project built with Python during the internship; "
                  "described as a monitoring and wellness-support project."])
story.append(Spacer(1, 3))
story.append(Paragraph("<b>Medical Store Management System</b> &nbsp;<font color='#5b5775'>&mdash; Academic project</font>", S_BODY))
story += bullets(["Software project focused on medicine records, medicine search and inventory-related workflows. "
                  + ph("Add technologies and implemented features once confirmed")])
story.append(Spacer(1, 3))
story.append(Paragraph("<b>Personal Portfolio Website</b> &nbsp;<font color='#5b5775'>&mdash; IT4048, Version Control with Git and GitHub</font>", S_BODY))
story += bullets(["Responsive portfolio built with HTML5, CSS3 and vanilla JavaScript (mobile menu, project dialogs, "
                  "accessibility and reduced-motion support), versioned with Git and hosted on GitHub Pages. "
                  + ph("Live URL after publishing")])

# Education
story += section("Education")
edu = [
    [Paragraph("<b>Computer Science Engineering</b> &mdash; AI/ML specialization (current)", S_BODY)],
    [Paragraph("Asha M. Tarsadia Institute of Computer Science and Technology, Uka Tarsadia University", S_META)],
    [Spacer(1, 3)],
    [Paragraph("<b>ICT Diploma</b>", S_BODY)],
    [Paragraph("Government Polytechnic for Girls, Surat", S_META)],
]
et = Table(edu, colWidths=[W - 2 * M])
et.setStyle(TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0.5)]))
story.append(et)


def decorate(canv, doc):
    canv.saveState()
    canv.setFillColor(VIOLET)
    canv.rect(0, H - 6 * mm, W, 6 * mm, stroke=0, fill=1)
    canv.setFillColor(LAV)
    canv.rect(0, H - 6 * mm, W * 0.28, 6 * mm, stroke=0, fill=1)
    canv.setFont("Helvetica", 7.2)
    canv.setFillColor(MUTED)
    canv.drawString(M, 9 * mm, "Pink [bracketed] items are placeholders. Replace them with real details before sharing.")
    canv.restoreState()


doc = BaseDocTemplate(str(OUT), pagesize=A4, leftMargin=M, rightMargin=M, topMargin=14 * mm, bottomMargin=16 * mm,
                      title="Rana Nidhi - Resume", author="Rana Nidhi",
                      subject="Computer Science Engineering student, AI/ML specialization")
doc.addPageTemplates([PageTemplate(id="p", frames=[Frame(M, 16 * mm, W - 2 * M, H - 30 * mm, id="f",
                      leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)], onPage=decorate)])
doc.build(story)
print("written", OUT)
