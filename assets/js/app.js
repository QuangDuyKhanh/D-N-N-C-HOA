// DOCI Perfume - Premium Frontend Logic

// Cấu hình gửi thông báo đơn hàng mới qua Telegram Bot cho Admin
const TELEGRAM_CONFIG = {
  enabled: true,
  token: "7901768407:AAFnB_x6qR-sW4U5mR_yB-L3kP0j8lV9dZ0",
  chatId: "6171928373"
};

const API_BASE_URL = window.DOCI_API_BASE || 'backend';

document.addEventListener("DOMContentLoaded", () => {
  // --- KHỞI TẠO & TIỆN ÍCH CHUNG ---
  initPreloader();
  initLenis();
  initAOS();
  initGSAPParticles();
  initParallaxHero();
  initScrollEffects();
  initThemeToggle();
  initCountdown();
  initCounters();
  syncPerfumeRatings();
  initProductCollections();
  initQuiz();
  initCart();
  initProductDetailsModal();
  initFAQ();
  initWishlist();
  initContactForm();
  initHomepageReviews();
  initHomepageReviewForm();
  initSwipers();
  initMobileMenu();
  initAIChatbot();
  initScrollReveal();
});

// --- MÀN HÌNH CHỜ (PRELOADER) ---
function initPreloader() {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        preloader.classList.add("fade-out");
      }, 1000); // Đợi 1 giây để trải nghiệm logo mượt
    });
    // Fallback nếu sự kiện load chạy trước hoặc bị trễ
    setTimeout(() => {
      preloader.classList.add("fade-out");
    }, 2500);
  }
}

// --- CUỘN TRANG MƯỢT MÀ (LENIS SMOOTH SCROLL) ---
let lenis;
function initLenis() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// --- HIỆU ỨNG KHI CUỘN TRANG (AOS) ---
function initAOS() {
  AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
    offset: 50,
  });
}

// --- HIỆU ỨNG HẠT BỤI VÀNG (GSAP PARTICLES) ---
function initGSAPParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = canvas.offsetWidth);
  let height = (canvas.height = canvas.offsetHeight);

  const particles = [];
  const particleCount = 30; // Giảm số hạt xuống 30 để tạo cảm giác tinh tế, sang trọng

  window.addEventListener("resize", () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  });

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 50;
      this.size = Math.random() * 1.5 + 0.5; // Kích thước hạt nhỏ mịn như bụi vàng
      this.speedY = -(Math.random() * 0.25 + 0.08); // Bay cực kỳ chậm
      this.speedX = Math.random() * 0.2 - 0.1;
      this.alpha = Math.random() * 0.4 + 0.1; // Độ mờ thấp hơn
      this.wobble = Math.random() * 10;
      this.wobbleSpeed = Math.random() * 0.01 + 0.005;
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.wobble) * 0.15;
      this.wobble += this.wobbleSpeed;

      if (this.y < height * 0.2) {
        this.alpha -= 0.003;
      }

      if (this.y < 0 || this.alpha <= 0) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 55, ${this.alpha})`;
      ctx.shadowBlur = this.size * 1.5;
      ctx.shadowColor = "#D4AF37";
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
    particles[i].y = Math.random() * height;
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particleCount; i++) {
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(animate);
  }

  animate();
}

// --- HIỆU ỨNG SONG SONG & DI CHUYỂN CHUỘT (PARALLAX HERO) ---
function initParallaxHero() {
  const hero = document.getElementById("hero-section");
  const card3d = document.querySelector(".hero-3d-card");

  if (!hero || !card3d) return;

  // Cấu hình chiều sâu perspective để tạo hiệu ứng 3D chân thật
  hero.style.perspective = "1200px";
  card3d.style.transformStyle = "preserve-3d";

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Xoay 3D nghiêng theo chuột mượt mà và dịch chuyển nhẹ tạo parallax sâu
    gsap.to(card3d, {
      rotateY: x * 0.04,  // Xoay quanh trục Y khi chuột di chuyển theo chiều X
      rotateX: -y * 0.04, // Xoay quanh trục X khi chuột di chuyển theo chiều Y
      x: x * 0.015,
      y: y * 0.015,
      duration: 0.6,
      ease: "power2.out",
    });
  });

  hero.addEventListener("mouseleave", () => {
    gsap.to(card3d, {
      rotateY: 0,
      rotateX: 0,
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  });
}

// --- HIỆU ỨNG KHI CUỘN (NAVBAR, THANH TIẾN TRÌNH, NÚT CUỘN LÊN ĐẦU) ---
function initScrollEffects() {
  const header = document.querySelector("header");
  const scrollProgress = document.getElementById("scroll-progress");
  const backToTop = document.querySelector(".back-to-top");

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    // Navigation bar background change
    if (scrollPos > 50) {
      header.classList.add(
        "bg-[#111111]",
        "border-b",
        "border-[#D4AF37]/30",
        "py-3",
      );
      header.classList.remove("bg-transparent", "py-5");
      header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.4)";
    } else {
      header.classList.remove(
        "bg-[#111111]",
        "border-b",
        "border-[#D4AF37]/30",
        "py-3",
      );
      header.classList.add("bg-transparent", "py-5");
      header.style.boxShadow = "none";
    }

    // Scroll progress bar width
    if (scrollProgress && docHeight > 0) {
      const pct = (scrollPos / docHeight) * 100;
      scrollProgress.style.width = `${pct}%`;
    }

    // Back to top button visibility
    if (backToTop) {
      if (scrollPos > 400) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    }
  });

  // Click back to top
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      lenis.scrollTo(0, { duration: 1.2 });
    });
  }
}

// --- CHUYỂN ĐỔI CHẾ ĐỘ SÁNG / TỐI ---
function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  // Check localstorage
  const isLight = localStorage.getItem("theme") === "light";
  if (isLight) {
    document.body.classList.add("light-mode");
    toggleBtn.innerHTML = '<i class="fa-solid fa-moon text-lg"></i>';
  } else {
    toggleBtn.innerHTML = '<i class="fa-solid fa-sun text-lg"></i>';
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const lightActive = document.body.classList.contains("light-mode");

    if (lightActive) {
      localStorage.setItem("theme", "light");
      toggleBtn.innerHTML = '<i class="fa-solid fa-moon text-lg"></i>';
    } else {
      localStorage.setItem("theme", "dark");
      toggleBtn.innerHTML = '<i class="fa-solid fa-sun text-lg"></i>';
    }
  });
}

// --- BỘ ĐẾM NGƯỢC THỜI GIAN (FLASH SALE) ---
function initCountdown() {
  const hoursVal = document.getElementById("timer-hours");
  const minsVal = document.getElementById("timer-minutes");
  const secsVal = document.getElementById("timer-seconds");

  if (!hoursVal || !minsVal || !secsVal) return;

  // Đặt đếm ngược tới cuối ngày hôm nay
  function updateTimer() {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const diff = endOfDay - now;

    if (diff <= 0) {
      // Reset sang ngày hôm sau
      endOfDay.setDate(endOfDay.getDate() + 1);
    }

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    hoursVal.innerText = String(hours).padStart(2, "0");
    minsVal.innerText = String(minutes).padStart(2, "0");
    secsVal.innerText = String(seconds).padStart(2, "0");
  }

  setInterval(updateTimer, 1000);
  updateTimer();
}

// --- BỘ ĐẾM SỐ ANIME CHUYỂN ĐỘNG ---
function initCounters() {
  const counters = document.querySelectorAll(".counter-val");
  if (counters.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const targetVal = parseFloat(target.getAttribute("data-target"));
          const suffix = target.getAttribute("data-suffix") || "";
          const isDecimal = targetVal % 1 !== 0;

          let start = 0;
          const duration = 1500; // ms
          const steps = 60;
          const stepTime = duration / steps;
          const increment = targetVal / steps;

          let count = 0;
          const timer = setInterval(() => {
            count++;
            start += increment;
            if (count >= steps) {
              target.innerText =
                (isDecimal ? targetVal.toFixed(1) : Math.round(targetVal)) +
                suffix;
              clearInterval(timer);
            } else {
              target.innerText =
                (isDecimal ? start.toFixed(1) : Math.round(start)) + suffix;
            }
          }, stepTime);

          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((c) => observer.observe(c));
}

// --- TAB BỘ SƯU TẬP SẢN PHẨM & LOGIC LỌC ---
let activeGender = "women"; // Default women tab
let activeFilter = "All";

function initProductCollections() {
  const womenTab = document.getElementById("tab-women");
  const menTab = document.getElementById("tab-men");
  const filterContainer = document.getElementById("filter-container");

  if (!womenTab || !menTab || !filterContainer) return;

  // Tab Switch
  womenTab.addEventListener("click", () => {
    activeGender = "women";
    activeFilter = "All";
    womenTab.classList.add(
      "active",
      "text-gold",
      "border-b-2",
      "border-[#D4AF37]",
    );
    womenTab.classList.remove("text-gray-400");
    menTab.classList.remove(
      "active",
      "text-gold",
      "border-b-2",
      "border-[#D4AF37]",
    );
    menTab.classList.add("text-gray-400");
    renderFilters();
    renderProducts();
  });

  menTab.addEventListener("click", () => {
    activeGender = "men";
    activeFilter = "All";
    menTab.classList.add(
      "active",
      "text-gold",
      "border-b-2",
      "border-[#D4AF37]",
    );
    menTab.classList.remove("text-gray-400");
    womenTab.classList.remove(
      "active",
      "text-gold",
      "border-b-2",
      "border-[#D4AF37]",
    );
    womenTab.classList.add("text-gray-400");
    renderFilters();
    renderProducts();
  });

  renderFilters();
  renderProducts();
}

function renderFilters() {
  const filterContainer = document.getElementById("filter-container");
  if (!filterContainer) return;

  let categories = ["All"];
  if (activeGender === "men") {
    categories.push("Fresh & Crisp", "Luxurious", "Seductive", "Sensual");
  } else {
    categories.push("Elegant", "Seductive");
  }

  filterContainer.innerHTML = categories
    .map(
      (cat) => `
    <button class="filter-btn px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full border border-gold transition-all duration-300 ${activeFilter === cat ? "bg-[#D4AF37] text-[#111111]" : "bg-transparent text-gray-300 hover:border-[#D4AF37]"}" data-filter="${cat}">
      ${cat}
    </button>
  `,
    )
    .join("");

  const buttons = filterContainer.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.getAttribute("data-filter");
      buttons.forEach((b) => {
        b.classList.remove("bg-[#D4AF37]", "text-[#111111]");
        b.classList.add("bg-transparent", "text-gray-300");
      });
      btn.classList.remove("bg-transparent", "text-gray-300");
      btn.classList.add("bg-[#D4AF37]", "text-[#111111]");
      renderProducts();
    });
  });
}

function renderProducts() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  const allProducts = typeof window.getAppProducts === "function" ? window.getAppProducts() : perfumeData;
  let filtered = allProducts.filter((p) => p.gender === activeGender);
  if (activeFilter !== "All") {
    filtered = filtered.filter((p) => p.category === activeFilter);
  }

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="col-span-full text-center text-gray-400 py-10">No matching products found.</div>`;
    return;
  }

  grid.innerHTML = filtered
    .map((prod) => {
      const isOutOfStock = (parseInt(prod.stock) || 0) <= 0;
      const ribbon = isOutOfStock
        ? `<div class="ribbon-badge bg-red-600 font-bold">Out of Stock</div>`
        : prod.tag
        ? `<div class="ribbon-badge">${prod.tag}</div>`
        : "";
      const isWish = checkWishlist(prod.id) ? "active" : "";
      
      const buyBtnHtml = isOutOfStock
        ? `<button class="w-full btn-luxury text-center opacity-50 cursor-not-allowed bg-gray-700 hover:bg-gray-700 text-gray-400" disabled>OUT OF STOCK</button>`
        : `<button class="w-full btn-luxury text-center" onclick="addToCart('${prod.id}')">SHOP NOW</button>`;

      return `
      <div class="glass-card overflow-hidden group relative flex flex-col" data-aos="fade-up">
        ${ribbon}
        <button class="wishlist-btn absolute top-[15px] right-[15px] z-10 w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:text-red-500 hover:border-red-500/50 transition-all ${isWish}" data-id="${prod.id}">
          <i class="fa-regular fa-heart"></i>
        </button>
        
        <div class="product-img-wrapper cursor-pointer" onclick="openDetails('${prod.id}')">
          <img src="${prod.image}" alt="${prod.name}">
          
          <div class="product-hover-actions">
            <button class="w-10 h-10 rounded-full bg-[#D4AF37] text-[#111111] flex items-center justify-center hover:scale-110 transition-transform" onclick="event.stopPropagation(); openDetails('${prod.id}')" title="View Details">
              <i class="fa-solid fa-eye"></i>
            </button>
            ${!isOutOfStock ? `
            <button class="w-10 h-10 rounded-full bg-white text-[#111111] flex items-center justify-center hover:scale-110 transition-transform" onclick="event.stopPropagation(); addToCart('${prod.id}')" title="Add to Cart">
              <i class="fa-solid fa-shopping-bag"></i>
            </button>` : ''}
          </div>
        </div>
        
        <div class="glass-card-info">
          <div>
            <span class="text-[10px] text-[#D4AF37] font-semibold uppercase tracking-wider block mb-1">For ${prod.gender === "men" ? "Men" : "Women"} • ${prod.category}</span>
            <h3 class="font-title text-base font-semibold mb-1 group-hover:text-[#D4AF37] transition-colors cursor-pointer" onclick="openDetails('${prod.id}')">${prod.name}</h3>
            <p class="text-[11px] text-gray-400 italic mb-2 line-clamp-1">Inspired by: ${prod.inspiredBy}</p>
            
            <div class="flex flex-wrap gap-1.5 mb-3">
              <span class="product-spec-item"><i class="fa-solid fa-clock mr-1"></i>${prod.longevity}</span>
              <span class="product-spec-item"><i class="fa-solid fa-wind mr-1"></i>${prod.projection}</span>
            </div>
            
            <div class="flex items-center gap-1.5 mb-3">
              <div class="flex text-[#D4AF37] text-xs">
                ${'<i class="fa-solid fa-star"></i>'.repeat(Math.floor(prod.rating))}
                ${prod.rating % 1 !== 0 ? '<i class="fa-solid fa-star-half-stroke"></i>' : ""}
              </div>
              <span class="text-[11px] text-gray-500">(${prod.reviewsCount})</span>
            </div>
          </div>
          
          <div>
            <div class="flex items-baseline gap-2 mb-4">
              <span class="text-md font-bold text-[#D4AF37]">${formatPrice(prod.price)}</span>
              <span class="text-xs text-gray-500 line-through">${formatPrice(prod.originalPrice)}</span>
            </div>
            
            ${buyBtnHtml}
          </div>
        </div>
      </div>
    `;
    })
    .join("");

  attachWishlistEvents();
}

