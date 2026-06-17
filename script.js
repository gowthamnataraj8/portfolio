const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "portfolio123";
const AUTH_KEY = "portfolioDashboardAuthenticated";

const currentPage = window.location.pathname.split("/").pop() || "index.html";
const isLoginPage = currentPage === "login.html";
const requireAuth = new URLSearchParams(window.location.search).get("locked") === "true";

if (!isLoginPage && requireAuth && localStorage.getItem(AUTH_KEY) !== "true") {
  window.location.href = "login.html";
}

const financeData = {
  monthly: [
    { label: "Jan", revenue: 82000, cost: 57000, profit: 25000, loss: 4200, debt: 118000 },
    { label: "Feb", revenue: 91000, cost: 61000, profit: 30000, loss: 3100, debt: 114000 },
    { label: "Mar", revenue: 87000, cost: 64000, profit: 23000, loss: 6800, debt: 111500 },
    { label: "Apr", revenue: 104000, cost: 69000, profit: 35000, loss: 2900, debt: 106000 },
    { label: "May", revenue: 112000, cost: 72000, profit: 40000, loss: 2200, debt: 101000 },
    { label: "Jun", revenue: 126000, cost: 78000, profit: 48000, loss: 1800, debt: 96000 },
    { label: "Jul", revenue: 119000, cost: 79000, profit: 40000, loss: 3600, debt: 92500 },
    { label: "Aug", revenue: 133000, cost: 83000, profit: 50000, loss: 2400, debt: 88000 },
    { label: "Sep", revenue: 141000, cost: 87000, profit: 54000, loss: 1900, debt: 83000 },
    { label: "Oct", revenue: 149000, cost: 90000, profit: 59000, loss: 1600, debt: 77000 },
    { label: "Nov", revenue: 158000, cost: 94000, profit: 64000, loss: 1300, debt: 71000 },
    { label: "Dec", revenue: 172000, cost: 101000, profit: 71000, loss: 1100, debt: 65000 }
  ],
  cases: [
    {
      name: "Corporate Profitability Analysis",
      focus: "Python",
      type: "python",
      problem: "Analyse how cost structure and debt strategy affect corporate profitability using SEC financial filing data.",
      tools: ["Python", "Pandas", "Statsmodels", "Scikit-learn", "Jupyter"],
      impact: 94,
      status: "Ready",
      dashboardUrl: "dashboard.html#corporate-profitability-dashboard",
      dataset: "SEC Financial Statement Data Sets, num.txt and sub.txt, 2016-2026",
      role: "Data extraction, ratio engineering, panel dataset creation, econometric modelling, and machine learning comparison",
      outcome: "Found that cost structure positively affects profitability while high debt ratios can weaken firm performance. Random Forest improved prediction, while panel regression gave stronger interpretability.",
      links: [
        { label: "GitHub", url: "https://github.com/gowthamnataraj8/Impact-of-Cost-Structure-and-Debt-Strategy-on-Corporate-Profitability" },
        { label: "Notebook", url: "https://github.com/gowthamnataraj8/Impact-of-Cost-Structure-and-Debt-Strategy-on-Corporate-Profitability/blob/main/main.ipynb" }
      ],
      summary: "Built a corporate profitability study using SEC XBRL financial filings, financial ratios, fixed effects panel regression, and Random Forest regression to compare interpretability and predictive performance."
    },
    {
      name: "Power BI Financial KPI Dashboard",
      focus: "Power BI",
      type: "powerbi",
      problem: "Build an executive dashboard that tracks revenue, cost, profit, margin, loss, and debt risk for business decision-making.",
      tools: ["Power BI", "DAX", "Excel", "Data Modelling"],
      impact: 91,
      status: "Ready",
      dashboardUrl: "dashboard.html#powerbi-dashboard",
      dataset: "Monthly financial KPI dataset",
      role: "Dashboard design, KPI definition, data modelling, DAX measures, and stakeholder reporting layout",
      outcome: "Created an interview-ready Power BI-style reporting view for profitability, operating performance, and risk monitoring.",
      links: [
        { label: "Live View", url: "dashboard.html#powerbi-dashboard" },
        { label: "Add PBIX", url: "REAL_PROJECT_TEMPLATE.md" }
      ],
      summary: "Designed a Power BI-style financial dashboard concept with KPI cards, monthly trends, margin views, debt risk indicators, and screenshot-ready report sections."
    },
    {
      name: "SQL Revenue and Profit Analysis",
      focus: "SQL",
      type: "sql",
      problem: "Use SQL logic to identify which months drive the strongest revenue growth and profit margin.",
      tools: ["SQL", "PostgreSQL", "CTEs", "Window Functions"],
      impact: 86,
      status: "Ready",
      dashboardUrl: "dashboard.html#sql-revenue-dashboard",
      dataset: "Revenue, cost, profit, and margin tables",
      role: "SQL querying, joins, aggregation, CTE design, margin calculation, and variance analysis",
      outcome: "Produced monthly performance logic that highlights strong periods, margin changes, and reporting-ready business insight.",
      links: [
        { label: "SQL Dashboard", url: "dashboard.html#sql-revenue-dashboard" },
        { label: "Add SQL Files", url: "REAL_PROJECT_TEMPLATE.md" }
      ],
      summary: "Built a SQL-focused analysis structure for revenue, cost, gross profit, net profit, and best-performing periods using clear query logic."
    },
    {
      name: "Python Data Cleaning Study",
      focus: "Python",
      type: "python",
      problem: "Find months where cost-to-revenue ratio and operational loss are unusually high.",
      tools: ["Python", "Pandas", "Matplotlib"],
      impact: 82,
      status: "Ready",
      dashboardUrl: "dashboard.html#python-cost-dashboard",
      dataset: "Messy financial CSV sample",
      role: "Data cleaning, feature creation, ratio calculation, and visual checks",
      outcome: "Flagged high-cost periods and prepared cleaned analysis tables for reporting.",
      links: [
        { label: "Analysis View", url: "dashboard.html" }
      ],
      summary: "Used Python and Pandas to clean sample financial data, calculate cost ratios, and identify possible areas for cost optimisation."
    },
    {
      name: "Excel Monthly Reporting Pack",
      focus: "Excel",
      type: "excel",
      problem: "Prepare a monthly management reporting pack that summarises revenue, cost, profit, loss, margin, and debt movement.",
      tools: ["Excel", "Pivot Tables", "Lookups", "Charts"],
      impact: 83,
      status: "Ready",
      dashboardUrl: "dashboard.html#excel-reporting-dashboard",
      dataset: "Monthly finance reporting dataset",
      role: "Pivot table design, formulas, KPI summaries, chart creation, and report formatting",
      outcome: "Prepared a reporting-pack structure that can be exported and discussed in analyst interviews.",
      links: [
        { label: "Report View", url: "dashboard.html#excel-reporting-dashboard" },
        { label: "Source Data", url: "data/splitex-analytics.json" }
      ],
      summary: "Created a structured Excel reporting pack concept with KPI summaries, monthly detail, pivot-style logic, and export-ready finance tables."
    }
  ]
};

