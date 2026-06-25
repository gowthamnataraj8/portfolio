// WARNING: Client-side auth is for demo/portfolio purposes only.
// Credentials here are visible in source; never use this pattern for real apps.
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "splitex123";
const AUTH_KEY = "portfolioDashboardAuthenticated";

const currentPage = window.location.pathname.split("/").pop() || "index.html";
const isLoginPage = currentPage === "login.html";
const requireAuth = new URLSearchParams(window.location.search).get("locked") === "true";

if (!isLoginPage && requireAuth && localStorage.getItem(AUTH_KEY) !== "true") {
  window.location.href = "login.html";
}

const portfolioData = {
  timeline: [
    { label: "Extract", projects: 1, insights: 3 },
    { label: "Clean", projects: 1, insights: 7 },
    { label: "Engineer", projects: 1, insights: 11 },
    { label: "Model", projects: 1, insights: 15 },
    { label: "SQL", projects: 2, insights: 22 },
    { label: "Report", projects: 2, insights: 29 }
  ],
  projects: [
    {
      name: "Impact of Cost Structure and Debt Strategy on Corporate Profitability",
      focus: "Machine Learning",
      problem: "Analyse how cost structure and debt strategy affect corporate profitability using SEC financial statement filings.",
      tools: ["Python", "Pandas", "NumPy", "Statsmodels", "Scikit-learn"],
      impact: 94,
      status: "Ready",
      link: "https://github.com/gowthamnataraj8/Impact-of-Cost-Structure-and-Debt-Strategy-on-Corporate-Profitability",
      folder: "projects/corporate-profitability/README.md",
      evidence: "Jupyter notebook, engineered financial ratios, panel regression, Random Forest metrics",
      result: "Random Forest reached R2 0.319 and RMSE 0.113; cost structure showed a positive relationship with ROA while debt ratio was negative.",
      summary: "Cleaned SEC XBRL financial data, engineered ROA, debt ratio, and cost structure features, then compared fixed effects panel regression with Random Forest regression."
    },
    {
      name: "Banking and Financial Risk Analysis using SQL",
      focus: "SQL",
      problem: "Analyze banking transactions, fraud activity, and personal loan behavior to understand customer financial patterns and risk signals.",
      tools: ["SQL", "PostgreSQL", "pgAdmin"],
      impact: 88,
      status: "Ready",
      link: "https://github.com/gowthamnataraj8/Banking-sql-analysis",
      folder: "projects/banking-sql-analysis/README.md",
      evidence: "PostgreSQL queries, transaction analysis, fraud comparison, loan acceptance patterns",
      result: "Identified high-value transaction categories, merchant concentration, fraud risk signals, and customer factors influencing loan acceptance.",
      summary: "Used SQL to analyze transaction value, fraud vs non-fraud behavior, category and merchant patterns, customer spending, and personal loan acceptance drivers."
    }
  ]
};

const chartColors = {
  primary: "#10b981",
  secondary: "#f59e0b",
  profit: "#10b981",
  loss: "#dc2626",
  revenue: "#2563eb",
  debt: "#7c3aed",
  text: "#64748b",
  grid: "#e2e8f0",
  track: "#f1f5f9"
};

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
  ]
};

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

let activeCategory = "all";

document.querySelectorAll(".menu-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".sidebar")?.classList.toggle("open");
  });
});

document.querySelector("#loginForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.querySelector("#username")?.value.trim();
  const password = document.querySelector("#password")?.value;
  const status = document.querySelector("#loginStatus");

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    localStorage.setItem(AUTH_KEY, "true");
    window.location.href = "index.html";
    return;
  }

  if (status) status.textContent = "Invalid username or password.";
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

document.querySelector("#settingsForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const statusEl = document.querySelector(".form-status");
  if (statusEl) statusEl.textContent = "Message received; Gowtham will reply within 24 hours.";
});

function bindControls() {
  // IDs are unique per spec; querySelector is correct here.
  const filter = document.querySelector("#categoryFilter");
  if (filter) {
    filter.addEventListener("change", () => {
      activeCategory = filter.value;
      renderPage();
    });
  }

  document.querySelectorAll("[data-export]").forEach((button) => {
    button.addEventListener("click", () => exportReport(button.dataset.export));
  });
}

function getFilteredProjects() {
  if (activeCategory === "all") return portfolioData.projects;
  return portfolioData.projects.filter((project) => project.focus === activeCategory);
}

function renderKpis(projects) {
  const tools = new Set(projects.flatMap((project) => project.tools));
  const avgImpact = projects.length
    ? Math.round(projects.reduce((sum, project) => sum + project.impact, 0) / projects.length)
    : 0;
  const readyCount = projects.filter((project) => project.status === "Ready").length;
  const readiness = projects.length ? Math.round((readyCount / projects.length) * 100) : 0;

  setText("projectCountKpi", projects.length);
  setText("toolsKpi", tools.size);
  setText("impactKpi", `${avgImpact}%`);
  setText("readinessKpi", `${readiness}%`);
}