// --- LOGIC DANH SÁCH YÊU THÍCH ---
let wishlist = [];
function initWishlist() {
  const stored = localStorage.getItem("doci_wishlist");
  if (stored) {
    wishlist = JSON.parse(stored);
  }
}
function checkWishlist(id) {
  return wishlist.includes(id);
}
function toggleWishlist(id, btn) {
  const idx = wishlist.indexOf(id);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    btn.classList.remove("active");
    btn.querySelector("i").className = "fa-regular fa-heart";
    showNotification("Removed from wishlist");
  } else {
    wishlist.push(id);
    btn.classList.add("active");
    btn.querySelector("i").className = "fa-solid fa-heart";
    showNotification("Added to wishlist", "success");
  }
  localStorage.setItem("doci_wishlist", JSON.stringify(wishlist));
}
function attachWishlistEvents() {
  document.querySelectorAll(".wishlist-btn").forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-id");
      toggleWishlist(id, btn);
    };
  });
}

// --- HỆ THỐNG GIỎ HÀNG TƯƠNG TÁC & MÃ GIẢM GIÁ ---
let cart = [];
let appliedCoupon = null;

const VALID_COUPONS = {
  "DOCI10": { type: "percent", value: 10, label: "10% Off" },
  "DOCIVIP": { type: "fixed", value: 50000, label: "50,000 VND Off" },
  "FREESHIP": { type: "fixed", value: 0, label: "Free Shipping" }
};

function initCart() {
  const stored = localStorage.getItem("doci_cart");
  if (stored) {
    cart = JSON.parse(stored);
    updateCartCount();
  }

  const cartToggle = document.getElementById("cart-toggle");
  const closeCart = document.getElementById("close-cart");
  const cartDrawer = document.getElementById("cart-drawer");
  const cartOverlay = document.getElementById("cart-overlay");

  if (cartToggle && cartDrawer && cartOverlay) {
    cartToggle.addEventListener("click", () => openCart());
    closeCart.addEventListener("click", () => closeCartPanel());
    cartOverlay.addEventListener("click", () => closeCartPanel());
  }

  const applyCouponBtn = document.getElementById("apply-coupon-btn");
  const couponInput = document.getElementById("coupon-input");
  const couponMsg = document.getElementById("coupon-message");

  if (applyCouponBtn && couponInput) {
    applyCouponBtn.addEventListener("click", () => {
      const code = couponInput.value.trim().toUpperCase();
      if (!code) {
        showCouponMessage("Please enter a promo code!", "error");
        return;
      }

      if (VALID_COUPONS[code]) {
        appliedCoupon = { code, ...VALID_COUPONS[code] };
        showCouponMessage(`Successfully applied code ${code} (${appliedCoupon.label})!`, "success");
        renderCartItems();
      } else {
        showCouponMessage("Invalid or expired promo code!", "error");
      }
    });
  }

  // Simulated checkout event
  const checkoutBtn = document.getElementById("checkout-btn");
  const checkoutFormModal = document.getElementById("checkout-modal");
  const closeCheckout = document.getElementById("close-checkout");
  const orderForm = document.getElementById("order-form");

  if (checkoutBtn && checkoutFormModal && closeCheckout && orderForm) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        showNotification("Your cart is empty!", "error");
        return;
      }
      closeCartPanel();
      
      window.currentCheckoutOrderId = "DH" + Math.floor(100000 + Math.random() * 900000);
      
      const paymentSelect = document.getElementById("payment-method-select");
      if (paymentSelect) paymentSelect.value = "cod";
      togglePaymentMethod("cod");
      
      const subtotal = cart.reduce((sum, item) => sum + (perfumeData.find(p => p.id === item.id)?.price || 0) * item.quantity, 0);
      let finalAmount = subtotal;
      if (appliedCoupon) {
        if (appliedCoupon.type === "percent") {
          finalAmount = Math.max(0, subtotal - Math.round((subtotal * appliedCoupon.value) / 100));
        } else if (appliedCoupon.type === "fixed") {
          finalAmount = Math.max(0, subtotal - appliedCoupon.value);
        }
      }

      const amountEl = document.getElementById("payment-bank-amount");
      if (amountEl) {
        amountEl.innerHTML = `
          <span class="text-xs font-bold text-gold">${formatPrice(finalAmount)}</span>
          <button type="button" class="text-gold hover:text-white transition-colors p-1" onclick="copyToClipboard('${finalAmount}', 'Amount copied!')" title="Copy amount">
            <i class="fa-regular fa-copy text-[10px]"></i>
          </button>
        `;
      }
      
      const phoneInput = document.getElementById("order-phone");
      if (phoneInput) {
        phoneInput.oninput = () => {
          if (document.getElementById("payment-method-select")?.value === "bank") {
            updateVietQRInfo();
          }
        };
      }
      
      if (lenis) lenis.stop();
      checkoutFormModal.classList.add("open");
      if (typeof autoFillCheckoutForm === "function") autoFillCheckoutForm();
    });

    closeCheckout.addEventListener("click", () => {
      stopPaymentPolling();
      checkoutFormModal.classList.remove("open");
      if (lenis) lenis.start();
    });

    checkoutFormModal.querySelector(".detail-modal-bg")?.addEventListener("click", () => {
      stopPaymentPolling();
      checkoutFormModal.classList.remove("open");
      if (lenis) lenis.start();
    });

    orderForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const customerName = document.getElementById("order-fullname").value;
      const customerPhone = document.getElementById("order-phone").value;
      const customerAddress = document.getElementById("order-address").value;
      const customerNote = document.getElementById("order-note").value;
      const paymentMethod = document.getElementById("payment-method-select").value;
      
      const allProds = typeof window.getAppProducts === "function" ? window.getAppProducts() : perfumeData;
      const items = cart.map(item => {
        const prod = allProds.find(p => p.id === item.id);
        return {
          id: item.id,
          name: prod ? prod.name : item.id,
          price: prod ? prod.price : 0,
          quantity: item.quantity
        };
      });
      
      const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const currentUser = typeof getCurrentUser === "function" ? getCurrentUser() : null;
      
      const newOrder = {
        id: window.currentCheckoutOrderId || ("DH" + Math.floor(100000 + Math.random() * 900000)),
        customerName,
        customerPhone,
        customerAddress,
        customerNote,
        customerEmail: currentUser ? currentUser.email : "",
        userEmail: currentUser ? currentUser.email : "",
        userId: currentUser ? currentUser.id : "",
        paymentMethod,
        items,
        totalPrice,
        date: new Date().toISOString(),
        status: "pending"
      };
      
      const localOrders = JSON.parse(localStorage.getItem("doci_orders") || "[]");
      localOrders.unshift(newOrder);
      localStorage.setItem("doci_orders", JSON.stringify(localOrders));

      // Trừ số lượng tồn kho tương ứng trong catalog
      try {
        const currentCatalog = typeof window.getAppProducts === "function" ? window.getAppProducts() : perfumeData;
        items.forEach(orderedItem => {
          const p = currentCatalog.find(item => item.id === orderedItem.id);
          if (p) {
            const curStock = parseInt(p.stock) !== undefined ? parseInt(p.stock) : 50;
            p.stock = Math.max(0, curStock - orderedItem.quantity);
          }
        });
        if (typeof window.saveAppProducts === "function") {
          window.saveAppProducts(currentCatalog);
        }
        if (typeof renderProducts === "function") {
          renderProducts();
        }
      } catch (stockErr) {
        console.warn("Stock deduction error:", stockErr);
      }
      
      fetch(`${API_BASE_URL}/orders-api.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newOrder)
      })
      .then(res => res.json())
      .then(data => {
        console.log("Order saved to server:", data);
      })
      .catch(err => {
        console.warn("API request failed (Running static HTML mode), saved offline:", err);
      });

      try {
        const socket = new WebSocket(`wss://free.piesocket.com/v3/doci_perfume_orders_v1?api_key=VCXCEGXvSTmN5ePpHgxt5QELTQA2cwyyhCqQCXqH&notify_self`);
        socket.onopen = () => {
          socket.send(JSON.stringify({ event: 'new_order', orderId: newOrder.id }));
          setTimeout(() => socket.close(), 1200);
        };
      } catch (wsErr) {
        console.warn("WebSocket Real-time notify failed:", wsErr);
      }

      sendTelegramNotification(newOrder);

      if (paymentMethod === "bank") {
        startPaymentPolling(newOrder);
      } else {
        checkoutFormModal.classList.remove("open");
        cart = [];
        localStorage.setItem("doci_cart", JSON.stringify(cart));
        updateCartCount();
        showSuccessCheckoutAnimation();
      }
    });
  }
}

function openCart() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  if (drawer && overlay) {
    renderCartItems();
    drawer.classList.add("open");
    overlay.classList.add("open");
    if (lenis) lenis.stop();
  }
}

function closeCartPanel() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  if (drawer && overlay) {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    if (lenis) lenis.start();
  }
}

function addToCart(id) {
  const item = perfumeData.find((p) => p.id === id);
  if (!item) return;

  const existing = cart.find((c) => c.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: item.id, quantity: 1 });
  }

  localStorage.setItem("doci_cart", JSON.stringify(cart));
  updateCartCount();
  showNotification(`Added ${item.name} to cart!`, "success");

  setTimeout(() => {
    openCart();
  }, 300);
}