const chartColors = {
  revenue: "#0f8b5f",
  cost: "#d79b2b",
  profit: "#2563eb",
  loss: "#b42318",
  debt: "#6d28d9",
  text: "#66756c",
  grid: "#dbe3dd",
  track: "#edf3ef"
};

let activeCategory = "all";

const corporateProjectResults = {
  cleanRows: 21087,
  entities: 2843,
  models: [
    { label: "Panel FE", r2: 0.0152, rmse: null },
    { label: "Baseline RF", r2: 0.3190, rmse: 0.1132 },
    { label: "Optimised RF", r2: 0.3143, rmse: 0.1136 }
  ],
  correlations: [
    { label: "Cost structure", value: 0.3380 },
    { label: "Debt ratio", value: -0.1155 },
    { label: "Firm size", value: 0.2269 },
    { label: "Growth", value: 0.0026 }
  ],
  bestParams: "max_depth=10, max_features=sqrt, min_samples_leaf=2, min_samples_split=5, n_estimators=200"
};

document.querySelectorAll(".menu-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".sidebar")?.classList.toggle("open");
  });
});

document.querySelector("#loginForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value;
  const status = document.querySelector("#loginStatus");

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    localStorage.setItem(AUTH_KEY, "true");
    window.location.href = "index.html";
    return;
  }

  status.textContent = "Invalid username or password.";
});

document.querySelectorAll("[data-logout]").forEach((button) => {
  button.addEventListener("click", () => {
    localStorage.removeItem(AUTH_KEY);
    window.location.href = "login.html";
  });
});

if (isLoginPage && localStorage.getItem(AUTH_KEY) === "true") {
  window.location.href = "index.html";
}

