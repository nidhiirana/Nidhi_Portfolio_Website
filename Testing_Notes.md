# Testing Notes

## Tests actually performed
Automated checks ran in headless Chromium (Playwright) on the local files, with the résumé download also tested over a local HTTP server. Result: **35 of 35 checks passed**.

| Area | Check |
|---|---|
| Loading | No console/page errors; no failed requests; portrait image decodes |
| Links | Every in-page `#anchor` resolves to an existing element; `resume.pdf` linked from nav, hero and footer |
| Dialogs (all 3) | Open via button; close with Escape, close button and backdrop click; focus returns to opening button; page scroll lock released |
| Keyboard | First Tab stop is the "Skip to main content" link |
| Mobile (390 px) | Menu hidden initially; opens; closes after choosing a link and scrolls to the section; dialog opens by tap; no horizontal overflow |
| Tablet (820 px) | No horizontal overflow |
| Reduced motion | Content visible with `prefers-reduced-motion: reduce` |
| Placeholders | Clicking a placeholder link shows a notice and does not navigate |
| Résumé | `resume.pdf` is one page; download works and the saved file matches (4,656 bytes) when served over HTTP |
| Assets | `index.html`, `style.css`, `script.js`, both portrait files and `resume.pdf` all return HTTP 200 with correct types |

A horizontal-overflow bug on phones (caused by the rotating portrait ring) was found by testing and fixed with `overflow-x: clip` on the hero.

## Tests NOT performed
- Real phones/tablets, Safari, Firefox, Edge, or older browsers (only Chromium was available)
- Screen readers (NVDA, VoiceOver, TalkBack)
- Lighthouse / axe accessibility audits and formal colour-contrast measurement
- The live GitHub Pages deployment (not published yet)
- Opening a downloaded résumé on other PDF viewers
- When opened directly from disk (`file://`), browsers may ignore the custom download filename; over HTTP (GitHub Pages) it downloads as `Rana_Nidhi_Resume.pdf`
