/* ==========================================================================
   ANUP SHARMA - APPLE / LINEAR / VERCEL PORTFOLIO ENGINE
   ========================================================================== */

// --------------------------------------------------------------------------
// 1. PRELOADER & SCROLL PROGRESS BAR
// --------------------------------------------------------------------------
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
    }, 600);
  }
});

window.addEventListener('scroll', () => {
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  if (scrollProgressBar) {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgressBar.style.width = `${progress}%`;
  }
});

// --------------------------------------------------------------------------
// 2. CUSTOM TRAILING CURSOR (DESKTOP ONLY)
// --------------------------------------------------------------------------
const cursor = document.getElementById('customCursor');
const cursorDot = document.getElementById('customCursorDot');

if (window.innerWidth > 767 && cursor && cursorDot) {
  window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
    
    cursor.animate({
      left: `${e.clientX}px`,
      top: `${e.clientY}px`
    }, { duration: 400, fill: 'forwards' });
  });

  document.querySelectorAll('a, button, .glass-card, .btn').forEach(interactiveEl => {
    interactiveEl.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.6)';
      cursor.style.borderColor = 'var(--accent-secondary)';
    });
    interactiveEl.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.borderColor = 'var(--accent-primary)';
    });
  });
}

// --------------------------------------------------------------------------
// 3. DUAL THEME TOGGLE ENGINE (DARK / LIGHT)
// --------------------------------------------------------------------------
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');
const currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
  if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
      showToast("Switched to Light Theme", "info");
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
      showToast("Switched to Dark Theme", "info");
    }
  });
}

// --------------------------------------------------------------------------
// 4. INTERACTIVE HERO PARTICLE CANVAS
// --------------------------------------------------------------------------
const canvas = document.getElementById('hero-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  
  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.speedY = (Math.random() - 0.5) * 0.6;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      ctx.fillStyle = isLight ? 'rgba(79, 70, 229, 0.25)' : 'rgba(99, 102, 241, 0.4)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < 45; i++) {
    particles.push(new Particle());
  }

  function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateCanvas);
  }
  animateCanvas();
}

// --------------------------------------------------------------------------
// 5. ANIMATED STATISTICS COUNTER
// --------------------------------------------------------------------------
const counterElements = document.querySelectorAll('.counter-val');
let animatedCounters = false;

function startCounters() {
  counterElements.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText.replace(',', '');
    const increment = target / 60;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment).toLocaleString();
      setTimeout(startCounters, 25);
    } else {
      counter.innerText = target.toLocaleString() + (target > 100 ? "+" : "");
    }
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !animatedCounters) {
      startCounters();
      animatedCounters = true;
    }
  });
}, { threshold: 0.5 });

const statsRow = document.querySelector('.hero-stats-row');
if (statsRow) observer.observe(statsRow);

