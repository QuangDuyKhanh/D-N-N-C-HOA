<!-- 18. CHI TIẾT SẢN PHẨM (CỬA SỔ POPUP MODAL) -->
    <div id="detail-modal" class="detail-modal">
      <div class="detail-modal-bg"></div>
      <div class="detail-modal-container p-6 md:p-10">
        <button
          id="close-detail-modal"
          class="absolute top-5 right-5 text-gray-400 hover:text-white text-3xl z-10"
        >
          &times;
        </button>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <!-- Cột ảnh (Trái) -->
          <div
            class="lg:col-span-5 flex justify-center bg-black/10 rounded-xl p-6 border border-white/5"
          >
            <img
              id="modal-img"
              src=""
              alt=""
              class="object-contain max-h-[350px] w-auto"
            />
          </div>

          <!-- Cột chữ (Phải) -->
          <div class="lg:col-span-7">
            <span
              id="modal-category"
              class="text-[10px] text-[#D4AF37] font-semibold uppercase tracking-wide block"
            ></span>
            <h2
              id="modal-name"
              class="font-title text-3xl font-bold text-white mt-1 mb-1"
            ></h2>
            <p
              id="modal-inspired"
              class="text-xs text-gray-400 italic mb-4"
            ></p>

            <div class="flex items-baseline gap-3 mb-6">
              <span
                id="modal-price"
                class="text-2xl font-bold text-[#D4AF37]"
              ></span>
              <span
                id="modal-original-price"
                class="text-sm text-gray-500 line-through"
              ></span>
            </div>

            <h4
              class="text-xs font-bold uppercase tracking-wide mb-2 text-white"
            >
              Mô tả mùi hương
            </h4>
            <p
              id="modal-description"
              class="text-xs text-gray-300 font-light leading-relaxed mb-6"
            ></p>

            <!-- Tháp 3 tầng hương -->
            <h4
              class="text-xs font-bold uppercase tracking-wide mb-3 text-white"
            >
              Cấu trúc tầng hương
            </h4>
            <div class="fragrance-pyramid-container flex flex-col gap-2.5 mb-6">
              <div class="pyramid-level">
                <span
                  class="text-[10px] text-[#D4AF37] font-bold uppercase block"
                  >Hương Đầu (Top Notes)</span
                >
                <span id="note-top" class="text-xs text-white"></span>
              </div>
              <div class="pyramid-level">
                <span
                  class="text-[10px] text-[#D4AF37] font-bold uppercase block"
                  >Hương Giữa (Middle Notes)</span
                >
                <span id="note-middle" class="text-xs text-white"></span>
              </div>
              <div class="pyramid-level">
                <span
                  class="text-[10px] text-[#D4AF37] font-bold uppercase block"
                  >Hương Cuối (Base Notes)</span
                >
                <span id="note-base" class="text-xs text-white"></span>
              </div>
            </div>

            <!-- Thông số kỹ thuật -->
            <h4
              class="text-xs font-bold uppercase tracking-wide mb-3 text-white"
            >
              Thông số sản phẩm
            </h4>
            <div class="grid grid-cols-2 gap-4 mb-8">
              <div class="p-3 bg-white/5 border border-white/5 rounded">
                <span
                  class="text-[9px] text-gray-500 uppercase tracking-wide block"
                  >Độ lưu hương</span
                >
                <span
                  id="spec-longevity"
                  class="text-xs font-semibold text-white"
                ></span>
              </div>
              <div class="p-3 bg-white/5 border border-white/5 rounded">
                <span
                  class="text-[9px] text-gray-500 uppercase tracking-wide block"
                  >Độ tỏa hương</span
                >
                <span
                  id="spec-projection"
                  class="text-xs font-semibold text-white"
                ></span>
              </div>
              <div class="p-3 bg-white/5 border border-white/5 rounded">
                <span
                  class="text-[9px] text-gray-500 uppercase tracking-wide block"
                  >Mùa phù hợp</span
                >
                <span
                  id="spec-season"
                  class="text-xs font-semibold text-white"
                ></span>
              </div>
              <div class="p-3 bg-white/5 border border-white/5 rounded">
                <span
                  class="text-[9px] text-gray-500 uppercase tracking-wide block"
                  >Hoàn cảnh khuyên dùng</span
                >
                <span
                  id="spec-occasion"
                  class="text-xs font-semibold text-white"
                ></span>
              </div>
            </div>

            <button
              id="modal-buy-btn"
              class="w-full btn-luxury btn-luxury-solid py-3 text-xs"
            >
              THÊM VÀO GIỎ HÀNG
            </button>
          </div>
        </div>

        <!-- Phần Đánh Giá Sản Phẩm -->
        <div class="mt-12 pt-8 border-t border-white/10">
          <h3 class="font-title text-xl font-bold text-white mb-6">Đánh Giá Sản Phẩm</h3>
          
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <!-- Thống kê đánh giá (Trái) -->
            <div class="lg:col-span-4 bg-white/5 border border-white/5 rounded-xl p-6 flex flex-col items-center justify-center text-center">
              <span id="reviews-avg-rating" class="text-4xl font-bold text-[#D4AF37] font-title mb-1">0.0</span>
              <div id="reviews-stars-summary" class="flex text-[#D4AF37] text-sm mb-2">
                <!-- Sẽ được vẽ bằng JS -->
              </div>
              <span id="reviews-total-count" class="text-xs text-gray-400">0 đánh giá</span>
              
              <!-- Biểu đồ cột sao -->
              <div class="w-full mt-6 space-y-2">
                <div class="flex items-center gap-2 text-[11px] text-gray-400">
                  <span class="w-3">5</span>
                  <i class="fa-solid fa-star text-[#D4AF37] text-[9px]"></i>
                  <div class="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div id="star-bar-5" class="h-full bg-[#D4AF37]" style="width: 0%"></div>
                  </div>
                  <span id="star-pct-5" class="w-8 text-right">0%</span>
                </div>
                <div class="flex items-center gap-2 text-[11px] text-gray-400">
                  <span class="w-3">4</span>
                  <i class="fa-solid fa-star text-[#D4AF37] text-[9px]"></i>
                  <div class="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div id="star-bar-4" class="h-full bg-[#D4AF37]" style="width: 0%"></div>
                  </div>
                  <span id="star-pct-4" class="w-8 text-right">0%</span>
                </div>
                <div class="flex items-center gap-2 text-[11px] text-gray-400">
                  <span class="w-3">3</span>
                  <i class="fa-solid fa-star text-[#D4AF37] text-[9px]"></i>
                  <div class="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div id="star-bar-3" class="h-full bg-[#D4AF37]" style="width: 0%"></div>
                  </div>
                  <span id="star-pct-3" class="w-8 text-right">0%</span>
                </div>
                <div class="flex items-center gap-2 text-[11px] text-gray-400">
                  <span class="w-3">2</span>
                  <i class="fa-solid fa-star text-[#D4AF37] text-[9px]"></i>
                  <div class="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div id="star-bar-2" class="h-full bg-[#D4AF37]" style="width: 0%"></div>
                  </div>
                  <span id="star-pct-2" class="w-8 text-right">0%</span>
                </div>
                <div class="flex items-center gap-2 text-[11px] text-gray-400">
                  <span class="w-3">1</span>
                  <i class="fa-solid fa-star text-[#D4AF37] text-[9px]"></i>
                  <div class="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div id="star-bar-1" class="h-full bg-[#D4AF37]" style="width: 0%"></div>
                  </div>
                  <span id="star-pct-1" class="w-8 text-right">0%</span>
                </div>
              </div>
            </div>
            
            <!-- Danh sách đánh giá & Form viết đánh giá (Phải) -->
            <div class="lg:col-span-8 flex flex-col gap-6">
              <!-- Danh sách đánh giá -->
              <div id="reviews-list-container" class="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                <!-- Sẽ được vẽ bằng JS -->
              </div>
              
              <!-- Form viết đánh giá -->
              <div class="bg-white/5 border border-white/5 rounded-xl p-5 mt-2">
                <h4 class="text-xs font-bold uppercase tracking-wide text-white mb-4">Viết đánh giá của bạn</h4>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label class="text-[10px] uppercase tracking-wide text-gray-400 font-semibold mb-1 block">Tên của bạn *</label>
                    <input type="text" id="review-user-name" required placeholder="Nhập tên của bạn..." class="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white" />
                  </div>
                  <div>
                    <label class="text-[10px] uppercase tracking-wide text-gray-400 font-semibold mb-1 block">Đánh giá sao *</label>
                    <div class="flex items-center gap-1 mt-1 text-gray-400 text-lg cursor-pointer select-none" id="star-rating-selector">
                      <i class="fa-regular fa-star hover:text-[#D4AF37] transition-colors" data-value="1"></i>
                      <i class="fa-regular fa-star hover:text-[#D4AF37] transition-colors" data-value="2"></i>
                      <i class="fa-regular fa-star hover:text-[#D4AF37] transition-colors" data-value="3"></i>
                      <i class="fa-regular fa-star hover:text-[#D4AF37] transition-colors" data-value="4"></i>
                      <i class="fa-regular fa-star hover:text-[#D4AF37] transition-colors" data-value="5"></i>
                      <input type="hidden" id="review-stars-value" value="0" />
                    </div>
                  </div>
                </div>
                
                <div class="mb-4">
                  <label class="text-[10px] uppercase tracking-wide text-gray-400 font-semibold mb-1 block">Nội dung đánh giá *</label>
                  <textarea id="review-content" required rows="3" placeholder="Chia sẻ trải nghiệm của bạn về mùi hương, độ lưu hương..." class="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white resize-none"></textarea>
                </div>
                
                <button type="button" id="submit-review-btn" class="btn-luxury btn-luxury-solid py-2 px-6 text-[10px] font-semibold tracking-wider self-start">
                  GỬI ĐÁNH GIÁ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
