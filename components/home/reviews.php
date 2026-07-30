<!-- 11. PHẦN NHẬN XÉT ĐÁNH GIÁ CỦA KHÁCH HÀNG -->
    <!-- 11. PHẦN NHẬN XÉT ĐÁNH GIÁ CỦA KHÁCH HÀNG -->
    <section id="reviews-section" class="py-24 bg-darkBg relative">
      <div class="container mx-auto px-4 md:px-8">
        <div class="text-center mb-16" data-aos="fade-up">
          <span
            class="text-xs font-semibold tracking-wide text-gold uppercase block mb-1"
            >KHÁCH HÀNG CHIA SẺ</span
          >
          <h2 class="font-title text-3xl md:text-4xl font-bold text-white mb-4">
            Đánh Giá Thực Tế
          </h2>
          <div class="flex justify-center items-center gap-2">
            <span id="homepage-avg-rating-text" class="text-gold font-bold text-lg">4.8/5.0</span>
            <div id="homepage-avg-stars" class="flex text-gold text-xs">
              <!-- Sẽ được vẽ bằng JS -->
            </div>
            <span id="homepage-total-reviews-count" class="text-gray-400 text-xs"
              >(1,200+ Khách hàng tin dùng)</span
            >
          </div>
        </div>

        <!-- Hộp chứa bộ trượt Swiper -->
        <div class="swiper reviews-swiper py-4" data-aos="fade-up">
          <div class="swiper-wrapper">
            <!-- Sẽ được vẽ động bằng JS -->
          </div>
          <!-- Swiper Pagination -->
          <div class="swiper-pagination-reviews text-center mt-6"></div>
        </div>

        <!-- Form gửi đánh giá trực tiếp trên trang chủ -->
        <div class="mt-16 max-w-2xl mx-auto" data-aos="fade-up">
          <div class="glass-card p-6 md:p-8 border border-[#D4AF37]/20 relative overflow-hidden">
            <!-- Hiệu ứng hào quang nền sáng -->
            <div class="absolute -right-20 -top-20 w-40 h-40 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
            
            <h3 class="font-title text-xl font-bold text-white mb-2 text-center">
              Chia sẻ trải nghiệm của bạn
            </h3>
            <p class="text-xs text-gray-400 text-center mb-6">
              Ý kiến của bạn giúp DOCI hoàn thiện chất lượng sản phẩm & dịch vụ mỗi ngày
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="text-[10px] uppercase tracking-wide text-gray-400 font-semibold mb-1 block">Tên của bạn *</label>
                <input type="text" id="homepage-review-name" required placeholder="Ví dụ: Hoàng Nam..." class="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-xs text-white" />
              </div>
              <div>
                <label class="text-[10px] uppercase tracking-wide text-gray-400 font-semibold mb-1 block">Mùi hương đã mua *</label>
                <select id="homepage-review-perfume" required class="w-full bg-[#111111] border border-white/10 rounded px-4 py-2.5 text-xs text-white">
                  <option value="" disabled selected>Chọn mùi hương...</option>
                  <option value="DOCI YES SIR">DOCI YES SIR</option>
                  <option value="DOCI NICE NAVY">DOCI NICE NAVY</option>
                  <option value="DOCI OLD KING">DOCI OLD KING</option>
                  <option value="DOCI BAD BOY">DOCI BAD BOY</option>
                  <option value="DOCI SLAY QUEEN">DOCI SLAY QUEEN</option>
                  <option value="DOCI MADAM CO">DOCI MADAM CO</option>
                  <option value="DOCI Hộp Tester">Hộp Tester 10 Mùi</option>
                </select>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="text-[10px] uppercase tracking-wide text-gray-400 font-semibold mb-1 block">Địa phương của bạn *</label>
                <input type="text" id="homepage-review-location" required placeholder="Ví dụ: Hà Nội, TP. HCM..." class="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-xs text-white" />
              </div>
              <div>
                <label class="text-[10px] uppercase tracking-wide text-gray-400 font-semibold mb-1 block">Đánh giá sao *</label>
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
              <label class="text-[10px] uppercase tracking-wide text-gray-400 font-semibold mb-1 block">Nội dung đánh giá *</label>
              <textarea id="homepage-review-content" required rows="3" placeholder="Nhận xét của bạn về mùi hương, độ lưu hương, dịch vụ..." class="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-xs text-white resize-none"></textarea>
            </div>
            
            <div class="text-center">
              <button type="button" id="homepage-submit-review-btn" class="btn-luxury btn-luxury-solid py-3 px-8 text-xs font-semibold tracking-wider">
                GỬI ĐÁNH GIÁ CỦA BẠN
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 12. PHẦN GIẤY PHÉP VÀ UY TÍN THƯƠNG HIỆU -->
    <section id="certificate-section" class="py-24 bg-darkSurface relative overflow-hidden">
      <!-- Background Decorates -->
      <div class="absolute -right-32 -bottom-32 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
      <div class="absolute -left-32 -top-32 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
      
      <div class="container mx-auto px-4 md:px-8 relative z-10">
        <div class="text-center mb-16" data-aos="fade-up">
          <span
            class="text-xs font-semibold tracking-wide text-gold uppercase block mb-1"
            >UY TÍN & PHÁP LÝ</span
          >
          <h2 class="font-title text-2xl md:text-4xl font-bold text-white max-w-3xl mx-auto leading-snug">
            Vì sao DOCI PERFUME luôn là thương hiệu được nhiều người tin tưởng lựa chọn kinh doanh
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <!-- Cột Trái: Slider Giấy chứng nhận pháp lý của Sở Y Tế -->
          <div class="lg:col-span-5" data-aos="fade-right">
            <div class="glass-card p-4 rounded-2xl border border-gold/10 hover:border-gold/30 transition-all duration-500 shadow-2xl relative group">
              <span class="absolute top-6 left-6 z-20 bg-gold text-black text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                Sở Y Tế Cấp Phép
              </span>
              
              <!-- Swiper Container -->
              <div class="swiper certificate-swiper overflow-hidden rounded-xl bg-white/5 border border-white/5 relative" style="width: 100%; aspect-ratio: 3/4;">
                <div class="swiper-wrapper">
                  <!-- Slide 1 -->
                  <div class="swiper-slide relative cursor-zoom-in group" onclick="openLightbox('assets/images/certificates/cert-01.jpg')">
                    <img
                      src="assets/images/certificates/cert-01.jpg"
                      alt="Phiếu công bố sản phẩm DOCI PERFUME - Sở Y Tế cấp phép (Trang 1)"
                      class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <div class="w-12 h-12 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold">
                        <i class="fa-solid fa-magnifying-glass-plus text-lg animate-pulse"></i>
                      </div>
                    </div>
                  </div>
                  <!-- Slide 2 -->
                  <div class="swiper-slide relative cursor-zoom-in group" onclick="openLightbox('assets/images/certificates/cert-02.jpg')">
                    <img
                      src="assets/images/certificates/cert-02.jpg"
                      alt="Phiếu công bố sản phẩm DOCI PERFUME - Sở Y Tế cấp phép (Trang 2)"
                      class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <div class="w-12 h-12 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold">
                        <i class="fa-solid fa-magnifying-glass-plus text-lg animate-pulse"></i>
                      </div>
                    </div>
                  </div>
                  <!-- Slide 3 -->
                  <div class="swiper-slide relative cursor-zoom-in group" onclick="openLightbox('assets/images/certificates/cert-03.jpg')">
                    <img
                      src="assets/images/certificates/cert-03.jpg"
                      alt="Phiếu công bố sản phẩm DOCI PERFUME - Sở Y Tế cấp phép (Trang 3)"
                      class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <div class="w-12 h-12 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold">
                        <i class="fa-solid fa-magnifying-glass-plus text-lg animate-pulse"></i>
                      </div>
                    </div>
                  </div>
                  <!-- Slide 4 -->
                  <div class="swiper-slide relative cursor-zoom-in group" onclick="openLightbox('assets/images/certificates/cert-04.jpg')">
                    <img
                      src="assets/images/certificates/cert-04.jpg"
                      alt="Phiếu công bố sản phẩm DOCI PERFUME - Sở Y Tế cấp phép (Trang 4)"
                      class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <div class="w-12 h-12 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold">
                        <i class="fa-solid fa-magnifying-glass-plus text-lg animate-pulse"></i>
                      </div>
                    </div>
                  </div>
                  <!-- Slide 5 -->
                  <div class="swiper-slide relative cursor-zoom-in group" onclick="openLightbox('assets/images/certificates/cert-05.jpg')">
                    <img
                      src="assets/images/certificates/cert-05.jpg"
                      alt="Phiếu công bố sản phẩm DOCI PERFUME - Sở Y Tế cấp phép (Trang 5)"
                      class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <div class="w-12 h-12 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold">
                        <i class="fa-solid fa-magnifying-glass-plus text-lg animate-pulse"></i>
                      </div>
                    </div>
                  </div>
                  <!-- Slide 6 -->
                  <div class="swiper-slide relative cursor-zoom-in group" onclick="openLightbox('assets/images/certificates/cert-06.jpg')">
                    <img
                      src="assets/images/certificates/cert-06.jpg"
                      alt="Phiếu công bố sản phẩm DOCI PERFUME - Sở Y Tế cấp phép (Trang 6)"
                      class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <div class="w-12 h-12 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold">
                        <i class="fa-solid fa-magnifying-glass-plus text-lg animate-pulse"></i>
                      </div>
                    </div>
                  </div>
                  <!-- Slide 7 -->
                  <div class="swiper-slide relative cursor-zoom-in group" onclick="openLightbox('assets/images/certificates/cert-07.jpg')">
                    <img
                      src="assets/images/certificates/cert-07.jpg"
                      alt="Phiếu công bố sản phẩm DOCI PERFUME - Sở Y Tế cấp phép (Trang 7)"
                      class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <div class="w-12 h-12 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold">
                        <i class="fa-solid fa-magnifying-glass-plus text-lg animate-pulse"></i>
                      </div>
                    </div>
                  </div>
                  <!-- Slide 8 -->
                  <div class="swiper-slide relative cursor-zoom-in group" onclick="openLightbox('assets/images/certificates/cert-08.jpg')">
                    <img
                      src="assets/images/certificates/cert-08.jpg"
                      alt="Phiếu công bố sản phẩm DOCI PERFUME - Sở Y Tế cấp phép (Trang 8)"
                      class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <div class="w-12 h-12 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold">
                        <i class="fa-solid fa-magnifying-glass-plus text-lg animate-pulse"></i>
                      </div>
                    </div>
                  </div>
                  <!-- Slide 9 -->
                  <div class="swiper-slide relative cursor-zoom-in group" onclick="openLightbox('assets/images/certificates/cert-09.jpg')">
                    <img
                      src="assets/images/certificates/cert-09.jpg"
                      alt="Phiếu công bố sản phẩm DOCI PERFUME - Sở Y Tế cấp phép (Trang 9)"
                      class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <div class="w-12 h-12 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold">
                        <i class="fa-solid fa-magnifying-glass-plus text-lg animate-pulse"></i>
                      </div>
                    </div>
                  </div>
                  <!-- Slide 10 -->
                  <div class="swiper-slide relative cursor-zoom-in group" onclick="openLightbox('assets/images/certificates/cert-10.jpg')">
                    <img
                      src="assets/images/certificates/cert-10.jpg"
                      alt="Phiếu công bố sản phẩm DOCI PERFUME - Sở Y Tế cấp phép (Trang 10)"
                      class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <div class="w-12 h-12 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold">
                        <i class="fa-solid fa-magnifying-glass-plus text-lg animate-pulse"></i>
                      </div>
                    </div>
                  </div>
                  <!-- Slide 11 -->
                  <div class="swiper-slide relative cursor-zoom-in group" onclick="openLightbox('assets/images/certificates/cert-11.jpg')">
                    <img
                      src="assets/images/certificates/cert-11.jpg"
                      alt="Phiếu công bố sản phẩm DOCI PERFUME - Sở Y Tế cấp phép (Trang 11)"
                      class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <div class="w-12 h-12 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold">
                        <i class="fa-solid fa-magnifying-glass-plus text-lg animate-pulse"></i>
                      </div>
                    </div>
                  </div>
                  <!-- Slide 12 -->
                  <div class="swiper-slide relative cursor-zoom-in group" onclick="openLightbox('assets/images/certificates/cert-12.jpg')">
                    <img
                      src="assets/images/certificates/cert-12.jpg"
                      alt="Phiếu công bố sản phẩm DOCI PERFUME - Sở Y Tế cấp phép (Trang 12)"
                      class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <div class="w-12 h-12 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold">
                        <i class="fa-solid fa-magnifying-glass-plus text-lg animate-pulse"></i>
                      </div>
                    </div>
                  </div>
                  <!-- Slide 13 -->
                  <div class="swiper-slide relative cursor-zoom-in group" onclick="openLightbox('assets/images/certificates/cert-13.jpg')">
                    <img
                      src="assets/images/certificates/cert-13.jpg"
                      alt="Phiếu công bố sản phẩm DOCI PERFUME - Sở Y Tế cấp phép (Trang 13)"
                      class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <div class="w-12 h-12 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold">
                        <i class="fa-solid fa-magnifying-glass-plus text-lg animate-pulse"></i>
                      </div>
                    </div>
                  </div>
                  <!-- Slide 14 -->
                  <div class="swiper-slide relative cursor-zoom-in group" onclick="openLightbox('assets/images/certificates/cert-14.jpg')">
                    <img
                      src="assets/images/certificates/cert-14.jpg"
                      alt="Phiếu công bố sản phẩm DOCI PERFUME - Sở Y Tế cấp phép (Trang 14)"
                      class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <div class="w-12 h-12 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold">
                        <i class="fa-solid fa-magnifying-glass-plus text-lg animate-pulse"></i>
                      </div>
                    </div>
                  </div>
                  <!-- Slide 15 -->
                  <div class="swiper-slide relative cursor-zoom-in group" onclick="openLightbox('assets/images/certificates/cert-15.jpg')">
                    <img
                      src="assets/images/certificates/cert-15.jpg"
                      alt="Phiếu công bố sản phẩm DOCI PERFUME - Sở Y Tế cấp phép (Trang 15)"
                      class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <div class="w-12 h-12 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold">
                        <i class="fa-solid fa-magnifying-glass-plus text-lg animate-pulse"></i>
                      </div>
                    </div>
                  </div>
                  <!-- Slide 16 -->
                  <div class="swiper-slide relative cursor-zoom-in group" onclick="openLightbox('assets/images/certificates/cert-16.jpg')">
                    <img
                      src="assets/images/certificates/cert-16.jpg"
                      alt="Phiếu công bố sản phẩm DOCI PERFUME - Sở Y Tế cấp phép (Trang 16)"
                      class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <div class="w-12 h-12 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold">
                        <i class="fa-solid fa-magnifying-glass-plus text-lg animate-pulse"></i>
                      </div>
                    </div>
                  </div>
                  <!-- Slide 17 -->
                  <div class="swiper-slide relative cursor-zoom-in group" onclick="openLightbox('assets/images/certificates/cert-17.jpg')">
                    <img
                      src="assets/images/certificates/cert-17.jpg"
                      alt="Phiếu công bố sản phẩm DOCI PERFUME - Sở Y Tế cấp phép (Trang 17)"
                      class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <div class="w-12 h-12 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold">
                        <i class="fa-solid fa-magnifying-glass-plus text-lg animate-pulse"></i>
                      </div>
                    </div>
                  </div>
                  <!-- Slide 18 -->
                  <div class="swiper-slide relative cursor-zoom-in group" onclick="openLightbox('assets/images/certificates/cert-18.jpg')">
                    <img
                      src="assets/images/certificates/cert-18.jpg"
                      alt="Phiếu công bố sản phẩm DOCI PERFUME - Sở Y Tế cấp phép (Trang 18)"
                      class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <div class="w-12 h-12 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold">
                        <i class="fa-solid fa-magnifying-glass-plus text-lg animate-pulse"></i>
                      </div>
                    </div>
                  </div>
                  <!-- Slide 19 -->
                  <div class="swiper-slide relative cursor-zoom-in group" onclick="openLightbox('assets/images/certificates/cert-19.jpg')">
                    <img
                      src="assets/images/certificates/cert-19.jpg"
                      alt="Phiếu công bố sản phẩm DOCI PERFUME - Sở Y Tế cấp phép (Trang 19)"
                      class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <div class="w-12 h-12 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold">
                        <i class="fa-solid fa-magnifying-glass-plus text-lg animate-pulse"></i>
                      </div>
                    </div>
                  </div>
                  <!-- Slide 20 -->
                  <div class="swiper-slide relative cursor-zoom-in group" onclick="openLightbox('assets/images/certificates/cert-20.jpg')">
                    <img
                      src="assets/images/certificates/cert-20.jpg"
                      alt="Phiếu công bố sản phẩm DOCI PERFUME - Sở Y Tế cấp phép (Trang 20)"
                      class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <div class="w-12 h-12 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold">
                        <i class="fa-solid fa-magnifying-glass-plus text-lg animate-pulse"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Nút điều hướng chuyển Slide -->
                <div class="swiper-button-prev cert-prev" title="Trang trước">
                  <i class="fa-solid fa-chevron-left text-base"></i>
                </div>
                <div class="swiper-button-next cert-next" title="Trang sau">
                  <i class="fa-solid fa-chevron-right text-base"></i>
                </div>
                <!-- Dấu chấm chỉ số slide -->
                <div class="swiper-pagination cert-pagination !bottom-4"></div>
              </div>
              
              <p class="text-center text-[10px] text-gray-500 mt-3 font-light italic">
                * Click vào ảnh để phóng to xem chi tiết / Vuốt hoặc click nút để chuyển slide
              </p>
            </div>
          </div>

          <!-- Cột Phải: Các ưu thế kinh doanh của DOCI -->
          <div class="lg:col-span-7 flex flex-col justify-center" data-aos="fade-left">
            <div class="glass-card p-8 md:p-10 rounded-2xl border border-white/5 bg-white/[0.01]">
              <h3 class="font-title text-xl md:text-2xl font-bold text-gold mb-8 flex items-center gap-3">
                <i class="fa-solid fa-handshake text-gold"></i> Cam Kết Đồng Hành Phát Triển
              </h3>
              
              <ul class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                <li class="flex items-start gap-3.5 group">
                  <span class="w-6 h-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-xs flex-shrink-0 group-hover:bg-gold group-hover:text-black transition-colors duration-300">
                    <i class="fa-solid fa-handshake"></i>
                  </span>
                  <div>
                    <h4 class="text-xs font-bold text-white tracking-wide uppercase mb-1">Pháp lý rõ ràng</h4>
                    <p class="text-[11px] text-gray-400 font-light leading-relaxed">Mọi giấy tờ công bố, kiểm nghiệm đều minh bạch và công khai.</p>
                  </div>
                </li>
                
                <li class="flex items-start gap-3.5 group">
                  <span class="w-6 h-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-xs flex-shrink-0 group-hover:bg-gold group-hover:text-black transition-colors duration-300">
                    <i class="fa-solid fa-handshake"></i>
                  </span>
                  <div>
                    <h4 class="text-xs font-bold text-white tracking-wide uppercase mb-1">Sở Y Tế cấp phép</h4>
                    <p class="text-[11px] text-gray-400 font-light leading-relaxed">Được cấp phép lưu hành hợp pháp trên toàn quốc bởi Sở Y Tế.</p>
                  </div>
                </li>
                
                <li class="flex items-start gap-3.5 group">
                  <span class="w-6 h-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-xs flex-shrink-0 group-hover:bg-gold group-hover:text-black transition-colors duration-300">
                    <i class="fa-solid fa-handshake"></i>
                  </span>
                  <div>
                    <h4 class="text-xs font-bold text-white tracking-wide uppercase mb-1">Chất lượng hàng đầu</h4>
                    <p class="text-[11px] text-gray-400 font-light leading-relaxed">Nồng độ EDP đạt chuẩn, lưu hương vượt trội và an toàn tuyệt đối.</p>
                  </div>
                </li>
                
                <li class="flex items-start gap-3.5 group">
                  <span class="w-6 h-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-xs flex-shrink-0 group-hover:bg-gold group-hover:text-black transition-colors duration-300">
                    <i class="fa-solid fa-handshake"></i>
                  </span>
                  <div>
                    <h4 class="text-xs font-bold text-white tracking-wide uppercase mb-1">Nguyên liệu nhập khẩu</h4>
                    <p class="text-[11px] text-gray-400 font-light leading-relaxed">Tinh dầu cao cấp nhập khẩu chính ngạch trực tiếp từ châu Âu.</p>
                  </div>
                </li>
                
                <li class="flex items-start gap-3.5 group">
                  <span class="w-6 h-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-xs flex-shrink-0 group-hover:bg-gold group-hover:text-black transition-colors duration-300">
                    <i class="fa-solid fa-handshake"></i>
                  </span>
                  <div>
                    <h4 class="text-xs font-bold text-white tracking-wide uppercase mb-1">Mẫu mã đặc sắc</h4>
                    <p class="text-[11px] text-gray-400 font-light leading-relaxed">Thiết kế vỏ chai sang trọng, tinh tế và đa dạng phong cách.</p>
                  </div>
                </li>
                
                <li class="flex items-start gap-3.5 group">
                  <span class="w-6 h-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-xs flex-shrink-0 group-hover:bg-gold group-hover:text-black transition-colors duration-300">
                    <i class="fa-solid fa-handshake"></i>
                  </span>
                  <div>
                    <h4 class="text-xs font-bold text-white tracking-wide uppercase mb-1">Giá cả hợp lý</h4>
                    <p class="text-[11px] text-gray-400 font-light leading-relaxed">Mức giá tối ưu và cực kỳ phù hợp túi tiền của người tiêu dùng Việt.</p>
                  </div>
                </li>
                
                <li class="flex items-start gap-3.5 group md:col-span-2">
                  <span class="w-6 h-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-xs flex-shrink-0 group-hover:bg-gold group-hover:text-black transition-colors duration-300">
                    <i class="fa-solid fa-handshake"></i>
                  </span>
                  <div>
                    <h4 class="text-xs font-bold text-white tracking-wide uppercase mb-1">Chiến lược kinh doanh bài bản</h4>
                    <p class="text-[11px] text-gray-400 font-light leading-relaxed">Hỗ trợ đào tạo kinh doanh thực chiến, cung cấp công cụ Marketing hiện đại.</p>
                  </div>
                </li>
              </ul>

              <!-- Hashtags và Trang trí -->
              <div class="border-t border-white/10 pt-6 flex flex-wrap gap-2 text-[10px] font-semibold text-gold tracking-wider uppercase">
                <span class="hover:text-white transition-colors cursor-pointer">#Dociperfume</span>
                <span class="text-gray-600">•</span>
                <span class="hover:text-white transition-colors cursor-pointer">#Doci</span>
                <span class="text-gray-600">•</span>
                <span class="hover:text-white transition-colors cursor-pointer">#nuochoa</span>
                <span class="text-gray-600">•</span>
                <span class="hover:text-white transition-colors cursor-pointer">#nuochoachinhhang</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