function initMotion() {
  const sections = document.querySelectorAll(".reveal-on-scroll");
  if (!sections.length) return;

  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reducedMotion || !("IntersectionObserver" in window)) {
    sections.forEach((section) => section.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  sections.forEach((section) => observer.observe(section));
}

function animateNumber(id, value, options = {}) {
  const node = document.getElementById(id);
  if (!node) return;
  const duration = options.duration || 900;
  const decimals = options.decimals || 0;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = value * eased;
    node.textContent = decimals
      ? current.toFixed(decimals)
      : Math.round(current).toLocaleString("en-US");
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

document.querySelector("#settingsForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector(".form-status").textContent = "Profile note saved for Gowtham Nataraj's data analyst portfolio.";
});

function bindControls() {
  document.querySelectorAll("#categoryFilter").forEach((filter) => {
    filter.addEventListener("change", () => {
      activeCategory = filter.value;
      renderPage();
    });
  });

  document.querySelectorAll("[data-export]").forEach((button) => {
    button.addEventListener("click", () => exportReport(button.dataset.export));
  });
}

function getFilteredCases() {
  if (activeCategory === "all") return financeData.cases;
  return financeData.cases.filter((item) => item.focus === activeCategory);
}

function totals() {
  return financeData.monthly.reduce((sum, row) => ({
    revenue: sum.revenue + row.revenue,
    cost: sum.cost + row.cost,
    profit: sum.profit + row.profit,
    loss: sum.loss + row.loss,
    debt: row.debt
  }), { revenue: 0, cost: 0, profit: 0, loss: 0, debt: 0 });
}

function renderKpis() {
  const total = totals();
  const margin = total.revenue ? (total.profit / total.revenue) * 100 : 0;
  const debtRatio = total.revenue ? (total.debt / total.revenue) * 100 : 0;

  setText("revenueKpi", money(total.revenue));
  setText("costKpi", money(total.cost));
  setText("profitKpi", money(total.profit));
  setText("debtKpi", money(total.debt));
  setText("marginNote", `${margin.toFixed(1)}% profit margin`);
  setText("debtNote", `${debtRatio.toFixed(1)}% debt-to-revenue`);
}

function setText(id, value) {
  const node = document.getElementById(id);
  if (node) node.textContent = value;
}

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function setupCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const height = Number(canvas.getAttribute("height")) || 280;
  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(height * dpr));
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  return { ctx, width: rect.width, height };
}

function clearCanvas(id) {
  const canvas = document.getElementById(id);
  if (!canvas) return null;
  const setup = setupCanvas(canvas);
  setup.ctx.clearRect(0, 0, setup.width, setup.height);
  return setup;
}

function drawGrid(ctx, width, height) {
  ctx.strokeStyle = chartColors.grid;
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i += 1) {
    const y = 28 + ((height - 70) / 4) * i;
    ctx.beginPath();
    ctx.moveTo(42, y);
    ctx.lineTo(width - 16, y);
    ctx.stroke();
  }
}