// --------------------------------------------------------------------------
// 6. PROJECTS DATABASE & CASE STUDY ENGINE
// --------------------------------------------------------------------------
const projectsDatabase = {
  1: {
    title: "Hospital Emergency Room Management Dashboard",
    category: "Microsoft Excel | Healthcare Analytics",
    overview: "A business intelligence dashboard created in Excel to track hospital emergency room patient throughput, wait times, department referral distributions, and satisfaction scores.",
    businessProblem: "Hospital administrators experienced long ER waiting queues (>50 mins) and lacked clear visibility into department referral bottlenecks during peak hours.",
    datasetOverview: "14,820 patient admission records. Columns include Patient ID, Age, Gender, Admission Date, Wait Time, Department Referred, and Satisfaction Rating.",
    toolsUsed: ["Microsoft Excel", "Power Query", "Pivot Tables", "Pivot Charts", "Dynamic Slicers"],
    workflow: [
      "Cleaned raw admission logs using Power Query.",
      "Calculated wait time buckets and triage priority tiers.",
      "Built Pivot Tables aggregating monthly patient volume.",
      "Designed dynamic dashboard layout with interactive filter slicers."
    ],
    insights: [
      "Monday mornings (8 AM - 11 AM) saw a 34% spike in ER arrivals.",
      "Orthopedics referrals experienced the longest average wait times (64 minutes).",
      "Patient satisfaction dropped significantly when wait times exceeded 45 minutes."
    ],
    outcome: "Identified shift scheduling adjustments that project a 24.5-minute reduction in peak ER wait times.",
    githubUrl: "https://github.com/AnupSharma7540"
  },
  2: {
    title: "Mobile Sales Dashboard",
    category: "Power BI | Sales Analytics",
    overview: "A Power BI dashboard created to monitor device sales, Month-to-Date (MTD) targets, Same Period Last Year (SPLY) metrics, and payment method breakdowns.",
    businessProblem: "Sales managers lacked real-time visibility into regional device sales performance and YoY comparison metrics.",
    datasetOverview: "45,000+ transaction rows covering device models, cities, payment channels, unit pricing, and ratings.",
    toolsUsed: ["Power BI", "Power Query", "DAX", "Data Modeling", "Time Intelligence"],
    workflow: [
      "Constructed Star Schema linking Sales Fact table with Customer and Product dimensions.",
      "Wrote DAX measures for MTD, SPLY, and YoY growth percentages.",
      "Created interactive city-wise sales heatmaps and drill-through pages."
    ],
    insights: [
      "Digital UPI payments accounted for 58% of overall revenue.",
      "Tier-2 cities showed a 28% YoY growth in mid-range smartphone purchases."
    ],
    outcome: "Provided executive visibility allowing sales teams to reallocate regional stock inventory ahead of demand cycles.",
    githubUrl: "https://github.com/AnupSharma7540"
  },
  3: {
    title: "Online Book Store Analysis",
    category: "MySQL | Database Analytics",
    overview: "Relational database setup and advanced SQL query suite analyzing bookstore inventory turnover, customer purchasing behavior, and revenue metrics.",
    businessProblem: "An online bookstore needed to identify top repeat customers, low-turnover inventory items, and category sales performance.",
    datasetOverview: "4 relational tables: Customers, Books, Orders, and Order_Items (20,000+ rows).",
    toolsUsed: ["MySQL Server 8.0", "SQL Joins", "CTEs", "Window Functions", "Index Optimization"],
    workflow: [
      "Designed 3NF database schema with foreign key constraints.",
      "Wrote multi-table JOIN queries and Common Table Expressions (CTEs).",
      "Applied Window Functions (DENSE_RANK, NTILE) for customer RFM segmentation."
    ],
    insights: [
      "Top 10% of repeat customers generated 46% of total bookstore revenue.",
      "Technology and Sci-Fi titles had the fastest inventory reorder velocity."
    ],
    outcome: "Optimized analytical query runtimes by 68% using SQL indexes and CTE structures.",
    githubUrl: "https://github.com/AnupSharma7540",
    sqlCodeSnippet: `-- SQL Query: Customer RFM Segmentation using CTEs & Window Functions
WITH CustomerPurchases AS (
    SELECT 
        c.customer_id,
        c.customer_name,
        COUNT(DISTINCT o.order_id) AS total_orders,
        SUM(oi.quantity * b.price) AS total_spent
    FROM customers c
    JOIN orders o ON c.customer_id = o.customer_id
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN books b ON oi.book_id = b.book_id
    GROUP BY c.customer_id, c.customer_name
),
CustomerRankings AS (
    SELECT 
        customer_id,
        customer_name,
        total_spent,
        DENSE_RANK() OVER (ORDER BY total_spent DESC) AS revenue_rank,
        NTILE(4) OVER (ORDER BY total_spent DESC) AS customer_quartile
    FROM CustomerPurchases
)
SELECT 
    customer_id,
    customer_name,
    total_spent,
    revenue_rank,
    CASE 
        WHEN customer_quartile = 1 THEN 'VIP Customer'
        WHEN customer_quartile = 2 THEN 'High Value'
        ELSE 'Regular'
    END AS customer_segment
FROM CustomerRankings
WHERE revenue_rank <= 10;`
  },
  4: {
    title: "Customer Churn Analysis",
    category: "Python | Data Analytics Project",
    overview: "Python data project performing exploratory data analysis (EDA) to discover telecom subscriber churn patterns and key cancellation drivers.",
    businessProblem: "A telecom provider suffered a 26.5% customer churn rate without clear understanding of service dissatisfaction factors.",
    datasetOverview: "7,043 customer records containing contract tenure, monthly charges, payment methods, and churn status.",
    toolsUsed: ["Python 3.11", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter Notebook"],
    workflow: [
      "Cleaned missing values and converted categorical fields.",
      "Generated correlation heatmaps and boxplots comparing churned vs retained groups.",
      "Segmented risk levels by contract tenure and monthly charge tiers."
    ],
    insights: [
      "Month-to-month contract subscribers had a 42.7% churn rate.",
      "First-year subscribers accounted for 65% of overall customer attrition."
    ],
    outcome: "Identified key churn indicators and proposed targeted contract lock-in strategies.",
    githubUrl: "https://github.com/AnupSharma7540"
  },
  5: {
    title: "Sales Performance Dashboard",
    category: "Microsoft Excel | Sales BI",
    overview: "Interactive Excel sales dashboard evaluating revenue streams, product category margins, customer segments, and state-wise sales performance.",
    businessProblem: "Regional sales directors needed a single dashboard to analyze state product margins without manual spreadsheet merging.",
    datasetOverview: "10,000+ transaction records including order dates, product categories, state locations, and profits.",
    toolsUsed: ["Microsoft Excel", "Pivot Tables", "Pivot Charts", "Slicers"],
    workflow: [
      "Created calculated fields for net profit margins.",
      "Built Pivot Tables aggregating regional sales by state.",
      "Designed dynamic layout with interactive slicers."
    ],
    insights: [
      "Technology products yielded the highest profit margin (24.8%).",
      "Top 3 states (California, New York, Texas) generated 48% of gross sales."
    ],
    outcome: "Reduced monthly sales reporting compilation time from 6 hours to automated single-click refreshes.",
    githubUrl: "https://github.com/AnupSharma7540"
  }
};

function openCaseStudyModal(id) {
  const proj = projectsDatabase[id];
  if (!proj) return;

  const modalBody = document.getElementById('caseStudyModalBody');
  if (!modalBody) return;

  let sqlBox = '';
  if (proj.sqlCodeSnippet) {
    sqlBox = `
      <div style="margin-top: 1.5rem;">
        <h4 style="font-size: 1rem; margin-bottom: 0.5rem; color: var(--accent-primary);">Featured SQL Query</h4>
        <div class="sql-code-box">${highlightSql(proj.sqlCodeSnippet)}</div>
      </div>
    `;
  }

  modalBody.innerHTML = `
    <div class="badge" style="font-size: 0.725rem; margin-bottom: 0.5rem;">${proj.category}</div>
    <h2 style="font-size: 1.85rem; margin-bottom: 1.25rem;">${proj.title}</h2>
    
    <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-secondary); margin-bottom: 1.5rem;">
      ${proj.overview}
    </p>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem; margin-bottom: 1.5rem;">
      <div style="background: var(--bg-canvas); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
        <h4 style="font-size: 0.95rem; color: var(--accent-primary); margin-bottom: 0.4rem;">Business Problem</h4>
        <p style="font-size: 0.875rem; color: var(--text-secondary);">${proj.businessProblem}</p>
      </div>

      <div style="background: var(--bg-canvas); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
        <h4 style="font-size: 0.95rem; color: var(--accent-secondary); margin-bottom: 0.4rem;">Dataset Overview</h4>
        <p style="font-size: 0.875rem; color: var(--text-secondary);">${proj.datasetOverview}</p>
      </div>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <h4 style="font-size: 1rem; margin-bottom: 0.5rem;">Tools & Technologies</h4>
      <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
        ${proj.toolsUsed.map(t => `<span class="skill-pill" style="font-size: 0.775rem;">${t}</span>`).join('')}
      </div>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <h4 style="font-size: 1rem; margin-bottom: 0.5rem;">Key Business Insights</h4>
      <ul style="padding-left: 1.25rem; font-size: 0.9rem; color: var(--text-secondary);">
        ${proj.insights.map(i => `<li style="margin-bottom: 0.3rem;">${i}</li>`).join('')}
      </ul>
    </div>

    ${sqlBox}

    <div style="margin-top: 2rem; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
      <a href="${proj.githubUrl}" target="_blank" class="btn btn-secondary btn-sm"><i class="fa-brands fa-github"></i> View GitHub Repo</a>
      <button class="btn btn-primary btn-sm" onclick="closeModal('caseStudyModal')">Close Case Study</button>
    </div>
  `;

  openModal('caseStudyModal');
}

function highlightSql(code) {
  return code
    .replace(/\b(WITH|SELECT|FROM|JOIN|ON|WHERE|GROUP BY|HAVING|ORDER BY|OVER|CASE|WHEN|THEN|ELSE|END|AS|DESC|ASC|LIMIT)\b/g, '<span class="sql-keyword">$1</span>')
    .replace(/\b(COUNT|SUM|AVG|MAX|MIN|DENSE_RANK|NTILE)\b/g, '<span class="sql-function">$1</span>')
    .replace(/'([^']*)'/g, '<span class="sql-string">\'$1\'</span>')
    .replace(/-- (.*)/g, '<span class="sql-comment">-- $1</span>');
}

