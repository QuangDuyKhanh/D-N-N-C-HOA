/* ==========================================================================
   DOCI PERFUME - ADMIN CORE LOGIC
   General configuration, Authentication, WebSocket Realtime, Audio & Toast
   ========================================================================== */

let orders = [];
let currentFilter = "all";
let isSoundEnabled = true;
let audioCtx = null;
let knownOrderIds = new Set();
let firstLoad = true;
let orderSearchQuery = "";

// Contact Messages Setup
let contacts = [];
let currentContactFilter = "all";
let knownContactIds = new Set();
let firstContactLoad = true;
let activeSection = "orders"; // "orders", "contacts", "dashboard"

// Real-time WebSocket variables
let socket = null;

function initRealtime() {
  if (socket) return;
  const CLOUD_CHANNEL = "doci_perfume_orders_v1";
  socket = new WebSocket(`wss://free.piesocket.com/v3/${CLOUD_CHANNEL}?api_key=VCXCEGXvSTmN5ePpHgxt5QELTQA2cwyyhCqQCXqH&notify_self`);
  
  socket.onopen = () => {
    console.log("⚡ Real-time WebSocket connected!");
  };
  
  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.event === 'new_order') {
        console.log("🔔 New order received via WebSocket:", data);
        playChime();
        showToast(`🔔 NEW ORDER PLACED (ID: ${data.orderId})!`, "success", 8000);
        if (typeof refreshOrders === "function") refreshOrders();
      } else if (data.event === 'payment_received' || data.event === 'sepay_payment') {
        console.log("💰 SePay Payment received via WebSocket:", data);
        playChime();
        showToast(`💰 CUSTOMER SEPAY TRANSFER RECEIVED (ID: ${data.orderId || 'DH'}, Amount: ${formatPrice(data.amount || 0)})!`, "success", 10000);
        if (typeof refreshOrders === "function") refreshOrders();
      }
    } catch (e) {
      console.error("WebSocket message parsing error:", e);
    }
  };

  socket.onclose = () => {
    console.log("WebSocket disconnected, reconnecting in 5s...");
    socket = null;
    setTimeout(initRealtime, 5000);
  };
}

// Authentication & Security
function checkAuth() {
  const isLoggedIn = localStorage.getItem("doci_admin_logged_in") === "true";
  const loginContainer = document.getElementById("login-container");
  const dashboardContent = document.getElementById("dashboard-content");

  if (isLoggedIn) {
    if (loginContainer) loginContainer.classList.add("hidden");
    if (dashboardContent) dashboardContent.classList.remove("hidden");
    
    checkAudioConsent();
    
    if (typeof refreshOrders === "function") refreshOrders();
    if (typeof refreshContacts === "function") refreshContacts();
    if (typeof refreshProducts === "function") refreshProducts();
    
    initRealtime();
    
    if (!window.orderInterval) {
      window.orderInterval = setInterval(() => {
        if (typeof refreshOrders === "function") refreshOrders(false);
        if (typeof refreshContacts === "function") refreshContacts(false);
        if (typeof refreshProducts === "function") refreshProducts(false);
      }, 5000);
    }
  } else {
    if (loginContainer) loginContainer.classList.remove("hidden");
    if (dashboardContent) dashboardContent.classList.add("hidden");
    if (window.orderInterval) {
      clearInterval(window.orderInterval);
      window.orderInterval = null;
    }
    if (socket) {
      socket.close();
      socket = null;
    }
  }
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  if (email === "quangkhanh515@gmail.com" && password === "Khanh@99") {
    localStorage.setItem("doci_admin_logged_in", "true");
    showToast("Signed in successfully!", "success");
    checkAuth();
  } else {
    showToast("Incorrect email or password!", "error");
  }
}

function handleLogout() {
  if (confirm("Are you sure you want to sign out?")) {
    localStorage.removeItem("doci_admin_logged_in");
    showToast("Signed out!", "info");
    checkAuth();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  checkAuth();
});

function checkAudioConsent() {
  const consentBanner = document.getElementById("audio-consent-banner");
  if (!consentBanner) return;
  if (navigator.userActivation && navigator.userActivation.hasBeenActive) {
    consentBanner.classList.add("hidden");
  } else {
    consentBanner.classList.remove("hidden");
  }
}

function enableAudio() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const consentBanner = document.getElementById("audio-consent-banner");
  if (consentBanner) consentBanner.classList.add("hidden");
  playChime();
}