function setText(id, value) {
  const node = document.getElementById(id);
  if (node) node.textContent = value;
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
    node.textContent = decimals ? current.toFixed(decimals) : Math.round(current).toLocaleString("en-US");
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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

  // Distribute legend items evenly across available width
  const legendSlot = series.length > 1 ? (width - 60) / series.length : width;
  series.forEach((item, index) => {
    const x = 42 + index * legendSlot;
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

function drawBarChart(id, labels, values, color = chartColors.primary) {
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
    ctx.fillStyle = chartColors.primary;
    ctx.fillRect(116, y, barWidth, 24);
  });
}

function renderCharts(projects) {
  drawLineChart("portfolioTrendChart", portfolioData.timeline.map((row) => row.label), [
    { name: "Projects", color: chartColors.primary, values: portfolioData.timeline.map((row) => row.projects) },
    { name: "Insights", color: chartColors.secondary, values: portfolioData.timeline.map((row) => row.insights) }
  ]);

  const skillCounts = {};
  projects.flatMap((project) => project.tools).forEach((tool) => {
    skillCounts[tool] = (skillCounts[tool] || 0) + 1;
  });
  drawHorizontalChart("skillsChart", Object.keys(skillCounts), Object.values(skillCounts));
  drawBarChart("impactChart", projects.map((project) => shortName(project.name)), projects.map((project) => project.impact), chartColors.secondary);
}

function renderTables(projects) {
  const featuredTable = document.querySelector("#featuredProjectsTable");
  if (featuredTable) {
    featuredTable.innerHTML = projects.map((project) => `
      <tr>
        <td>${escapeHtml(project.name)}</td>
        <td>${escapeHtml(project.focus)}</td>
        <td>${escapeHtml(project.tools.join(", "))}</td>
        <td>${escapeHtml(project.impact)}%</td>
      </tr>
    `).join("");
  }

  const detailTable = document.querySelector("#projectDetailTable");
  if (detailTable) {
    detailTable.innerHTML = projects.map((project) => `
      <tr>
        <td>${escapeHtml(project.name)}</td>
        <td>${escapeHtml(project.focus)}</td>
        <td>${escapeHtml(project.problem)}</td>
        <td>${escapeHtml(project.tools.join(", "))}</td>
        <td>${escapeHtml(project.impact)}%</td>
        <td><span class="status ${project.status === "Ready" ? "good" : "warn"}">${escapeHtml(project.status)}</span></td>
      </tr>
    `).join("");
  }
}

function renderProjectCards(projects) {
  const container = document.querySelector("#projectCards");
  if (!container) return;
  container.innerHTML = projects.map((project) => `
    <article class="project-card pro-case-card ${project.focus === "SQL" ? "sql-case" : "ml-case"}">
      <div class="case-visual" aria-hidden="true">
        <span>${escapeHtml(project.focus)}</span>
        <div>
          <i style="height: 46%"></i>
          <i style="height: 76%"></i>
          <i style="height: 58%"></i>
          <i style="height: 88%"></i>
          <i style="height: 64%"></i>
        </div>
      </div>
      <div>
        <p class="eyebrow">${escapeHtml(project.focus)}</p>
        <h2>${escapeHtml(project.name)}</h2>
        <p>${escapeHtml(project.summary)}</p>
      </div>
      <dl class="project-card-evidence">
        <div><dt>Problem</dt><dd>${escapeHtml(project.problem)}</dd></div>
        <div><dt>Evidence</dt><dd>${escapeHtml(project.evidence || "Project files and analysis outputs")}</dd></div>
        <div><dt>Result</dt><dd>${escapeHtml(project.result || "Insight-ready analytical output")}</dd></div>
      </dl>
      <div class="project-meta">
        ${project.tools.map((tool) => `<span>${escapeHtml(tool)}</span>`).join("")}
      </div>
      <div class="project-footer">
        <strong>${escapeHtml(project.impact)}% impact</strong>
        <span class="status ${project.status === "Ready" ? "good" : "warn"}">${escapeHtml(project.status)}</span>
      </div>
      ${(project.link || project.folder) ? `<div class="project-links">
        ${project.link ? `<a class="open-project" href="${escapeHtml(project.link)}" target="_blank" rel="noopener noreferrer">Open GitHub</a>` : ""}
        ${project.folder ? `<a href="${escapeHtml(project.folder)}">Folder Guide</a>` : ""}
      </div>` : ""}
    </article>
  `).join("");
}

function exportReport(type) {
  const report = {
    title: "Personal Project Portfolio Report",
    headers: ["Project", "Focus", "Problem", "Tools", "Impact", "Status"],
    rows: getFilteredProjects().map((project) => [
      project.name,
      project.focus,
      project.problem,
      project.tools.join(", "),
      `${project.impact}%`,
      project.status
    ])
  };

  if (type === "csv") downloadFile("portfolio-project-report.csv", toCsv(report), "text/csv;charset=utf-8;");
  if (type === "excel") downloadFile("portfolio-project-report.xls", toExcelHtml(report), "application/vnd.ms-excel");
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
      <h1>${escapeHtml(report.title)}</h1>
      <table border="1">
        <thead><tr>${report.headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead>
        <tbody>${report.rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
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
  if (!printWindow) {
    alert("Pop-up blocked. Please allow pop-ups for this site to export as PDF.");
    return;
  }
  printWindow.document.write(`
    <html>
      <head>
        <title>${escapeHtml(report.title)}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 28px; color: #17211c; }
          h1 { text-transform: uppercase; font-size: 24px; }
          table { width: 100%; border-collapse: collapse; margin-top: 18px; }
          th, td { border: 1px solid #dbe3dd; padding: 10px; text-align: left; }
          th { background: #f2f5f2; }
        </style>
      </head>
      <body>
        <h1>${escapeHtml(report.title)}</h1>
        <p>Generated from the personal portfolio dashboard.</p>
        <table>
          <thead><tr>${report.headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead>
          <tbody>${report.rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
        </table>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
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
    ctx.fillStyle = raw < 0 ? chartColors.loss : (options.color || chartColors.primary);
    ctx.fillRect(x, y, barWidth, barHeight);
    ctx.fillStyle = chartColors.text;
    ctx.font = "700 11px Inter, Arial";
    ctx.fillText(row.label, x - 4, height - 18);
    ctx.fillText(raw.toFixed(3), x, y - 8);
  });
}

function money(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function renderDashboard() {
  if (!document.getElementById("financeTrendChart") && !document.getElementById("lossChart")) return;
  const labels = financeData.monthly.map((r) => r.label);

  drawLineChart("financeTrendChart", labels, [
    { name: "Revenue", color: chartColors.revenue, values: financeData.monthly.map((r) => r.revenue) },
    { name: "Cost",    color: chartColors.secondary, values: financeData.monthly.map((r) => r.cost) },
    { name: "Profit",  color: chartColors.primary,  values: financeData.monthly.map((r) => r.profit) }
  ]);

  drawLineChart("debtChart", labels, [
    { name: "Debt", color: "#7c3aed", values: financeData.monthly.map((r) => r.debt) },
    { name: "Loss", color: chartColors.loss, values: financeData.monthly.map((r) => r.loss) }
  ]);

  drawBarChart("lossChart", labels, financeData.monthly.map((r) => r.loss), chartColors.loss);

  const detailTable = document.querySelector("#financialDetailTable");
  if (detailTable) {
    detailTable.innerHTML = financeData.monthly.map((row) => {
      const margin = row.revenue ? (row.profit / row.revenue) * 100 : 0;
      return `<tr>
        <td>${escapeHtml(row.label)}</td>
        <td>${escapeHtml(money(row.revenue))}</td>
        <td>${escapeHtml(money(row.cost))}</td>
        <td>${escapeHtml(money(row.profit))}</td>
        <td>${escapeHtml(money(row.loss))}</td>
        <td>${escapeHtml(money(row.debt))}</td>
        <td>${margin.toFixed(1)}%</td>
      </tr>`;
    }).join("");
  }
}

function renderCorporateProjectResults() {
  if (!document.getElementById("corporateModelChart")) return;
  const rf = corporateProjectResults.models[1];
  animateNumber("corpRows", corporateProjectResults.cleanRows);
  animateNumber("corpEntities", corporateProjectResults.entities);
  animateNumber("corpBestR2", rf.r2, { decimals: 3 });
  animateNumber("corpBestRmse", rf.rmse, { decimals: 3 });
  setText("corpBestParams", corporateProjectResults.bestParams);
  drawComparisonChart("corporateModelChart", corporateProjectResults.models, "r2", { color: chartColors.primary });
  drawComparisonChart("corporateCorrelationChart", corporateProjectResults.correlations, "value", { color: chartColors.secondary });
}

function shortName(value) {
  return value.split(" ").slice(0, 2).join(" ");
}

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function initMotion() {
  const sections = document.querySelectorAll(".reveal-on-scroll");
  if (!sections.length) return;

  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reducedMotion || !("IntersectionObserver" in window)) {
    sections.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  sections.forEach((el) => observer.observe(el));
}

function initSkillBars() {
  const bars = document.querySelectorAll(".skill-fill[data-pct]");
  if (!bars.length) return;

  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reducedMotion || !("IntersectionObserver" in window)) {
    bars.forEach((bar) => { bar.style.width = `${bar.dataset.pct}%`; });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.style.width = `${entry.target.dataset.pct}%`;
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.25 });

  bars.forEach((bar) => observer.observe(bar));
}

function renderPage() {
  const projects = getFilteredProjects();
  renderKpis(projects);
  renderCharts(projects);
  renderTables(projects);
  renderProjectCards(projects);
  renderCorporateProjectResults();
  renderDashboard();
}

window.addEventListener("resize", debounce(renderPage, 150));

bindControls();
initMotion();
initSkillBars();
renderPage();


