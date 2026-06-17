# Gowtham Nataraj Data Analyst Portfolio

An interview-ready portfolio for Gowtham Nataraj, a Junior Data Analyst based in London and seeking Data Analyst roles in the UK. The project includes a live financial analytics dashboard, KPI cards, charts, project case studies, filtered views, and CSV/Excel/PDF export actions.

## What This Project Shows

- UK data analyst candidate positioning for Gowtham Nataraj
- Revenue, cost, profit, loss, debt, margin, and debt-to-revenue analysis
- KPI summary cards for quick executive reporting
- Canvas-based charts for financial trend storytelling
- Case study cards for interview discussion
- Export buttons for CSV, Excel, and printable PDF reports
- Responsive layout for laptop and mobile screens
- Contact links for LinkedIn, GitHub, and email
- Real project case study: Impact of Cost Structure and Debt Strategy on Corporate Profitability

## Suggested Portfolio Message

```text
I am Gowtham Nataraj, a Junior Data Analyst based in London and currently seeking Data Analyst roles across the UK. This portfolio demonstrates my ability to clean data, calculate KPIs, build dashboards, explain trends, and turn analysis into business recommendations using SQL, Python, Power BI, Tableau, and Excel.
```

## How To Run Locally

Open `index.html` directly in a browser, or run the included local server:

```powershell
node server.js
```

Then open:

```text
http://localhost:8000/index.html
```

## Interview Demo Flow

1. Start on `index.html` and explain the business problem.
2. Use the KPI cards to describe revenue, cost, profit, and debt health.
3. Open `dashboard.html` to explain trend analysis and monthly KPI detail.
4. Open `products.html` to discuss case studies, tools, and impact.
5. Use the export buttons to show how results can be shared with stakeholders.

## Optional Login

The project is demo-friendly by default, so interviewers can open the dashboard immediately. A sample login page is still included at `login.html`.

Demo credentials:

```text
Username: admin
Password: portfolio123
```

To require login for a page during a private demo, add `?locked=true` to the page URL.

## Files

- `index.html` - main portfolio dashboard
- `dashboard.html` - detailed analytics dashboard
- `products.html` - financial case studies
- `about.html` - candidate profile
- `contact.html` - resume, contact, GitHub, and LinkedIn links
- `gowtham-nataraj-resume.pdf` - downloadable CV
- `Google_certificate.png` - Google Data Analytics certificate image
- `script.js` - dashboard data, charts, filters, exports, and login logic
- `server.js` - local static server for live dashboard demos
- `style.css` - responsive visual design
- `data/splitex-analytics.json` - sample analytics data
- `REAL_PROJECT_TEMPLATE.md` - structure for adding real portfolio projects
- `assets/` - screenshots, PBIX files, SQL files, Excel reports, and notebook chart exports

## Deploy As A Live Dashboard

This is a static website, so it can be deployed with GitHub Pages, Netlify, or Vercel. Upload the project folder and set `index.html` as the entry page.

See `DEPLOY.md` for step-by-step upload instructions.
