/* ==========================================================================
   DOCI PERFUME - ADMIN DASHBOARD LOGIC
   Revenue filters, statistical calculation & Chart.js rendering
   ========================================================================== */

let revenueChartInstance = null;

function handleTimeFilterChange() {
  const select = document.getElementById("revenue-time-filter");
  const customInputs = document.getElementById("custom-date-inputs");
  if (select && customInputs) {
    if (select.value === "custom") {
      customInputs.classList.remove("hidden");
    } else {
      customInputs.classList.add("hidden");
    }
  }
  calculateRevenueStats();
}

function calculateRevenueStats() {
  const filterSelect = document.getElementById("revenue-time-filter");
  const select = filterSelect ? filterSelect.value : "month";
  const now = new Date();
  let startDate = null;
  let endDate = now;

  if (select === "today") {
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  } else if (select === "week") {
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    startDate = new Date(now.setDate(diff));
    startDate.setHours(0, 0, 0, 0);
  } else if (select === "month") {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  } else if (select === "quarter") {
    const currentQuarterMonth = Math.floor(now.getMonth() / 3) * 3;
    startDate = new Date(now.getFullYear(), currentQuarterMonth, 1);
  } else if (select === "year") {
    startDate = new Date(now.getFullYear(), 0, 1);
  } else if (select === "custom") {
    const startStr = document.getElementById("revenue-start-date") ? document.getElementById("revenue-start-date").value : "";
    const endStr = document.getElementById("revenue-end-date") ? document.getElementById("revenue-end-date").value : "";
    if (startStr) startDate = new Date(startStr);
    if (endStr) endDate = new Date(endStr + "T23:59:59");
  }

  const filtered = orders.filter(o => {
    const oDate = new Date(o.date);
    return (!startDate || oDate >= startDate) && oDate <= endDate;
  });

  let confirmedRev = 0;
  let pendingRev = 0;
  let cancelledRev = 0;

  filtered.forEach(o => {
    if (o.status === "confirmed") {
      confirmedRev += parseFloat(o.totalPrice) || 0;
    } else if (o.status === "pending") {
      pendingRev += parseFloat(o.totalPrice) || 0;
    } else if (o.status === "cancelled") {
      cancelledRev += parseFloat(o.totalPrice) || 0;
    }
  });

  const revConEl = document.getElementById("stat-revenue-confirmed");
  const revPenEl = document.getElementById("stat-revenue-pending");
  const revCanEl = document.getElementById("stat-revenue-cancelled");

  if (revConEl) revConEl.innerText = formatPrice(confirmedRev);
  if (revPenEl) revPenEl.innerText = formatPrice(pendingRev);
  if (revCanEl) revCanEl.innerText = formatPrice(cancelledRev);

  calculateComparisonStats();
  updateRevenueChart(filtered, select, startDate, endDate);
}

function calculateComparisonStats() {
  const now = new Date();
  
  const startThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endThisMonth = new Date();
  const thisMonthRevenue = orders
    .filter(o => o.status === "confirmed" && new Date(o.date) >= startThisMonth && new Date(o.date) <= endThisMonth)
    .reduce((sum, o) => sum + (parseFloat(o.totalPrice) || 0), 0);

  const startLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
  const lastMonthRevenue = orders
    .filter(o => o.status === "confirmed" && new Date(o.date) >= startLastMonth && new Date(o.date) <= endLastMonth)
    .reduce((sum, o) => sum + (parseFloat(o.totalPrice) || 0), 0);

  const compareEl = document.getElementById("stat-revenue-compare");
  const compareDesc = document.getElementById("stat-revenue-compare-desc");
  if (!compareEl || !compareDesc) return;

  if (lastMonthRevenue === 0) {
    if (thisMonthRevenue === 0) {
      compareEl.innerText = "0%";
      compareEl.className = "text-2xl font-bold text-gray-400";
      compareDesc.innerText = "No revenue recorded last month";
    } else {
      compareEl.innerText = "+100%";
      compareEl.className = "text-2xl font-bold text-green-500";
      compareDesc.innerHTML = `<span class="text-green-500"><i class="fa-solid fa-arrow-trend-up"></i> Increase</span> compared to last month (${formatPrice(lastMonthRevenue)})`;
    }
  } else {
    const diffPct = ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;
    const formattedPct = (diffPct > 0 ? "+" : "") + diffPct.toFixed(1) + "%";
    
    if (diffPct > 0) {
      compareEl.innerText = formattedPct;
      compareEl.className = "text-2xl font-bold text-green-500";
      compareDesc.innerHTML = `<span class="text-green-500"><i class="fa-solid fa-arrow-trend-up"></i> Increase</span> compared to last month (${formatPrice(lastMonthRevenue)})`;
    } else if (diffPct < 0) {
      compareEl.innerText = formattedPct;
      compareEl.className = "text-2xl font-bold text-red-500";
      compareDesc.innerHTML = `<span class="text-red-500"><i class="fa-solid fa-arrow-trend-down"></i> Decrease</span> compared to last month (${formatPrice(lastMonthRevenue)})`;
    } else {
      compareEl.innerText = "0%";
      compareEl.className = "text-2xl font-bold text-gray-400";
      compareDesc.innerText = "Equal to last month revenue";
    }
  }
}

