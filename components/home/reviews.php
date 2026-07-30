<!-- 11. PHẦN NHẬN XÉT ĐÁNH GIÁ CỦA KHÁCH HÀNG -->
    <!-- 11. REVIEWS SECTION -->
    <section id="reviews-section" class="py-24 bg-darkBg relative">
      <div class="container mx-auto px-4 md:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <span
            class="text-xs font-semibold tracking-wide text-gold uppercase block mb-1"
            >CUSTOMER FEEDBACK</span
          >
          <h2 class="font-title text-3xl md:text-4xl font-bold text-white mb-4">
            Real Customer Reviews
          </h2>
          <div class="flex justify-center items-center gap-2">
            <span id="homepage-avg-rating-text" class="text-gold font-bold text-lg">4.8/5.0</span>
            <div id="homepage-avg-stars" class="flex text-gold text-xs">
              <!-- Rendered by JS -->
            </div>
            <span id="homepage-total-reviews-count" class="text-gray-400 text-xs"
              >(1,200+ Satisfied Customers)</span
            >
          </div>
        </div>

        <div class="swiper reviews-swiper py-4" data-aos="fade-up">
          <div class="swiper-wrapper">
            <!-- Rendered dynamically by JS -->
          </div>
          <div class="swiper-pagination-reviews text-center mt-6"></div>
        </div>

        <!-- Submit Review Form -->
        <div class="mt-16 max-w-2xl mx-auto" data-aos="fade-up">
          <div class="glass-card p-6 md:p-8 border border-[#D4AF37]/20 relative overflow-hidden">
            <div class="absolute -right-20 -top-20 w-40 h-40 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
            
            <h3 class="font-title text-xl font-bold text-white mb-2 text-center">
              Share Your Experience
            </h3>
            <p class="text-xs text-gray-400 text-center mb-6">
              Your feedback helps DOCI continually enhance our fragrance products and services.
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="text-[10px] uppercase tracking-wide text-gray-400 font-semibold mb-1 block">Your Name *</label>
                <input type="text" id="homepage-review-name" required placeholder="E.g., Alex Smith..." class="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-xs text-white" />
              </div>
              <div>
                <label class="text-[10px] uppercase tracking-wide text-gray-400 font-semibold mb-1 block">Purchased Scent *</label>
                <select id="homepage-review-perfume" required class="w-full bg-[#111111] border border-white/10 rounded px-4 py-2.5 text-xs text-white">
                  <option value="" disabled selected>Select scent...</option>
                  <option value="DOCI YES SIR">DOCI YES SIR</option>
                  <option value="DOCI NICE NAVY">DOCI NICE NAVY</option>
                  <option value="DOCI OLD KING">DOCI OLD KING</option>
                  <option value="DOCI BAD BOY">DOCI BAD BOY</option>
                  <option value="DOCI SLAY QUEEN">DOCI SLAY QUEEN</option>
                  <option value="DOCI MADAM CO">DOCI MADAM CO</option>
                  <option value="DOCI Hộp Tester">10-Scent Tester Set</option>
                </select>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="text-[10px] uppercase tracking-wide text-gray-400 font-semibold mb-1 block">Your Location *</label>
                <input type="text" id="homepage-review-location" required placeholder="E.g., London, NY, HCMC..." class="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-xs text-white" />
              </div>
              <div>
                <label class="text-[10px] uppercase tracking-wide text-gray-400 font-semibold mb-1 block">Star Rating *</label>
                <div class="flex items-center gap-1.5 mt-2 text-gray-400 text-xl cursor-pointer select-none" id="homepage-star-selector">
                  <i class="fa-regular fa-star hover:text-[#D4AF37] transition-colors" data-value="1"></i>
                  <i class="fa-regular fa-star hover:text-[#D4AF37] transition-colors" data-value="2"></i>
                  <i class="fa-regular fa-star hover:text-[#D4AF37] transition-colors" data-value="3"></i>
                  <i class="fa-regular fa-star hover:text-[#D4AF37] transition-colors" data-value="4"></i>
                  <i class="fa-regular fa-star hover:text-[#D4AF37] transition-colors" data-value="5"></i>
                  <input type="hidden" id="homepage-review-stars-value" value="0" />
                </div>
              </div>
            </div>
            
            <div class="mb-6">
              <label class="text-[10px] uppercase tracking-wide text-gray-400 font-semibold mb-1 block">Review Details *</label>
              <textarea id="homepage-review-content" required rows="3" placeholder="Share your thoughts on scent, longevity, packaging..." class="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-xs text-white resize-none"></textarea>
            </div>
            
            <div class="text-center">
              <button type="button" id="homepage-submit-review-btn" class="btn-luxury btn-luxury-solid py-3 px-8 text-xs font-semibold tracking-wider">
                SUBMIT YOUR REVIEW
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 12. CERTIFICATION & BRAND CREDIBILITY -->
    <section id="certificate-section" class="py-24 bg-darkSurface relative overflow-hidden">
      <div class="absolute -right-32 -bottom-32 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
      <div class="absolute -left-32 -top-32 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
      
      <div class="container mx-auto px-4 md:px-8 relative z-10">
        <div class="text-center mb-16" data-aos="fade-up">
          <span
            class="text-xs font-semibold tracking-wide text-gold uppercase block mb-1"
            >CERTIFIED & LEGALLY COMPLIANT</span
          >
          <h2 class="font-title text-2xl md:text-4xl font-bold text-white max-w-3xl mx-auto leading-snug">
            Why DOCI PERFUME is a trusted luxury fragrance brand
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div class="lg:col-span-5" data-aos="fade-right">
            <div class="glass-card p-4 rounded-2xl border border-gold/10 hover:border-gold/30 transition-all duration-500 shadow-2xl relative group">
              <span class="absolute top-6 left-6 z-20 bg-gold text-black text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                Ministry of Health Certified
              </span>
              
              <div class="swiper certificate-swiper overflow-hidden rounded-xl bg-white/5 border border-white/5 relative" style="width: 100%; aspect-ratio: 3/4;">
                <div class="swiper-wrapper">
                  <div class="swiper-slide relative cursor-zoom-in group" onclick="openLightbox('assets/images/certificates/cert-01.jpg')">
                    <img src="assets/images/certificates/cert-01.jpg" alt="DOCI Certification Page 1" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div class="swiper-slide relative cursor-zoom-in group" onclick="openLightbox('assets/images/certificates/cert-02.jpg')">
                    <img src="assets/images/certificates/cert-02.jpg" alt="DOCI Certification Page 2" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div class="swiper-slide relative cursor-zoom-in group" onclick="openLightbox('assets/images/certificates/cert-03.jpg')">
                    <img src="assets/images/certificates/cert-03.jpg" alt="DOCI Certification Page 3" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>

                <div class="swiper-button-prev cert-prev" title="Previous Page">
                  <i class="fa-solid fa-chevron-left text-base"></i>
                </div>
                <div class="swiper-button-next cert-next" title="Next Page">
                  <i class="fa-solid fa-chevron-right text-base"></i>
                </div>
                <div class="swiper-pagination cert-pagination !bottom-4"></div>
              </div>
              
              <p class="text-center text-[10px] text-gray-500 mt-3 font-light italic">
                * Click image to zoom / Swipe to switch slides
              </p>
            </div>
          </div>

          <div class="lg:col-span-7 flex flex-col justify-center" data-aos="fade-left">
            <div class="glass-card p-8 md:p-10 rounded-2xl border border-white/5 bg-white/[0.01]">
              <h3 class="font-title text-xl md:text-2xl font-bold text-gold mb-8 flex items-center gap-3">
                <i class="fa-solid fa-handshake text-gold"></i> Commitment to Quality & Excellence
              </h3>
              
              <ul class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                <li class="flex items-start gap-3.5 group">
                  <span class="w-6 h-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-xs flex-shrink-0">
                    <i class="fa-solid fa-check"></i>
                  </span>
                  <div>
                    <h4 class="text-xs font-bold text-white tracking-wide uppercase mb-1">Clear Legal Compliance</h4>
                    <p class="text-[11px] text-gray-400 font-light leading-relaxed">Fully certified and transparent product declarations.</p>
                  </div>
                </li>
                
                <li class="flex items-start gap-3.5 group">
                  <span class="w-6 h-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-xs flex-shrink-0">
                    <i class="fa-solid fa-check"></i>
                  </span>
                  <div>
                    <h4 class="text-xs font-bold text-white tracking-wide uppercase mb-1">Official Health Permits</h4>
                    <p class="text-[11px] text-gray-400 font-light leading-relaxed">Approved for nationwide distribution by Health Authorities.</p>
                  </div>
                </li>
                
                <li class="flex items-start gap-3.5 group">
                  <span class="w-6 h-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-xs flex-shrink-0">
                    <i class="fa-solid fa-check"></i>
                  </span>
                  <div>
                    <h4 class="text-xs font-bold text-white tracking-wide uppercase mb-1">Top-Tier EDP Standard</h4>
                    <p class="text-[11px] text-gray-400 font-light leading-relaxed">Concentrated Eau De Parfum formula for 6-8+ hours duration.</p>
                  </div>
                </li>
                
                <li class="flex items-start gap-3.5 group">
                  <span class="w-6 h-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-xs flex-shrink-0">
                    <i class="fa-solid fa-check"></i>
                  </span>
                  <div>
                    <h4 class="text-xs font-bold text-white tracking-wide uppercase mb-1">Imported French Essences</h4>
                    <p class="text-[11px] text-gray-400 font-light leading-relaxed">High-grade essential oils directly imported from European labs.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