function toggleSound() {
  isSoundEnabled = !isSoundEnabled;
  const icon = document.getElementById("sound-icon");
  const btn = document.getElementById("sound-toggle-btn");
  if (isSoundEnabled) {
    if (icon) icon.className = "fa-solid fa-volume-high text-sm";
    if (btn) btn.classList.remove("border-red-500/30", "text-red-500");
    showToast("Notification audio TURNED ON", "success");
  } else {
    if (icon) icon.className = "fa-solid fa-volume-xmark text-sm";
    if (btn) btn.classList.add("border-red-500/30", "text-red-500");
    showToast("Notification audio TURNED OFF", "info");
  }
}

function playChime() {
  if (!isSoundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    const now = audioCtx.currentTime;
    
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.12, now + 0.05);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(now);
    osc1.stop(now + 0.4);
    
    setTimeout(() => {
      if (!audioCtx) return;
      const now2 = audioCtx.currentTime;
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, now2);
      gain2.gain.setValueAtTime(0, now2);
      gain2.gain.linearRampToValueAtTime(0.18, now2 + 0.05);
      gain2.gain.exponentialRampToValueAtTime(0.001, now2 + 0.55);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.start(now2);
      osc2.stop(now2 + 0.6);
    }, 90);
  } catch (e) {
    console.warn("Audio play error:", e);
  }
}

function switchSection(section) {
  activeSection = section;
  const ordersSec = document.getElementById("section-orders");
  const contactsSec = document.getElementById("section-contacts");
  const productsSec = document.getElementById("section-products");
  const dashboardSec = document.getElementById("section-dashboard");

  const ordersBtn = document.getElementById("nav-orders-btn");
  const contactsBtn = document.getElementById("nav-contacts-btn");
  const productsBtn = document.getElementById("nav-products-btn");
  const dashboardBtn = document.getElementById("nav-dashboard-btn");

  const sections = [ordersSec, contactsSec, productsSec, dashboardSec];
  const btns = [ordersBtn, contactsBtn, productsBtn, dashboardBtn];

  sections.forEach(s => s?.classList.add("hidden"));
  btns.forEach(b => {
    if (b) {
      b.classList.add("border-transparent", "text-gray-400");
      b.classList.remove("border-gold", "text-white");
    }
  });

  if (section === 'orders') {
    if (ordersSec) ordersSec.classList.remove("hidden");
    if (ordersBtn) {
      ordersBtn.classList.add("border-gold", "text-white");
      ordersBtn.classList.remove("border-transparent", "text-gray-400");
    }
    if (typeof refreshOrders === "function") refreshOrders();
  } else if (section === 'contacts') {
    if (contactsSec) contactsSec.classList.remove("hidden");
    if (contactsBtn) {
      contactsBtn.classList.add("border-gold", "text-white");
      contactsBtn.classList.remove("border-transparent", "text-gray-400");
    }
    if (typeof refreshContacts === "function") refreshContacts();
  } else if (section === 'products') {
    if (productsSec) productsSec.classList.remove("hidden");
    if (productsBtn) {
      productsBtn.classList.add("border-gold", "text-white");
      productsBtn.classList.remove("border-transparent", "text-gray-400");
    }
    if (typeof refreshProducts === "function") refreshProducts();
  } else if (section === 'dashboard') {
    if (dashboardSec) dashboardSec.classList.remove("hidden");
    if (dashboardBtn) {
      dashboardBtn.classList.add("border-gold", "text-white");
      dashboardBtn.classList.remove("border-transparent", "text-gray-400");
    }
    if (typeof calculateRevenueStats === "function") calculateRevenueStats();
  }
}

function formatPrice(val) {
  return new Intl.NumberFormat("en-US", {
    style: "decimal"
  }).format(val) + " VND";
}

function showToast(message, type = "info", duration = 3000) {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  
  let bgStyle = "bg-[#111111] border-white/10 text-white";
  if (type === "success") bgStyle = "bg-green-950/90 border-green-500/30 text-green-200";
  if (type === "error") bgStyle = "bg-red-950/90 border-red-500/30 text-red-200";
  
  toast.className = `pointer-events-auto border rounded-lg px-4 py-3 shadow-2xl flex items-center gap-3 transition-all duration-300 transform translate-y-2 opacity-0 ${bgStyle}`;
  toast.innerHTML = `
    <i class="fa-solid ${type === 'success' ? 'fa-circle-check text-green-400' : type === 'error' ? 'fa-triangle-exclamation text-red-400' : 'fa-circle-info text-gold'} text-sm"></i>
    <span class="text-xs font-medium">${message}</span>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.remove("translate-y-2", "opacity-0");
  }, 10);
  
  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
}