function updateRevenueChart(filteredOrders, filterType, startDate, endDate) {
  const canvas = document.getElementById("revenue-chart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  
  if (revenueChartInstance) {
    revenueChartInstance.destroy();
  }

  let labels = [];
  let dataValues = [];

  const confirmedOrders = filteredOrders.filter(o => o.status === "confirmed");

  if (filterType === "today") {
    labels = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"];
    dataValues = Array(labels.length).fill(0);
    confirmedOrders.forEach(o => {
      const hour = new Date(o.date).getHours();
      const labelIdx = Math.min(Math.floor(hour / 4), labels.length - 1);
      dataValues[labelIdx] += parseFloat(o.totalPrice) || 0;
    });
  } else if (filterType === "week" || filterType === "month" || filterType === "custom") {
    const dayMap = {};
    let current = new Date(startDate || new Date().setDate(new Date().getDate() - 30));
    const end = new Date(endDate || new Date());
    
    while (current <= end) {
      const dateStr = current.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
      dayMap[dateStr] = 0;
      current.setDate(current.getDate() + 1);
    }

    confirmedOrders.forEach(o => {
      const dateStr = new Date(o.date).toLocaleDateString("en-US", { month: "short", day: "2-digit" });
      if (dayMap[dateStr] !== undefined) {
        dayMap[dateStr] += parseFloat(o.totalPrice) || 0;
      }
    });

    labels = Object.keys(dayMap);
    dataValues = Object.values(dayMap);
  } else if (filterType === "quarter" || filterType === "year") {
    labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if (filterType === "quarter") {
      const now = new Date();
      const q = Math.floor(now.getMonth() / 3);
      labels = labels.slice(q * 3, (q + 1) * 3);
    }
    
    dataValues = Array(labels.length).fill(0);
    const startMonthIdx = filterType === "quarter" ? Math.floor(new Date().getMonth() / 3) * 3 : 0;

    confirmedOrders.forEach(o => {
      const oDate = new Date(o.date);
      const monthIdx = oDate.getMonth();
      if (filterType === "year" || (monthIdx >= startMonthIdx && monthIdx < startMonthIdx + 3)) {
        const idx = filterType === "year" ? monthIdx : (monthIdx - startMonthIdx);
        dataValues[idx] += parseFloat(o.totalPrice) || 0;
      }
    });
  }

  const gradient = ctx.createLinearGradient(0, 0, 0, 320);
  gradient.addColorStop(0, "rgba(212, 175, 55, 0.4)");
  gradient.addColorStop(1, "rgba(212, 175, 55, 0.0)");

  revenueChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Revenue (VND)",
        data: dataValues,
        borderColor: "#D4AF37",
        borderWidth: 2.5,
        backgroundColor: gradient,
        fill: true,
        tension: 0.35,
        pointBackgroundColor: "#D4AF37",
        pointBorderColor: "#111111",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "rgba(17, 17, 17, 0.9)",
          titleFont: { family: "Montserrat", size: 12 },
          bodyFont: { family: "Montserrat", size: 12 },
          borderColor: "rgba(212, 175, 55, 0.3)",
          borderWidth: 1,
          callbacks: {
            label: function(context) {
              return " Revenue: " + formatPrice(context.parsed.y);
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: "rgba(255, 255, 255, 0.05)" },
          ticks: { color: "#a0a0a0", font: { family: "Montserrat", size: 9 } }
        },
        y: {
          grid: { color: "rgba(255, 255, 255, 0.05)" },
          ticks: {
            color: "#a0a0a0",
            font: { family: "Montserrat", size: 9 },
            callback: function(value) {
              if (value >= 1000000) return (value / 1000000) + "M";
              if (value >= 1000) return (value / 1000) + "k";
              return value;
            }
          }
        }
      }
    }
  });
}