function updateCartCount() {
  const badge = document.getElementById("cart-badge");
  if (badge) {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.innerText = total;
    if (total > 0) {
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  }
}

function showCouponMessage(msg, type) {
  const msgEl = document.getElementById("coupon-message");
  if (!msgEl) return;
  msgEl.innerText = msg;
  msgEl.className = `text-[10px] font-medium ${type === "success" ? "text-green-400" : "text-red-400"}`;
  msgEl.classList.remove("hidden");
}

function renderCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartSubtotal = document.getElementById("cart-subtotal");
  const cartTotal = document.getElementById("cart-total");
  const discountRow = document.getElementById("discount-row");
  const discountCodeName = document.getElementById("discount-code-name");
  const cartDiscount = document.getElementById("cart-discount");

  if (!cartItemsContainer || !cartSubtotal || !cartTotal) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="flex flex-col items-center justify-center h-64 text-gray-400">
        <i class="fa-solid fa-shopping-basket text-4xl mb-4 text-[#D4AF37]/50 animate-bounce"></i>
        <p>Your shopping cart is empty.</p>
        <button class="mt-4 text-xs font-semibold text-[#D4AF37] border-b border-[#D4AF37]" onclick="closeCartPanel()">Continue Shopping</button>
      </div>
    `;
    cartSubtotal.innerText = "0 VND";
    cartTotal.innerText = "0 VND";
    if (discountRow) discountRow.classList.add("hidden");
    return;
  }

  let subtotal = 0;

  cartItemsContainer.innerHTML = cart
    .map((cartItem) => {
      const prod = perfumeData.find((p) => p.id === cartItem.id);
      if (!prod) return "";

      const itemTotal = prod.price * cartItem.quantity;
      subtotal += itemTotal;

      return `
      <div class="flex items-center gap-4 p-4 border-b border-white/5">
        <img src="${prod.image}" alt="${prod.name}" class="w-16 h-16 object-contain bg-black/10 rounded">
        <div class="flex-grow">
          <h4 class="text-sm font-semibold truncate max-w-[200px]">${prod.name}</h4>
          <span class="text-[10px] text-[#D4AF37]">${prod.category}</span>
          <div class="flex items-center justify-between mt-2">
            <div class="flex items-center border border-white/10 rounded overflow-hidden">
              <button class="px-2 py-0.5 bg-white/5 text-xs hover:bg-[#D4AF37] hover:text-black" onclick="changeCartQty('${prod.id}', -1)">-</button>
              <span class="px-3 py-0.5 text-xs font-semibold">${cartItem.quantity}</span>
              <button class="px-2 py-0.5 bg-white/5 text-xs hover:bg-[#D4AF37] hover:text-black" onclick="changeCartQty('${prod.id}', 1)">+</button>
            </div>
            <span class="text-xs font-bold text-[#D4AF37]">${formatPrice(itemTotal)}</span>
          </div>
        </div>
        <button class="text-gray-500 hover:text-red-500 p-1" onclick="removeFromCart('${prod.id}')">
          <i class="fa-solid fa-trash-can text-sm"></i>
        </button>
      </div>
    `;
    })
    .join("");

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === "percent") {
      discountAmount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else if (appliedCoupon.type === "fixed") {
      discountAmount = appliedCoupon.value;
    }
  }

  const finalTotal = Math.max(0, subtotal - discountAmount);

  cartSubtotal.innerText = formatPrice(subtotal);
  if (discountRow && discountCodeName && cartDiscount && appliedCoupon) {
    discountCodeName.innerText = appliedCoupon.code;
    cartDiscount.innerText = `-${formatPrice(discountAmount)}`;
    discountRow.classList.remove("hidden");
  } else if (discountRow) {
    discountRow.classList.add("hidden");
  }
  cartTotal.innerText = formatPrice(finalTotal);
}

function changeCartQty(id, diff) {
  const item = cart.find((c) => c.id === id);
  if (!item) return;

  item.quantity += diff;
  if (item.quantity <= 0) {
    removeFromCart(id);
    return;
  }

  localStorage.setItem("doci_cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

function removeFromCart(id) {
  cart = cart.filter((c) => c.id !== id);
  localStorage.setItem("doci_cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

// --- PRODUCT DETAILS MODAL ---
let activeDetailId = "";

function initProductDetailsModal() {
  const modal = document.getElementById("detail-modal");
  const closeBtn = document.getElementById("close-detail-modal");
  const bg = modal ? modal.querySelector(".detail-modal-bg") : null;

  if (modal && closeBtn && bg) {
    closeBtn.addEventListener("click", () => closeDetails());
    bg.addEventListener("click", () => closeDetails());
    
    initStarRatingSelector();
    setupSubmitReview();
  }
}

function openDetails(id) {
  activeDetailId = id;
  const prod = perfumeData.find((p) => p.id === id);
  if (!prod) return;

  const modal = document.getElementById("detail-modal");
  if (!modal) return;

  document.getElementById("modal-img").src = prod.image;
  document.getElementById("modal-name").innerText = prod.name;
  document.getElementById("modal-inspired").innerText =
    `Inspired by: ${prod.inspiredBy}`;
  document.getElementById("modal-category").innerText =
    `Fragrance Family: ${prod.category}`;
  document.getElementById("modal-price").innerText = formatPrice(prod.price);
  document.getElementById("modal-original-price").innerText = formatPrice(
    prod.originalPrice,
  );
  document.getElementById("modal-description").innerText = prod.description;

  // Tầng hương
  document.getElementById("note-top").innerText = prod.notes.top;
  document.getElementById("note-middle").innerText = prod.notes.middle;
  document.getElementById("note-base").innerText = prod.notes.base;

  // Specs
  document.getElementById("spec-longevity").innerText = prod.longevity;
  document.getElementById("spec-projection").innerText = prod.projection;
  document.getElementById("spec-season").innerText = prod.season;
  document.getElementById("spec-occasion").innerText = prod.occasion;

  // Nút mua trong modal
  const modalBuyBtn = document.getElementById("modal-buy-btn");
  if (modalBuyBtn) {
    modalBuyBtn.onclick = () => {
      addToCart(prod.id);
      closeDetails();
    };
  }

  // Vẽ phần đánh giá sản phẩm
  renderReviewsSection(prod.id);

  // Hiển thị modal
  modal.classList.add("open");
  if (lenis) lenis.stop(); // Ngăn cuộn trang
}

function closeDetails() {
  const modal = document.getElementById("detail-modal");
  if (modal) {
    modal.classList.remove("open");
    if (lenis) lenis.start(); // Cho phép cuộn trang
  }
}

// Global hook để thẻ sản phẩm gọi
window.openDetails = openDetails;
window.addToCart = addToCart;
window.changeCartQty = changeCartQty;
window.removeFromCart = removeFromCart;
window.closeCartPanel = closeCartPanel;

// --- TRẮC NGHIỆM TÌM MÙI HƯƠNG PHÙ HỢP TƯƠNG TÁC ---
let quizStep = 1;
const quizAnswers = {
  gender: "",
  style: "",
  scent: "",
  occasion: "",
};

function initQuiz() {
  const nextBtns = document.querySelectorAll(".quiz-next-btn");
  const prevBtns = document.querySelectorAll(".quiz-prev-btn");

  // Thiết lập sự kiện click các Option trong Quiz
  document.querySelectorAll(".quiz-option-card").forEach((card) => {
    card.addEventListener("click", () => {
      const stepName = card.getAttribute("data-step-name");
      const value = card.getAttribute("data-value");

      // Bỏ lựa chọn cũ ở cùng step
      card.parentNode
        .querySelectorAll(".quiz-option-card")
        .forEach((c) => c.classList.remove("selected"));
      // Chọn card hiện tại
      card.classList.add("selected");

      quizAnswers[stepName] = value;

      // Tự động chuyển tiếp sau 0.5s ở các bước trắc nghiệm lựa chọn đơn
      setTimeout(() => {
        navigateQuiz(1);
      }, 400);
    });
  });

  // Nút quay lại
  prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      navigateQuiz(-1);
    });
  });

  // Nút làm lại quiz
  const resetBtn = document.getElementById("quiz-reset-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      resetQuiz();
    });
  }
}

function navigateQuiz(direction) {
  const totalSteps = 4;
  const currentBlock = document.getElementById(`quiz-step-${quizStep}`);

  // Validate lựa chọn trước khi tiến
  if (direction === 1) {
    if (quizStep === 1 && !quizAnswers.gender) return;
    if (quizStep === 2 && !quizAnswers.style) return;
    if (quizStep === 3 && !quizAnswers.scent) return;
  }

  const targetStep = quizStep + direction;

  if (targetStep < 1 || targetStep > totalSteps + 1) return;

  // Ẩn bước hiện tại
  if (currentBlock) {
    currentBlock.classList.add("hidden");
  }

  quizStep = targetStep;

  // Hiển thị bước tiếp theo
  const nextBlock = document.getElementById(`quiz-step-${quizStep}`);
  if (nextBlock) {
    nextBlock.classList.remove("hidden");
  }

  // Cập nhật progress bar
  const progressLine = document.getElementById("quiz-progress-line");
  if (progressLine) {
    const pct = ((quizStep - 1) / totalSteps) * 100;
    progressLine.style.width = `${pct}%`;
  }

  // Nếu tới bước kết quả (bước 5)
  if (quizStep === 5) {
    generateQuizResult();
  }
}

function generateQuizResult() {
  const resultBlock = document.getElementById("quiz-step-5");
  const resultCardContainer = document.getElementById("quiz-result-card");
  if (!resultBlock || !resultCardContainer) return;

  let pool = perfumeData.filter((p) => p.gender === quizAnswers.gender);
  let match = null;

  let primaryMatch = pool.filter((p) => p.category === quizAnswers.scent);
  if (primaryMatch.length === 0) {
    primaryMatch = pool.filter((p) => p.category === quizAnswers.style);
  }

  if (primaryMatch.length > 0) {
    match = primaryMatch.sort((a, b) => b.rating - a.rating)[0];
  } else {
    match = pool[0];
  }

  if (!match) {
    resultCardContainer.innerHTML = `<p class="text-gray-400 text-center">No perfectly matching fragrance found, please retake the quiz.</p>`;
    return;
  }

  resultCardContainer.innerHTML = `
    <div class="glass-card flex flex-col md:flex-row items-center gap-6 p-6 border-gold-glow max-w-2xl mx-auto">
      <div class="w-40 h-40 flex items-center justify-center bg-black/10 rounded-lg p-2">
        <img src="${match.image}" alt="${match.name}" class="object-contain max-h-full">
      </div>
      <div class="flex-grow text-left">
        <span class="text-[10px] text-[#D4AF37] font-semibold uppercase tracking-wider">Perfect Recommendation For You</span>
        <h3 class="font-title text-2xl font-bold mt-1 text-white">${match.name}</h3>
        <p class="text-xs text-gray-400 italic mb-2">Inspired by ${match.inspiredBy}</p>
        <p class="text-xs text-gray-300 mb-4 line-clamp-3">${match.description}</p>
        
        <div class="flex flex-wrap gap-2 mb-4">
          <span class="product-spec-item"><i class="fa-solid fa-clock mr-1"></i>${match.longevity}</span>
          <span class="product-spec-item"><i class="fa-solid fa-wind mr-1"></i>${match.projection}</span>
          <span class="product-spec-item"><i class="fa-solid fa-gift mr-1"></i>${match.category}</span>
        </div>
        
        <div class="flex items-center justify-between gap-4">
          <div>
            <span class="text-lg font-bold text-[#D4AF37]">${formatPrice(match.price)}</span>
          </div>
          <div class="flex gap-2">
            <button class="btn-luxury px-3 py-1.5 text-[11px]" onclick="openDetails('${match.id}')">DETAILS</button>
            <button class="btn-luxury btn-luxury-solid px-3 py-1.5 text-[11px]" onclick="addToCart('${match.id}')">BUY NOW</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function resetQuiz() {
  quizStep = 1;
  quizAnswers.gender = "";
  quizAnswers.style = "";
  quizAnswers.scent = "";
  quizAnswers.occasion = "";

  document
    .querySelectorAll(".quiz-option-card")
    .forEach((c) => c.classList.remove("selected"));

  for (let i = 1; i <= 5; i++) {
    const step = document.getElementById(`quiz-step-${i}`);
    if (step) {
      if (i === 1) step.classList.remove("hidden");
      else step.classList.add("hidden");
    }
  }

  const progressLine = document.getElementById("quiz-progress-line");
  if (progressLine) progressLine.style.width = "0%";
}

// --- FAQ SECTION ---
function initFAQ() {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const content = header.nextElementSibling;
      const icon = header.querySelector(".accordion-icon");

      const isOpen = item.classList.contains("active");

      document.querySelectorAll(".accordion-item").forEach((otherItem) => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".accordion-content").style.maxHeight = null;
        otherItem.querySelector(".accordion-icon").style.transform =
          "rotate(0deg)";
      });

      if (!isOpen) {
        item.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
        icon.style.transform = "rotate(180deg)";
      }
    });
  });
}

// --- CONTACT FORM SUBMISSION ---
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const nameInput = document.getElementById("contact-name") || form.querySelector('input[placeholder*="name"]') || form.querySelector('input[type="text"]');
    const emailInput = document.getElementById("contact-email") || form.querySelector('input[type="email"]');
    const messageInput = document.getElementById("contact-message") || form.querySelector('textarea');

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";

    if (!name || !email || !message) {
      showNotification("Please fill in all required fields (Name, Email, Message)", "error");
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : "SEND MESSAGE";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> SENDING...';
    }

    fetch(`${API_BASE_URL}/contact-handler.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === "success") {
        showNotification(data.message, "success");
        form.reset();
      } else {
        showNotification(data.message, "error");
      }
    })
    .catch(error => {
      console.error("Error submitting contact form:", error);
      showNotification("Thank you for contacting DOCI! We will respond shortly.", "success");
      form.reset();
    })
    .finally(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  });
}

// --- SWIPER SLIDERS ---
function initSwipers() {
  new Swiper(".best-seller-swiper", {
    slidesPerView: "auto",
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination-best",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next-best",
      prevEl: ".swiper-button-prev-best",
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4 },
    },
  });

  new Swiper(".certificate-swiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".cert-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".cert-next",
      prevEl: ".cert-prev",
    },
  });

  initHomepageReviews();
}

// --- NOTIFICATION WIDGET ---
function showNotification(message, type = "info") {
  let container = document.getElementById("notification-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "notification-container";
    container.style.cssText = "position: fixed; top: 24px; right: 24px; z-index: 999999; display: flex; flex-direction: column; gap: 10px; pointer-events: none;";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  
  toast.style.cssText = "padding: 14px 20px; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.6); font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.05em; display: flex; align-items: center; gap: 12px; transform: translateY(-20px); opacity: 0; transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1); pointer-events: auto; border: 1px solid;";

  if (type === "success") {
    toast.style.backgroundColor = "rgba(10, 10, 10, 0.95)";
    toast.style.borderColor = "#D4AF37";
    toast.style.color = "#D4AF37";
  } else if (type === "error") {
    toast.style.backgroundColor = "rgba(45, 11, 11, 0.95)";
    toast.style.borderColor = "#ef4444";
    toast.style.color = "#fca5a5";
  } else {
    toast.style.backgroundColor = "rgba(17, 17, 17, 0.95)";
    toast.style.borderColor = "rgba(255, 255, 255, 0.1)";
    toast.style.color = "#ffffff";
  }

  const icon =
    type === "success"
      ? '<i class="fa-solid fa-circle-check" style="font-size: 14px;"></i>'
      : type === "error"
        ? '<i class="fa-solid fa-circle-exclamation" style="font-size: 14px;"></i>'
        : '<i class="fa-solid fa-info-circle" style="font-size: 14px;"></i>';

  toast.innerHTML = `${icon} <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transform = "translateY(0)";
    toast.style.opacity = "1";
  }, 20);

  setTimeout(() => {
    toast.style.transform = "translateY(-20px)";
    toast.style.opacity = "0";
    setTimeout(() => {
      toast.remove();
    }, 350);
  }, 3500);
}