// --------------------------------------------------------------------------
// 7. MODAL CONTROLS & UTILITIES
// --------------------------------------------------------------------------
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-backdrop')) {
    closeModal(e.target.id);
  }
});
function openCertModal(title, issuer, image) {
  document.getElementById('certModalTitle').textContent = title;
  document.getElementById('certModalIssuer').textContent = issuer;
  document.getElementById('certImage').src = image;
  openModal('certModal');
}

/*function openCertModal(title, issuer) {
  document.getElementById('certModalTitle').textContent = title;
  document.getElementById('certModalIssuer').textContent = issuer;
  document.getElementById("certImage").src = image;
  openModal('certModal');
}*/

function openResumeModal() {
  openModal('resumeModal');
}

function downloadResumePDF() {
  showToast("Downloading Anup Sharma's Resume PDF...", "info");
  const link = document.createElement('a');
  link.href = 'assets/Resume (Anup Sharma).pdf';
  link.download = 'Resume (Anup Sharma).pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// --------------------------------------------------------------------------
// 8. CONTACT FORM & TOAST SYSTEM
// --------------------------------------------------------------------------
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  showToast(`Thank you, ${name}! Your message has been sent.`, "success");
  e.target.reset();
}

function showToast(msg, type = "success") {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  let icon = '<i class="fa-solid fa-circle-check" style="color: var(--accent-teal);"></i>';
  if (type === "info") icon = '<i class="fa-solid fa-circle-info" style="color: var(--accent-secondary);"></i>';

  toast.innerHTML = `${icon} <span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      if (navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
      } else {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = 'var(--bg-card)';
        navMenu.style.padding = '1.5rem';
        navMenu.style.borderBottom = '1px solid var(--border-card)';
      }
    });
  }
});