function drawLineChart(id, labels, series) {
  const setup = clearCanvas(id);
  if (!setup) return;
  const { ctx, width, height } = setup;
  drawGrid(ctx, width, height);
  const allValues = series.flatMap((item) => item.values);
  const max = Math.max(...allValues, 1) * 1.15;
  const stepX = labels.length > 1 ? (width - 76) / (labels.length - 1) : 1;

  series.forEach((item) => {
    ctx.strokeStyle = item.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    item.values.forEach((value, index) => {
      const x = 42 + stepX * index;
      const y = 28 + (height - 78) * (1 - value / max);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  });

  series.forEach((item, index) => {
    const x = 42 + index * 108;
    ctx.fillStyle = item.color;
    ctx.fillRect(x, 8, 18, 4);
    ctx.fillStyle = chartColors.text;
    ctx.font = "800 11px Inter, Arial";
    ctx.fillText(item.name, x + 26, 13);
  });

  ctx.fillStyle = chartColors.text;
  ctx.font = "700 11px Inter, Arial";
  labels.forEach((label, index) => {
    ctx.fillText(label, 36 + stepX * index, height - 18);
  });
}

function drawBarChart(id, labels, values, color = chartColors.revenue) {
  const setup = clearCanvas(id);
  if (!setup) return;
  const { ctx, width, height } = setup;
  drawGrid(ctx, width, height);
  const max = Math.max(...values, 1) * 1.15;
  const available = width - 70;
  const slot = available / values.length;
  const barWidth = Math.max(18, Math.min(48, slot * 0.55));

  values.forEach((value, index) => {
    const x = 42 + slot * index + (slot - barWidth) / 2;
    const barHeight = (height - 78) * (value / max);
    const y = height - 42 - barHeight;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, barWidth, barHeight);
    ctx.fillStyle = chartColors.text;
    ctx.font = "700 11px Inter, Arial";
    ctx.fillText(labels[index], x, height - 18);
  });
}

function drawHorizontalChart(id, labels, values) {
  const setup = clearCanvas(id);
  if (!setup) return;
  const { ctx, width, height } = setup;
  const max = Math.max(...values, 1) * 1.1;
  const rowHeight = (height - 26) / values.length;

  values.forEach((value, index) => {
    const y = 14 + index * rowHeight;
    const barWidth = (width - 150) * (value / max);
    ctx.fillStyle = chartColors.text;
    ctx.font = "800 12px Inter, Arial";
    ctx.fillText(labels[index], 6, y + 17);
    ctx.fillStyle = chartColors.track;
    ctx.fillRect(116, y, width - 130, 24);
    ctx.fillStyle = chartColors.revenue;
    ctx.fillRect(116, y, barWidth, 24);
  });
}

function drawComparisonChart(id, rows, valueKey, options = {}) {
  const setup = clearCanvas(id);
  if (!setup) return;
  const { ctx, width, height } = setup;
  const values = rows.map((row) => Math.abs(row[valueKey] || 0));
  const max = Math.max(...values, 0.05) * 1.18;
  const baseY = height - 46;
  const slot = (width - 62) / rows.length;
  const barWidth = Math.max(34, Math.min(82, slot * 0.52));

  drawGrid(ctx, width, height);

  rows.forEach((row, index) => {
    const raw = row[valueKey] || 0;
    const value = Math.abs(raw);
    const x = 42 + slot * index + (slot - barWidth) / 2;
    const barHeight = (height - 96) * (value / max);
    const y = baseY - barHeight;
    ctx.fillStyle = raw < 0 ? chartColors.loss : (options.color || chartColors.profit);
    ctx.fillRect(x, y, barWidth, barHeight);
    ctx.fillStyle = chartColors.text;
    ctx.font = "800 11px Inter, Arial";
    ctx.fillText(row.label, x - 4, height - 18);
    ctx.fillText(raw.toFixed(3), x, y - 8);
  });
}

function renderCorporateProjectResults() {
  if (!document.getElementById("corporateModelChart")) return;
  const rf = corporateProjectResults.models[1];
  animateNumber("corpRows", corporateProjectResults.cleanRows);
  animateNumber("corpEntities", corporateProjectResults.entities);
  animateNumber("corpBestR2", rf.r2, { decimals: 3 });
  animateNumber("corpBestRmse", rf.rmse, { decimals: 3 });
  setText("corpBestParams", corporateProjectResults.bestParams);
  drawComparisonChart("corporateModelChart", corporateProjectResults.models, "r2", { color: chartColors.profit });
  drawComparisonChart("corporateCorrelationChart", corporateProjectResults.correlations, "value", { color: chartColors.revenue });
}

function renderCharts() {
  const labels = financeData.monthly.map((row) => row.label);
  drawLineChart("financeTrendChart", labels, [
    { name: "Revenue", color: chartColors.revenue, values: financeData.monthly.map((row) => row.revenue) },
    { name: "Cost", color: chartColors.cost, values: financeData.monthly.map((row) => row.cost) },
    { name: "Profit", color: chartColors.profit, values: financeData.monthly.map((row) => row.profit) }
  ]);
  drawLineChart("debtChart", labels, [
    { name: "Debt", color: chartColors.debt, values: financeData.monthly.map((row) => row.debt) },
    { name: "Loss", color: chartColors.loss, values: financeData.monthly.map((row) => row.loss) }
  ]);
  drawBarChart("lossChart", labels, financeData.monthly.map((row) => row.loss), chartColors.loss);
  drawHorizontalChart("caseImpactChart", getFilteredCases().map((item) => shortName(item.name)), getFilteredCases().map((item) => item.impact));
}

function renderTables() {
  const caseTable = document.querySelector("#featuredProjectsTable");
  if (caseTable) {
    caseTable.innerHTML = getFilteredCases().map((item) => `
      <tr>
        <td>${item.name}</td>
        <td>${item.focus}</td>
        <td>${item.tools.join(", ")}</td>
        <td>${item.impact}%</td>
      </tr>
    `).join("");
  }

  const detailTable = document.querySelector("#financialDetailTable");
  if (detailTable) {
    detailTable.innerHTML = financeData.monthly.map((row) => {
      const margin = row.revenue ? (row.profit / row.revenue) * 100 : 0;
      return `
        <tr>
          <td>${row.label}</td>
          <td>${money(row.revenue)}</td>
          <td>${money(row.cost)}</td>
          <td>${money(row.profit)}</td>
          <td>${money(row.loss)}</td>
          <td>${money(row.debt)}</td>
          <td>${margin.toFixed(1)}%</td>
        </tr>
      `;
    }).join("");
  }
}

function renderCaseCards() {
  const container = document.querySelector("#projectCards");
  if (!container) return;
  container.innerHTML = getFilteredCases().map((item) => `
    <article class="project-card project-card-${item.type || "data"}">
      <div class="project-visual" aria-hidden="true">
        <span>${item.focus}</span>
        <strong>${projectVisualLabel(item.type)}</strong>
      </div>
      <div>
        <p class="eyebrow">${item.focus}</p>
        <h2><a href="${primaryProjectLink(item)}">${item.name}</a></h2>
        <p class="project-problem"><strong>Problem:</strong> ${item.problem}</p>
        <p>${item.summary}</p>
      </div>
      <dl class="project-details">
        <div><dt>Dataset</dt><dd>${item.dataset || "Project dataset"}</dd></div>
        <div><dt>My role</dt><dd>${item.role || "Analysis and dashboard development"}</dd></div>
        <div><dt>Outcome</dt><dd>${item.outcome || "Insight-ready reporting output"}</dd></div>
      </dl>
      <div class="project-meta">
        ${item.tools.map((tool) => `<span>${tool}</span>`).join("")}
      </div>
      <div class="project-footer">
        <strong>${item.impact}% impact</strong>
        <span class="status ${item.status === "Ready" ? "good" : "warn"}">${item.status}</span>
      </div>
      <div class="project-links">
        <a class="open-project" href="${primaryProjectLink(item)}">Open Project</a>
        ${(item.links || []).map((link) => `<a href="${link.url}">${link.label}</a>`).join("")}
      </div>
    </article>
  `).join("");
}

function primaryProjectLink(item) {
  return item.dashboardUrl || item.links?.[0]?.url || "products.html";
}

function projectVisualLabel(type) {
  const labels = {
    powerbi: "Dashboard preview",
    sql: "Query output",
    python: "Notebook results",
    excel: "Report pack"
  };
  return labels[type] || "Project preview";
}

function exportReport(type) {
  const report = {
    title: "Gowtham Nataraj Data Analyst Portfolio Report",
    headers: ["Month", "Revenue", "Cost", "Profit", "Loss", "Debt", "Profit Margin"],
    rows: financeData.monthly.map((row) => {
      const margin = row.revenue ? (row.profit / row.revenue) * 100 : 0;
      return [row.label, money(row.revenue), money(row.cost), money(row.profit), money(row.loss), money(row.debt), `${margin.toFixed(1)}%`];
    })
  };

  if (type === "csv") downloadFile("financial-analytics-report.csv", toCsv(report), "text/csv;charset=utf-8;");
  if (type === "excel") downloadFile("financial-analytics-report.xls", toExcelHtml(report), "application/vnd.ms-excel");
  if (type === "pdf") printPdfSummary(report);
}

function toCsv(report) {
  return [report.headers, ...report.rows]
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
    .join("\n");
}

function toExcelHtml(report) {
  return `
    <html><head><meta charset="UTF-8"></head><body>
      <h1>${report.title}</h1>
      <table border="1">
        <thead><tr>${report.headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead>
        <tbody>${report.rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </body></html>
  `;
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function printPdfSummary(report) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;
  printWindow.document.write(`
    <html>
      <head>
        <title>${report.title}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 28px; color: #17211c; }
          h1 { text-transform: uppercase; font-size: 24px; }
          table { width: 100%; border-collapse: collapse; margin-top: 18px; }
          th, td { border: 1px solid #dbe3dd; padding: 10px; text-align: left; }
          th { background: #f2f5f2; }
        </style>
      </head>
      <body>
        <h1>${report.title}</h1>
        <p>Generated from Gowtham Nataraj's data analyst portfolio dashboard.</p>
        <table>
          <thead><tr>${report.headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead>
          <tbody>${report.rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>
        </table>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

function shortName(value) {
  return value.split(" ").slice(0, 2).join(" ");
}

function renderPage() {
  renderKpis();
  renderCharts();
  renderTables();
  renderCaseCards();
  renderCorporateProjectResults();
}

window.addEventListener("resize", renderPage);

bindControls();
initMotion();
renderPage();