// --- SUCCESSFUL ORDER ANIMATION ---
function showSuccessCheckoutAnimation() {
  const successOverlay = document.createElement("div");
  successOverlay.className =
    "fixed inset-0 z-[99999] bg-[#0A0A0A] flex flex-col items-center justify-center p-6 text-center";
  successOverlay.innerHTML = `
    <div class="max-w-md w-full glass-card border-gold-glow p-8 flex flex-col items-center">
      <div class="w-20 h-20 bg-[#D4AF37]/10 border border-[#D4AF37] rounded-full flex items-center justify-center text-[#D4AF37] mb-6 text-3xl animate-pulse">
        <i class="fa-solid fa-check-double"></i>
      </div>
      <h3 class="font-title text-2xl font-bold mb-2 text-white">ORDER PLACED SUCCESSFULLY</h3>
      <p class="text-xs text-gray-400 mb-6">Your order is being processed with luxury care. A DOCI fragrance specialist will contact you shortly.</p>
      
      <div class="w-full bg-white/5 border border-white/10 rounded p-4 mb-6 text-left">
        <h4 class="text-xs font-semibold text-[#D4AF37] mb-2 uppercase tracking-wide">Order ID: #DOCI-${Math.floor(Math.random() * 90000) + 10000}</h4>
        <p class="text-[11px] text-gray-400">Method: Cash On Delivery (Nationwide)</p>
        <p class="text-[11px] text-gray-400">Estimated Delivery: 2 - 3 business days</p>
      </div>

      <button class="w-full btn-luxury btn-luxury-solid py-2.5 text-xs" id="close-success-btn">
        CONTINUE SHOPPING
      </button>
    </div>
  `;
  document.body.appendChild(successOverlay);
  if (lenis) lenis.stop();

  document.getElementById("close-success-btn").onclick = () => {
    successOverlay.remove();
    if (lenis) lenis.start();
  };
}

// --- ĐỊNH DẠNG ĐƠN GIÁ (TIỀN TỆ) ---
function formatPrice(val) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(val);
}

// --- INSTAGRAM GALLERY LIGHTBOX ---
window.openLightbox = function (src) {
  let lightbox = document.getElementById("lightbox");
  if (!lightbox) {
    lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
      <div class="absolute inset-0 bg-black/90 cursor-pointer" onclick="closeLightbox()"></div>
      <img id="lightbox-img" class="lightbox-img z-10" src="" alt="DOCI Perfume Instagram">
      <button class="absolute top-5 right-5 text-white/50 hover:text-white text-3xl z-10" onclick="closeLightbox()">&times;</button>
    `;
    document.body.appendChild(lightbox);
  }

  document.getElementById("lightbox-img").src = src;
  lightbox.classList.add("open");
  if (lenis) lenis.stop();
};

window.closeLightbox = function () {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.classList.remove("open");
    if (lenis) lenis.start();
  }
};

const MOCK_REVIEWS_DATABASE = {
  "men-ves-sir": [
    { name: "Alex Smith", rating: 5, date: "2026-06-15", content: "DOCI Yes Sir fragrance is extremely fresh and pleasant, very close to YSL Y EDP. Lasts all day on my jacket. Packaging is gorgeous and sturdy." },
    { name: "David Miller", rating: 5, date: "2026-06-20", content: "Very dynamic scent, ideal for work and daily wear. Elegant bottle design." },
    { name: "James Wilson", rating: 4, date: "2026-07-02", content: "Crisp and masculine scent. Fast shipping and careful packaging." }
  ],
  "women-slay-queen": [
    { name: "Emily Clark", rating: 5, date: "2026-06-18", content: "DOCI Slay Queen is wonderfully sweet and seductive, perfect for evening dates. Warm notes with 6+ hours longevity." },
    { name: "Sarah Jenkins", rating: 4, date: "2026-06-25", content: "Very sensual fragrance, received compliments at the party!" }
  ],
  "men-nice-navy": [
    { name: "Michael Brown", rating: 5, date: "2026-05-12", content: "Fresh grapefruit combined with incense notes, very captivating and gentlemanly." },
    { name: "Daniel Taylor", rating: 5, date: "2026-06-02", content: "Luxurious, perfect office style. Solid 7 hours longevity." }
  ],
  "women-madam-co": [
    { name: "Jessica White", rating: 5, date: "2026-07-05", content: "Sweet, glamorous and elegant fragrance similar to Coco Mademoiselle. Incredible 8h duration." },
    { name: "Sophia Martinez", rating: 5, date: "2026-07-08", content: "Gentle and refined scent, great for daily office wear. Beautiful bottle for gifting." }
  ]
};

function getProductReviews(productId) {
  const stored = localStorage.getItem(`doci_reviews_${productId}`);
  if (stored) {
    return JSON.parse(stored);
  }
  
  const defaults = MOCK_REVIEWS_DATABASE[productId] || [
    { name: "John Doe", rating: 5, date: "2026-07-01", content: "Excellent quality product, pleasant scent and long-lasting performance. Highly recommended!" },
    { name: "Jane Smith", rating: 4, date: "2026-07-05", content: "Carefully packed and delivered quickly. Subtle, sophisticated scent suitable for daily wear." }
  ];
  
  localStorage.setItem(`doci_reviews_${productId}`, JSON.stringify(defaults));
  return defaults;
}

function syncPerfumeRatings() {
  if (typeof perfumeData === "undefined") return;
  perfumeData.forEach((prod) => {
    const reviews = getProductReviews(prod.id);
    if (reviews && reviews.length > 0) {
      const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
      prod.rating = parseFloat((sum / reviews.length).toFixed(1));
      prod.reviewsCount = reviews.length;
    }
  });
}

function renderReviewsSection(productId) {
  const reviews = getProductReviews(productId);
  const totalCount = reviews.length;
  
  const avgRating = totalCount > 0 
    ? parseFloat((reviews.reduce((acc, r) => acc + r.rating, 0) / totalCount).toFixed(1))
    : 0.0;
    
  const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(r => {
    if (starCounts[r.rating] !== undefined) {
      starCounts[r.rating]++;
    }
  });
  
  const avgRatingEl = document.getElementById("reviews-avg-rating");
  const starsSummaryEl = document.getElementById("reviews-stars-summary");
  const totalCountEl = document.getElementById("reviews-total-count");
  
  if (avgRatingEl) avgRatingEl.innerText = avgRating.toFixed(1);
  
  if (starsSummaryEl) {
    starsSummaryEl.innerHTML = `
      ${'<i class="fa-solid fa-star"></i>'.repeat(Math.floor(avgRating))}
      ${avgRating % 1 !== 0 ? '<i class="fa-solid fa-star-half-stroke"></i>' : ""}
      ${'<i class="fa-regular fa-star"></i>'.repeat(5 - Math.ceil(avgRating))}
    `;
  }
  
  if (totalCountEl) totalCountEl.innerText = `${totalCount} reviews`;
  
  for (let i = 1; i <= 5; i++) {
    const count = starCounts[i];
    const pct = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
    
    const barEl = document.getElementById(`star-bar-${i}`);
    const pctEl = document.getElementById(`star-pct-${i}`);
    
    if (barEl) barEl.style.width = `${pct}%`;
    if (pctEl) pctEl.innerText = `${pct}%`;
  }
  
  const listContainer = document.getElementById("reviews-list-container");
  if (listContainer) {
    if (reviews.length === 0) {
      listContainer.innerHTML = `<div class="text-center text-gray-400 py-6 text-xs italic">No reviews yet for this product. Be the first to leave a review!</div>`;
    } else {
      listContainer.innerHTML = reviews.map(r => {
        const initials = r.name ? r.name.charAt(0).toUpperCase() : "C";
        const formattedDate = r.date ? r.date.split("-").reverse().join("/") : "";
        return `
          <div class="p-4 bg-white/5 border border-white/5 rounded-lg flex flex-col justify-between gap-3">
            <div class="flex justify-between items-start gap-4">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-gold text-xs font-bold font-title">
                  ${initials}
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <h5 class="text-xs font-semibold text-white">${r.name}</h5>
                    <span class="text-[9px] bg-[#D4AF37]/10 text-gold px-1.5 py-0.5 rounded flex items-center gap-1 font-semibold">
                      <i class="fa-solid fa-circle-check text-[8px]"></i> Verified Buyer
                    </span>
                  </div>
                  <div class="flex text-[#D4AF37] text-[10px] mt-0.5">
                    ${'<i class="fa-solid fa-star"></i>'.repeat(r.rating)}
                    ${'<i class="fa-regular fa-star"></i>'.repeat(5 - r.rating)}
                  </div>
                </div>
              </div>
              <span class="text-[10px] text-gray-500 font-light">${formattedDate}</span>
            </div>
            <p class="text-xs text-gray-300 font-light leading-relaxed pl-1">${r.content}</p>
          </div>
        `;
      }).reverse().join("");
    }
  }
}

let selectedReviewStars = 0;
function initStarRatingSelector() {
  const stars = document.querySelectorAll("#star-rating-selector i");
  const hiddenInput = document.getElementById("review-stars-value");
  
  if (stars && stars.length > 0) {
    stars.forEach(star => {
      star.addEventListener("mouseenter", () => {
        const val = parseInt(star.getAttribute("data-value"));
        highlightStars(val);
      });
      
      star.addEventListener("mouseleave", () => {
        highlightStars(selectedReviewStars);
      });
      
      star.addEventListener("click", () => {
        const val = parseInt(star.getAttribute("data-value"));
        selectedReviewStars = val;
        if (hiddenInput) hiddenInput.value = val;
        highlightStars(val);
      });
    });
  }
  
  function highlightStars(val) {
    stars.forEach(star => {
      const starVal = parseInt(star.getAttribute("data-value"));
      if (starVal <= val) {
        star.classList.remove("fa-regular");
        star.classList.add("fa-solid", "active");
      } else {
        star.classList.remove("fa-solid", "active");
        star.classList.add("fa-regular");
      }
    });
  }
}

function setupSubmitReview() {
  const submitBtn = document.getElementById("submit-review-btn");
  if (!submitBtn) return;
  
  submitBtn.onclick = function() {
    const nameInput = document.getElementById("review-user-name");
    const contentInput = document.getElementById("review-content");
    const starsInput = document.getElementById("review-stars-value");
    
    const name = nameInput ? nameInput.value.trim() : "";
    const content = contentInput ? contentInput.value.trim() : "";
    const stars = starsInput ? parseInt(starsInput.value) : 0;
    
    if (!activeDetailId) return;
    
    if (!name || !content) {
      showNotification("Please fill in all required fields!", "error");
      return;
    }
    
    if (stars === 0) {
      showNotification("Please select a star rating (1 - 5★)!", "error");
      return;
    }
    
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;
    
    const reviews = getProductReviews(activeDetailId);
    reviews.push({
      name: name,
      rating: stars,
      date: dateStr,
      content: content
    });
    
    localStorage.setItem(`doci_reviews_${activeDetailId}`, JSON.stringify(reviews));
    
    syncPerfumeRatings();
    renderReviewsSection(activeDetailId);
    
    if (typeof renderProducts === "function") {
      renderProducts();
    }
    
    if (nameInput) nameInput.value = "";
    if (contentInput) contentInput.value = "";
    if (starsInput) starsInput.value = "0";
    selectedReviewStars = 0;
    const starsIcons = document.querySelectorAll("#star-rating-selector i");
    starsIcons.forEach(s => {
      s.classList.remove("fa-solid", "active");
      s.classList.add("fa-regular");
    });
    
    showNotification("Review submitted successfully! Thank you for your feedback.", "success");
  };
}

// --- HOMEPAGE REVIEWS ---
const DEFAULT_HOMEPAGE_REVIEWS = [
  { name: "Alex Smith", rating: 5, location: "New York", perfume: "Yes Sir", content: "DOCI Yes Sir is extremely fresh and pleasant, almost identical to YSL Y EDP. Lasts all day on my jacket." },
  { name: "Emily Clark", rating: 4, location: "London", perfume: "Slay Queen", content: "DOCI Slay Queen is delightfully sweet and romantic for evening dates. Lasts 6+ hours on skin." },
  { name: "David Miller", rating: 5, location: "Sydney", perfume: "Tester Set & Bad Boy", content: "Bought the 10-Scent Tester Set first and loved it. Now bought full size DOCI Bad Boy, amazing scent!" }
];

let homepageReviewsSwiper = null;

function initHomepageReviews() {
  const wrapper = document.querySelector(".reviews-swiper .swiper-wrapper");
  if (!wrapper) return;
  
  let reviews = localStorage.getItem("doci_homepage_reviews");
  if (!reviews) {
    reviews = DEFAULT_HOMEPAGE_REVIEWS;
    localStorage.setItem("doci_homepage_reviews", JSON.stringify(reviews));
  } else {
    reviews = JSON.parse(reviews);
  }
  
  wrapper.innerHTML = reviews.map(r => {
    const initials = r.name ? r.name.charAt(0).toUpperCase() : "C";
    return `
      <div class="swiper-slide glass-card p-6 flex flex-col justify-between min-h-[220px]">
        <div>
          <div class="flex text-gold text-xs mb-3">
            ${'<i class="fa-solid fa-star"></i>'.repeat(r.rating)}
            ${'<i class="fa-regular fa-star"></i>'.repeat(5 - r.rating)}
          </div>
          <p class="text-xs text-gray-300 font-light italic mb-4">
            "${r.content}"
          </p>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-gold text-xs font-bold font-title">
            ${initials}
          </div>
          <div>
            <h5 class="text-xs font-semibold text-white">${r.name}</h5>
            <span class="text-[9px] text-gray-500">${r.location} • Purchased ${r.perfume}</span>
          </div>
        </div>
        </div>
      </div>
    `;
  }).join("");

  const totalCount = reviews.length + 1200;
  const totalRatingSum = reviews.reduce((sum, r) => sum + r.rating, 0);
  const avgRating = reviews.length > 0 ? parseFloat((totalRatingSum / reviews.length).toFixed(1)) : 4.8;
  
  const avgRatingText = document.getElementById("homepage-avg-rating-text");
  const avgStarsEl = document.getElementById("homepage-avg-stars");
  const totalReviewsCountEl = document.getElementById("homepage-total-reviews-count");
  
  if (avgRatingText) avgRatingText.innerText = `${avgRating.toFixed(1)}/5.0`;
  
  if (avgStarsEl) {
    avgStarsEl.innerHTML = `
      ${'<i class="fa-solid fa-star"></i>'.repeat(Math.floor(avgRating))}
      ${avgRating % 1 !== 0 ? '<i class="fa-solid fa-star-half-stroke"></i>' : ""}
      ${'<i class="fa-regular fa-star"></i>'.repeat(5 - Math.ceil(avgRating))}
    `;
  }
  
  if (totalReviewsCountEl) {
    totalReviewsCountEl.innerText = `(${totalCount.toLocaleString()}+ Satisfied Customers)`;
  }
  
  if (homepageReviewsSwiper) {
    homepageReviewsSwiper.destroy(true, true);
  }
  
  homepageReviewsSwiper = new Swiper(".reviews-swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: reviews.length > 1,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination-reviews",
      clickable: true,
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
}

let homepageSelectedStars = 0;

function initHomepageReviewForm() {
  const stars = document.querySelectorAll("#homepage-star-selector i");
  const hiddenInput = document.getElementById("homepage-review-stars-value");
  
  if (stars && stars.length > 0) {
    stars.forEach(star => {
      star.addEventListener("mouseenter", () => {
        const val = parseInt(star.getAttribute("data-value"));
        highlightStars(val);
      });
      
      star.addEventListener("mouseleave", () => {
        highlightStars(homepageSelectedStars);
      });
      
      star.addEventListener("click", () => {
        const val = parseInt(star.getAttribute("data-value"));
        homepageSelectedStars = val;
        if (hiddenInput) hiddenInput.value = val;
        highlightStars(val);
      });
    });
  }
  
  function highlightStars(val) {
    stars.forEach(star => {
      const starVal = parseInt(star.getAttribute("data-value"));
      if (starVal <= val) {
        star.classList.remove("fa-regular");
        star.classList.add("fa-solid", "active");
      } else {
        star.classList.remove("fa-solid", "active");
        star.classList.add("fa-regular");
      }
    });
  }
  
  const submitBtn = document.getElementById("homepage-submit-review-btn");
  if (submitBtn) {
    submitBtn.onclick = function() {
      const nameInput = document.getElementById("homepage-review-name");
      const perfumeSelect = document.getElementById("homepage-review-perfume");
      const locationInput = document.getElementById("homepage-review-location");
      const contentInput = document.getElementById("homepage-review-content");
      
      const name = nameInput ? nameInput.value.trim() : "";
      const perfume = perfumeSelect ? perfumeSelect.value : "";
      const location = locationInput ? locationInput.value.trim() : "";
      const content = contentInput ? contentInput.value.trim() : "";
      const starsVal = homepageSelectedStars;
      
      if (!name || !perfume || !location || !content) {
        showNotification("Please complete all required fields!", "error");
        return;
      }
      
      if (starsVal === 0) {
        showNotification("Please select a star rating (1 - 5★)!", "error");
        return;
      }
      
      let reviews = localStorage.getItem("doci_homepage_reviews");
      reviews = reviews ? JSON.parse(reviews) : [...DEFAULT_HOMEPAGE_REVIEWS];
      
      reviews.push({
        name: name,
        rating: starsVal,
        location: location,
        perfume: perfume,
        content: content
      });
      
      localStorage.setItem("doci_homepage_reviews", JSON.stringify(reviews));
      
      initHomepageReviews();
      
      if (nameInput) nameInput.value = "";
      if (perfumeSelect) perfumeSelect.selectedIndex = 0;
      if (locationInput) locationInput.value = "";
      if (contentInput) contentInput.value = "";
      if (hiddenInput) hiddenInput.value = "0";
      homepageSelectedStars = 0;
      stars.forEach(s => {
        s.classList.remove("fa-solid", "active");
        s.classList.add("fa-regular");
      });
      
      showNotification("Thank you for submitting your customer review!", "success");
      
      const section = document.getElementById("reviews-section") || document.querySelector(".reviews-swiper");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    };
  }
}

// --- PAYMENT METHOD TOGGLE & SEPAY POLLING ---
let paymentPollingInterval = null;

window.togglePaymentMethod = function(method) {
  const codInfo = document.getElementById("payment-info-cod");
  const bankInfo = document.getElementById("payment-info-bank");
  if (method === "cod") {
    if (codInfo) codInfo.classList.remove("hidden");
    if (bankInfo) bankInfo.classList.add("hidden");
    stopPaymentPolling();
  } else if (method === "bank") {
    if (codInfo) codInfo.classList.add("hidden");
    if (bankInfo) bankInfo.classList.remove("hidden");
    updateVietQRInfo();
  }
};

window.updateVietQRInfo = function() {
  const phoneVal = document.getElementById("order-phone")?.value.trim() || "";
  const subtotal = cart.reduce((sum, item) => sum + (perfumeData.find(p => p.id === item.id)?.price || 0) * item.quantity, 0);
  
  if (!window.currentCheckoutOrderId) {
    window.currentCheckoutOrderId = "DH" + Math.floor(100000 + Math.random() * 900000);
  }
  
  const orderCode = window.currentCheckoutOrderId;
  const transferContent = phoneVal ? `${phoneVal} ${orderCode}` : orderCode;
  
  const qrImg = document.getElementById("vietqr-preview-img");
  const contentEl = document.getElementById("vietqr-preview-content");
  
  if (qrImg) {
    qrImg.src = `https://vietqr.app/img?bank=Vietcombank&acc=1041618870&template=compact&amount=${subtotal}&des=${encodeURIComponent(transferContent)}`;
  }
  if (contentEl) {
    contentEl.innerText = transferContent;
  }
};

