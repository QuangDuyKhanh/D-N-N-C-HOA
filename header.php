<!doctype html>
<html lang="en" class="lenis">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DOCI PERFUME | Luxury Inspired Fragrance - High-End Perfumes</title>
    <meta
      name="description"
      content="Discover DOCI Perfume - Premium luxury fragrances inspired by world-renowned perfume icons. 6-8 hours longevity, 1-2m projection, exquisite design."
    />

    <!-- Favicon & Touch Icon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👑</text></svg>" />

    <!-- Mobile Browser Theme Color & PWA Meta -->
    <meta name="theme-color" content="#0A0A0A" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

    <!-- Open Graph / Facebook / Zalo Meta Tags -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://doci-perfume.vercel.app/" />
    <meta property="og:title" content="DOCI PERFUME | Luxury Inspired Fragrance" />
    <meta property="og:description" content="Perfumes inspired by global icon scents. Lasts 6-8h, 1-2m projection. Order today for special offers!" />
    <meta property="og:image" content="https://doci-perfume.vercel.app/assets/images/doci-bottle-presentation.jpg" />

    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="DOCI PERFUME | Luxury Inspired Fragrance" />
    <meta name="twitter:description" content="Premium luxury fragrance brand, 6-8 hours longevity, 1-2m projection. Exquisite design, exclusive gifts." />
    <meta name="twitter:image" content="https://doci-perfume.vercel.app/assets/images/doci-bottle-presentation.jpg" />

    <!-- Schema.org JSON-LD Structured Data for Google Rich Snippets -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Store",
      "name": "DOCI PERFUME",
      "image": "https://doci-perfume.vercel.app/assets/images/doci-bottle-presentation.jpg",
      "description": "Premium luxury fragrances inspired by world-renowned perfume icons. Lasts 6-8h, 1-2m projection.",
      "url": "https://doci-perfume.vercel.app/",
      "priceRange": "$$",
      "currenciesAccepted": "VND",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer, VietQR",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "1250"
      }
    }
    </script>

    <!-- Liên kết CDN cho CSS -->
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="assets/js/tailwind-config.js"></script>

    <!-- Phông chữ Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Montserrat:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />

    <!-- CSS Tùy Chỉnh cho Dự Án -->
    <link rel="stylesheet" href="assets/css/style.css" />

    <!-- Thư viện biểu tượng Font Awesome -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    />

    <!-- CSS Hiệu Ứng AOS Animation -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css"
    />

    <!-- CSS Bộ Slide SwiperJS -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css"
    />
  </head>
  <body>
    <!-- 1. MÀN HÌNH CHỜ (PRELOADER) -->
    <div id="preloader">
      <h1 class="preloader-logo text-3xl md:text-5xl font-bold">
        DOCI PERFUME
      </h1>
      <p
        class="text-[10px] text-gray-500 uppercase tracking-[4px] mt-2 font-light"
      >
        Luxury Inspired Fragrance
      </p>
      <div class="preloader-bar">
        <div class="preloader-progress"></div>
      </div>
    </div>

    <!-- Thanh tiến trình cuộn trang -->
    <div id="scroll-progress"></div>

    <!-- 2. THANH MENU ĐIỀU HƯỚNG CỐ ĐỊNH (STICKY NAV) -->
    <header
      class="fixed top-0 left-0 w-full z-50 transition-all duration-500 py-5 bg-transparent"
    >
      <div
        class="container mx-auto px-4 md:px-8 flex items-center justify-between"
      >
        <!-- Các liên kết Menu (Bên Trái) -->
        <nav
          class="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wide text-gray-300"
        >
          <a href="#hero-section" class="hover:text-gold transition-colors"
            >Home</a
          >
          <a href="#about-section" class="hover:text-gold transition-colors"
            >About Us</a
          >
          <a href="#best-sellers" class="hover:text-gold transition-colors"
            >Best Sellers</a
          >
          <a href="#quiz-section" class="hover:text-gold transition-colors"
            >Fragrance Quiz</a
          >
        </nav>

        <!-- Logo Thương hiệu ở Trung Tâm -->
        <a
          href="#hero-section"
          class="text-center flex flex-col justify-center items-center"
        >
          <span
            class="font-title text-2xl md:text-3xl font-bold tracking-[6px] text-white"
            >DOCI</span
          >
          <span
            class="text-[7px] md:text-[9px] uppercase tracking-[4px] text-[#D4AF37] font-semibold -mt-1"
            >PERFUME</span
          >
        </a>

        <!-- Các liên kết Menu & Biểu tượng (Bên Phải) -->
        <div class="flex items-center gap-4 md:gap-6">
          <nav
            class="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wide text-gray-300 mr-4"
          >
            <a
              href="#collections-section"
              class="hover:text-gold transition-colors"
              >Collections</a
            >
            <a href="#faq-section" class="hover:text-gold transition-colors"
              >FAQ</a
            >
            <a href="#contact-section" class="hover:text-gold transition-colors"
              >Contact</a
            >
          </nav>

          <!-- Nút chuyển đổi chế độ Sáng/Tối -->
          <button
            id="theme-toggle"
            class="text-white hover:text-gold transition-colors p-1"
            title="Toggle Dark/Light Mode"
          >
            <i class="fa-solid fa-sun text-lg"></i>
          </button>

          <!-- Biểu tượng Giỏ Hàng -->
          <button
            id="cart-toggle"
            class="relative text-white hover:text-gold transition-colors p-1"
            title="Shopping Cart"
          >
            <i class="fa-solid fa-shopping-bag text-lg"></i>
            <span
              id="cart-badge"
              class="absolute -top-1 -right-2 bg-gold text-[#111111] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center hidden"
              >0</span
            >
          </button>

          <!-- Nút Menu Hamburger (Chỉ hiển thị trên điện thoại) -->
          <button
            id="mobile-menu-toggle"
            class="lg:hidden text-white hover:text-gold transition-colors p-1"
            title="Open Menu"
            aria-label="Open Navigation Menu"
          >
            <i class="fa-solid fa-bars text-xl"></i>
          </button>
        </div>
      </div>
    </header>

    <!-- Lớp phủ Menu trên điện thoại -->
    <div
      id="mobile-menu-overlay"
      class="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 opacity-0 pointer-events-none transition-opacity duration-300 lg:hidden"
    ></div>

    <!-- Hộp trượt Menu trên điện thoại -->
    <div
      id="mobile-menu-drawer"
      class="fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-[#111111] border-l border-white/10 z-50 transform translate-x-full transition-transform duration-300 ease-in-out lg:hidden flex flex-col"
    >
      <!-- Phần đầu của Hộp trượt -->
      <div class="flex items-center justify-between px-6 py-5 border-b border-white/10">
        <div>
          <span class="font-title text-xl font-bold tracking-[4px] text-white">DOCI</span>
          <span class="text-[8px] uppercase tracking-[3px] text-[#D4AF37] block -mt-1">PERFUME</span>
        </div>
        <button id="mobile-menu-close" class="text-white hover:text-gold p-1" aria-label="Close Menu">
          <i class="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>

      <!-- Các liên kết điều hướng trong Hộp trượt -->
      <nav class="flex flex-col gap-1 px-4 py-4 flex-1 overflow-y-auto">
        <a href="#hero-section"    class="mobile-nav-link flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-gold hover:bg-white/5 transition-all text-sm font-semibold uppercase tracking-wide">
          <i class="fa-solid fa-house w-5 text-center text-gold"></i> Home
        </a>
        <a href="#about-section"   class="mobile-nav-link flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-gold hover:bg-white/5 transition-all text-sm font-semibold uppercase tracking-wide">
          <i class="fa-solid fa-star w-5 text-center text-gold"></i> About Us
        </a>
        <a href="#best-sellers"    class="mobile-nav-link flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-gold hover:bg-white/5 transition-all text-sm font-semibold uppercase tracking-wide">
          <i class="fa-solid fa-fire w-5 text-center text-gold"></i> Best Sellers
        </a>
        <a href="#collections-section" class="mobile-nav-link flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-gold hover:bg-white/5 transition-all text-sm font-semibold uppercase tracking-wide">
          <i class="fa-solid fa-grid-2 w-5 text-center text-gold"></i> Collections
        </a>
        <a href="#quiz-section"    class="mobile-nav-link flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-gold hover:bg-white/5 transition-all text-sm font-semibold uppercase tracking-wide">
          <i class="fa-solid fa-wand-magic-sparkles w-5 text-center text-gold"></i> Fragrance Quiz
        </a>
        <a href="#faq-section"     class="mobile-nav-link flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-gold hover:bg-white/5 transition-all text-sm font-semibold uppercase tracking-wide">
          <i class="fa-solid fa-circle-question w-5 text-center text-gold"></i> FAQ
        </a>
        <a href="#contact-section" class="mobile-nav-link flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-gold hover:bg-white/5 transition-all text-sm font-semibold uppercase tracking-wide">
          <i class="fa-solid fa-envelope w-5 text-center text-gold"></i> Contact
        </a>
      </nav>

      <!-- Nút kêu gọi hành động (CTA) ở chân Hộp trượt -->
      <div class="px-6 py-5 border-t border-white/10">
        <a
          href="#collections-section"
          class="mobile-nav-link btn-luxury btn-luxury-solid w-full block text-center text-xs py-3 rounded-xl"
        >SHOP NOW - 319,000 VND</a>
      </div>
    </div>
