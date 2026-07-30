<!-- 5. PHẦN SẢN PHẨM BÁN CHẠY NHẤT (BỘ TRƯỢT SLIDE) -->
    <section id="best-sellers" class="py-24 bg-darkBg relative">
      <div class="container mx-auto px-4 md:px-8">
        <div
          class="flex flex-col md:flex-row items-center justify-between mb-12"
        >
          <div data-aos="fade-right">
            <span
              class="text-xs font-semibold tracking-wide text-gold uppercase block mb-1"
              >POPULAR SCENTS</span
            >
            <h2 class="font-title text-3xl font-bold text-white">
              Best Sellers
            </h2>
          </div>

          <!-- Nút Swiper controls -->
          <div class="flex gap-3 mt-4 md:mt-0" data-aos="fade-left">
            <button
              class="swiper-button-prev-best w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-colors"
            >
              <i class="fa-solid fa-chevron-left text-xs"></i>
            </button>
            <button
              class="swiper-button-next-best w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-colors"
            >
              <i class="fa-solid fa-chevron-right text-xs"></i>
            </button>
          </div>
        </div>

        <!-- Swiper Slider Container -->
        <div class="swiper best-seller-swiper py-4" data-aos="fade-up">
          <div class="swiper-wrapper">
            <!-- Slide 1: Yes Sir -->
            <div class="swiper-slide glass-card overflow-hidden group relative">
              <div class="ribbon-badge">Best Seller</div>
              <div
                class="product-img-wrapper cursor-pointer"
                onclick="openDetails('men-ves-sir')"
              >
                <img
                  src="assets/images/1783734467461_7983307016412442049_g2758941255649715778_3225eab47b7f0c8a09b1b9593a06cc85.jpg"
                  alt="DOCI YES SIR"
                />
                <div class="product-hover-actions">
                  <button
                    class="w-10 h-10 rounded-full bg-[#D4AF37] text-[#111111] flex items-center justify-center hover:scale-110 transition-transform"
                    onclick="
                      event.stopPropagation();
                      openDetails('men-ves-sir');
                    "
                    title="View Details"
                  >
                    <i class="fa-solid fa-eye"></i>
                  </button>
                  <button
                    class="w-10 h-10 rounded-full bg-white text-[#111111] flex items-center justify-center hover:scale-110 transition-transform"
                    onclick="
                      event.stopPropagation();
                      addToCart('men-ves-sir');
                    "
                    title="Add to Cart"
                  >
                    <i class="fa-solid fa-shopping-bag"></i>
                  </button>
                </div>
              </div>
              <div class="glass-card-info">
                <div>
                  <span
                    class="text-[10px] text-gold uppercase tracking-wide block mb-1"
                    >For Men • Fresh & Crisp</span
                  >
                  <h3
                    class="font-title text-md font-bold mt-1 text-white group-hover:text-gold transition-colors cursor-pointer"
                    onclick="openDetails('men-ves-sir')"
                  >
                    DOCI YES SIR
                  </h3>
                  <p class="text-[10px] text-gray-500 italic mb-3">
                    Inspired by YSL Y EDP
                  </p>
                  <div class="flex flex-wrap gap-1 mb-4">
                    <span class="product-spec-item">Longevity: 6-8h</span>
                    <span class="product-spec-item">Projection: 1-2m</span>
                  </div>
                </div>
                <div>
                  <div class="flex items-baseline gap-2 mb-4">
                    <span class="text-sm font-bold text-gold">319,000 VND</span>
                    <span class="text-[10px] text-gray-500 line-through"
                      >450,000 VND</span
                    >
                  </div>
                  <button
                    class="w-full btn-luxury"
                    onclick="addToCart('men-ves-sir')"
                  >
                    SHOP NOW
                  </button>
                </div>
              </div>
            </div>

            <!-- Slide 2: Slay Queen -->
            <div class="swiper-slide glass-card overflow-hidden group relative">
              <div class="ribbon-badge">Best Seller</div>
              <div
                class="product-img-wrapper cursor-pointer"
                onclick="openDetails('women-slay-queen')"
              >
                <img
                  src="assets/images/1783734471142_7983307016412442049_g2758941255649715778_b8d42bec3e3ae33de4fdae80d066a4a1.jpg"
                  alt="DOCI Slay Queen"
                />
                <div class="product-hover-actions">
                  <button
                    class="w-10 h-10 rounded-full bg-[#D4AF37] text-[#111111] flex items-center justify-center hover:scale-110 transition-transform"
                    onclick="
                      event.stopPropagation();
                      openDetails('women-slay-queen');
                    "
                    title="View Details"
                  >
                    <i class="fa-solid fa-eye"></i>
                  </button>
                  <button
                    class="w-10 h-10 rounded-full bg-white text-[#111111] flex items-center justify-center hover:scale-110 transition-transform"
                    onclick="
                      event.stopPropagation();
                      addToCart('women-slay-queen');
                    "
                    title="Add to Cart"
                  >
                    <i class="fa-solid fa-shopping-bag"></i>
                  </button>
                </div>
              </div>
              <div class="glass-card-info">
                <div>
                  <span
                    class="text-[10px] text-gold uppercase tracking-wide block mb-1"
                    >For Women • Seductive</span
                  >
                  <h3
                    class="font-title text-md font-bold mt-1 text-white group-hover:text-gold transition-colors cursor-pointer"
                    onclick="openDetails('women-slay-queen')"
                  >
                    DOCI SLAY QUEEN
                  </h3>
                  <p class="text-[10px] text-gray-500 italic mb-3">
                    Inspired by Good Girl
                  </p>
                  <div class="flex flex-wrap gap-1 mb-4">
                    <span class="product-spec-item">Longevity: 6-8h</span>
                    <span class="product-spec-item">Projection: 1-2m</span>
                  </div>
                </div>
                <div>
                  <div class="flex items-baseline gap-2 mb-4">
                    <span class="text-sm font-bold text-gold">319,000 VND</span>
                    <span class="text-[10px] text-gray-500 line-through"
                      >450.000đ</span
                    >
                  </div>
                  <button
                    class="w-full btn-luxury"
                    onclick="addToCart('women-slay-queen')"
                  >
                    MUA NGAY
                  </button>
                </div>
              </div>
            </div>

            <!-- Slide 3: Nice Navy -->
            <div class="swiper-slide glass-card overflow-hidden group relative">
              <div class="ribbon-badge">Best Seller</div>
              <div
                class="product-img-wrapper cursor-pointer"
                onclick="openDetails('men-nice-navy')"
              >
                <img
                  src="assets/images/1783734467465_7983307016412442049_g2758941255649715778_04822642e5e316fe53c2df7ead3066bb.jpg"
                  alt="DOCI Nice Navy"
                />
                <div class="product-hover-actions">
                  <button
                    class="w-10 h-10 rounded-full bg-[#D4AF37] text-[#111111] flex items-center justify-center hover:scale-110 transition-transform"
                    onclick="
                      event.stopPropagation();
                      openDetails('men-nice-navy');
                    "
                    title="View Details"
                  >
                    <i class="fa-solid fa-eye"></i>
                  </button>
                  <button
                    class="w-10 h-10 rounded-full bg-white text-[#111111] flex items-center justify-center hover:scale-110 transition-transform"
                    onclick="
                      event.stopPropagation();
                      addToCart('men-nice-navy');
                    "
                    title="Add to Cart"
                  >
                    <i class="fa-solid fa-shopping-bag"></i>
                  </button>
                </div>
              </div>
              <div class="glass-card-info">
                <div>
                  <span
                    class="text-[10px] text-gold uppercase tracking-wide block mb-1"
                    >For Men • Luxury & Elegant</span
                  >
                  <h3
                    class="font-title text-md font-bold mt-1 text-white group-hover:text-gold transition-colors cursor-pointer"
                    onclick="openDetails('men-nice-navy')"
                  >
                    DOCI NICE NAVY
                  </h3>
                  <p class="text-[10px] text-gray-500 italic mb-3">
                    Inspired by Bleu de Chanel
                  </p>
                  <div class="flex flex-wrap gap-1 mb-4">
                    <span class="product-spec-item">Longevity: 6-8h</span>
                    <span class="product-spec-item">Projection: 1-2m</span>
                  </div>
                </div>
                <div>
                  <div class="flex items-baseline gap-2 mb-4">
                    <span class="text-sm font-bold text-gold">319,000 VND</span>
                    <span class="text-[10px] text-gray-500 line-through"
                      >450,000 VND</span
                    >
                  </div>
                  <button
                    class="w-full btn-luxury"
                    onclick="addToCart('men-nice-navy')"
                  >
                    SHOP NOW
                  </button>
                </div>
              </div>
            </div>

            <!-- Slide 4: Madam Co -->
            <div class="swiper-slide glass-card overflow-hidden group relative">
              <div class="ribbon-badge">Best Seller</div>
              <div
                class="product-img-wrapper cursor-pointer"
                onclick="openDetails('women-madam-co')"
              >
                <img
                  src="assets/images/1783734471165_7983307016412442049_g2758941255649715778_3ffd0583d861e7e4dcbdba4afd79c2bc.jpg"
                  alt="DOCI Madam Co"
                />
                <div class="product-hover-actions">
                  <button
                    class="w-10 h-10 rounded-full bg-[#D4AF37] text-[#111111] flex items-center justify-center hover:scale-110 transition-transform"
                    onclick="
                      event.stopPropagation();
                      openDetails('women-madam-co');
                    "
                    title="View Details"
                  >
                    <i class="fa-solid fa-eye"></i>
                  </button>
                  <button
                    class="w-10 h-10 rounded-full bg-white text-[#111111] flex items-center justify-center hover:scale-110 transition-transform"
                    onclick="
                      event.stopPropagation();
                      addToCart('women-madam-co');
                    "
                    title="Add to Cart"
                  >
                    <i class="fa-solid fa-shopping-bag"></i>
                  </button>
                </div>
              </div>
              <div class="glass-card-info">
                <div>
                  <span
                    class="text-[10px] text-gold uppercase tracking-wide block mb-1"
                    >For Women • Elegance</span
                  >
                  <h3
                    class="font-title text-md font-bold mt-1 text-white group-hover:text-gold transition-colors cursor-pointer"
                    onclick="openDetails('women-madam-co')"
                  >
                    DOCI MADAM CO
                  </h3>
                  <p class="text-[10px] text-gray-500 italic mb-3">
                    Inspired by Coco Chanel
                  </p>
                  <div class="flex flex-wrap gap-1 mb-4">
                    <span class="product-spec-item">Longevity: 6-8h</span>
                    <span class="product-spec-item">Projection: 1-2m</span>
                  </div>
                </div>
                <div>
                  <div class="flex items-baseline gap-2 mb-4">
                    <span class="text-sm font-bold text-gold">319,000 VND</span>
                    <span class="text-[10px] text-gray-500 line-through"
                      >450,000 VND</span
                    >
                  </div>
                  <button
                    class="w-full btn-luxury"
                    onclick="addToCart('women-madam-co')"
                  >
                    SHOP NOW
                  </button>
                </div>
              </div>
            </div>

            <!-- Slide 5: Old King -->
            <div class="swiper-slide glass-card overflow-hidden group relative">
              <div class="ribbon-badge">Best Seller</div>
              <div
                class="product-img-wrapper cursor-pointer"
                onclick="openDetails('men-old-king')"
              >
                <img
                  src="assets/images/1783734467471_7983307016412442049_g2758941255649715778_14a3b6ba4f2ad5fdd9c4bc0359afbcaa.jpg"
                  alt="DOCI Old King"
                />
                <div class="product-hover-actions">
                  <button
                    class="w-10 h-10 rounded-full bg-[#D4AF37] text-[#111111] flex items-center justify-center hover:scale-110 transition-transform"
                    onclick="
                      event.stopPropagation();
                      openDetails('men-old-king');
                    "
                    title="View Details"
                  >
                    <i class="fa-solid fa-eye"></i>
                  </button>
                  <button
                    class="w-10 h-10 rounded-full bg-white text-[#111111] flex items-center justify-center hover:scale-110 transition-transform"
                    onclick="
                      event.stopPropagation();
                      addToCart('men-old-king');
                    "
                    title="Add to Cart"
                  >
                    <i class="fa-solid fa-shopping-bag"></i>
                  </button>
                </div>
              </div>
              <div class="glass-card-info">
                <div>
                  <span
                    class="text-[10px] text-gold uppercase tracking-wide block mb-1"
                    >For Men • Regal & Bold</span
                  >
                  <h3
                    class="font-title text-md font-bold mt-1 text-white group-hover:text-gold transition-colors cursor-pointer"
                    onclick="openDetails('men-old-king')"
                  >
                    DOCI OLD KING
                  </h3>
                  <p class="text-[10px] text-gray-500 italic mb-3">
                    Inspired by Creed Aventus
                  </p>
                  <div class="flex flex-wrap gap-1 mb-4">
                    <span class="product-spec-item">Longevity: 6-8h</span>
                    <span class="product-spec-item">Projection: 1-2m</span>
                  </div>
                </div>
                <div>
                  <div class="flex items-baseline gap-2 mb-4">
                    <span class="text-sm font-bold text-gold">319,000 VND</span>
                    <span class="text-[10px] text-gray-500 line-through"
                      >450,000 VND</span
                    >
                  </div>
                  <button
                    class="w-full btn-luxury"
                    onclick="addToCart('men-old-king')"
                  >
                    SHOP NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