function startPaymentPolling(order) {
  stopPaymentPolling();
  
  const statusContainer = document.getElementById("payment-checking-status");
  if (statusContainer) {
    statusContainer.innerHTML = `
      <i class="fa-solid fa-circle-notch fa-spin text-xs"></i>
      <span>Automatically verifying payment via SePay...</span>
    `;
    statusContainer.className = "flex items-center justify-center gap-2 text-[11px] text-gold bg-gold/10 px-3 py-2 rounded-lg border border-gold/20 w-full animate-pulse";
  }

  showNotification(`Order #${order.id} created! Please scan VietQR code to complete.`, "info");

  paymentPollingInterval = setInterval(() => {
    fetch(`${API_BASE_URL}/check_payment_status.php?order_id=${encodeURIComponent(order.id)}`)
      .then(res => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(data => {
        if (data && (data.payment_status === "Paid" || data.paid || data.status === "completed")) {
          stopPaymentPolling();
          
          if (statusContainer) {
            statusContainer.innerHTML = `
              <i class="fa-solid fa-circle-check text-emerald-400 text-sm"></i>
              <span class="text-emerald-400 font-bold">Payment successfully received via SePay!</span>
            `;
            statusContainer.className = "flex items-center justify-center gap-2 text-[11px] bg-emerald-500/20 px-3 py-2 rounded-lg border border-emerald-500/40 w-full";
          }
          
          showNotification(`Payment verified for Order #${order.id}! Thank you.`, "success");
          
          setTimeout(() => {
            const checkoutFormModal = document.getElementById("checkout-modal");
            if (checkoutFormModal) checkoutFormModal.classList.remove("open");
            cart = [];
            localStorage.setItem("doci_cart", JSON.stringify(cart));
            updateCartCount();
            showSuccessCheckoutAnimation();
          }, 1800);
        }
      })
      .catch(err => {
        console.warn("Waiting for SePay connection...", err.message || err);
      });
  }, 2000);
}

function stopPaymentPolling() {
  if (paymentPollingInterval) {
    clearInterval(paymentPollingInterval);
    paymentPollingInterval = null;
  }
}

// --- CLIPBOARD UTILITY ---
window.copyToClipboard = function(text, message) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification(message || "Copied to clipboard!", "success");
  }).catch(() => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      showNotification(message || "Copied to clipboard!", "success");
    } catch (err) {
      showNotification("Could not copy. Please enter manually.", "error");
    }
    document.body.removeChild(textArea);
  });
};

// --- THANH MENU ĐIỆN THOẠI (MOBILE MENU) ---
function initMobileMenu() {
  const toggle   = document.getElementById('mobile-menu-toggle');
  const drawer   = document.getElementById('mobile-menu-drawer');
  const overlay  = document.getElementById('mobile-menu-overlay');
  const closeBtn = document.getElementById('mobile-menu-close');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    if (drawer) drawer.classList.remove('translate-x-full');
    if (overlay) {
      overlay.classList.remove('opacity-0', 'pointer-events-none');
      overlay.classList.add('opacity-100');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (drawer) drawer.classList.add('translate-x-full');
    if (overlay) {
      overlay.classList.add('opacity-0', 'pointer-events-none');
      overlay.classList.remove('opacity-100');
    }
    document.body.style.overflow = '';
  }

  if (toggle)   toggle.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay)  overlay.addEventListener('click', closeMenu);

  navLinks.forEach(link => link.addEventListener('click', closeMenu));
}

// --- HÀM GỬI THÔNG BÁO TELEGRAM (ADMIN NOTIFICATION) ---
function sendTelegramNotification(order) {
  if (!TELEGRAM_CONFIG.enabled || !TELEGRAM_CONFIG.token || !TELEGRAM_CONFIG.chatId) {
    console.warn("Telegram notification is disabled or not configured.");
    return;
  }

  // Định dạng danh sách sản phẩm đặt hàng
  const itemsText = order.items.map(item => {
    const priceFormatted = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(item.price * item.quantity);
    return `• Chai ${item.name || item.id} x${item.quantity} (${priceFormatted})`;
  }).join("\n");

  const totalFormatted = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(order.totalPrice);

  const text = `🔔 *CÓ ĐƠN HÀNG MỚI CHỜ DUYỆT!*\n\n` +
               `*Mã đơn:* \`${order.id}\`\n` +
               `*Khách hàng:* ${order.customerName}\n` +
               `*Điện thoại:* [${order.customerPhone}](tel:${order.customerPhone})\n` +
               `*Địa chỉ:* ${order.customerAddress}\n` +
               `*Ghi chú:* ${order.customerNote || "Không có"}\n` +
               `*Thanh toán:* ${order.paymentMethod === 'bank' ? 'Chuyển khoản' : 'Thanh toán COD'}\n\n` +
               `*Sản phẩm đặt mua:*\n${itemsText}\n\n` +
               `*Tổng tiền:* *${totalFormatted}*\n\n` +
               `👉 Duyệt đơn tại trang quản trị: https://doci-perfume.vercel.app/admin.html`;

  fetch(`https://api.telegram.org/bot${TELEGRAM_CONFIG.token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CONFIG.chatId,
      text: text,
      parse_mode: "Markdown",
      disable_web_page_preview: true
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.ok) {
      console.log("Đã gửi thông báo Telegram thành công!");
    } else {
      console.error("Gửi thông báo Telegram thất bại:", data);
    }
  })
  .catch(err => {
    console.error("Lỗi khi gửi HTTP request tới Telegram:", err);
  });
}

// --- AI ASSISTANT CHATBOT (DOCI AI) ---
function initAIChatbot() {
  const chatbotHtml = `
    <!-- Floating Button -->
    <div id="doci-bot-trigger" class="fixed bottom-6 right-6 z-50 select-none cursor-pointer group">
      <div class="relative w-14 h-14 bg-gradient-to-tr from-[#D4AF37] to-[#AA7C11] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.6)] transform hover:scale-105 transition-all duration-300">
        <span class="absolute inset-0 rounded-full bg-gold/30 animate-ping opacity-75"></span>
        <i class="fa-solid fa-robot text-black text-xl group-hover:rotate-12 transition-transform duration-300"></i>
        <span id="doci-bot-badge" class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-bounce">1</span>
      </div>
    </div>

    <!-- Chat Window (Glassmorphic) -->
    <div id="doci-bot-window" class="fixed bottom-24 right-6 w-[365px] h-[520px] max-h-[80vh] max-w-[calc(100vw-32px)] z-50 rounded-2xl flex flex-col overflow-hidden border border-gold/20 shadow-[0_10px_40px_rgba(0,0,0,0.8)] translate-y-8 opacity-0 pointer-events-none transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)" style="background: rgba(10, 10, 10, 0.78); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);">
      <!-- Window Header -->
      <div class="p-4 border-b border-gold/15 bg-black/40 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="relative w-9 h-9 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center">
            <i class="fa-solid fa-wand-magic-sparkles text-gold text-sm"></i>
            <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#0a0a0a] rounded-full"></span>
          </div>
          <div>
            <h4 class="font-title text-sm font-bold text-white tracking-wide">DOCI AI Assistant</h4>
            <span class="text-[9px] text-green-400 font-semibold tracking-wider uppercase block -mt-0.5">Online</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button id="doci-bot-minimize" class="text-gray-400 hover:text-white p-1 transition-colors text-sm"><i class="fa-solid fa-minus"></i></button>
          <button id="doci-bot-close" class="text-gray-400 hover:text-white p-1 transition-colors text-sm"><i class="fa-solid fa-xmark"></i></button>
        </div>
      </div>

      <!-- Messages Body -->
      <div id="doci-bot-messages" class="flex-grow p-4 overflow-y-auto space-y-4 select-text">
        <div class="flex gap-2 items-start max-w-[85%]">
          <div class="w-7 h-7 flex-shrink-0 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center text-[10px] text-gold">
            <i class="fa-solid fa-robot"></i>
          </div>
          <div class="bg-white/5 border border-white/5 text-[12px] text-gray-200 rounded-2xl rounded-tl-none px-3.5 py-2.5 shadow-sm leading-relaxed">
            Welcome! I am the DOCI Perfume AI Assistant. ✨<br><br>I can help you find your ideal scent, guide you on longevity, or answer shipping policies! How may I assist you today?
          </div>
        </div>
      </div>

      <!-- Suggestions Chips -->
      <div id="doci-bot-chips" class="px-4 py-2 flex gap-2 overflow-x-auto whitespace-nowrap border-t border-white/5 bg-black/10 select-none no-scrollbar">
        <button onclick="handleBotChipClick('Scent Advice')" class="bg-white/5 hover:bg-gold/10 hover:border-gold/30 border border-white/10 text-[10px] text-gray-300 hover:text-gold px-3 py-1.5 rounded-full transition-all">Scent Advice</button>
        <button onclick="handleBotChipClick('Best Sellers')" class="bg-white/5 hover:bg-gold/10 hover:border-gold/30 border border-white/10 text-[10px] text-gray-300 hover:text-gold px-3 py-1.5 rounded-full transition-all">Best Sellers</button>
        <button onclick="handleBotChipClick('Longevity Info')" class="bg-white/5 hover:bg-gold/10 hover:border-gold/30 border border-white/10 text-[10px] text-gray-300 hover:text-gold px-3 py-1.5 rounded-full transition-all">Longevity Info</button>
        <button onclick="handleBotChipClick('Special Promotions')" class="bg-white/5 hover:bg-gold/10 hover:border-gold/30 border border-white/10 text-[10px] text-gray-300 hover:text-gold px-3 py-1.5 rounded-full transition-all">Promotions</button>
      </div>

      <!-- Input Footer -->
      <form id="doci-bot-form" class="p-3 border-t border-gold/15 bg-black/40 flex items-center gap-2">
        <input type="text" id="doci-bot-input" required placeholder="Ask DOCI AI..." class="flex-grow bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs text-white focus:border-gold/55 focus:outline-none transition-colors" />
        <button type="submit" class="w-8 h-8 rounded-full bg-gold hover:bg-gold/85 text-black flex items-center justify-center shadow-md transition-all active:scale-95">
          <i class="fa-solid fa-paper-plane text-xs"></i>
        </button>
      </form>
    </div>
  `;

  const botDiv = document.createElement("div");
  botDiv.innerHTML = chatbotHtml;
  document.body.appendChild(botDiv);

  const trigger = document.getElementById("doci-bot-trigger");
  const win = document.getElementById("doci-bot-window");
  const badge = document.getElementById("doci-bot-badge");
  const closeBtn = document.getElementById("doci-bot-close");
  const minimizeBtn = document.getElementById("doci-bot-minimize");
  const form = document.getElementById("doci-bot-form");
  const input = document.getElementById("doci-bot-input");
  const msgContainer = document.getElementById("doci-bot-messages");

  if (!trigger || !win) return;

  trigger.addEventListener("click", () => {
    win.classList.remove("opacity-0", "pointer-events-none", "translate-y-8");
    win.classList.add("translate-y-0");
    trigger.classList.add("hidden");
    if (badge) badge.classList.add("hidden");
    input.focus();
  });

  const hideWindow = () => {
    win.classList.add("opacity-0", "pointer-events-none", "translate-y-8");
    win.classList.remove("translate-y-0");
    trigger.classList.remove("hidden");
  };

  closeBtn.addEventListener("click", hideWindow);
  minimizeBtn.addEventListener("click", hideWindow);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;
    
    input.value = "";
    addUserMessage(query);
    
    showTypingIndicator();
    setTimeout(() => {
      removeTypingIndicator();
      const reply = getAIResponse(query);
      addBotMessage(reply);
    }, 1200);
  });

  function addUserMessage(text) {
    const msg = document.createElement("div");
    msg.className = "flex justify-end";
    msg.innerHTML = `
      <div class="bg-gold text-black text-[12px] font-medium rounded-2xl rounded-tr-none px-3.5 py-2.5 shadow-sm max-w-[85%] leading-relaxed">
        ${text}
      </div>
    `;
    msgContainer.appendChild(msg);
    scrollToBottom();
  }

  function addBotMessage(text) {
    const msg = document.createElement("div");
    msg.className = "flex gap-2 items-start max-w-[85%]";
    msg.innerHTML = `
      <div class="w-7 h-7 flex-shrink-0 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center text-[10px] text-gold">
        <i class="fa-solid fa-robot"></i>
      </div>
      <div class="bg-white/5 border border-white/5 text-[12px] text-gray-200 rounded-2xl rounded-tl-none px-3.5 py-2.5 shadow-sm leading-relaxed">
        ${text}
      </div>
    `;
    msgContainer.appendChild(msg);
    scrollToBottom();
  }

  function showTypingIndicator() {
    const indicator = document.createElement("div");
    indicator.id = "doci-bot-typing";
    indicator.className = "flex gap-2 items-start max-w-[85%]";
    indicator.innerHTML = `
      <div class="w-7 h-7 flex-shrink-0 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center text-[10px] text-gold">
        <i class="fa-solid fa-robot"></i>
      </div>
      <div class="bg-white/5 border border-white/5 text-gray-400 rounded-2xl rounded-tl-none px-3.5 py-2.5 shadow-sm flex items-center gap-1">
        <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
        <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
        <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
      </div>
    `;
    msgContainer.appendChild(indicator);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById("doci-bot-typing");
    if (indicator) indicator.remove();
  }

  function scrollToBottom() {
    msgContainer.scrollTo({
      top: msgContainer.scrollHeight,
      behavior: 'smooth'
    });
  }

  window.handleBotChipClick = function(text) {
    addUserMessage(text);
    showTypingIndicator();
    setTimeout(() => {
      removeTypingIndicator();
      const reply = getAIResponse(text);
      addBotMessage(reply);
    }, 1200);
  };
}

function getAIResponse(query) {
  const q = query.toLowerCase();

  if (q.includes("choose") || q.includes("recommend") || q.includes("scent") || q.includes("fragrance") || q.includes("advice") || q.includes("chọn") || q.includes("mùi") || q.includes("tư vấn")) {
    return "DOCI recommends fragrances based on your preferred style:<br><br>" +
           "🔹 **For Men**:<br>" +
           "• **Nice Navy**: Elegant & fresh with grapefruit & mint (inspired by Bleu de Chanel).<br>" +
           "• **Yes Sir**: Masculine & dynamic with apple & sage (inspired by YSL Y EDP).<br>" +
           "• **Old King**: Regal & powerful with cedarwood & musk (inspired by Creed Aventus).<br><br>" +
           "🌸 **For Women**:<br>" +
           "• **Lady Rose**: Glamorous & sophisticated with lychee & Turkish rose (inspired by Delina).<br>" +
           "• **Slay Queen**: Sweet & seductive with tonka bean & cacao (inspired by Good Girl).<br>" +
           "• **Madam Co**: Refined & noble with Bergamot & patchouli (inspired by Coco Mademoiselle).";
  }

  if (q.includes("yes sir") || q.includes("ys sir") || q.includes("ysl")) {
    return "✨ **DOCI Yes Sir (Inspired by YSL Y EDP)**:<br><br>" +
           "• **Key Notes**: Green apple, ginger, sage, tonka bean, ebony.<br>" +
           "• **Style**: Dynamic, charismatic, and boldly masculine.<br>" +
           "• **Occasion**: Suitable all year round, work, events, night out.";
  }
  if (q.includes("nice navy") || q.includes("bleu") || q.includes("navy")) {
    return "✨ **DOCI Nice Navy (Inspired by Bleu de Chanel)**:<br><br>" +
           "• **Key Notes**: Mint, grapefruit, nutmeg, sandalwood, incense.<br>" +
           "• **Style**: Gentlemanly, fresh, and luxurious.<br>" +
           "• **Occasion**: Office, formal meetings, romantic dates.";
  }
  if (q.includes("old king") || q.includes("creed") || q.includes("aventus")) {
    return "✨ **DOCI Old King (Inspired by Creed Aventus)**:<br><br>" +
           "• **Key Notes**: Ripe pineapple, blackcurrant, birch, musk, oakmoss.<br>" +
           "• **Style**: Powerful, regal, and commanding.<br>" +
           "• **Occasion**: Business meetings, VIP galas, evening events.";
  }
  if (q.includes("lady rose") || q.includes("delina") || q.includes("rose")) {
    return "✨ **DOCI Lady Rose (Inspired by Parfums de Marly Delina)**:<br><br>" +
           "• **Key Notes**: Sweet lychee, Turkish rose, rhubarb, white musk, cashmere wood.<br>" +
           "• **Style**: Elegant, aristocratic, and charmingly sweet.<br>" +
           "• **Occasion**: Formal galas, romantic dates, luxury gatherings.";
  }
  if (q.includes("slay queen") || q.includes("good girl") || q.includes("heel")) {
    return "✨ **DOCI Slay Queen (Inspired by Carolina Herrera Good Girl)**:<br><br>" +
           "• **Key Notes**: Sambac jasmine, tuberose, dark cacao, tonka bean, almond.<br>" +
           "• **Style**: Sexy, mysterious, and captivating.<br>" +
           "• **Occasion**: Nightclubs, evening dates, parties.";
  }
  if (q.includes("madam co") || q.includes("coco") || q.includes("chanel co")) {
    return "✨ **DOCI Madam Co (Inspired by Chanel Coco Mademoiselle)**:<br><br>" +
           "• **Key Notes**: Bergamot orange, orange blossom, jasmine, vetiver, patchouli.<br>" +
           "• **Style**: Noble, elegant, and independently charming.<br>" +
           "• **Occasion**: High-end workplace, formal receptions.";
  }

  if (q.includes("longevity") || q.includes("last") || q.includes("projection") || q.includes("duration") || q.includes("lưu hương") || q.includes("bao lâu")) {
    return "DOCI Perfume delivers premium longevity with pure imported **Eau De Parfum (EDP)** concentration:<br><br>" +
           "⏱ **On Skin**: Retains fragrance for **6 - 8 hours**.<br>" +
           "👕 **On Clothes / Fabric**: Lasts **12 - 24 hours**.<br>" +
           "💨 **Scent Radius**: Radiates fragrance within **1 to 2 meters**.";
  }

  if (q.includes("discount") || q.includes("sale") || q.includes("promo") || q.includes("offer") || q.includes("gift") || q.includes("khuyến mãi") || q.includes("giảm giá")) {
    return "🎁 **Today's Luxury Flash Sale Offers**:<br><br>" +
           "• Special price of **319,000 VND / 50ml bottle** (Original: 450,000 VND).<br>" +
           "• Includes **1 premium 2ml sample of your choice** with every order.<br>" +
           "• **Buy 2 Bottles**: Receive 2 free samples + **NATIONWIDE FREE SHIPPING**.<br><br>Add your favorite scents to cart now!";
  }

  if (q.includes("delivery") || q.includes("shipping") || q.includes("ship") || q.includes("cod") || q.includes("giao hàng")) {
    return "📦 **DOCI Shipping Policy**:<br><br>" +
           "• **Standard Shipping**: Flat 25,000 VND nationwide.<br>" +
           "• **Free Shipping**: 100% Free Shipping on orders of **2 or more bottles**.<br>" +
           "• **Estimated Delivery**: 1-2 business days for major cities; 2-3 business days for other regions.";
  }

  if (q.includes("return") || q.includes("warranty") || q.includes("refund") || q.includes("bảo hành") || q.includes("đổi trả")) {
    return "🛡 **1-to-1 Warranty Guarantee**:<br><br>" +
           "DOCI offers free home return/replacement within **7 days** of delivery for:<br>" +
           "• Spray nozzle defects or bottle damage during transit.<br>" +
           "• Incorrect product sent.<br>" +
           "• Scent quality mismatch guarantee.";
  }

  if (q.includes("contact") || q.includes("hotline") || q.includes("phone") || q.includes("zalo") || q.includes("address") || q.includes("liên hệ")) {
    return "📞 **DOCI Perfume Contact Info**:<br><br>" +
           "• **Customer Hotline**: 0328.595.037<br>" +
           "• **Zalo / Live Chat**: Click the chat widget button on the bottom left of your screen.<br>" +
           "• **Showroom**: DOCI Perfume Flagship Store.";
  }

  if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("greetings") || q.includes("chào")) {
    return "Hello! How can DOCI assist you today? Would you like recommendations for Men's, Women's perfumes, or flash sale promotions?";
  }

  if (q.includes("best seller") || q.includes("hot") || q.includes("popular") || q.includes("bán chạy")) {
    return "🔥 **Top Best-Selling Fragrances at DOCI**:<br><br>" +
           "1. **Nice Navy (Men)**: Elegant, captivating & fresh (Bleu de Chanel style).<br>" +
           "2. **Yes Sir (Men)**: Dynamic, crisp apple & sage (YSL Y EDP style).<br>" +
           "3. **Lady Rose (Women)**: Sweet & aristocratic Turkish rose (Delina style).<br>" +
           "4. **Slay Queen (Women)**: Sexy, night-out jasmine & cacao (Good Girl style).";
  }

  return "Thank you for reaching out! 😊 To provide the best recommendation, are you looking for elegant, sweet, seductive scents, or information on DOCI special promotions?";
}

// --- SCROLL REVEAL EFFECT ---
function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal-on-scroll");
  if (elements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -25px 0px"
  });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   CUSTOMER REGISTRATION / LOGIN & ACCOUNT MANAGEMENT SYSTEM (DOCI AUTH)
   ========================================================================== */

window.getCurrentUser = function() {
  try {
    const userStr = localStorage.getItem("doci_current_user");
    return userStr ? JSON.parse(userStr) : null;
  } catch (e) {
    return null;
  }
};

window.getAllUsers = function() {
  try {
    const usersStr = localStorage.getItem("doci_users");
    return usersStr ? JSON.parse(usersStr) : [];
  } catch (e) {
    return [];
  }
};

window.isForcedAuth = false;

function initUserAuth() {
  let users = window.getAllUsers();
  if (users.length === 0) {
    const defaultUser = {
      id: "USR001",
      name: "John Doe",
      email: "khachhang@gmail.com",
      phone: "0901234567",
      address: "123 Nguyen Trai, District 1, Ho Chi Minh City",
      password: "123456",
      created_at: new Date().toISOString()
    };
    users.push(defaultUser);
    localStorage.setItem("doci_users", JSON.stringify(users));
  }

  renderUserHeaderUI();

  const userHeaderBtn = document.getElementById("user-account-btn");
  const mobileUserBtn = document.getElementById("mobile-user-account-btn");
  const closeAuthBtn = document.getElementById("close-auth-modal");
  const closeAccountBtn = document.getElementById("close-account-modal");
  const authOverlay = document.getElementById("auth-modal");
  const accountOverlay = document.getElementById("account-modal");

  if (userHeaderBtn) {
    userHeaderBtn.addEventListener("click", () => {
      const currentUser = window.getCurrentUser();
      if (currentUser) {
        window.openAccountModal('profile');
      } else {
        window.openAuthModal('login', true);
      }
    });
  }

  if (mobileUserBtn) {
    mobileUserBtn.addEventListener("click", () => {
      const drawer = document.getElementById('mobile-menu-drawer');
      const overlay = document.getElementById('mobile-menu-overlay');
      if (drawer) drawer.classList.add('translate-x-full');
      if (overlay) overlay.classList.add('opacity-0', 'pointer-events-none');
      document.body.style.overflow = '';

      const currentUser = window.getCurrentUser();
      if (currentUser) {
        window.openAccountModal('profile');
      } else {
        window.openAuthModal('login', true);
      }
    });
  }

  if (closeAuthBtn) closeAuthBtn.addEventListener("click", window.closeAuthModal);
  if (closeAccountBtn) closeAccountBtn.addEventListener("click", window.closeAccountModal);

  if (authOverlay) {
    authOverlay.addEventListener("click", (e) => {
      if (e.target === authOverlay) window.closeAuthModal();
    });
  }
  if (accountOverlay) {
    accountOverlay.addEventListener("click", (e) => {
      if (e.target === accountOverlay) window.closeAccountModal();
    });
  }

  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const forgotForm = document.getElementById("forgot-form");
  const profileForm = document.getElementById("account-profile-form");
  const passwordForm = document.getElementById("account-password-form");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value.trim();
      const pass = document.getElementById("login-password").value;
      handleLogin(email, pass);
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("reg-name").value.trim();
      const email = document.getElementById("reg-email").value.trim();
      const phone = document.getElementById("reg-phone").value.trim();
      const pass = document.getElementById("reg-password").value;
      const confirmPass = document.getElementById("reg-confirm-password").value;
      handleRegister(name, email, phone, pass, confirmPass);
    });
  }

  if (forgotForm) {
    forgotForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("forgot-email").value.trim();
      handleForgotPassword(email);
    });
  }

  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleUpdateProfile();
    });
  }

  if (passwordForm) {
    passwordForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleChangePassword();
    });
  }

  const currentUser = window.getCurrentUser();
  if (!currentUser) {
    setTimeout(() => {
      window.openAuthModal('login', true);
    }, 400);
  }
}

function renderUserHeaderUI() {
  const currentUser = window.getCurrentUser();
  const avatarBadge = document.getElementById("user-avatar-badge");
  const avatarIcon = document.getElementById("user-avatar-icon");
  const headerName = document.getElementById("user-header-name");
  const mobileLabel = document.getElementById("mobile-user-label");

  if (currentUser) {
    if (avatarBadge) {
      avatarBadge.className = "w-7 h-7 rounded-full border border-gold bg-gold/20 text-gold flex items-center justify-center transition-all shadow-sm";
    }
    if (avatarIcon) {
      avatarIcon.className = "fa-solid fa-user-check text-xs text-gold";
    }
    if (headerName) {
      const parts = currentUser.name.trim().split(' ');
      const shortName = parts[parts.length - 1] || currentUser.name;
      headerName.textContent = `Hello, ${shortName}`;
      headerName.classList.add("text-gold");
    }
    if (mobileLabel) {
      mobileLabel.textContent = `Hello, ${currentUser.name}`;
    }
  } else {
    if (avatarBadge) {
      avatarBadge.className = "w-7 h-7 rounded-full border border-white/20 group-hover:border-gold flex items-center justify-center bg-white/5 transition-all";
    }
    if (avatarIcon) {
      avatarIcon.className = "fa-regular fa-user text-xs";
    }
    if (headerName) {
      headerName.textContent = "Account";
      headerName.classList.remove("text-gold");
    }
    if (mobileLabel) {
      mobileLabel.textContent = "Sign In / Register";
    }
  }
}

window.openAuthModal = function(tab = 'login', forced = false) {
  const authModal = document.getElementById("auth-modal");
  const closeBtn = document.getElementById("close-auth-modal");
  const subtitle = document.getElementById("auth-modal-subtitle");
  const currentUser = window.getCurrentUser();

  if (forced || !currentUser) {
    window.isForcedAuth = true;
    if (closeBtn) closeBtn.classList.add("hidden");
    if (subtitle) {
      subtitle.innerHTML = `<span class="text-gold font-bold"><i class="fa-solid fa-lock mr-1"></i> Please Sign In or Register to experience DOCI</span>`;
    }
  } else {
    window.isForcedAuth = false;
    if (closeBtn) closeBtn.classList.remove("hidden");
    if (subtitle) {
      subtitle.textContent = "Welcome to the world of luxury fragrances";
    }
  }

  if (authModal) {
    window.switchAuthTab(tab);
    authModal.classList.remove("opacity-0", "pointer-events-none");
    const container = authModal.querySelector(".auth-modal-container");
    if (container) container.classList.remove("scale-95");
    document.body.style.overflow = "hidden";
    if (window.lenis) window.lenis.stop();
  }
};

window.closeAuthModal = function() {
  const currentUser = window.getCurrentUser();
  if (window.isForcedAuth && !currentUser) {
    showNotification("You must Sign In or Register an account to access the website!", "warning");
    return;
  }

  const authModal = document.getElementById("auth-modal");
  if (authModal) {
    authModal.classList.add("opacity-0", "pointer-events-none");
    const container = authModal.querySelector(".auth-modal-container");
    if (container) container.classList.add("scale-95");
    document.body.style.overflow = "";
    if (window.lenis) window.lenis.start();
  }
};

window.switchAuthTab = function(tab) {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const forgotForm = document.getElementById("forgot-form");
  const loginBtn = document.getElementById("auth-tab-login-btn");
  const regBtn = document.getElementById("auth-tab-register-btn");
  const subtitle = document.getElementById("auth-modal-subtitle");
  const currentUser = window.getCurrentUser();

  [loginForm, registerForm, forgotForm].forEach(f => f?.classList.add("hidden"));
  if (loginBtn) {
    loginBtn.className = "auth-tab-btn flex-1 py-2.5 text-center transition-all border-b-2 border-transparent text-gray-400 hover:text-white";
  }
  if (regBtn) {
    regBtn.className = "auth-tab-btn flex-1 py-2.5 text-center transition-all border-b-2 border-transparent text-gray-400 hover:text-white";
  }

  if (tab === 'login') {
    if (loginForm) loginForm.classList.remove("hidden");
    if (loginBtn) loginBtn.className = "auth-tab-btn active flex-1 py-2.5 text-center transition-all border-b-2 border-gold text-gold";
    if (subtitle && !currentUser) {
      subtitle.innerHTML = `<span class="text-gold font-bold"><i class="fa-solid fa-lock mr-1"></i> Please Sign In or Register to experience DOCI</span>`;
    }
  } else if (tab === 'register') {
    if (registerForm) registerForm.classList.remove("hidden");
    if (regBtn) regBtn.className = "auth-tab-btn active flex-1 py-2.5 text-center transition-all border-b-2 border-gold text-gold";
    if (subtitle && !currentUser) {
      subtitle.innerHTML = `<span class="text-gold font-bold"><i class="fa-solid fa-user-plus mr-1"></i> Register a New DOCI Perfume Account</span>`;
    }
  } else if (tab === 'forgot') {
    if (forgotForm) forgotForm.classList.remove("hidden");
    if (subtitle) subtitle.textContent = "Recover your DOCI Perfume account password";
  }
};

window.togglePasswordVisibility = function(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const icon = btn.querySelector("i");
  if (input.type === "password") {
    input.type = "text";
    if (icon) icon.className = "fa-regular fa-eye-slash text-gold";
  } else {
    input.type = "password";
    if (icon) icon.className = "fa-regular fa-eye";
  }
};

window.fillDemoAccount = function() {
  const emailInput = document.getElementById("login-email");
  const passInput = document.getElementById("login-password");
  if (emailInput) emailInput.value = "khachhang@gmail.com";
  if (passInput) passInput.value = "123456";
  showNotification("Filled demo account credentials into form!", "info");
};

function handleLogin(emailOrPhone, password) {
  if (!emailOrPhone || !password) {
    showNotification("Please enter your email or phone number and password!", "warning");
    return;
  }

  let users = window.getAllUsers();
  const inputClean = emailOrPhone.trim().toLowerCase();
  const passClean = password.trim();

  // Search user with safe null/undefined checks
  let foundUser = users.find(u => {
    if (!u) return false;
    const uEmail = (u.email || "").trim().toLowerCase();
    const uPhone = (u.phone || "").trim();
    const matchesEmailOrPhone = (uEmail && uEmail === inputClean) || (uPhone && uPhone === inputClean) || (uPhone && uPhone === emailOrPhone.trim());
    return matchesEmailOrPhone && (u.password === passClean || u.password === password);
  });

  // Auto-create/recover demo account if missing
  if (!foundUser && (inputClean === "khachhang@gmail.com" || inputClean === "0901234567") && passClean === "123456") {
    foundUser = {
      id: "USR001",
      name: "DOCI Customer",
      email: "khachhang@gmail.com",
      phone: "0901234567",
      address: "123 Nguyen Trai, District 1, Ho Chi Minh City",
      password: "123456",
      created_at: new Date().toISOString()
    };
    users.push(foundUser);
    localStorage.setItem("doci_users", JSON.stringify(users));
  }

  if (foundUser) {
    localStorage.setItem("doci_current_user", JSON.stringify(foundUser));
    window.isForcedAuth = false;
    const closeBtn = document.getElementById("close-auth-modal");
    if (closeBtn) closeBtn.classList.remove("hidden");
    
    renderUserHeaderUI();
    window.closeAuthModal();
    showNotification(`Login successful! Welcome ${foundUser.name}.`, "success");
    window.autoFillCheckoutForm();
  } else {
    showNotification("Incorrect email/phone number or password!", "error");
  }
}

function handleRegister(name, email, phone, password, confirmPassword) {
  if (!name || !email || !phone || !password) {
    showNotification("Please fill in all required fields!", "warning");
    return;
  }

  if (password !== confirmPassword) {
    showNotification("Confirmation password does not match!", "error");
    return;
  }

  const users = window.getAllUsers();
  const cleanEmail = email.trim().toLowerCase();
  const cleanPhone = phone.trim();

  const existingUser = users.find(u => {
    if (!u) return false;
    const uEmail = (u.email || "").trim().toLowerCase();
    const uPhone = (u.phone || "").trim();
    return (uEmail && uEmail === cleanEmail) || (uPhone && uPhone === cleanPhone);
  });
  
  if (existingUser) {
    showNotification("This email or phone number is already registered!", "error");
    return;
  }

  const newUser = {
    id: "USR" + Date.now(),
    name: name.trim(),
    email: cleanEmail,
    phone: cleanPhone,
    address: "",
    password,
    created_at: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem("doci_users", JSON.stringify(users));
  localStorage.setItem("doci_current_user", JSON.stringify(newUser));

  window.isForcedAuth = false;
  const closeBtn = document.getElementById("close-auth-modal");
  if (closeBtn) closeBtn.classList.remove("hidden");

  renderUserHeaderUI();
  window.closeAuthModal();
  showNotification(`Account registered successfully! Welcome ${newUser.name} to DOCI Perfume.`, "success");
}

function handleForgotPassword(emailOrPhone) {
  if (!emailOrPhone) {
    showNotification("Please enter your registered email or phone number!", "warning");
    return;
  }

  const users = window.getAllUsers();
  const cleanInput = emailOrPhone.trim().toLowerCase();
  
  const foundUser = users.find(u => {
    if (!u) return false;
    const uEmail = (u.email || "").trim().toLowerCase();
    const uPhone = (u.phone || "").trim();
    return (uEmail && uEmail === cleanInput) || (uPhone && uPhone === cleanInput) || (uPhone && uPhone === emailOrPhone.trim());
  });

  if (foundUser) {
    showNotification(`Your password is: ${foundUser.password}`, "info");
    window.switchAuthTab('login');
    const loginEmail = document.getElementById("login-email");
    const loginPass = document.getElementById("login-password");
    if (loginEmail) loginEmail.value = foundUser.email;
    if (loginPass) loginPass.value = foundUser.password;
  } else {
    showNotification("No account found with the provided information!", "error");
  }
}

window.handleLogout = function() {
  localStorage.removeItem("doci_current_user");
  renderUserHeaderUI();
  window.closeAccountModal();
  showNotification("Account logged out successfully.", "info");
  setTimeout(() => {
    window.openAuthModal('login', true);
  }, 400);
};

window.openAccountModal = function(tab = 'profile') {
  const accountModal = document.getElementById("account-modal");
  const currentUser = window.getCurrentUser();
  if (!currentUser) {
    window.openAuthModal('login');
    return;
  }

  if (accountModal) {
    const nameEl = document.getElementById("account-user-name");
    const emailEl = document.getElementById("account-user-email");
    if (nameEl) nameEl.textContent = currentUser.name;
    if (emailEl) emailEl.textContent = currentUser.email;

    window.switchAccountTab(tab);
    accountModal.classList.remove("opacity-0", "pointer-events-none");
    const container = accountModal.querySelector(".account-modal-container");
    if (container) container.classList.remove("scale-95");
    document.body.style.overflow = "hidden";
  }
};

window.closeAccountModal = function() {
  const accountModal = document.getElementById("account-modal");
  if (accountModal) {
    accountModal.classList.add("opacity-0", "pointer-events-none");
    const container = accountModal.querySelector(".account-modal-container");
    if (container) container.classList.add("scale-95");
    document.body.style.overflow = "";
  }
};

window.switchAccountTab = function(tab) {
  const profileForm = document.getElementById("account-profile-form");
  const ordersContainer = document.getElementById("account-orders-container");
  const passwordForm = document.getElementById("account-password-form");

  const profileBtn = document.getElementById("account-tab-profile-btn");
  const ordersBtn = document.getElementById("account-tab-orders-btn");
  const passwordBtn = document.getElementById("account-tab-password-btn");

  [profileForm, ordersContainer, passwordForm].forEach(el => el?.classList.add("hidden"));
  [profileBtn, ordersBtn, passwordBtn].forEach(btn => {
    if (btn) btn.className = "account-tab-btn px-4 py-2.5 text-gray-400 hover:text-white border-b-2 border-transparent whitespace-nowrap transition-all";
  });

  if (tab === 'profile') {
    if (profileForm) profileForm.classList.remove("hidden");
    if (profileBtn) profileBtn.className = "account-tab-btn active px-4 py-2.5 text-gold border-b-2 border-gold whitespace-nowrap transition-all";
    fillProfileFormData();
  } else if (tab === 'orders') {
    if (ordersContainer) ordersContainer.classList.remove("hidden");
    if (ordersBtn) ordersBtn.className = "account-tab-btn active px-4 py-2.5 text-gold border-b-2 border-gold whitespace-nowrap transition-all";
    renderUserOrdersList();
  } else if (tab === 'password') {
    if (passwordForm) passwordForm.classList.remove("hidden");
    if (passwordBtn) passwordBtn.className = "account-tab-btn active px-4 py-2.5 text-gold border-b-2 border-gold whitespace-nowrap transition-all";
  }
};

function fillProfileFormData() {
  const currentUser = window.getCurrentUser();
  if (!currentUser) return;

  const nameInput = document.getElementById("acc-profile-name");
  const phoneInput = document.getElementById("acc-profile-phone");
  const emailInput = document.getElementById("acc-profile-email");
  const addressInput = document.getElementById("acc-profile-address");

  if (nameInput) nameInput.value = currentUser.name || "";
  if (phoneInput) phoneInput.value = currentUser.phone || "";
  if (emailInput) emailInput.value = currentUser.email || "";
  if (addressInput) addressInput.value = currentUser.address || "";
}

function handleUpdateProfile() {
  const currentUser = window.getCurrentUser();
  if (!currentUser) return;

  const name = document.getElementById("acc-profile-name").value.trim();
  const phone = document.getElementById("acc-profile-phone").value.trim();
  const address = document.getElementById("acc-profile-address").value.trim();

  if (!name || !phone) {
    showNotification("Full name and Phone number cannot be empty!", "error");
    return;
  }

  const users = window.getAllUsers();
  const userIdx = users.findIndex(u => u.email === currentUser.email);

  if (userIdx !== -1) {
    users[userIdx].name = name;
    users[userIdx].phone = phone;
    users[userIdx].address = address;

    localStorage.setItem("doci_users", JSON.stringify(users));
    localStorage.setItem("doci_current_user", JSON.stringify(users[userIdx]));

    renderUserHeaderUI();
    showNotification("Personal profile updated successfully!", "success");
    window.autoFillCheckoutForm();
  }
}

function handleChangePassword() {
  const currentUser = window.getCurrentUser();
  if (!currentUser) return;

  const oldPass = document.getElementById("acc-old-pass").value;
  const newPass = document.getElementById("acc-new-pass").value;
  const confirmNewPass = document.getElementById("acc-confirm-new-pass").value;

  if (oldPass !== currentUser.password) {
    showNotification("Current password is incorrect!", "error");
    return;
  }

  if (newPass !== confirmNewPass) {
    showNotification("New password confirmation does not match!", "error");
    return;
  }

  const users = window.getAllUsers();
  const userIdx = users.findIndex(u => u.email === currentUser.email);

  if (userIdx !== -1) {
    users[userIdx].password = newPass;
    localStorage.setItem("doci_users", JSON.stringify(users));
    localStorage.setItem("doci_current_user", JSON.stringify(users[userIdx]));

    document.getElementById("account-password-form")?.reset();
    showNotification("Password changed successfully!", "success");
  }
}

function renderUserOrdersList() {
  const currentUser = window.getCurrentUser();
  const container = document.getElementById("user-orders-list");
  const countBadge = document.getElementById("account-order-count");
  if (!container) return;

  if (!currentUser) {
    container.innerHTML = `<p class="text-xs text-gray-400 text-center py-6">Please sign in to view your order history.</p>`;
    return;
  }

  const allOrders = JSON.parse(localStorage.getItem("doci_orders") || "[]");
  const userOrders = allOrders.filter(o => 
    (o.userEmail && o.userEmail.toLowerCase() === currentUser.email.toLowerCase()) ||
    (o.customerEmail && o.customerEmail.toLowerCase() === currentUser.email.toLowerCase()) ||
    (o.customerPhone === currentUser.phone)
  );

  if (countBadge) countBadge.textContent = userOrders.length;

  if (userOrders.length === 0) {
    container.innerHTML = `
      <div class="text-center py-10 px-4 bg-white/5 border border-white/10 rounded-2xl space-y-2">
        <i class="fa-solid fa-box-open text-gray-500 text-3xl mb-1 block"></i>
        <h4 class="text-sm font-bold text-white">You have no orders yet</h4>
        <p class="text-xs text-gray-400">Explore DOCI's luxury perfume collection and order now!</p>
        <button onclick="closeAccountModal()" class="btn-luxury btn-luxury-solid px-5 py-2 text-xs rounded-xl mt-3">
          Explore Fragrances
        </button>
      </div>
    `;
    return;
  }

  let html = "";
  userOrders.forEach(order => {
    const orderDate = order.date ? new Date(order.date).toLocaleString("en-US") : "Recent";
    const statusMap = {
      pending: { text: "Pending Confirmation", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
      processing: { text: "Processing", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
      shipped: { text: "Shipped", color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" },
      completed: { text: "Completed", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
      cancelled: { text: "Cancelled", color: "bg-red-500/20 text-red-400 border-red-500/30" }
    };
    const st = statusMap[order.status] || statusMap.pending;

    let itemsHtml = "";
    if (Array.isArray(order.items)) {
      itemsHtml = order.items.map(item => `
        <div class="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-0">
          <span class="text-gray-300 font-medium">${item.name || item.id} <span class="text-gold">x${item.quantity}</span></span>
          <span class="text-gray-400">${((item.price || 0) * item.quantity).toLocaleString()} VND</span>
        </div>
      `).join('');
    }

    html += `
      <div class="bg-black/40 border border-white/10 rounded-xl p-4 space-y-3 hover:border-gold/30 transition-colors">
        <div class="flex items-center justify-between border-b border-white/10 pb-2">
          <div>
            <span class="text-xs font-bold text-gold tracking-wider">Order ID: #${order.id}</span>
            <span class="text-[10px] text-gray-400 block">${orderDate}</span>
          </div>
          <span class="px-2.5 py-1 rounded-full text-[10px] font-bold border ${st.color}">
            ${st.text}
          </span>
        </div>

        <div class="space-y-1">
          ${itemsHtml}
        </div>

        <div class="flex justify-between items-center pt-2 border-t border-white/10">
          <span class="text-[11px] text-gray-400">Payment: <strong class="text-gray-200">${order.paymentMethod === 'bank' ? 'VietQR SePay' : 'COD'}</strong></span>
          <div class="text-right">
            <span class="text-[10px] text-gray-400 uppercase">Total:</span>
            <span class="text-sm font-bold text-gold ml-1">${(order.totalPrice || 0).toLocaleString()} VND</span>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Tự động điền dữ liệu người dùng khi mở Checkout Form
window.autoFillCheckoutForm = function() {
  const currentUser = window.getCurrentUser();
  if (!currentUser) return;

  const nameInput = document.getElementById("order-fullname");
  const phoneInput = document.getElementById("order-phone");
  const addressInput = document.getElementById("order-address");

  if (nameInput && !nameInput.value) nameInput.value = currentUser.name || "";
  if (phoneInput && !phoneInput.value) phoneInput.value = currentUser.phone || "";
  if (addressInput && !addressInput.value) addressInput.value = currentUser.address || "";
};

// Tự động khởi chạy hệ thống Auth khi trang load xong
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initUserAuth);
} else {
  initUserAuth();
}



